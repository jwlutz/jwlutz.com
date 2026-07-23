/**
 * EDIT THE CONSULTING SITE HERE — every word a visitor can read lives in
 * this file. Layout, motion, and timing live in the components; changing
 * wording never requires touching them. Edit the strings, keep the keys.
 *
 * Map (top to bottom of the page):
 *   consultingSite ......... headlines, services, work cards, case studies
 *   siteMeta ............... browser-tab titles + search descriptions
 *   navCopy ................ top bar links + mobile menu
 *   heroScene .............. text INSIDE the hero browser animation
 *   splitScene ............. text INSIDE the drag demo (service 01)
 *   aiDemoCopy ............. text INSIDE the lead-engine demo (service 02)
 *   analyticsDemoCopy ...... text INSIDE the analytics demo (service 03)
 *   montageCopy ............ labels on the Projects collage
 *   contactFormCopy ........ the Project Starter form
 *   footerCopy ............. the site footer
 *   workPageCopy ........... /consulting/work extras
 */

export type PrototypeEvidence = {
	value: string;
	label: string;
};

export type PrototypeCase = {
	slug: 'candella' | 'mindlsn' | 'sparkling';
	index: string;
	name: string;
	category: string;
	title: { lead: string; emphasis: string };
	summary: string;
	liveUrl: string;
	capture: string;
	captureAlt: string;
	productImages?: { src: string; alt: string }[];
	evidence: PrototypeEvidence[];
	sections: { label: string; body: string }[];
	responsibilities: string[];
};

export const consultingSite = {
	brand: 'Lutz Consulting Group',
	contactEmail: 'jwlutz65@gmail.com',
	emailSubject: 'Project inquiry for Lutz Consulting Group',
	hero: {
		eyebrow: 'WEB PRESENCE / AI INTEGRATIONS / ANALYTICS',
		title: { lead: 'Don’t let your website become your', emphasis: 'second job.' },
		body: 'We design, build, and operate websites, AI workflows, and analytics for businesses that want modern systems without another system to manage.',
		primaryCta: 'Start a project',
		secondaryCta: 'See our work'
	},
	// Approved 2026-07-18 (decisions doc §23) — do not remove; renders in PrototypeSplitView.svelte
	splitView: {
		eyebrow: 'ONE WEBSITE / TWO SIDES',
		title: { lead: 'We watch the side you', emphasis: 'never have to.' },
		body: 'This is our screen: editors, logs, deploys, and dependencies. Drag the line to reveal the only thing you and your customers ever see.',
		oursLabel: 'WHAT WE SEE',
		yoursLabel: 'WHAT YOU AND YOUR CLIENTS SEE',
		dragHint: 'Drag',
		note: 'The next change is a text away. Not a ticket, not a quote, not a project.',
		logLines: [
			'deploy complete · 41 files · no errors',
			'checkout webhook retried twice · recovered',
			'nightly backup verified',
			'renewal caught · certificate rotated early',
			'mobile regression fixed before anyone saw it',
			'dependencies reviewed · two held back on purpose'
		]
	},
	services: {
		eyebrow: 'WHAT WE BUILD AND RUN',
		title: 'Our Services',
		body: 'The tools change. The job does not: understand the business, make the right thing, and remain accountable after it ships.',
		toolNote: 'We use some of these tools too. What you are buying is judgement and ownership, not a preference for one platform.',
		items: [
			{
				index: '01',
				title: 'Web Presence',
				headline: { lead: 'Experienced', emphasis: 'Judgement.' },
				body: 'We take full advantage of modern tools, and ensure every line of code gets human eyes and human judgement.',
				detail: 'DESIGN · DEVELOPMENT · COMMERCE · PRODUCTS',
				features: [
					{ title: 'Build For Your Needs', body: 'We scope projects to exactly what your business or project needs to scale at the pace you want.' },
					{ title: 'Rigorous Review Cycles', body: 'We review all of our code and integrations before release, so that everything you put in our hands just works.' },
					{ title: 'Full Ownership', body: 'You never have to worry about account management. Domains, integrations, maintenance, and whatever else your business needs stay part of one system.' }
				],
				alternativeLabel: 'Alternatives',
				alternatives: ['Lovable', 'Base44', 'Replit']
			},
			{
				index: '02',
				title: 'AI Integrations & Automations',
				headline: { lead: 'Beyond the', emphasis: 'Hype.' },
				body: 'We integrate AI into customer systems to automate boring tasks like lookups, outreach, and document generation, always keeping a human in the loop.',
				detail: 'INTEGRATIONS · AUTOMATION · INTERNAL TOOLS · AGENTS',
				features: [
					{ title: 'Bring Your Context To Your Agents', body: 'We put in the time upfront to ensure we have the data to automate tasks in your business’s style, instead of churning out AI slop.' },
					{ title: 'Put Human Judgement At The Right Steps', body: 'Some agent judgement is inherently involved in every step, but when human judgement is required, we make it quick and easy for you to give your input.' },
					{ title: 'Always Close The Loop', body: 'We take the AI in your customer systems all the way to production, not a demo that stalls in a thousand-item review queue.' }
				],
				alternativeLabel: 'Alternatives',
				alternatives: ['Zapier', 'n8n', 'Gumloop']
			},
			{
				index: '03',
				title: 'Analytics & ML',
				headline: { lead: 'Find the', emphasis: 'Leak.' },
				body: 'We find where you are losing money and time, model why it is happening, and build the solutions that fix it.',
				detail: 'STATISTICS · MACHINE LEARNING · FORECASTING · PIPELINES',
				features: [
					{ title: 'Find Where It Leaks', body: 'We find where you are bleeding money and time, then patch the holes.' },
					{ title: 'Real Statistical Modelling', body: 'A genuine background in statistics and mathematical modelling, put to work on the problems that need more than a chart.' },
					{ title: 'The Whole Pipeline', body: 'Data collection and validation, models built on your data or data that already exists, then validated and deployed so they keep running.' }
				],
				alternativeLabel: 'Alternatives',
				alternatives: ['Databricks', 'BigML', 'Julius AI']
			}
		]
	},
	workPreview: {
		eyebrow: 'CASE STUDIES',
		title: 'See What LCG Can Do For You',
		body: 'Live deployed systems across commerce, cognitive training, and financial infrastructure. Open our case studies to see what each one required beyond the home screen.',
		cta: 'Explore the case studies',
		projects: [
			{
				name: 'Candella Copytrade',
				category: 'FINANCIAL INFRASTRUCTURE',
				description: 'Real-money trade routing across connected brokerage accounts with visible risk and execution.',
				url: 'https://candella.dev/copytrade',
				host: 'candella.dev/copytrade',
				image: '/consulting/prototypes/work/copytrade-landing.webp',
				imageAlt: 'Candella Labs landing page introducing Candella Copytrade'
			},
			{
				name: 'Candella Quant',
				category: 'MARKET RESEARCH WORKSPACE',
				description: 'Live charts, strategy research, backtests, and AI-assisted analysis in one modular workspace.',
				url: 'https://candella.dev/quant',
				host: 'candella.dev/quant',
				image: '/consulting/prototypes/work/quant-landing.webp',
				imageAlt: 'Candella Quant landing page showing its research workspace'
			},
			{
				name: 'The Sparkling Shoe',
				category: 'SHOPIFY COMMERCE',
				description: 'A mobile-ready storefront and commerce migration for a dance accessories company.',
				url: 'https://thesparklingshoe.com',
				host: 'thesparklingshoe.com',
				image: '/consulting/prototypes/work/tss-landing.webp',
				imageAlt: 'The Sparkling Shoe ecommerce landing page'
			},
			{
				name: 'MindLSN',
				category: 'ADAPTIVE COGNITIVE PRODUCT',
				description: 'Seven adaptive drills, integrity checks, and one comparable measure of progress.',
				url: 'https://mindlsn.com',
				host: 'mindlsn.com',
				image: '/consulting/prototypes/work/mindlsn-landing.webp',
				imageAlt: 'MindLSN cognitive training product homepage'
			}
		]
	},
	workPage: {
		eyebrow: 'SELECTED CASE STUDIES',
		title: { lead: 'Different businesses.', emphasis: 'One standard of care.' },
		body: 'The useful details are never generic. Explore three systems through the problem, the hard part, the work itself, and what continued after launch.',
		cta: 'Explore the cases',
		sectionEyebrow: 'PROJECTS',
		sectionTitle: 'Open the system.',
		sectionBody: 'Each case has its own visual language and its own evidence. The thread between them is accountable work beyond the screen.'
	},
	lab: {
		eyebrow: 'IN THE LAB / CLOSED BETA',
		title: 'Candella Quant',
		body: 'A modular workspace for live charts, strategy editing, backtests, and AI-assisted research, now in active closed-beta development.',
		cta: 'View the beta page',
		url: 'https://candella.dev/quant'
	},
	finalCta: {
		eyebrow: 'START WHERE YOU ARE',
		title: { lead: 'Bring us the messy version.', emphasis: 'We’ll find the first move.' },
		body: 'A current site, a manual process, a spreadsheet, or a half-formed idea is enough. Choose the closest starting point and send it over.',
		cta: 'Start an email',
		emailLabel: 'Email us directly',
		options: ['Website or product', 'AI workflow', 'Analytics or ML', 'Not sure yet']
	}
} as const;

export const prototypeCases: PrototypeCase[] = [
	{
		slug: 'candella',
		index: '01',
		name: 'Candella Copytrade',
		category: 'FINANCIAL INFRASTRUCTURE',
		title: { lead: 'One trade.', emphasis: 'Sixteen brokerages.' },
		summary: 'A real-money trading system that mirrors a lead trader across connected brokerage accounts while keeping risk and every execution visible.',
		liveUrl: 'https://candella.dev/copytrade',
		capture: '/consulting/prototypes/work/copytrade-landing.webp',
		captureAlt: 'Candella Labs landing page with Candella Copytrade presented as a live product',
		evidence: [
			{ value: '16 brokerages', label: 'ONE CONNECTED EXECUTION NETWORK' },
			{ value: '90% under ½ sec', label: 'MEASURED LEAD-TO-FOLLOWER ROUTING' }
		],
		sections: [
			{ label: 'The need', body: 'Let a follower mirror a live human trader into their own brokerage account without hiding the risk, latency, or execution quality involved.' },
			{ label: 'The difficult part', body: 'Every broker behaves differently. Orders have to survive networks, acknowledgements, slippage, position sizing, failed connections, and each user’s risk limits.' },
			{ label: 'What we built', body: 'The public product, broker engine, risk controls, payments, account connections, and reporting operate as one system. The measured routing sequence is also the product story.' },
			{ label: 'What continues', body: 'Execution is monitored and the platform is extended as broker behavior, credentials, compliance needs, and product requirements change.' }
		],
		responsibilities: ['Product and interface design', 'Broker execution architecture', 'Payments and account systems', 'Monitoring and analytics']
	},
	{
		slug: 'mindlsn',
		index: '02',
		name: 'MindLSN',
		category: 'ADAPTIVE PRODUCT',
		title: { lead: 'A score that', emphasis: 'learns with you.' },
		summary: 'An adaptive cognitive-training product where drills, ratings, integrity checks, and the surrounding experience work as one coherent system.',
		liveUrl: 'https://mindlsn.com',
		capture: '/consulting/prototypes/work/mindlsn-landing.webp',
		captureAlt: 'MindLSN landing page showing its cognitive drills and Mind Index product',
		evidence: [
			{ value: '7 adaptive drills', label: 'DIFFICULTY CHANGES WITH PERFORMANCE' },
			{ value: '5 domains', label: 'ONE COMPARABLE MIND INDEX' }
		],
		sections: [
			{ label: 'The need', body: 'Turn short cognitive drills into a long-running, understandable measure of improvement without making the product feel clinical or over-gamified.' },
			{ label: 'The difficult part', body: 'A score is useful only when difficulty adapts, performance remains comparable, and obvious shortcuts do not distort the result.' },
			{ label: 'What we built', body: 'Each game has its own ELO behavior. Those ratings roll into a weighted Mind Index, supported by integrity checks and a calm editorial interface.' },
			{ label: 'What continues', body: 'The product is developed collaboratively as new drills, rating behavior, and research questions are introduced.' }
		],
		responsibilities: ['Website and product design', 'Adaptive ELO architecture', 'Anti-cheat systems', 'Collaborative product development']
	},
	{
		slug: 'sparkling',
		index: '03',
		name: 'The Sparkling Shoe',
		category: 'ECOMMERCE',
		title: { lead: 'From site builder', emphasis: 'to commerce system.' },
		summary: 'A complete commerce rebuild for a dance accessories company, connecting product presentation, Shopify, mobile shopping, analytics, and ongoing growth.',
		liveUrl: 'https://thesparklingshoe.com',
		capture: '/consulting/prototypes/work/tss-landing.webp',
		captureAlt: 'The Sparkling Shoe ecommerce landing page with its current summer collection',
		productImages: [
			{ src: '/consulting/prototypes/sparkling-fresh.jpg', alt: 'Toe-tally Fresh pointe shoe inserts' },
			{ src: '/consulting/prototypes/sparkling-puff.jpg', alt: 'The Perfect Puff rosin product' },
			{ src: '/consulting/prototypes/sparkling-pouch.webp', alt: 'Purple Poppy dance shoe pouch' }
		],
		evidence: [
			{ value: 'Squarespace → Shopify', label: 'COMPLETE COMMERCE MIGRATION' },
			{ value: 'Built for mobile', label: 'PRODUCT DISCOVERY THROUGH CHECKOUT' }
		],
		sections: [
			{ label: 'The need', body: 'Give handmade pointe accessories enough visual space to explain what they do, while making the storefront easier for dancers to browse and buy from.' },
			{ label: 'The difficult part', body: 'Product discovery, mobile shopping, catalog management, checkout, analytics, and future wholesale needs had to be considered together.' },
			{ label: 'What we built', body: 'The new Shopify experience pairs product photography with direct education and gives the business a commerce platform it can continue operating.' },
			{ label: 'What continues', body: 'The relationship extends beyond launch into analytics, product presentation, and social growth support.' }
		],
		responsibilities: ['Squarespace to Shopify migration', 'Website and product design', 'Mobile commerce', 'Analytics and social growth']
	}
];

/* ════════════════════════════════════════════════════════════════════
   BROWSER TAB TITLES + SEARCH DESCRIPTIONS
   ════════════════════════════════════════════════════════════════════ */

export const siteMeta = {
	// Share images live in static/consulting/; regenerate from the design
	// system if the headline changes (see tickets/og-image-asset.md).
	favicon: '/consulting/favicon.svg',
	landing: {
		title: 'Lutz Consulting Group: Websites, AI Integrations, and Analytics',
		description:
			'Lutz Consulting Group designs, builds, and operates websites, AI integrations, analytics, and the systems behind them.',
		ogDescription:
			'We design, build, and operate the digital systems behind your business, so you can keep running the business.',
		url: 'https://jwlutz.com/consulting',
		ogImage: 'https://jwlutz.com/consulting/og-consulting.png',
		ogImageAlt: 'Lutz Consulting Group: Don’t let your website become your second job.'
	},
	work: {
		title: 'Projects | Lutz Consulting Group',
		description:
			'Case studies of websites, products, AI workflows, and analytics systems designed and operated by Lutz Consulting Group.',
		ogDescription: 'Three different businesses. One standard of care.',
		url: 'https://jwlutz.com/consulting/work',
		ogImage: 'https://jwlutz.com/consulting/og-work.png',
		ogImageAlt: 'Lutz Consulting Group projects: different businesses, one standard of care.'
	}
};

/* ════════════════════════════════════════════════════════════════════
   NAV — top bar + mobile menu
   ════════════════════════════════════════════════════════════════════ */

export const navCopy = {
	landingLinks: [
		{ label: 'Services', href: '#services' },
		{ label: 'Projects', href: '/consulting/work' },
		{ label: 'Contact', href: '#contact' }
	],
	workLinks: [
		{ label: 'Consulting', href: '/consulting' },
		{ label: 'Case studies', href: '#cases' },
		{ label: 'Contact', href: '#contact' }
	],
	mobileCtaHint: 'tell us what you need'
};

/* ════════════════════════════════════════════════════════════════════
   HERO SCENE — text inside the animated browser story.
   Caption keys map to moments in the timeline; edit words, not keys.
   ════════════════════════════════════════════════════════════════════ */

export const heroScene = {
	// The five phase-bar tabs, in story order.
	chapters: ['Start a Site', 'Complexity Grows', 'Things Break', 'We Take Over', 'It Just Works'],
	captions: {
		start: 'One website.',
		pileUp: 'Then the tools start piling up.',
		secondJob: 'Now it is your second job.',
		breaks: 'Until something breaks.',
		handoff: 'Give the whole system one owner.',
		resolved: 'Back to a website that just works.'
	},
	replayLabel: 'Replay',
	browser: {
		businessDomain: 'yourbusiness.com',
		searchPlaceholder: 'Search or enter address',
		typedUrl: 'jwlutz.com/consulting', // what gets typed into the address bar
		newTabLabel: 'New tab',
		consultingTabLabel: 'Lutz Consulting Group'
	},
	// The imaginary client site shown inside the animation.
	businessSite: {
		brand: 'YOUR BUSINESS',
		links: ['Work', 'About'],
		cta: 'Get in touch',
		before: { headline: ['Your business,', 'online.'], body: 'Clear, useful, and ready for customers.' },
		after: {
			headline: ['Your website', 'that just works.'],
			body: 'Maintained, connected, and ready for what comes next.'
		},
		footer: { left: '© YOUR BUSINESS', right: 'Made by LCG' }
	},
	errorPage: { code: '404', message: 'YOURBUSINESS.COM IS NOT RESPONDING' },
	notion: {
		pageTitle: 'Website to-do',
		tasks: [
			'Fix mobile checkout',
			'Repair contact form',
			'Update customer login',
			'Check missing payments',
			'Restore analytics',
			'Investigate production error',
			'Finish the AI-generated change',
			'Figure out why deployment failed'
		]
	},
	// The mini LCG page at the end reuses consultingSite.hero for its
	// headline and button so it always matches the real hero above it.
	consultingCard: { navNote: 'WORK · SERVICES · APPROACH' }
};

/* ════════════════════════════════════════════════════════════════════
   SPLIT-VIEW SCENE — text inside the drag demo (service 01).
   The section heading/labels live in consultingSite.splitView above.
   ════════════════════════════════════════════════════════════════════ */

export const splitScene = {
	client: {
		brand: 'YOUR BUSINESS',
		links: ['Shop', 'About', 'Contact'],
		cta: 'Get in touch',
		badge: 'OPEN FOR BUSINESS',
		headline: ['Your website', 'that just works.'],
		body: 'Fast, maintained, and ready for what comes next.',
		link: 'Explore the collection',
		imageryCard: { tag: 'THIS SEASON', title: 'New arrivals' },
		strip: ['Bestsellers', 'Our story', 'Visit the shop'],
		toast: { title: 'New order', detail: 'Confirmation sent' },
		footer: { left: '© YOUR BUSINESS', right: 'Made by LCG' }
	},
	dev: {
		tiles: [
			{ label: 'DEPLOY', value: 'clean · 41s' },
			{ label: 'BACKUP', value: 'verified' },
			{ label: 'OVERNIGHT', value: 'no errors' }
		],
		statusline: { words: ['watching', 'deploys', 'backups', 'on call'], signature: 'lutz consulting group' }
	}
};

/* ════════════════════════════════════════════════════════════════════
   LEAD-ENGINE DEMO — text inside the automation demo (service 02).
   `sources` order matters: it matches the six chips top to bottom.
   Each node: LABEL (small caps), title, subtitle, and the status line
   that lights up when the run reaches it.
   ════════════════════════════════════════════════════════════════════ */

export const aiDemoCopy = {
	header: 'AUTOMATION / LEAD ENGINE',
	states: { building: 'building', running: 'running', done: 'run complete · ranking updated' },
	sources: [
		{ name: 'TikTok', watch: 'comments · sounds' },
		{ name: 'Instagram', watch: 'followers · DMs' },
		{ name: 'X', watch: 'replies · mentions' },
		{ name: 'LinkedIn', watch: 'connections · posts' },
		{ name: 'Reddit', watch: 'threads · subreddits' },
		{ name: 'Company pages', watch: 'sites · careers' }
	],
	nodes: {
		research: {
			label: 'RESEARCH',
			title: 'Perplexity',
			sub: 'who are they, what do they need',
			status: 'profile + recent posts pulled'
		},
		rank: {
			label: 'RANK',
			title: 'Score on your criteria',
			sub: 'fit · intent · timing',
			status: 'fit strong · timing now'
		},
		store: { label: 'STORE', title: 'Supabase', sub: 'every lead, deduped', status: 'saved · history attached' },
		write: {
			label: 'WRITE',
			title: 'Personal outreach',
			sub: 'their work, your voice',
			status: '“Loved your sizing write-up…”'
		},
		send: { label: 'SEND', title: 'Gmail', sub: 'from your address', status: 'delivered · thread logged' },
		followUp: {
			label: 'FOLLOW UP',
			title: 'Personal follow-up',
			sub: 'no reply in 3 days',
			status: 'rewritten, not resent'
		},
		human: {
			label: 'HUMAN CHECKPOINT',
			title: 'Replies in Notion',
			sub: 'you read every one',
			status: '2 waiting for you'
		}
	},
	rails: { noReply: 'NO REPLY ↺', tune: 'REPLIES TUNE THE RANKING ↺' },
	runlog: ['lead qualified → stored', 'outreach sent → logged', 'reply read → ranking updated'],
	footer: { tagline: 'Your tools, wired together, run on your rules.', badge: 'every run logged' }
};

/* ════════════════════════════════════════════════════════════════════
   ANALYTICS DEMO — text inside the dashboard + notebook (service 03).
   ════════════════════════════════════════════════════════════════════ */

export const analyticsDemoCopy = {
	header: 'ANALYTICS + ML / WORKSPACE',
	live: 'live',
	visitors: {
		label: 'VISITORS · LAST 30 DAYS',
		now: '14 on site now',
		legendNow: 'THIS PERIOD',
		legendPrev: 'LAST PERIOD',
		axisStart: '30 DAYS AGO',
		axisEnd: 'TODAY'
	},
	sources: { label: 'WHERE THEY COME FROM', rows: ['Search', 'Direct', 'Social', 'Referral'] },
	notebook: {
		filename: 'demand_plan.ipynb',
		kernel: { ready: 'Python 3', running: 'Python 3 · running', idle: 'Python 3 · idle' },
		load: { code: 'orders = read_orders(months=24)', out: '24 months · 8 SKUs · weekly buckets' },
		fit: {
			code: 'fit = sarima(orders).fit()',
			running: 'searching seasonal orders',
			out: 'seasonal terms kept · AIC converged'
		},
		forecast: {
			code: 'fc = fit.forecast(steps=12, ci=0.9)',
			axes: ['WEEKS →', '90% BAND', 'UNITS ↑']
		},
		optimize: {
			code: 'plan = argmin(cost)',
			constraint: 's.t. service ≥ 0.98',
			out: 'reorder points set · holding + stockout cost minimized'
		},
		artifacts: { label: 'ARTIFACTS', files: 'forecast.png · reorder_plan.csv', note: '→ shared to your dashboard' }
	},
	footer: { tagline: 'Watched by us, readable by you.', note: 'dashboards live · models when they earn it' }
};

/* ════════════════════════════════════════════════════════════════════
   WORK MONTAGE — labels on the Projects collage.
   Card copy (names, descriptions, links) lives in
   consultingSite.workPreview.projects above.
   ════════════════════════════════════════════════════════════════════ */

export const montageCopy = {
	copytrade: 'CANDELLA COPYTRADE / LIVE',
	quant: 'CANDELLA QUANT / WORKSPACE',
	tss: 'THE SPARKLING SHOE / COMMERCE',
	shoe: 'TOE-TALLY FRESH / PRODUCT',
	mind: {
		tag: 'MINDLSN / ADAPTIVE PRODUCT',
		title: 'MindLSN',
		sub: 'Adaptive drills · ELO ratings · integrity checks'
	}
};

/* ════════════════════════════════════════════════════════════════════
   CONTACT FORM — the Project Starter. The section heading and the
   choice buttons live in consultingSite.finalCta above.
   ════════════════════════════════════════════════════════════════════ */

export const contactFormCopy = {
	header: { title: 'PROJECT STARTER', hint: 'Choose the closest answer' },
	question: 'WHAT ARE WE STARTING WITH?',
	summaryLabel: 'SELECTED STARTING POINT',
	summaryNote: 'A link, screen recording, spreadsheet, or rough explanation is enough.',
	fields: { name: 'YOUR NAME', email: 'EMAIL', message: 'WHAT’S YOUR VISION?' },
	submit: { idle: 'Send project brief', busy: 'Sending…', note: 'Direct to Lutz Consulting Group' },
	fallbackPrompt: 'Prefer email?',
	sendFailed: 'The message did not send. Use the direct email link below instead.',
	// The prefilled email a visitor gets from "Email us directly".
	mailIntro: 'I’d like help with:',
	mailPrompts: ['Here’s what exists today:', 'The part I’d most like to stop carrying:', 'Links or context:']
};

/* ════════════════════════════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════════════════════════════ */

export const footerCopy = {
	brandTagline: 'Websites, AI integrations, and analytics.',
	line: { lead: 'The next change is a text away.', emphasis: 'Not a ticket, not a quote, not a project.' },
	exploreLabel: 'Explore',
	explore: [
		{ label: 'Services', href: '/consulting#services' },
		{ label: 'Projects', href: '/consulting#work' },
		{ label: 'Case studies', href: '/consulting/work' },
		{ label: 'Personal portfolio', href: '/' }
	],
	contactLabel: 'Start something',
	contactNote: 'A current site, a manual process, or a half-formed idea is enough.',
	copyrightName: 'Lutz Consulting Group',
	madeBy: 'Made and maintained by LCG',
	backToTop: 'Back to top'
};

/* ════════════════════════════════════════════════════════════════════
   WORK PAGE EXTRAS — /consulting/work strings not already covered by
   consultingSite.workPage / lab / finalCta above.
   ════════════════════════════════════════════════════════════════════ */

export const workPageCopy = {
	skipLink: 'Skip to case studies',
	caseActions: { read: 'Read the case study', visit: 'Visit the live site' },
	ownedLabel: 'What we owned',
	stories: {
		eyebrow: 'THE FULL STORIES',
		title: ['What happened', 'behind the screen.'],
		body: 'Scroll through the need, the difficult part, what we built, and what continued after launch.'
	},
	labBadge: 'ACTIVE PRODUCT DEVELOPMENT',
	cta: {
		title: ['Have a system', 'worth untangling?'],
		body: 'A polished brief is optional. The current link, problem, or process is enough to start.',
		button: 'Start a project',
		buttonNote: 'Project starter'
	}
};
