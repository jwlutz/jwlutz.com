/**
 * EDIT THE CONSULTING SITE HERE
 *
 * This file is the source of truth for the prototype's public copy, links,
 * services, case-study evidence, and narrative. Layout and motion live in the
 * components; routine wording changes should not require touching them.
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
	evidence: PrototypeEvidence[];
	sections: { label: string; body: string }[];
	responsibilities: string[];
};

export const consultingSite = {
	brand: 'Lutz Consulting Group',
	contactEmail: 'jwlutz65@gmail.com',
	emailSubject: 'Project inquiry for Lutz Consulting Group',
	hero: {
		eyebrow: 'WEBSITES / AI INTEGRATIONS / ANALYTICS',
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
		oursLabel: 'WHAT WE WATCH',
		yoursLabel: 'WHAT YOU SEE',
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
		title: 'Judgment first. Then leverage.',
		body: 'The tools change. The job does not: understand the business, make the right thing, and remain accountable after it ships.',
		toolNote: 'We use some of these tools too. What you are buying is judgment and ownership, not a preference for one platform.',
		items: [
			{
				index: '01',
				title: 'Websites and products',
				headline: { lead: 'Fast tools.', emphasis: 'Human judgment.' },
				body: 'We use modern tools to move quickly. A person still reads every line, tests every path, and owns the release.',
				detail: 'DESIGN · DEVELOPMENT · COMMERCE · PRODUCTS',
				features: [
					{ title: 'Built around the business', body: 'Start with what customers need to understand and what the business needs the site to do.' },
					{ title: 'Reviewed before release', body: 'Code, forms, payments, accessibility, and responsive behavior are tested by someone accountable for the result.' },
					{ title: 'Owned after launch', body: 'Domains, integrations, maintenance, and the next release remain part of one connected system.' }
				],
				alternativeLabel: 'Alternatives',
				alternatives: ['Lovable', 'Base44', 'Replit']
			},
			{
				index: '02',
				title: 'AI integrations',
				headline: { lead: 'Automate the handoff.', emphasis: 'Keep the judgment.' },
				body: 'We connect AI to the work you already do, keeping context attached and putting a person at the decisions that matter.',
				detail: 'INTEGRATIONS · AUTOMATION · INTERNAL TOOLS · AGENTS',
				features: [
					{ title: 'Bring the context with it', body: 'Forms, email, documents, customer records, and prior conversations move through one usable workflow.' },
					{ title: 'Put judgment at the right step', body: 'AI can gather, classify, and draft while consequential decisions keep a clear human checkpoint.' },
					{ title: 'Finish the whole workflow', body: 'The result updates the systems people already use instead of creating another isolated AI tool.' }
				],
				alternativeLabel: 'Alternatives',
				alternatives: ['Zapier', 'Make', 'Gumloop']
			},
			{
				index: '03',
				title: 'ML and analytics',
				headline: { lead: 'Measure what changes', emphasis: 'the decision.' },
				body: 'We start with a business question, find the evidence that answers it, and carry the result through to the next useful action.',
				detail: 'MEASUREMENT · MACHINE LEARNING · EXPERIMENTS · GROWTH',
				features: [
					{ title: 'Measure a real question', body: 'Start with the decision the business needs to make, then instrument only the signals that answer it.' },
					{ title: 'Use the right level of modeling', body: 'Clear reporting when that is enough; forecasting and machine learning when the problem earns the complexity.' },
					{ title: 'Choose the operating rhythm', body: 'Use ongoing monitoring and action, or receive a clear report when that is all the business needs.' }
				],
				alternativeLabel: 'Alternatives',
				alternatives: ['Google Analytics', 'Tableau', 'Power BI']
			}
		]
	},
	workPreview: {
		eyebrow: 'SELECTED WORK',
		title: 'Built for the real world.',
		body: 'Three different businesses, three different systems. Open the work or see how each one was designed, connected, and kept moving.',
		cta: 'Explore the case studies',
		projects: [
			{
				name: 'Candella Quant',
				category: 'MARKET RESEARCH WORKSPACE',
				description: 'Live charts, strategy research, backtests, and AI-assisted analysis in one modular workspace.',
				url: 'https://candella.dev/quant',
				host: 'candella.dev/quant',
				image: '/consulting/prototypes/candella-quant-workspace.png',
				imageAlt: 'Candella Quant workspace showing a Bitcoin chart and AI research panel'
			},
			{
				name: 'The Sparkling Shoe',
				category: 'SHOPIFY COMMERCE',
				description: 'A mobile-ready storefront and commerce migration for a dance accessories company.',
				url: 'https://thesparklingshoe.com',
				host: 'thesparklingshoe.com',
				image: '/consulting/prototypes/sparkling-live.png',
				imageAlt: 'The Sparkling Shoe ecommerce homepage'
			},
			{
				name: 'MindLSN',
				category: 'ADAPTIVE COGNITIVE PRODUCT',
				description: 'Seven adaptive drills, integrity checks, and one comparable measure of progress.',
				url: 'https://mindlsn.com',
				host: 'mindlsn.com',
				image: '/consulting/prototypes/mindlsn-live.png',
				imageAlt: 'MindLSN cognitive training product homepage'
			}
		]
	},
	workPage: {
		eyebrow: 'SELECTED CASE STUDIES',
		title: { lead: 'Different businesses.', emphasis: 'One standard of care.' },
		body: 'The useful details are never generic. Explore three systems through the problem, the hard part, the work itself, and what continued after launch.',
		cta: 'Explore the cases',
		sectionEyebrow: 'SELECTED WORK',
		sectionTitle: 'Open the system.',
		sectionBody: 'Each case has its own visual language and its own evidence. The thread between them is accountable work beyond the screen.'
	},
	lab: {
		eyebrow: 'IN THE LAB / CLOSED BETA',
		title: 'Candella Quant',
		body: 'A modular workspace for live charts, strategy editing, backtests, and AI-assisted research. Active product development, not a finished case study yet.',
		cta: 'View the beta page',
		url: 'https://candella.dev/quant'
	},
	finalCta: {
		eyebrow: 'START WHERE YOU ARE',
		title: { lead: 'Bring us the messy version.', emphasis: 'We’ll find the first move.' },
		body: 'A current site, a manual process, a spreadsheet, or a half-formed idea is enough. Choose the closest starting point and send it over.',
		cta: 'Start an email',
		emailLabel: 'jwlutz65@gmail.com',
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
