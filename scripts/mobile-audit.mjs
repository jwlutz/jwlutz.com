// Mobile layout audit. Run with: bun run scripts/mobile-audit.mjs
// Requires the dev server running on http://localhost:5173.
import { chromium, devices } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = process.env.AUDIT_URL || 'http://localhost:5173';
const OUT = 'scripts/.mobile-audit';
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
	{ name: 'iphone-se', ...devices['iPhone SE'] },
	{ name: 'iphone-14', ...devices['iPhone 14'] },
	{ name: 'pixel-7', ...devices['Pixel 7'] },
	{ name: 'ipad-mini', ...devices['iPad Mini'] },
	{ name: 'desktop-1280', viewport: { width: 1280, height: 800 }, userAgent: undefined },
	{ name: 'desktop-1920', viewport: { width: 1920, height: 1080 }, userAgent: undefined }
];

const PAGES = [
	{ name: 'home', path: '/' },
	{ name: 'consulting', path: '/consulting' }
];

function findOverflows() {
	const issues = [];
	const docWidth = document.documentElement.clientWidth;

	if (document.documentElement.scrollWidth > docWidth + 1) {
		issues.push({
			kind: 'page-scroll',
			message: `Page scrolls horizontally: scrollWidth=${document.documentElement.scrollWidth} viewport=${docWidth}`
		});
	}

	const allowed = [
		'.carousel-track',
		'.mermaid-wrapper',
		'.animated-gradient',
		'.marquee-bg',
		'.marquee-row',
		'pre',
		'code',
		'svg'
	];
	const all = document.querySelectorAll('body *');
	for (const el of all) {
		if (allowed.some((sel) => el.matches(sel) || el.closest(sel))) continue;

		// Skip invisible / hidden-by-parent elements (rect collapses to zero)
		const rect = el.getBoundingClientRect();
		if (rect.width === 0 && rect.height === 0) continue;

		const style = getComputedStyle(el);
		if (style.overflowX === 'auto' || style.overflowX === 'scroll') continue;
		if (style.display === 'none' || style.visibility === 'hidden') continue;

		const slack = 2;
		if (el.scrollWidth > el.clientWidth + slack && el.clientWidth > 0) {
			if (rect.top < window.innerHeight * 3) {
				issues.push({
					kind: 'overflow',
					tag: el.tagName.toLowerCase(),
					id: el.id || null,
					classes:
						(el.className && typeof el.className === 'string'
							? el.className
							: ''
						).slice(0, 80) || null,
					text: (el.innerText || '').replace(/\s+/g, ' ').slice(0, 80),
					scrollWidth: el.scrollWidth,
					clientWidth: el.clientWidth
				});
			}
		}

		if (rect.right > docWidth + slack && rect.width < docWidth) {
			if (Math.abs(rect.left) > docWidth) continue;
			issues.push({
				kind: 'past-viewport',
				tag: el.tagName.toLowerCase(),
				id: el.id || null,
				classes:
					(el.className && typeof el.className === 'string'
						? el.className
						: ''
					).slice(0, 80) || null,
				right: Math.round(rect.right),
				viewport: docWidth
			});
		}
	}

	return issues;
}

const summary = [];

const browser = await chromium.launch();
try {
	for (const viewport of VIEWPORTS) {
		for (const page of PAGES) {
			const context = await browser.newContext({
				...viewport,
				colorScheme: 'light'
			});
			const tab = await context.newPage();
			const consoleErrors = [];
			tab.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));
			tab.on('console', (msg) => {
				if (msg.type() === 'error') consoleErrors.push(`console: ${msg.text()}`);
			});

			const url = `${BASE}${page.path}`;
			await tab.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
			// Let any in-view animations settle
			await tab.waitForTimeout(800);

			const issues = (await tab.evaluate(findOverflows)) || [];
			const screenshot = `${OUT}/${viewport.name}-${page.name}.png`;
			await tab.screenshot({ path: screenshot, fullPage: true });

			summary.push({
				viewport: viewport.name,
				page: page.name,
				url,
				issueCount: issues.length,
				issues,
				consoleErrors,
				screenshot
			});

			await context.close();
		}
	}
} finally {
	await browser.close();
}

writeFileSync(`${OUT}/report.json`, JSON.stringify(summary, null, 2));

// Print human summary
let totalIssues = 0;
for (const r of summary) {
	const tag = r.issueCount === 0 ? 'OK' : `${r.issueCount} issue${r.issueCount === 1 ? '' : 's'}`;
	console.log(`[${tag}] ${r.viewport.padEnd(10)} ${r.page.padEnd(11)} ${r.url}`);
	for (const i of r.issues) {
		totalIssues++;
		if (i.kind === 'page-scroll') {
			console.log(`        page-scroll: ${i.message}`);
		} else if (i.kind === 'overflow') {
			console.log(
				`        overflow: <${i.tag}> "${i.text}" (sw=${i.scrollWidth} cw=${i.clientWidth}) [${i.classes}]`
			);
		} else if (i.kind === 'past-viewport') {
			console.log(
				`        past-viewport: <${i.tag}> right=${i.right} > viewport=${i.viewport} [${i.classes}]`
			);
		}
	}
	for (const e of r.consoleErrors.slice(0, 3)) {
		console.log(`        ${e}`);
	}
}

console.log(`\nTotal issues: ${totalIssues}`);
console.log(`Screenshots + JSON report: ${OUT}/`);
process.exit(totalIssues > 0 ? 1 : 0);
