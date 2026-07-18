<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const context = canvas.getContext('webgl', {
			alpha: false,
			antialias: false,
			preserveDrawingBuffer: true,
			powerPreference: 'low-power'
		});
		if (!context) return;
		const gl = context;

		const vertexSource = `
			attribute vec2 position;
			void main() { gl_Position = vec4(position, 0.0, 1.0); }
		`;
		const fragmentSource = `
			precision highp float;
			uniform vec2 resolution;
			uniform vec2 pointer;
			uniform float time;

			float hash(vec2 p) {
				p = fract(p * vec2(123.34, 456.21));
				p += dot(p, p + 45.32);
				return fract(p.x * p.y);
			}

			float line(float distanceToLine, float width) {
				return 1.0 - smoothstep(0.0, width, abs(distanceToLine));
			}

			void main() {
				vec2 uv = gl_FragCoord.xy / resolution.xy;
				vec2 p = uv - vec2(0.53, 0.5);
				float pulse = sin(time * 0.32) * 0.007;
				float mesh = 0.0;
				float surfaceGlow = 0.0;

				for (int i = 0; i < 19; i++) {
					float depth = float(i) / 18.0;
					float perspective = pow(depth, 1.45);
					float width = mix(0.19, 0.72, perspective);
					float x = p.x / width;
					float smile = (x * x) * mix(0.055, 0.145, depth);
					float skew = sin(x * 3.2 + depth * 4.5 + time * 0.10) * 0.018 * depth;
					float y = mix(0.27, -0.39, perspective) + smile + skew + pulse;
					float inside = 1.0 - step(1.02, abs(x));
					float weight = mix(0.24, 1.0, depth);
					mesh = max(mesh, line(p.y - y, mix(0.0011, 0.0022, depth)) * inside * weight);
					surfaceGlow += exp(-abs(p.y - y) * 50.0) * inside * 0.012;
				}

				float estimatedDepth = clamp(pow(clamp((0.27 - p.y) / 0.66, 0.0, 1.0), 0.69), 0.0, 1.0);
				float projectedWidth = mix(0.19, 0.72, estimatedDepth);
				for (int j = -9; j <= 9; j++) {
					float column = float(j) / 9.0;
					float xLine = column * projectedWidth;
					float smileShift = column * column * mix(0.0, 0.065, estimatedDepth);
					float insideY = step(-0.43, p.y) * step(p.y, 0.31);
					mesh = max(mesh, line(p.x - xLine - smileShift, 0.00135) * insideY * mix(0.28, 0.76, estimatedDepth));
				}

				vec2 m = pointer - vec2(0.5);
				float pointerGlow = 1.0 - smoothstep(0.0, 0.28, length((uv - pointer) * vec2(resolution.x / resolution.y, 1.0)));
				float atm = 1.0 - smoothstep(0.0, 0.12, abs(p.x));
				float expiry = smoothstep(-0.35, 0.18, -p.y);
				vec3 black = vec3(0.024, 0.031, 0.027);
				vec3 green = vec3(0.020, 0.255, 0.174);
				vec3 mint = vec3(0.44, 0.78, 0.65);
				vec3 paper = vec3(0.84, 0.83, 0.77);
				vec3 color = black + green * (surfaceGlow + atm * expiry * 0.028);
				color = mix(color, mint, mesh * 0.78);
				color = mix(color, paper, mesh * mesh * 0.18 + pointerGlow * mesh * 0.42);
				float vignette = smoothstep(0.95, 0.24, length((uv - 0.5) * vec2(0.86, 1.0)));
				color *= 0.62 + vignette * 0.55;
				color += (hash(gl_FragCoord.xy + time) - 0.5) * 0.012;
				gl_FragColor = vec4(color, 1.0);
			}
		`;

		function compile(type: number, source: string) {
			const shader = gl.createShader(type);
			if (!shader) return null;
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			return shader;
		}

		const program = gl.createProgram();
		const vertex = compile(gl.VERTEX_SHADER, vertexSource);
		const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
		if (!program || !vertex || !fragment) return;
		gl.attachShader(program, vertex);
		gl.attachShader(program, fragment);
		gl.linkProgram(program);
		gl.useProgram(program);

		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		const position = gl.getAttribLocation(program, 'position');
		gl.enableVertexAttribArray(position);
		gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

		const resolution = gl.getUniformLocation(program, 'resolution');
		const pointer = gl.getUniformLocation(program, 'pointer');
		const time = gl.getUniformLocation(program, 'time');
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let frame = 0;
		let visible = true;
		let mouseX = 0.62;
		let mouseY = 0.36;
		let targetX = mouseX;
		let targetY = mouseY;

		function resize() {
			const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
			const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
			const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
			if (canvas.width !== width || canvas.height !== height) {
				canvas.width = width;
				canvas.height = height;
				gl.viewport(0, 0, width, height);
			}
		}

		function render(now = 0) {
			resize();
			mouseX += (targetX - mouseX) * 0.035;
			mouseY += (targetY - mouseY) * 0.035;
			gl.uniform2f(resolution, canvas.width, canvas.height);
			gl.uniform2f(pointer, mouseX, mouseY);
			gl.uniform1f(time, reducedMotion ? 0 : now / 1000);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
			if (visible && !reducedMotion) frame = requestAnimationFrame(render);
		}

		function onPointerMove(event: PointerEvent) {
			const rect = canvas.getBoundingClientRect();
			targetX = (event.clientX - rect.left) / Math.max(1, rect.width);
			targetY = 1 - (event.clientY - rect.top) / Math.max(1, rect.height);
		}

		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			cancelAnimationFrame(frame);
			if (visible) frame = requestAnimationFrame(render);
		}, { threshold: 0.01 });
		observer.observe(canvas);
		window.addEventListener('pointermove', onPointerMove, { passive: true });
		render();

		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			window.removeEventListener('pointermove', onPointerMove);
			gl.deleteProgram(program);
			gl.deleteShader(vertex);
			gl.deleteShader(fragment);
			gl.deleteBuffer(buffer);
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		display: block;
		pointer-events: none;
	}
</style>
