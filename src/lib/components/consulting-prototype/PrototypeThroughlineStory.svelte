<script lang="ts">
	import { onMount } from 'svelte';
	import { createTimeline, stagger } from 'animejs';
	import {
		siClaude,
		siGithub,
		siVercel,
		siRailway,
		siSupabase,
		siClerk,
		siStripe,
		siPosthog,
		siSentry,
		siNotion
	} from 'simple-icons';
	import ConsultingMark from '$lib/components/ConsultingMark.svelte';
	import { consultingSite } from '$lib/content/consulting-prototype';
	import { track } from '$lib/analytics';

	let { storageKey: _storageKey, workHref }: { storageKey: string; workHref: string } = $props();
	let section: HTMLElement;
	let screenFrame: HTMLElement;
	let elapsed = $state(0);
	const HOLD = 0.6; // Jack 07-18: brief hold, then play (3.4s felt stalled)
	let story = $derived(Math.max(0, elapsed - HOLD));
	let visible = $state(false);
	let reducedMotion = $state(false);
	let lastFrame = 0;
	let frame = 0;
	const email = `mailto:${consultingSite.contactEmail}?subject=${encodeURIComponent(consultingSite.emailSubject)}`;

	const duration = 26;
	const tabs = [
		{ name: 'ChatGPT', job: 'Idea', icon: null, favicon: '/consulting/prototypes/brands/chatgpt.png', color: '#10a37f' },
		{ name: 'Claude', job: 'Build', icon: siClaude, color: '#d97757' },
		{ name: 'GitHub', job: 'Code', icon: siGithub, color: '#f2f2f2' },
		{ name: 'Vercel', job: 'Frontend', icon: siVercel, color: '#ffffff' },
		{ name: 'Railway', job: 'Backend', icon: siRailway, color: '#a78bfa' },
		{ name: 'Supabase', job: 'Database', icon: siSupabase, color: '#3ecf8e' },
		{ name: 'Clerk', job: 'Customers', icon: siClerk, color: '#6c47ff' },
		{ name: 'Stripe', job: 'Payments', icon: siStripe, color: '#635bff' },
		{ name: 'PostHog', job: 'Analytics', icon: siPosthog, color: '#f59e0b' },
		{ name: 'Sentry', job: 'Errors', icon: siSentry, color: '#a279ff' }
	];
	const tasks = [
		'Fix mobile checkout',
		'Repair contact form',
		'Update customer login',
		'Check missing payments',
		'Restore analytics',
		'Investigate production error',
		'Finish the AI-generated change',
		'Figure out why deployment failed'
	];
	const chapters = [
		{ label: 'Start a Site', start: 0, end: 1.65 },
		{ label: 'Complexity Grows', start: 1.65, end: 7.55 },
		{ label: 'Things Break', start: 7.55, end: 13.45 },
		{ label: 'We Take Over', start: 13.45, end: 18.05 },
		{ label: 'It Just Works', start: 18.05, end: duration }
	];

	let activeChapter = $derived(Math.max(0, chapters.findIndex((chapter) => story >= chapter.start && story < chapter.end)));
	let sceneTitle = $derived(
		story < 1.65 ? 'One website.' :
		story < 7.55 ? 'Then the tools start piling up.' :
		story < 12.15 ? 'Now it is your second job.' :
		story < 13.55 ? 'Until something breaks.' :
		story < 18.05 ? 'Give the whole system one owner.' :
		'Back to a website that just works.'
	);
	let notionSplit = $derived(
		ramp(story, 7.65, 8.5) * Math.max(
			1 - ramp(story, 13.15, 13.55),
			ramp(story, 16.7, 17.1) * (1 - ramp(story, 21.1, 21.7))
		)
	);
	let isFailure = $derived(story >= 12.15 && story < 13.55 || story >= 21.75 && story < 22.55);
	let isSearch = $derived(story >= 13.55 && story < 15.35);
	let isConsulting = $derived(story >= 15.35 && story < 21.75);
	let isResolved = $derived(story >= 22.55);
	let notionVisible = $derived(ramp(story, 7.15, 7.55) * (1 - ramp(story, 21.15, 21.55)));
	let helpVisible = $derived(ramp(story, 13.45, 13.8) * (1 - ramp(story, 21.45, 21.8)));
	let queryCharacters = $derived(Math.floor(21 * ramp(story, 14.05, 15.05)));

	function clamp(value: number) {
		return Math.max(0, Math.min(1, value));
	}

	function ramp(value: number, start: number, end: number) {
		return clamp((value - start) / (end - start));
	}

	function mix(from: number, to: number, amount: number) {
		return from + (to - from) * clamp(amount);
	}

	function tabAmount(index: number) {
		const opened = ramp(story, 1.6 + index * 0.5, 1.88 + index * 0.5);
		const reverseIndex = tabs.length - 1 - index;
		const closed = ramp(story, 19.35 + reverseIndex * 0.18, 19.58 + reverseIndex * 0.18);
		return opened * (1 - closed);
	}

	function taskAmount(index: number) {
		return ramp(story, 8.3 + index * 0.45, 8.58 + index * 0.45);
	}

	function taskComplete(index: number) {
		return ramp(story, 17.25 + index * 0.31, 17.48 + index * 0.31);
	}

	function cursorStyle() {
		let x = 88;
		let y = 8;
		let opacity = 0;

		if (story >= 7.05 && story < 8.55) {
			const drag = ramp(story, 7.35, 8.35);
			x = mix(89, 76, drag);
			y = mix(8, 43, drag);
			opacity = ramp(story, 7.05, 7.25);
		} else if (story >= 13.25 && story < 16.9) {
			opacity = 1;
			const address = ramp(story, 13.45, 14.05);
			const button = ramp(story, 15.35, 16.35);
			x = mix(95, 53, address);
			y = mix(8, 13, address);
			x = mix(x, 42, button);
			y = mix(y, 69, button);
		} else if (story >= 21.25 && story < 23.05) {
			opacity = 1 - ramp(story, 22.8, 23.05);
			const refresh = ramp(story, 21.75, 22.42);
			x = mix(83, 7.2, refresh);
			y = mix(8, 13, refresh);
		}

		return `--cx:${x};--cy:${y};opacity:${opacity}`;
	}

	let hasStarted = false;

	function replay() {
		elapsed = 0;
		lastFrame = performance.now();
		hasStarted = true;
	}

	function seek(index: number) {
		elapsed = HOLD + chapters[index].start;
		lastFrame = performance.now();
		hasStarted = true;
	}

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion) elapsed = HOLD + duration - 1;
		let stopIntro = () => {};
		if (!reducedMotion) {
			const forceReplay = new URLSearchParams(window.location.search).get('replay') === '1';
			const introKey = `${_storageKey}_browser_intro`;
			if (forceReplay || !sessionStorage.getItem(introKey)) {
				const intro = createTimeline({ defaults: { duration: 900, ease: 'out(4)' } })
					.add(section.querySelectorAll('.story-heading > *'), {
						opacity: { from: 0 },
						y: { from: '2.2rem' },
						delay: stagger(110)
					})
					.add(section.querySelector('.story-caption')!, {
						opacity: { from: 0 },
						y: { from: '1rem' },
						duration: 700
					}, 210)
					.add(section.querySelector('.browser-stage')!, {
						opacity: { from: 0 },
						y: { from: '5rem' },
						scale: { from: .965 },
						duration: 1250,
						ease: 'out(5)'
					}, 260);
				sessionStorage.setItem(introKey, '1');
				stopIntro = () => intro.revert();
			}
		}

		const observer = new IntersectionObserver(([entry]) => {
			const shouldPlay = entry.intersectionRatio >= 0.62;
			if (shouldPlay && !hasStarted && !reducedMotion) {
				elapsed = 0;
				lastFrame = performance.now();
				hasStarted = true;
			}
			visible = shouldPlay;
		}, { threshold: [0, 0.62, 0.9], rootMargin: '-72px 0px 0px' });
		observer.observe(screenFrame);

		function tick(now: number) {
			if (!lastFrame) lastFrame = now;
			if (visible && !reducedMotion) {
				elapsed += Math.min((now - lastFrame) / 1000, 0.1);
				if (elapsed >= duration + HOLD) elapsed = 0;
			}
			lastFrame = now;
			frame = requestAnimationFrame(tick);
		}

		frame = requestAnimationFrame(tick);
		return () => {
			observer.disconnect();
			stopIntro();
			cancelAnimationFrame(frame);
		};
	});
</script>

<section class="story" id="top" bind:this={section} aria-labelledby="story-title">
	<div class="story-grid" aria-hidden="true"></div>
	<div class="color-field" aria-hidden="true"><i></i><i></i><i></i></div>

	<div class="story-heading">
		<div>
			<p>{consultingSite.hero.eyebrow}</p>
			<h1 id="story-title">{consultingSite.hero.title.lead} <em>{consultingSite.hero.title.emphasis}</em></h1>
		</div>
		<div class="story-intro">
			<span>{consultingSite.hero.body}</span>
			<div class="hero-actions">
				<a class="primary" href={email} onclick={() => track('email_click', { source: 'consulting_prototype', location: 'hero' })}>{consultingSite.hero.primaryCta}</a>
				<a class="secondary" href={workHref}>{consultingSite.hero.secondaryCta}</a>
			</div>
		</div>
	</div>

	<div class="story-player">
		<div class="monitor" role="img" aria-label="An animated browser story where a business owner hands off a complicated website stack to Lutz Consulting Group">
			<div class="browser-stage" aria-hidden="true" inert>
			<div class="screen-frame" bind:this={screenFrame}>
				<div class="screen-content">
					<div class="screen-reflection" aria-hidden="true"></div>

					<div class="browser">
						<div class="tab-strip">
							<div class="browser-tab business-tab" class:active={!isSearch && !isConsulting}>
								<i class="site-favicon">Y</i><span>yourbusiness.com</span><b>×</b>
							</div>

							{#each tabs as tab, index}
								{@const amount = tabAmount(index)}
								<div class="browser-tab tool-tab" style={`--tab-opacity:${amount};--tab-width:${amount};--tab-y:${(1 - amount) * 9}px;--brand-color:${tab.color}`} title={`${tab.name} — ${tab.job}`}>
									<i class="brand-icon">
										{#if tab.favicon}<img src={tab.favicon} alt="" />{:else if tab.icon}{@html tab.icon.svg}{/if}
									</i>
									<span>{tab.name}</span><b>×</b>
								</div>
							{/each}

							<div class="browser-tab notion-tab" style={`--tab-opacity:${notionVisible};--tab-width:${notionVisible};--tab-y:${(1 - notionVisible) * 9}px;--brand-color:#f5f5f5`}>
								<i class="brand-icon">{@html siNotion.svg}</i><span>Notion</span><b>×</b>
							</div>

							<div class="browser-tab help-tab" class:active={isSearch || isConsulting} style={`--tab-opacity:${helpVisible};--tab-width:${helpVisible};--tab-y:${(1 - helpVisible) * 9}px`}>
								<i class="help-favicon">{isConsulting ? 'L' : '+'}</i><span>{isConsulting ? 'Lutz Consulting Group' : 'New tab'}</span><b>×</b>
							</div>
							<div class="new-tab">+</div>
						</div>

						<div class="address-row">
							<span>‹</span><span>›</span><span class="refresh" class:pulse={story >= 22.2 && story < 22.75}>↻</span>
							<div>{isSearch ? 'Search or enter address' : isConsulting ? 'jwlutz.com/consulting' : 'yourbusiness.com'}</div>
							<b>⋯</b>
						</div>

						<div class="browser-workspace">
							<div class="page-pane" style={`--split:${notionSplit}`}>
								<div class="business-page" class:resolved={isResolved} class:hidden={isFailure || isSearch || isConsulting}>
									<nav><strong>YOUR BUSINESS</strong><span>Work</span><span>About</span><button>Get in touch</button></nav>
									<div class="business-copy">
								<h3>{#if isResolved}Your website<br />that just works.{:else}Your business,<br />online.{/if}</h3>
								<p>{isResolved ? 'Maintained, connected, and ready for what comes next.' : 'Clear, useful, and ready for customers.'}</p>
									</div>
									<div class="site-visual"><i></i><i></i><i></i><b></b></div>
									<footer class:visible={isResolved}><span>© YOUR BUSINESS</span><b>Made by LCG</b></footer>
								</div>

								<div class="error-page" class:visible={isFailure}>
								<strong>404</strong><span>YOURBUSINESS.COM IS NOT RESPONDING</span>
								</div>

								<div class="search-page" class:visible={isSearch}>
								<div class="search-symbol"><i></i></div>
									<div class="search-input"><span>{'jwlutz.com/consulting'.slice(0, queryCharacters)}</span><i></i></div>
								</div>

								<div class="consulting-page" class:visible={isConsulting}>
									<nav><span><ConsultingMark size={18} title="" /> Lutz Consulting Group</span><small>WORK · SERVICES · APPROACH</small></nav>
									<div><small>WEBSITES / AI INTEGRATIONS / ANALYTICS</small><h3>Don’t let your website become your <em>second job.</em></h3><button class:clicked={story >= 16.35}>Start a project</button></div>
								</div>
							</div>

							<div class="notion-pane" style={`--split:${notionSplit}`}>
								<div class="notion-head"><span><i>{@html siNotion.svg}</i>Notion</span><b>Website to-do</b><small>•••</small></div>
								<div class="notion-page">
									<i class="notion-icon">{@html siNotion.svg}</i>
									<h3>Website to-do</h3>
									<div class="task-list">
										{#each tasks as task, index}
											{@const amount = taskAmount(index)}
											{@const complete = taskComplete(index)}
											<div class="task" class:complete={complete > 0.62} style={`--task-opacity:${amount};--task-y:${(1 - amount) * 8}px`}>
												<i></i><span>{task}</span>
											</div>
										{/each}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="cursor" style={cursorStyle()} aria-hidden="true"><i></i><b></b></div>

				</div>
			</div>
			</div>
		</div>

		<div class="story-caption" aria-live="polite">
			<p>{sceneTitle}</p>
			<button type="button" onclick={replay} aria-label="Replay the website ownership story"><i></i> Replay</button>
			<div class="phase-bar" role="group" aria-label="Story phases">
				{#each chapters as chapter, index}
					{@const amount = ramp(story, chapter.start, chapter.end)}
					<button type="button" class="phase-tab" class:active={index === activeChapter} onclick={() => seek(index)} aria-label={`Jump to phase: ${chapter.label}`}>
						{chapter.label}<i aria-hidden="true"><b style={`transform:scaleX(${amount})`}></b></i>
					</button>
				{/each}
			</div>
		</div>
	</div>

</section>

<style>
	.story{position:relative;min-height:100svh;padding:clamp(105px,10vw,150px) max(24px,4vw) 70px;overflow:hidden;border-top:1px solid var(--proto-line);border-bottom:1px solid var(--proto-line);background:#080b09}.story-grid{position:absolute;inset:-20%;opacity:.24;background-image:linear-gradient(var(--proto-line) 1px,transparent 1px),linear-gradient(90deg,var(--proto-line) 1px,transparent 1px);background-size:74px 74px;mask-image:radial-gradient(ellipse at 50% 45%,#000 5%,transparent 70%)}
	.story-heading{position:relative;z-index:2;width:min(1380px,100%);margin:0 auto 46px;display:grid;grid-template-columns:1fr .55fr;gap:60px;align-items:end}.story-heading p{margin:0 0 18px;color:var(--proto-green-light);font:500 8px var(--proto-mono);letter-spacing:.14em}.story-intro{max-width:430px;justify-self:end}.story-intro>span{display:block;color:var(--proto-muted);font-size:14px;line-height:1.65}
	.monitor{position:relative;z-index:2;width:min(1380px,100%);height:min(70vw,760px);min-height:610px;margin:0 auto;overflow:hidden;border:1px solid var(--proto-line-strong);background:#0d100e;box-shadow:0 50px 160px rgba(0,0,0,.5)}
	.browser{position:absolute;left:3%;right:3%;top:65px;bottom:110px;overflow:hidden;border:1px solid rgba(240,239,233,.18);border-radius:7px;background:#121613;box-shadow:0 25px 80px rgba(0,0,0,.45)}.tab-strip{height:39px;padding:7px 8px 0;display:flex;align-items:end;gap:3px;overflow:hidden;background:#0f1310;contain:layout paint}.browser-tab{height:31px;min-width:0;padding:0 8px;display:flex;align-items:center;gap:6px;overflow:hidden;border-radius:6px 6px 0 0;color:#777e78;background:#171c18;font:7px var(--proto-mono);white-space:nowrap}.browser-tab.active{color:#d8dbd5;background:#272d28}.browser-tab>span{overflow:hidden;text-overflow:ellipsis}.browser-tab>b{margin-left:auto;font-weight:400}.business-tab{flex:0 1 150px;min-width:72px}.tool-tab,.notion-tab,.help-tab{flex:var(--tab-width) 1 96px;max-width:105px;opacity:var(--tab-opacity);transform:translateY(var(--tab-y));transition:none}.help-tab{max-width:145px}.site-favicon,.help-favicon{flex:0 0 auto;width:15px;height:15px;display:grid;place-items:center;border-radius:3px;color:#e8e9e4;background:#07543f;font:700 7px Arial,sans-serif}.help-favicon{background:#b49a67;color:#111}.brand-icon{flex:0 0 auto;width:14px;height:14px;display:grid;place-items:center;color:#dedfda}.brand-icon :global(svg){width:100%;height:100%;fill:currentColor}.brand-icon img{display:block;width:100%;height:100%;border-radius:2px}.new-tab{padding:0 7px 8px;color:#777e78}
	.address-row{height:41px;padding:0 13px;display:flex;align-items:center;gap:12px;color:#707771;background:#272d28;border-bottom:1px solid #323933;font:12px var(--proto-sans)}.address-row>div{height:25px;flex:1;padding:0 11px;display:flex;align-items:center;border-radius:13px;color:#999f99;background:#141915;font:7px var(--proto-mono)}.address-row b{font-size:14px}.refresh.pulse{color:#f1f2ed;animation:refresh-pulse .55s ease}
	.browser-workspace{position:absolute;inset:80px 0 0;display:flex;overflow:hidden;background:#0d100e;contain:layout paint}.page-pane{position:relative;flex:0 0 calc(100% - var(--split) * 35%);min-width:0;overflow:hidden;transition:none;contain:layout paint}.business-page,.error-page,.search-page,.consulting-page{position:absolute;inset:0;opacity:0;pointer-events:none;transition:opacity .28s ease}.business-page{opacity:1;color:#171914;background:#dbd8cf}.business-page.hidden{opacity:0}.business-page nav{height:55px;padding:0 6%;display:flex;align-items:center;gap:22px;border-bottom:1px solid rgba(17,19,15,.13);font-size:9px}.business-page nav strong{margin-right:auto;font:8px var(--proto-mono);letter-spacing:.1em}.business-page nav button{padding:9px 11px;border:0;background:#07543f;color:#fff;font-size:8px}.business-copy{position:absolute;z-index:2;left:7%;top:24%;width:53%}.business-copy h3{margin:12px 0 15px;font:400 clamp(34px,4vw,60px)/.88 var(--proto-display);letter-spacing:-.04em}.business-copy p{max-width:345px;color:#686a64;font-size:10px;line-height:1.55}.site-visual{position:absolute;right:6%;bottom:11%;width:34%;height:45%;border:1px solid rgba(7,84,63,.25);background:linear-gradient(145deg,rgba(7,84,63,.24),rgba(180,154,103,.08))}.site-visual i{position:absolute;background:rgba(7,84,63,.2)}.site-visual i:first-child{left:10%;right:10%;top:14%;height:1px}.site-visual i:nth-child(2){left:10%;top:28%;bottom:12%;width:37%}.site-visual i:nth-child(3){right:10%;top:28%;bottom:12%;width:33%}.site-visual b{position:absolute;left:10%;right:10%;bottom:9%;height:1px;background:rgba(180,154,103,.5)}.business-page footer{position:absolute;left:0;right:0;bottom:0;height:31px;padding:0 6%;display:flex;align-items:center;justify-content:space-between;opacity:0;color:#c4cbc4;background:#0d2d24;font:6px var(--proto-mono);letter-spacing:.09em;transition:opacity .55s ease}.business-page footer.visible{opacity:1}.business-page footer b{color:#f0efe9;font-weight:500}
	.error-page.visible,.search-page.visible,.consulting-page.visible{opacity:1}.error-page{display:flex;flex-direction:column;align-items:center;justify-content:center;color:#b8bcb6;background:#0d100e}.error-page strong{font:400 clamp(75px,10vw,145px)/.8 var(--proto-display);color:#eceee9}.error-page span{margin-top:18px;color:#b77559;font:8px var(--proto-mono);letter-spacing:.13em}.search-page{display:flex;flex-direction:column;align-items:center;justify-content:center;color:#242823;background:#f0f1ed}.search-symbol{position:relative;width:38px;height:38px;margin-bottom:13px;border:2px solid #263029;border-radius:50%}.search-symbol::after{content:'';position:absolute;right:-11px;bottom:0;width:16px;height:2px;background:#263029;transform:rotate(45deg)}.search-input{width:min(75%,540px);height:40px;margin-top:22px;padding:0 16px;display:flex;align-items:center;border:1px solid #cdd1cc;border-radius:22px;background:#fff;box-shadow:0 2px 9px rgba(0,0,0,.07);font:11px Arial,sans-serif}.search-input i{width:1px;height:16px;margin-left:2px;background:#222;animation:blink .8s infinite}.consulting-page{padding:0 7% 7%;color:var(--proto-text);background:radial-gradient(circle at 81% 25%,rgba(7,84,63,.65),transparent 40%),#080b09}.consulting-page nav{height:55px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--proto-line)}.consulting-page nav span{display:flex;align-items:center;gap:7px;font-size:8px}.consulting-page nav small{color:var(--proto-muted);font:6px var(--proto-mono);letter-spacing:.09em}.consulting-page>div:last-child{width:73%;padding-top:8%}.consulting-page>div>small{color:var(--proto-green-light);font:6px var(--proto-mono);letter-spacing:.1em}.consulting-page h3{margin:13px 0 20px;font:400 clamp(34px,4.2vw,62px)/.88 var(--proto-display);letter-spacing:-.04em}.consulting-page h3 em{font-weight:400;color:#dad6cc}.consulting-page button{position:relative;padding:11px 14px;border:0;background:var(--proto-paper);color:#11130f;font-weight:600;font-size:8px}.consulting-page button.clicked::after{content:'';position:absolute;inset:-7px;border:1px solid var(--proto-green-light);animation:click-pulse .8s ease}
	.notion-pane{position:relative;flex:0 0 calc(var(--split) * 35%);min-width:0;overflow:hidden;border-left:calc(var(--split) * 1px) solid #303631;color:#d9dcd7;background:#191d1a;contain:layout paint}.notion-head{height:43px;padding:0 12px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #2d332e;font:7px var(--proto-mono);white-space:nowrap}.notion-head span{display:flex;align-items:center;gap:6px;color:#919891}.notion-head span i{width:14px;height:14px}.notion-head span i :global(svg),.notion-icon :global(svg){width:100%;height:100%;fill:currentColor}.notion-head b{margin:auto;font-weight:500}.notion-head small{color:#6c736d}.notion-page{padding:8% 9%;min-width:260px}.notion-icon{display:grid;place-items:center;width:29px;height:29px;margin-bottom:14px}.notion-page h3{margin:0;font:500 20px var(--proto-sans)}.task-list{border-top:1px solid #2d332e}.task{min-height:37px;display:grid;grid-template-columns:12px 1fr;gap:9px;align-items:center;border-bottom:1px solid rgba(240,239,233,.06);opacity:var(--task-opacity);transform:translateY(var(--task-y));white-space:nowrap}.task>i{position:relative;width:11px;height:11px;border:1px solid #666d67;border-radius:2px}.task>i::after{content:'';position:absolute;left:3px;top:1px;width:3px;height:6px;border-right:1px solid #0d2d24;border-bottom:1px solid #0d2d24;opacity:0;transform:rotate(45deg) scale(.5)}.task span{overflow:hidden;text-overflow:ellipsis;color:#b6bbb5;font-size:8px}.task.complete>i{border-color:#b49a67;background:#b49a67}.task.complete>i::after{opacity:1;transform:rotate(45deg) scale(1)}.task.complete span{color:#6f7770;text-decoration:line-through}
	.cursor{position:absolute;z-index:30;left:0;top:0;width:16px;height:23px;pointer-events:none;transform:translate(calc(var(--cx,50)*1cqw),calc(var(--cy,50)*1cqh)) scale(var(--cursor-scale,1));will-change:transform,opacity}.cursor>i{display:block;width:0;height:0;border-top:15px solid #111;border-right:9px solid transparent;filter:drop-shadow(0 0 1px white);transform:rotate(-18deg)}.cursor>b{position:absolute;left:7px;top:11px;width:7px;height:2px;background:#111;transform:rotate(47deg)}
	@keyframes blink{50%{opacity:0}}@keyframes click-pulse{0%{opacity:0;transform:scale(.85)}45%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.08)}}@keyframes refresh-pulse{50%{transform:rotate(180deg);color:#b49a67}}
	@media(max-width:900px){.story{padding-left:16px;padding-right:16px}.story-heading{grid-template-columns:1fr;gap:22px}.story-intro{justify-self:start}.monitor{height:720px}.browser{left:14px;right:14px;top:60px;bottom:126px}.business-copy{width:65%}.site-visual{opacity:.55}}
	@media(max-width:620px){.story{padding-top:95px}.story-intro>span{font-size:12px}.monitor{min-height:0;height:650px}.browser{bottom:118px}.tab-strip{height:36px}.browser-tab{height:28px}.business-tab{flex-basis:105px}.tool-tab,.notion-tab,.help-tab{max-width:43px;padding:0 6px}.tool-tab span,.tool-tab b,.notion-tab span,.notion-tab b,.help-tab span,.help-tab b{display:none}.address-row{height:38px}.browser-workspace{inset:74px 0 0}.business-page nav span,.business-page nav button{display:none}.business-copy{left:8%;top:18%;width:80%}.business-copy h3{font-size:34px}.business-copy p{font-size:9px}.site-visual{right:7%;bottom:12%;width:38%;height:29%;opacity:.42}.business-page footer{padding:0 5%;font-size:5px}.notion-pane{position:absolute;right:0;top:0;bottom:0;flex:none;width:calc(var(--split) * 78%);border-left:1px solid #303631;box-shadow:-20px 0 60px rgba(0,0,0,.42)}.page-pane{flex-basis:100%}.notion-page{min-width:235px}.consulting-page>div:last-child{width:95%;padding-top:13%}.consulting-page h3{font-size:35px}.consulting-page nav small{display:none}.error-page strong{font-size:82px}.error-page span{font-size:6px}.search-input{width:84%}}
	/* Railway-inspired hero composition: the animated product is the first object on the page. */
	.story{
		min-height:auto;
		padding:clamp(132px,12vw,178px) max(24px,4vw) 90px;
		border-top:0;
		background:
			radial-gradient(circle at 14% 16%,rgba(7,84,63,.26),transparent 27%),
			radial-gradient(circle at 88% 23%,rgba(119,70,51,.12),transparent 22%),
			linear-gradient(180deg,#080b09 0%,#090d0a 74%,#080b09 100%);
	}
	.story-grid{opacity:.34;background-size:78px 78px;mask-image:linear-gradient(to bottom,#000 0%,rgba(0,0,0,.75) 56%,transparent 92%)}
	.color-field{position:absolute;inset:0;pointer-events:none;overflow:hidden}.color-field i{position:absolute;border-radius:50%;opacity:.16}.color-field i:first-child{width:470px;height:470px;left:-195px;top:195px;background:radial-gradient(circle closest-side,#0e8e66,transparent)}.color-field i:nth-child(2){width:380px;height:380px;right:1%;top:330px;background:radial-gradient(circle closest-side,#774633,transparent)}.color-field i:last-child{width:310px;height:310px;right:25%;top:130px;background:radial-gradient(circle closest-side,#c8784f,transparent);opacity:.08}
	.story-heading{width:min(1380px,100%);margin:0 auto 42px;grid-template-columns:1.18fr .52fr;gap:clamp(40px,7vw,110px);align-items:end}.story-heading p{margin-bottom:22px;color:#45a77f;font-size:9px}.story-heading h1{max-width:930px;margin:0;font:400 clamp(68px,7.8vw,126px)/.84 var(--proto-display);letter-spacing:-.05em;text-wrap:balance}.story-heading h1 em{font-weight:400;color:#dad6cc}.story-intro{max-width:460px;padding-bottom:6px}.story-intro>span{font-size:clamp(14px,1.25vw,18px);line-height:1.7}.hero-actions{margin-top:29px;display:flex;align-items:center;gap:24px}.hero-actions a{font-size:12px;text-decoration:none}.hero-actions .primary{padding:14px 17px;color:#0a0d0b;background:var(--proto-paper);font-weight:600;box-shadow:0 8px 30px rgba(0,0,0,.18);transition:background .25s ease,transform .25s ease}.hero-actions .primary:hover{background:var(--proto-brass);transform:translateY(-2px)}.hero-actions .secondary{padding-bottom:5px;color:var(--proto-muted);border-bottom:1px solid var(--proto-line-strong);transition:color .25s ease,border-color .25s ease}.hero-actions .secondary:hover{color:var(--proto-paper);border-color:var(--proto-brass)}
	.story-caption{position:relative;z-index:3;width:min(1240px,92%);margin:0 auto 20px;display:grid;grid-template-columns:1fr 1.1fr auto;gap:28px;align-items:center;color:var(--proto-muted);font:500 7px var(--proto-mono);letter-spacing:.09em}.story-caption p{margin:0;font:400 11px/1.55 var(--proto-sans);letter-spacing:0}.story-caption>button{padding:0;border:0;color:#b9beb9;background:none;font:500 7px var(--proto-mono);letter-spacing:.09em;cursor:pointer}.story-caption>button i{display:inline-block;width:13px;height:13px;margin-right:7px;border:1px solid #4a524c;border-radius:50%;vertical-align:-3px;position:relative}.story-caption>button i::after{content:'';position:absolute;left:4px;top:3px;width:3px;height:5px;border-right:1px solid #b49a67;transform:rotate(-35deg)}
	.monitor{width:min(1380px,100%);height:auto;min-height:0;margin:0 auto;overflow:visible;border:0;background:transparent;box-shadow:none;perspective:1800px}.monitor::before{content:'';position:absolute;left:8%;right:8%;top:9%;height:63%;border-radius:50%;background:radial-gradient(ellipse,rgba(35,118,87,.16),rgba(83,58,121,.07) 42%,transparent 72%);pointer-events:none}.screen-frame{position:relative;z-index:4;width:100%;aspect-ratio:16/10;padding:11px;border:1px solid #343937;border-radius:22px 22px 9px 9px;background:linear-gradient(145deg,#4a4f4d 0%,#1d211f 12%,#090b0a 50%,#303532 92%,#565b58 100%);box-shadow:0 34px 120px rgba(0,0,0,.58),0 0 0 1px rgba(255,255,255,.05) inset,0 1px 0 rgba(255,255,255,.22) inset;transform:perspective(1900px) rotateX(-1.2deg) rotateY(-.55deg);transform-origin:center bottom}.screen-frame::after{content:'';position:absolute;inset:5px;border-radius:17px 17px 7px 7px;border:1px solid rgba(255,255,255,.035);pointer-events:none}.screen-content{position:relative;width:100%;height:100%;overflow:hidden;border:1px solid #070908;border-radius:13px 13px 5px 5px;background:#0a0d0b;box-shadow:0 0 0 1px rgba(255,255,255,.025) inset;container-type:size}.screen-reflection{position:absolute;z-index:60;inset:0;pointer-events:none;background:linear-gradient(118deg,rgba(255,255,255,.055),transparent 14%,transparent 70%,rgba(87,135,117,.025))}
	.browser{left:2.4%;right:2.4%;top:56px;bottom:101px;border-color:rgba(255,255,255,.16);background:#101411;box-shadow:0 22px 65px rgba(0,0,0,.46),0 0 0 1px rgba(255,255,255,.025) inset}.tab-strip{background:linear-gradient(180deg,#181d19,#111512)}.browser-tab{border-top:1px solid rgba(255,255,255,.035);background:#1a201b}.browser-tab.active{background:#2b332d;color:#edf0ea;box-shadow:0 -1px 0 rgba(180,154,103,.35) inset}.tool-tab{background:color-mix(in srgb,var(--brand-color) 9%,#191e1a);border-top-color:color-mix(in srgb,var(--brand-color) 35%,transparent)}.brand-icon{color:var(--brand-color,#dedfda)}.brand-icon img{filter:saturate(1.12)}.notion-tab .brand-icon{color:#f4f4f4}.address-row{background:linear-gradient(180deg,#2b322d,#242a26)}.address-row>div{border:1px solid rgba(255,255,255,.035);box-shadow:0 1px 0 rgba(255,255,255,.025)}
	.business-page{background:linear-gradient(125deg,#e8e1d5 0%,#d9d6cc 58%,#cec7bb 100%)}.business-page::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 83% 18%,rgba(7,84,63,.21),transparent 30%),linear-gradient(90deg,transparent 49.8%,rgba(7,84,63,.07) 50%,transparent 50.2%);pointer-events:none}.business-page nav{position:relative;z-index:2;background:rgba(232,225,213,.92)}.business-page nav button{background:#171914;box-shadow:0 8px 24px rgba(23,25,20,.2)}.site-visual{overflow:hidden;background:linear-gradient(145deg,rgba(7,84,63,.29),rgba(180,154,103,.16));box-shadow:0 22px 60px rgba(7,84,63,.12)}.error-page{background:radial-gradient(circle at 50% 36%,rgba(122,52,42,.24),transparent 31%),linear-gradient(180deg,#160e0c,#0b0d0c 65%)}.error-page strong{text-shadow:0 12px 55px rgba(171,76,54,.14)}.search-page{background:radial-gradient(circle at 50% 38%,#fff 0%,#f1eee8 52%,#d9d7d0 100%)}.consulting-page{background:radial-gradient(circle at 82% 24%,rgba(16,116,83,.72),transparent 40%),#080b09}.notion-pane{background:linear-gradient(160deg,#1e211f,#141715)}
		@media(max-width:900px){
		.story{padding:122px 16px 70px}.story-heading{grid-template-columns:1fr;gap:28px}.story-heading h1{max-width:760px;font-size:clamp(66px,11vw,92px)}.story-intro{max-width:590px;justify-self:start}.story-caption{width:96%;grid-template-columns:1fr auto}.story-caption p{display:none}.screen-frame{padding:8px;border-radius:16px 16px 7px 7px}
	}
	@media(max-width:620px){
		.story{padding:110px 12px 58px}.story-heading{margin-bottom:30px}.story-heading p{font-size:7px}.story-heading h1{font-size:clamp(51px,15vw,70px);line-height:.88}.story-intro>span{font-size:13px}.hero-actions{gap:17px}.hero-actions .primary{padding:12px 14px}.story-caption{width:100%;grid-template-columns:1fr auto;margin-bottom:12px}.story-caption button{font-size:6px}.monitor{width:108%;margin-left:-4%}.screen-frame{aspect-ratio:16/10;padding:5px;border-radius:11px 11px 5px 5px}.screen-content{border-radius:7px 7px 3px 3px}.screen-reflection{opacity:.45}.browser{left:1.5%;right:1.5%;top:31px;bottom:55px;border-radius:4px}.tab-strip{height:25px;padding:4px 4px 0}.browser-tab{height:21px;padding:0 4px;font-size:4px;border-radius:3px 3px 0 0}.business-tab{flex-basis:78px;min-width:55px}.site-favicon,.help-favicon{width:10px;height:10px;font-size:4px}.brand-icon{width:9px;height:9px}.tool-tab,.notion-tab,.help-tab{max-width:34px}.address-row{height:27px;padding:0 6px;gap:7px;font-size:7px}.address-row>div{height:17px;padding:0 6px;font-size:4px}.browser-workspace{inset:52px 0 0}.business-page nav{height:31px;padding:0 5%;font-size:5px}.business-page nav strong{font-size:5px}.business-page nav span,.business-page nav button{display:none}.business-copy{left:7%;top:12%;width:68%}.business-copy h3{margin:5px 0 6px;font-size:clamp(15px,5vw,22px)}.business-copy p{font-size:5px}.site-visual{right:5%;bottom:11%;width:31%;height:35%}.business-page footer{height:18px;font-size:4px}.error-page strong{font-size:55px}.error-page span{font-size:4px}.search-symbol{width:23px;height:23px}.search-input{width:82%;height:25px;font-size:7px}.consulting-page nav{height:32px}.consulting-page nav span{font-size:5px}.consulting-page>div:last-child{padding-top:9%}.consulting-page h3{margin:7px 0 9px;font-size:22px}.consulting-page button{padding:7px 8px;font-size:5px}.notion-pane{width:calc(var(--split) * 71%)}.notion-head{height:27px;font-size:4px}.notion-page{min-width:175px;padding:6% 7%}.notion-icon{width:18px;height:18px;margin-bottom:7px}.notion-page h3{font-size:12px}.task{min-height:21px}.task span{font-size:5px}.task>i{width:7px;height:7px}
	}
	/* The browser is the product demo. There is no device frame competing with it. */
	.story{overflow:clip}
	.story-player{position:sticky;z-index:3;top:80px;width:100%;margin:0 auto}
	.monitor{
		position:relative;
		width:min(1180px,92vw,calc((100svh - 160px) * 1.78));
		height:auto;
		min-height:0;
		margin:0 auto;
		overflow:visible;
		border:0;
		background:transparent;
		box-shadow:none;
		perspective:1600px;
	}
	.monitor::before{content:none}
	.browser-stage{position:relative;width:100%;transform:perspective(1600px) rotateX(.35deg);transform-origin:center bottom}
	.screen-frame{
		position:relative;
		z-index:4;
		width:100%;
		aspect-ratio:16/9;
		padding:0;
		overflow:hidden;
		border:1px solid rgba(240,239,233,.22);
		border-radius:2px;
		background:#0b0e0c;
		box-shadow:0 42px 130px rgba(0,0,0,.58),0 0 0 1px rgba(255,255,255,.035) inset,0 1px 0 rgba(255,255,255,.1) inset;
		transform:none;
	}
	.screen-frame::after{content:'';position:absolute;z-index:70;inset:0;border:1px solid rgba(255,255,255,.035);border-radius:inherit;pointer-events:none}
	.screen-content{position:relative;width:100%;height:100%;overflow:hidden;border:0;border-radius:inherit;background:#0a0d0b;box-shadow:none;container-type:size}
	.screen-reflection{opacity:.5;background:linear-gradient(118deg,rgba(255,255,255,.045),transparent 13%,transparent 72%,rgba(87,135,117,.02))}
	.screen-content>.browser{inset:0;border:0;border-radius:0;box-shadow:none}
	.story-caption{
		position:relative;
		z-index:4;
		width:min(780px,72%);
		margin:20px auto 0;
		display:grid;
		grid-template-columns:minmax(220px,1fr) auto;
		gap:10px 22px;
		align-items:center;
		color:var(--proto-muted);
	}
		.story-caption p{display:block;margin:0;text-align:center;color:var(--proto-paper);font:400 clamp(18px,1.65vw,24px)/1 var(--proto-display);letter-spacing:-.018em}
	.story-caption>button{display:inline-flex;align-items:center;justify-self:end;white-space:nowrap}
	.phase-bar{grid-column:1/-1;grid-row:2;display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
	.phase-tab{position:relative;overflow:hidden;padding:10px 4px 12px;border:1px solid var(--proto-line-strong);border-radius:2px;background:rgba(10,13,11,.6);color:var(--proto-muted);font:500 7.5px var(--proto-mono);letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:color .25s ease,border-color .25s ease,background .25s ease}
	.phase-tab:hover{color:var(--proto-paper)}
	.phase-tab.active{color:var(--proto-paper);border-color:rgba(180,154,103,.6);background:rgba(180,154,103,.07)}
	.phase-tab i{position:absolute;left:0;right:0;bottom:0;height:2px;overflow:hidden}
	.phase-tab i b{display:block;width:100%;height:100%;background:linear-gradient(90deg,#8a6d3f,#b49a67);transform-origin:left}
	.cursor{--cursor-scale:1.32;transform-origin:top left;filter:drop-shadow(0 2px 2px rgba(255,255,255,.35))}
	.business-copy{top:22%}
	.notion-page h3{margin-bottom:18px}
	@media(max-width:900px){
		.monitor{width:96vw}
		.story-caption{width:min(720px,88%)}
	}
	@media(max-width:620px){
		.story-player{width:108%;margin-left:-4%}
		.monitor{width:100%}
		.screen-frame{aspect-ratio:16/10;border-radius:2px}
		.story-caption{width:92%;margin-top:13px;grid-template-columns:1fr auto;gap:8px 10px}
		.story-caption p{font-size:15px}.story-caption>button{font-size:0}.story-caption>button i{margin-right:0}
		.phase-bar{gap:4px}
		.phase-tab{padding:8px 2px 10px;font-size:5px;letter-spacing:.04em}
		.cursor{--cursor-scale:.82}
	}
	@media(prefers-reduced-motion:reduce){.story *{animation:none!important;transition:none!important}}
</style>
