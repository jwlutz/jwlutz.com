import { browser } from '$app/environment';
import { track as vercelTrack } from '@vercel/analytics';

type Props = Record<string, string | number | boolean | null>;

// Best-effort wrapper: no-op on SSR, swallow errors so analytics can never crash the page.
export function track(name: string, props?: Props) {
	if (!browser) return;
	try {
		vercelTrack(name, props as Record<string, string | number | boolean | null>);
	} catch {
		// ignore
	}
}

// Strip query/hash to keep Vercel custom-event property cardinality bounded.
export function trackOutbound(href: string, source: string) {
	let clean = href;
	try {
		const u = new URL(href, typeof window !== 'undefined' ? window.location.href : 'http://x');
		clean = `${u.origin}${u.pathname}`;
	} catch {
		// fall through with the raw href
	}
	track('outbound_click', { href: clean, source });
}

// Per-page section time tracker. Returns a teardown function that also flushes
// a single `session_summary` event with `{ page, <section_id>_s: <seconds> }`.
//
// Trade-offs:
// - 50% intersection threshold so a quick scroll-past doesn't count
// - Timers pause while the tab is hidden, so backgrounded tabs don't inflate
// - One event per route visit; flushes on visibilitychange→hidden, pagehide, or teardown
// - Sections under 1s are dropped to keep noise out of the report
export function initSessionTiming(page: string) {
	if (!browser) return () => {};

	const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
	if (sections.length === 0) return () => {};

	const totals = new Map<string, number>();
	const visible = new Set<string>();
	const lastEntry = new Map<string, number>();
	let tabHidden = false;
	let flushed = false;

	const startTimer = (id: string) => {
		if (!lastEntry.has(id)) lastEntry.set(id, performance.now());
	};
	const stopTimer = (id: string) => {
		const start = lastEntry.get(id);
		if (start === undefined) return;
		totals.set(id, (totals.get(id) || 0) + (performance.now() - start) / 1000);
		lastEntry.delete(id);
	};
	const pauseAll = () => {
		for (const id of Array.from(lastEntry.keys())) stopTimer(id);
	};

	const observer = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				const id = e.target.id;
				if (e.isIntersecting) {
					visible.add(id);
					if (!tabHidden) startTimer(id);
				} else {
					visible.delete(id);
					stopTimer(id);
				}
			}
		},
		{ threshold: 0.5 }
	);

	for (const s of sections) observer.observe(s);

	const flush = () => {
		if (flushed) return;
		flushed = true;
		pauseAll();
		const props: Props = { page };
		let hasData = false;
		for (const [id, seconds] of totals) {
			if (seconds >= 1) {
				props[`${id}_s`] = Math.round(seconds);
				hasData = true;
			}
		}
		if (hasData) track('session_summary', props);
	};

	const onVisibility = () => {
		if (document.visibilityState === 'hidden') {
			pauseAll();
			tabHidden = true;
			flush();
		}
		// We don't resume after flush — one summary per visit is the contract.
	};

	document.addEventListener('visibilitychange', onVisibility);
	// pagehide fires reliably on Safari/iOS where visibilitychange can be flaky.
	window.addEventListener('pagehide', flush);

	return () => {
		observer.disconnect();
		document.removeEventListener('visibilitychange', onVisibility);
		window.removeEventListener('pagehide', flush);
		flush();
	};
}
