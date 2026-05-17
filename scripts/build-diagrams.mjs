#!/usr/bin/env node
/**
 * Pre-render Mermaid flowcharts to static SVG files at build time so we don't
 * have to ship the ~1MB Mermaid runtime to the consulting page just to draw
 * four diagrams that never change between deploys.
 *
 * Output: static/diagrams/{ecommerce,feedme}-{lr,tb}-{light,dark}.svg
 *
 * Run via: bun run scripts/build-diagrams.mjs
 * Re-run whenever you change a diagram source below.
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'static', 'diagrams');
mkdirSync(outDir, { recursive: true });

const themeVariablesLight = {
	primaryColor: '#10b981',
	primaryTextColor: '#1a1a1a',
	primaryBorderColor: '#10b981',
	lineColor: '#10b981',
	secondaryColor: '#f1f3f4',
	tertiaryColor: '#ffffff',
	background: '#ffffff',
	mainBkg: '#f8f9fa',
	nodeBorder: '#10b981',
	clusterBkg: 'rgba(16, 185, 129, 0.05)',
	clusterBorder: 'rgba(16, 185, 129, 0.2)',
	titleColor: '#1a1a1a',
	edgeLabelBackground: '#ffffff'
};

const themeVariablesDark = {
	primaryColor: '#10b981',
	primaryTextColor: '#fafafa',
	primaryBorderColor: '#10b981',
	lineColor: '#10b981',
	secondaryColor: '#1e1e1e',
	tertiaryColor: '#0c0c0c',
	background: '#0c0c0c',
	mainBkg: '#1a1a1a',
	nodeBorder: '#10b981',
	clusterBkg: 'rgba(16, 185, 129, 0.05)',
	clusterBorder: 'rgba(16, 185, 129, 0.2)',
	titleColor: '#fafafa',
	edgeLabelBackground: '#0c0c0c'
};

const ecommerce = {
	lr: `flowchart LR
    A[Employee Photos] -->|40k+ items| B[CV + OCR]
    A --> C[AWS S3]
    B --> D[Supabase]
    C --> E[Streamlit Review App]
    D --> E
    E -->|Edit| D
    C --> F[Lightspeed POS]
    D --> F
    F --> G[Website]`,
	tb: `flowchart TB
    A[Employee Photos] -->|40k+ items| B[CV + OCR]
    A --> C[AWS S3]
    B --> D[Supabase]
    C --> E[Streamlit App]
    D --> E
    E -->|Edit| D
    C --> F[Lightspeed POS]
    D --> F
    F --> G[Website]`
};

const feedme = {
	lr: `flowchart LR
    A[Menu APIs] --> B[Scraper]
    B --> C[Supabase]
    C --> D[Router]
    D --> E[OR-Tools]
    D --> F[LLM]
    E --> G[Filter]
    F --> G
    G --> H[API]
    H --> I[Metrics]
    H --> J[App]`,
	tb: `flowchart TB
    A[Menu APIs] --> B[Scraper]
    B --> C[Supabase]
    C --> D[Router]
    D --> E[OR-Tools]
    D --> F[LLM]
    E --> G[Filter]
    F --> G
    G --> H[API]
    H --> I[Metrics]
    H --> J[App]`
};

const jobs = [];
for (const [diagName, layouts] of Object.entries({ ecommerce, feedme })) {
	for (const [layout, source] of Object.entries(layouts)) {
		for (const [theme, vars] of Object.entries({ light: themeVariablesLight, dark: themeVariablesDark })) {
			jobs.push({ name: `${diagName}-${layout}-${theme}`, source, theme, vars });
		}
	}
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(`<!doctype html><html><body><div id="out"></div>
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  window.__mermaid = mermaid;
</script>
</body></html>`);
await page.waitForFunction(() => Boolean(window.__mermaid));

let count = 0;
for (const { name, source, theme, vars } of jobs) {
	const svg = await page.evaluate(
		async ({ source, theme, vars, id }) => {
			window.__mermaid.initialize({
				startOnLoad: false,
				theme: theme === 'dark' ? 'dark' : 'default',
				themeVariables: vars,
				flowchart: {
					curve: 'basis',
					padding: 15,
					nodeSpacing: 40,
					rankSpacing: 50,
					useMaxWidth: true,
					htmlLabels: true
				},
				fontSize: 16
			});
			const { svg } = await window.__mermaid.render(id, source);
			return svg;
		},
		{ source, theme, vars, id: `d-${count++}` }
	);
	const outPath = join(outDir, `${name}.svg`);
	writeFileSync(outPath, svg);
	console.log(`wrote ${outPath} (${svg.length} bytes)`);
}

await browser.close();
console.log(`\nDone. Generated ${jobs.length} diagrams.`);
