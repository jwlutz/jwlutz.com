<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	// ============== STATE ==============
	let chips = $state(1000);
	let scrollLocked = $state(true);
	let heroSpun = $state(false);
	let currentSection = $state(0);

	// Hero Slot State
	let heroSpinning = $state(false);
	let heroReels = $state([0, 0, 0]);
	let leverY = $state(0);

	// Tech Slot State
	let techSpinning = $state(false);
	let techReels = $state<number[][]>([[], [], [], [], []]);
	let techBet = $state(10);
	let techLines = $state(1);

	// Poker State
	let pokerDealt = $state(false);
	let holeCardsRevealed = $state([false, false]);
	let communityCardsRevealed = $state([false, false, false, false, false]);

	// Blackjack State
	let blackjackStarted = $state(false);
	let playerHand = $state<number[]>([]);
	let dealerHand = $state<number[]>([]);
	let blackjackResult = $state<string | null>(null);
	let currentProjectIndex = $state(0);

	// Contact Slot State
	let contactSpinning = $state(false);
	let contactReels = $state([0, 0, 0]);

	// ============== DATA ==============
	const profile = {
		name: 'Jack Lutz',
		school: 'UCLA \'27',
		major: 'Stats & DS',
		roles: ['Data Scientist', 'AI Engineer', 'SW Engineer'],
		headshot: 'https://via.placeholder.com/150'
	};

	const techSymbols = [
		{ name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
		{ name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6' },
		{ name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
		{ name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#4169E1' },
		{ name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED' },
		{ name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#FF9900' },
		{ name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032' },
		{ name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
		{ name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg', color: '#00ADD8' },
		{ name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: '#DC382D' },
		{ name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', color: '#EE4C2C' },
		{ name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', color: '#013243' },
	];

	const experiences = [
		{
			id: 'lutz-consulting',
			company: 'Lutz Consulting',
			role: 'Founder',
			suit: '♦',
			color: '#ef4444',
			highlights: [
				'40K+ item inventory system',
				'3x client sales increase',
			]
		},
		{
			id: 'new-york-life',
			company: 'New York Life',
			role: 'Data Analyst',
			suit: '♠',
			color: '#3b82f6',
			highlights: [
				'RAG Chatbot Prototype',
				'AI Competition Finalist',
				'Database Migration',
			]
		}
	];

	const projects = [
		{ id: 'dining', title: 'UCLA Dining System', desc: 'Constraint optimization for 4000+ menu items', tech: 'Python, FastAPI, OR-Tools' },
		{ id: 'scraper', title: 'AI Web Scraper', desc: 'Chrome extension with AI data extraction', tech: 'TypeScript, Claude API' },
		{ id: 'backtest', title: 'Backtesting Engine', desc: 'Quantitative trading framework', tech: 'Python, pandas, NumPy' },
		{ id: 'editor', title: 'AI Code Editor', desc: 'Gemini-powered code generation', tech: 'Python, Gemini API' },
	];

	const contacts = [
		{ name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/jwlutz', reward: 200 },
		{ name: 'GitHub', icon: '🐙', url: 'https://github.com/jwlutz', reward: 200 },
		{ name: 'Email', icon: '✉️', url: 'mailto:jwlutz65@gmail.com', reward: 100 },
	];

	// ============== HERO SLOT ==============
	function pullHeroLever() {
		if (heroSpinning || heroSpun) return;
		heroSpinning = true;

		// Animate lever
		gsap.to({ y: 0 }, {
			y: 100,
			duration: 0.15,
			onUpdate: function() { leverY = this.targets()[0].y; },
			onComplete: () => {
				gsap.to({ y: 100 }, {
					y: 0,
					duration: 0.3,
					ease: 'elastic.out(1, 0.5)',
					onUpdate: function() { leverY = this.targets()[0].y; }
				});
			}
		});

		// Spin reels
		let completed = 0;
		heroReels.forEach((_, i) => {
			const duration = 1500 + i * 400;
			const startTime = performance.now();

			function animate() {
				const elapsed = performance.now() - startTime;
				const progress = Math.min(elapsed / duration, 1);
				const eased = 1 - Math.pow(1 - progress, 3);
				heroReels[i] = (eased * 20) % 1;
				heroReels = [...heroReels];

				if (progress < 1) {
					requestAnimationFrame(animate);
				} else {
					heroReels[i] = 0;
					heroReels = [...heroReels];
					completed++;
					if (completed === 3) {
						heroSpinning = false;
						heroSpun = true;
						scrollLocked = false;
						chips += 500; // Bonus for starting
					}
				}
			}
			requestAnimationFrame(animate);
		});
	}

	// ============== TECH SLOT ==============
	function initTechReels() {
		techReels = Array(5).fill(null).map(() =>
			Array(30).fill(null).map(() => Math.floor(Math.random() * techSymbols.length))
		);
	}

	let techPositions = $state([0, 0, 0, 0, 0]);
	let techTargets = $state([0, 0, 0, 0, 0]);

	function spinTechSlot() {
		if (techSpinning || chips < techBet * techLines) return;
		chips -= techBet * techLines;
		techSpinning = true;

		techTargets = Array(5).fill(0).map(() => Math.floor(Math.random() * 30));

		let completed = 0;
		techPositions.forEach((_, i) => {
			const duration = 2000 + i * 300;
			const startTime = performance.now();
			const startPos = techPositions[i];
			const distance = 90 + techTargets[i]; // Multiple rotations

			function animate() {
				const elapsed = performance.now() - startTime;
				const progress = Math.min(elapsed / duration, 1);
				const eased = 1 - Math.pow(1 - progress, 3);
				techPositions[i] = (startPos + distance * eased) % 30;
				techPositions = [...techPositions];

				if (progress < 1) {
					requestAnimationFrame(animate);
				} else {
					techPositions[i] = techTargets[i];
					techPositions = [...techPositions];
					completed++;
					if (completed === 5) {
						techSpinning = false;
						checkTechWin();
					}
				}
			}
			requestAnimationFrame(animate);
		});
	}

	function checkTechWin() {
		// Simple check: 3+ same symbols in center row
		const centerRow = techTargets.map(pos => techReels[0][(pos + 2) % 30]);
		const counts: Record<number, number> = {};
		centerRow.forEach(sym => counts[sym] = (counts[sym] || 0) + 1);
		const maxCount = Math.max(...Object.values(counts));

		if (maxCount >= 3) {
			const winAmount = techBet * techLines * maxCount * 2;
			chips += winAmount;
		}
	}

	// ============== POKER ==============
	function dealPoker() {
		if (pokerDealt) return;
		pokerDealt = true;

		// Reveal hole cards with delay
		setTimeout(() => { holeCardsRevealed[0] = true; holeCardsRevealed = [...holeCardsRevealed]; }, 500);
		setTimeout(() => { holeCardsRevealed[1] = true; holeCardsRevealed = [...holeCardsRevealed]; }, 1000);

		// Reveal community cards (flop, turn, river)
		setTimeout(() => { communityCardsRevealed[0] = true; communityCardsRevealed = [...communityCardsRevealed]; }, 2000);
		setTimeout(() => { communityCardsRevealed[1] = true; communityCardsRevealed = [...communityCardsRevealed]; }, 2300);
		setTimeout(() => { communityCardsRevealed[2] = true; communityCardsRevealed = [...communityCardsRevealed]; }, 2600);
		setTimeout(() => { communityCardsRevealed[3] = true; communityCardsRevealed = [...communityCardsRevealed]; }, 3500);
		setTimeout(() => { communityCardsRevealed[4] = true; communityCardsRevealed = [...communityCardsRevealed]; }, 4500);
	}

	// ============== BLACKJACK ==============
	function getCardValue(card: number): number {
		const value = (card % 13) + 1;
		if (value > 10) return 10;
		if (value === 1) return 11;
		return value;
	}

	function getHandValue(hand: number[]): number {
		let value = hand.reduce((sum, card) => sum + getCardValue(card), 0);
		let aces = hand.filter(card => (card % 13) === 0).length;
		while (value > 21 && aces > 0) {
			value -= 10;
			aces--;
		}
		return value;
	}

	function startBlackjack() {
		if (blackjackStarted) return;
		blackjackStarted = true;
		blackjackResult = null;
		playerHand = [Math.floor(Math.random() * 52), Math.floor(Math.random() * 52)];
		dealerHand = [Math.floor(Math.random() * 52)];
		currentProjectIndex = 0;
	}

	function hit() {
		if (!blackjackStarted || blackjackResult) return;
		playerHand = [...playerHand, Math.floor(Math.random() * 52)];
		currentProjectIndex = Math.min(currentProjectIndex + 1, projects.length - 1);

		if (getHandValue(playerHand) > 21) {
			blackjackResult = 'BUST';
		}
	}

	function stand() {
		if (!blackjackStarted || blackjackResult) return;

		// Dealer draws
		while (getHandValue(dealerHand) < 17) {
			dealerHand = [...dealerHand, Math.floor(Math.random() * 52)];
		}

		const playerValue = getHandValue(playerHand);
		const dealerValue = getHandValue(dealerHand);

		if (dealerValue > 21 || playerValue > dealerValue) {
			blackjackResult = 'WIN';
			chips += 100;
		} else if (playerValue < dealerValue) {
			blackjackResult = 'LOSE';
		} else {
			blackjackResult = 'PUSH';
		}
	}

	function resetBlackjack() {
		blackjackStarted = false;
		playerHand = [];
		dealerHand = [];
		blackjackResult = null;
		currentProjectIndex = 0;
	}

	// ============== CONTACT SLOT ==============
	function spinContactSlot() {
		if (contactSpinning) return;
		contactSpinning = true;

		let completed = 0;
		contactReels.forEach((_, i) => {
			const duration = 1200 + i * 300;
			const startTime = performance.now();

			function animate() {
				const elapsed = performance.now() - startTime;
				const progress = Math.min(elapsed / duration, 1);
				const eased = 1 - Math.pow(1 - progress, 3);
				contactReels[i] = (eased * 15) % 1;
				contactReels = [...contactReels];

				if (progress < 1) {
					requestAnimationFrame(animate);
				} else {
					contactReels[i] = 0;
					contactReels = [...contactReels];
					completed++;
					if (completed === 3) {
						contactSpinning = false;
					}
				}
			}
			requestAnimationFrame(animate);
		});
	}

	// ============== LIFECYCLE ==============
	onMount(() => {
		initTechReels();

		// Load chips from localStorage
		const saved = localStorage.getItem('casino-chips');
		if (saved) chips = parseInt(saved);
	});

	$effect(() => {
		localStorage.setItem('casino-chips', chips.toString());
	});
</script>

<svelte:head>
	<title>Jack Lutz | Casino Portfolio</title>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=JetBrains+Mono&display=swap');
	</style>
</svelte:head>

<div class="casino-portfolio" class:scroll-locked={scrollLocked}>
	<!-- Chip Counter (Fixed) -->
	<div class="chip-counter">
		<span class="chip-icon">🎰</span>
		<span class="chip-amount">{chips}</span>
	</div>

	<!-- ============== SECTION 1: HERO SLOT ============== -->
	<section class="hero-section" id="hero">
		<div class="slot-machine hero-slot">
			<div class="slot-header">
				<div class="slot-lights">
					{#each Array(7) as _, i}
						<div class="light" class:spinning={heroSpinning} style="animation-delay: {i * 0.1}s"></div>
					{/each}
				</div>
				<h1 class="slot-title">JACKPOT</h1>
			</div>

			<div class="slot-display">
				<!-- 3x3 Grid showing bio info -->
				<div class="hero-grid">
					<!-- Row 1 -->
					<div class="hero-cell" class:revealed={heroSpun}>
						<div class="cell-content">{profile.major}</div>
					</div>
					<div class="hero-cell" class:revealed={heroSpun}>
						<div class="cell-content">{profile.school}</div>
					</div>
					<div class="hero-cell hero-cell-tall" class:revealed={heroSpun} style="grid-row: span 2;">
						<div class="cell-content headshot">👨‍💻</div>
					</div>
					<!-- Row 2 -->
					<div class="hero-cell" class:revealed={heroSpun}>
						<div class="cell-content name">Jack</div>
					</div>
					<div class="hero-cell" class:revealed={heroSpun}>
						<div class="cell-content name">Lutz</div>
					</div>
					<!-- Row 3 -->
					<div class="hero-cell" class:revealed={heroSpun}>
						<div class="cell-content role">{profile.roles[0]}</div>
					</div>
					<div class="hero-cell" class:revealed={heroSpun}>
						<div class="cell-content role">{profile.roles[1]}</div>
					</div>
					<div class="hero-cell" class:revealed={heroSpun}>
						<div class="cell-content role">{profile.roles[2]}</div>
					</div>
				</div>
			</div>

			{#if !heroSpun}
				<button class="insert-coin" onclick={pullHeroLever} disabled={heroSpinning}>
					{heroSpinning ? 'SPINNING...' : 'INSERT COIN'}
				</button>
			{/if}

			<!-- Lever -->
			<div class="lever-container" onclick={pullHeroLever}>
				<div class="lever-track"></div>
				<div class="lever-arm" style="transform: translateY({leverY}px)">
					<div class="lever-ball"></div>
				</div>
				<div class="lever-base"></div>
			</div>
		</div>

		{#if !heroSpun}
			<div class="scroll-prompt">Pull the lever to begin</div>
		{/if}
	</section>

	<!-- ============== SECTION 2: TECH SLOT (5x5) ============== -->
	<section class="tech-section" id="skills">
		<div class="slot-machine tech-slot">
			<div class="slot-header">
				<div class="slot-lights">
					{#each Array(9) as _, i}
						<div class="light" class:spinning={techSpinning} style="animation-delay: {i * 0.08}s"></div>
					{/each}
				</div>
				<h2 class="slot-title">SKILL SLOTS</h2>
			</div>

			<div class="tech-display">
				<div class="tech-reels">
					{#each [0, 1, 2, 3, 4] as reelIndex}
						<div class="tech-reel">
							{#each [0, 1, 2, 3, 4] as rowIndex}
								{@const symbolIndex = techReels[reelIndex]?.[(Math.floor(techPositions[reelIndex]) + rowIndex) % 30]}
								{@const symbol = techSymbols[symbolIndex] || techSymbols[0]}
								<div class="tech-symbol">
									<img src={symbol.icon} alt={symbol.name} />
								</div>
							{/each}
						</div>
					{/each}
				</div>
			</div>

			<div class="tech-controls">
				<div class="bet-control">
					<span>LINES</span>
					<div class="bet-buttons">
						<button onclick={() => techLines = Math.max(1, techLines - 1)}>-</button>
						<span>{techLines}</span>
						<button onclick={() => techLines = Math.min(9, techLines + 1)}>+</button>
					</div>
				</div>
				<div class="bet-control">
					<span>BET</span>
					<div class="bet-buttons">
						<button onclick={() => techBet = Math.max(10, techBet - 10)}>-</button>
						<span>{techBet}</span>
						<button onclick={() => techBet = Math.min(100, techBet + 10)}>+</button>
					</div>
				</div>
				<button class="spin-button" onclick={spinTechSlot} disabled={techSpinning || chips < techBet * techLines}>
					{techSpinning ? '...' : 'SPIN'}
				</button>
			</div>
		</div>
	</section>

	<!-- ============== SECTION 3: POKER (Experience) ============== -->
	<section class="poker-section" id="experience">
		<div class="poker-table">
			<div class="poker-felt">
				<h2 class="table-title">EXPERIENCE</h2>

				<!-- Hole Cards (Jobs) -->
				<div class="hole-cards">
					{#each experiences as exp, i}
						<div class="poker-card" class:revealed={holeCardsRevealed[i]} onclick={() => { holeCardsRevealed[i] = true; holeCardsRevealed = [...holeCardsRevealed]; }}>
							<div class="card-front">
								<div class="card-suit" style="color: {exp.color}">{exp.suit}</div>
								<div class="card-company">{exp.company}</div>
								<div class="card-role">{exp.role}</div>
								<div class="card-suit-bottom" style="color: {exp.color}">{exp.suit}</div>
							</div>
							<div class="card-back">
								<div class="card-pattern"></div>
							</div>
						</div>
					{/each}
				</div>

				<div class="hole-label">YOUR HAND</div>

				<!-- Community Cards (Highlights) -->
				<div class="community-cards">
					{#each [0, 1, 2, 3, 4] as i}
						{@const allHighlights = [...experiences[0].highlights, ...experiences[1].highlights]}
						{@const highlight = allHighlights[i]}
						{@const exp = i < 2 ? experiences[0] : experiences[1]}
						<div class="poker-card community" class:revealed={communityCardsRevealed[i]}>
							<div class="card-front">
								<div class="card-suit" style="color: {exp.color}">{exp.suit}</div>
								<div class="highlight-text">{highlight || 'Achievement'}</div>
								<div class="card-suit-bottom" style="color: {exp.color}">{exp.suit}</div>
							</div>
							<div class="card-back">
								<div class="card-pattern"></div>
							</div>
						</div>
					{/each}
				</div>

				<div class="community-label">HIGHLIGHTS</div>

				{#if !pokerDealt}
					<button class="deal-button" onclick={dealPoker}>DEAL</button>
				{/if}
			</div>
		</div>
	</section>

	<!-- ============== SECTION 4: BLACKJACK (Projects) ============== -->
	<section class="blackjack-section" id="projects">
		<div class="blackjack-table">
			<div class="blackjack-felt">
				<h2 class="table-title">PROJECTS</h2>

				<!-- Dealer Hand -->
				<div class="dealer-area">
					<div class="hand-label">DEALER</div>
					<div class="card-hand">
						{#each dealerHand as card, i}
							<div class="bj-card">
								<span class="card-value">{['A','2','3','4','5','6','7','8','9','10','J','Q','K'][card % 13]}</span>
								<span class="card-suit-small">{['♠','♥','♦','♣'][Math.floor(card / 13)]}</span>
							</div>
						{/each}
					</div>
					{#if blackjackResult}
						<div class="hand-value">Value: {getHandValue(dealerHand)}</div>
					{/if}
				</div>

				<!-- Current Project Display -->
				{#if blackjackStarted}
					<div class="project-display">
						<div class="project-card">
							<h3>{projects[currentProjectIndex].title}</h3>
							<p>{projects[currentProjectIndex].desc}</p>
							<span class="tech-stack">{projects[currentProjectIndex].tech}</span>
						</div>
					</div>
				{/if}

				<!-- Player Hand -->
				<div class="player-area">
					<div class="card-hand">
						{#each playerHand as card, i}
							<div class="bj-card">
								<span class="card-value">{['A','2','3','4','5','6','7','8','9','10','J','Q','K'][card % 13]}</span>
								<span class="card-suit-small">{['♠','♥','♦','♣'][Math.floor(card / 13)]}</span>
							</div>
						{/each}
					</div>
					{#if playerHand.length > 0}
						<div class="hand-value">Value: {getHandValue(playerHand)}</div>
					{/if}
					<div class="hand-label">YOUR HAND</div>
				</div>

				<!-- Result -->
				{#if blackjackResult}
					<div class="result-banner" class:win={blackjackResult === 'WIN'} class:lose={blackjackResult === 'LOSE' || blackjackResult === 'BUST'}>
						{blackjackResult}!
					</div>
				{/if}

				<!-- Controls -->
				<div class="bj-controls">
					{#if !blackjackStarted}
						<button class="bj-button" onclick={startBlackjack}>DEAL</button>
					{:else if !blackjackResult}
						<button class="bj-button hit" onclick={hit}>HIT</button>
						<button class="bj-button stand" onclick={stand}>STAND</button>
					{:else}
						<button class="bj-button" onclick={resetBlackjack}>PLAY AGAIN</button>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- ============== SECTION 5: CONTACT SLOT ============== -->
	<section class="contact-section" id="contact">
		<div class="slot-machine contact-slot">
			<div class="slot-header">
				<div class="slot-lights">
					{#each Array(5) as _, i}
						<div class="light" class:spinning={contactSpinning} style="animation-delay: {i * 0.1}s"></div>
					{/each}
				</div>
				<h2 class="slot-title">GET IN TOUCH</h2>
			</div>

			<div class="contact-display">
				<div class="contact-reels">
					{#each contacts as contact, i}
						<div class="contact-reel" class:spinning={contactSpinning}>
							<a href={contact.url} target="_blank" rel="noopener noreferrer" class="contact-item" onclick={() => { chips += contact.reward; }}>
								<span class="contact-icon">{contact.icon}</span>
								<span class="contact-name">{contact.name}</span>
								<span class="contact-reward">+{contact.reward} chips</span>
							</a>
						</div>
					{/each}
				</div>
			</div>

			<button class="spin-button" onclick={spinContactSlot}>
				{contactSpinning ? '...' : 'SPIN FOR LUCK'}
			</button>
		</div>

		<div class="final-cta">
			<p>Thanks for playing! 🎲</p>
			<a href="/resume" class="resume-link">View Traditional Resume →</a>
		</div>
	</section>
</div>

<style>
	/* ============== BASE STYLES ============== */
	:global(body) {
		margin: 0;
		padding: 0;
		background: #0a0a0a;
		color: #fff;
		font-family: 'JetBrains Mono', monospace;
	}

	.casino-portfolio {
		min-height: 100vh;
		background: linear-gradient(180deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%);
	}

	.casino-portfolio.scroll-locked {
		overflow: hidden;
		height: 100vh;
	}

	/* ============== CHIP COUNTER ============== */
	.chip-counter {
		position: fixed;
		top: 20px;
		right: 20px;
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
		border: 2px solid #fbbf24;
		border-radius: 50px;
		padding: 10px 20px;
		display: flex;
		align-items: center;
		gap: 10px;
		z-index: 1000;
		box-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
	}

	.chip-icon {
		font-size: 24px;
	}

	.chip-amount {
		font-size: 20px;
		font-weight: bold;
		color: #fbbf24;
	}

	/* ============== SECTIONS ============== */
	section {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40px 20px;
		position: relative;
	}

	/* ============== SLOT MACHINE BASE ============== */
	.slot-machine {
		background: linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 50%, #0d0d0d 100%);
		border: 4px solid #fbbf24;
		border-radius: 20px;
		padding: 30px;
		position: relative;
		box-shadow:
			0 0 60px rgba(251, 191, 36, 0.2),
			inset 0 0 60px rgba(0, 0, 0, 0.5);
	}

	.slot-header {
		text-align: center;
		margin-bottom: 20px;
	}

	.slot-lights {
		display: flex;
		justify-content: center;
		gap: 15px;
		margin-bottom: 15px;
	}

	.light {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background: #ef4444;
		box-shadow: 0 0 10px #ef4444;
		animation: blink 1s infinite;
	}

	.light:nth-child(even) {
		background: #fbbf24;
		box-shadow: 0 0 10px #fbbf24;
	}

	.light.spinning {
		animation: rapid-blink 0.2s infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.3; }
	}

	@keyframes rapid-blink {
		0%, 100% { opacity: 1; background: #ef4444; }
		33% { opacity: 1; background: #fbbf24; }
		66% { opacity: 1; background: #22c55e; }
	}

	.slot-title {
		font-family: 'Playfair Display', serif;
		font-size: 36px;
		color: #fbbf24;
		text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
		margin: 0;
		letter-spacing: 4px;
	}

	/* ============== HERO SLOT ============== */
	.hero-section {
		background: radial-gradient(ellipse at center, #1a0a0a 0%, #0a0a0a 70%);
	}

	.hero-slot {
		width: min(600px, 90vw);
	}

	.slot-display {
		background: #000;
		border: 3px solid #333;
		border-radius: 10px;
		padding: 20px;
		margin-bottom: 20px;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
	}

	.hero-cell {
		background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
		border: 2px solid #333;
		border-radius: 8px;
		padding: 20px;
		text-align: center;
		position: relative;
		overflow: hidden;
	}

	.hero-cell::before {
		content: '?';
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40px;
		color: #fbbf24;
		background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
		transition: opacity 0.5s;
	}

	.hero-cell.revealed::before {
		opacity: 0;
		pointer-events: none;
	}

	.cell-content {
		font-size: 14px;
		color: #ccc;
	}

	.cell-content.name {
		font-size: 28px;
		font-weight: bold;
		color: #fbbf24;
	}

	.cell-content.role {
		font-size: 12px;
		color: #888;
	}

	.cell-content.headshot {
		font-size: 60px;
	}

	.insert-coin {
		width: 100%;
		padding: 15px;
		font-size: 20px;
		font-weight: bold;
		background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%);
		border: none;
		border-radius: 10px;
		color: #000;
		cursor: pointer;
		transition: transform 0.1s, box-shadow 0.1s;
		font-family: inherit;
	}

	.insert-coin:hover:not(:disabled) {
		transform: scale(1.02);
		box-shadow: 0 0 30px rgba(251, 191, 36, 0.5);
	}

	.insert-coin:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	/* ============== LEVER ============== */
	.lever-container {
		position: absolute;
		right: -60px;
		top: 50%;
		transform: translateY(-50%);
		width: 50px;
		height: 200px;
		cursor: pointer;
	}

	.lever-track {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 20px;
		height: 150px;
		background: linear-gradient(90deg, #333 0%, #555 50%, #333 100%);
		border-radius: 10px;
		top: 25px;
	}

	.lever-arm {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 12px;
		height: 120px;
		background: linear-gradient(90deg, #888 0%, #ccc 50%, #888 100%);
		border-radius: 6px;
		top: 0;
	}

	.lever-ball {
		position: absolute;
		top: -25px;
		left: 50%;
		transform: translateX(-50%);
		width: 50px;
		height: 50px;
		background: radial-gradient(circle at 30% 30%, #ff6b6b 0%, #dc2626 50%, #991b1b 100%);
		border-radius: 50%;
		box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
	}

	.lever-base {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 40px;
		height: 30px;
		background: linear-gradient(180deg, #555 0%, #333 100%);
		border-radius: 5px 5px 10px 10px;
	}

	.scroll-prompt {
		margin-top: 40px;
		color: #666;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 0.5; }
		50% { opacity: 1; }
	}

	/* ============== TECH SLOT ============== */
	.tech-section {
		background: radial-gradient(ellipse at center, #0a1a0a 0%, #0a0a0a 70%);
	}

	.tech-slot {
		width: min(750px, 95vw);
	}

	.tech-display {
		background: #000;
		border: 3px solid #333;
		border-radius: 10px;
		padding: 20px;
		margin-bottom: 20px;
		overflow: hidden;
	}

	.tech-reels {
		display: flex;
		gap: 10px;
		justify-content: center;
	}

	.tech-reel {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.tech-symbol {
		width: 80px;
		height: 80px;
		background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
		border: 2px solid #333;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tech-symbol img {
		width: 50px;
		height: 50px;
		object-fit: contain;
	}

	.tech-controls {
		display: flex;
		justify-content: center;
		gap: 20px;
		align-items: flex-end;
	}

	.bet-control {
		text-align: center;
	}

	.bet-control span {
		display: block;
		font-size: 12px;
		color: #666;
		margin-bottom: 5px;
	}

	.bet-buttons {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.bet-buttons button {
		width: 30px;
		height: 30px;
		background: #333;
		border: 1px solid #555;
		border-radius: 5px;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
	}

	.bet-buttons button:hover {
		background: #444;
	}

	.bet-buttons > span {
		width: 40px;
		text-align: center;
		color: #fbbf24;
		font-size: 16px;
	}

	.spin-button {
		padding: 15px 40px;
		font-size: 18px;
		font-weight: bold;
		background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%);
		border: none;
		border-radius: 10px;
		color: #fff;
		cursor: pointer;
		transition: transform 0.1s;
		font-family: inherit;
	}

	.spin-button:hover:not(:disabled) {
		transform: scale(1.05);
	}

	.spin-button:disabled {
		background: #333;
		cursor: not-allowed;
	}

	/* ============== POKER TABLE ============== */
	.poker-section {
		background: radial-gradient(ellipse at center, #0a0a1a 0%, #0a0a0a 70%);
	}

	.poker-table {
		width: min(900px, 95vw);
	}

	.poker-felt {
		background: linear-gradient(180deg, #166534 0%, #14532d 100%);
		border: 8px solid #854d0e;
		border-radius: 200px;
		padding: 60px 40px;
		position: relative;
		box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5);
	}

	.table-title {
		text-align: center;
		font-family: 'Playfair Display', serif;
		font-size: 32px;
		color: #fbbf24;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
		margin: 0 0 30px 0;
	}

	.hole-cards, .community-cards {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin: 20px 0;
	}

	.hole-label, .community-label {
		text-align: center;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.5);
		letter-spacing: 2px;
		margin: 10px 0 30px 0;
	}

	.poker-card {
		width: 120px;
		height: 170px;
		perspective: 1000px;
		cursor: pointer;
	}

	.poker-card .card-front,
	.poker-card .card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		border-radius: 10px;
		transition: transform 0.6s;
	}

	.poker-card .card-front {
		background: linear-gradient(180deg, #fff 0%, #f0f0f0 100%);
		color: #000;
		padding: 10px;
		display: flex;
		flex-direction: column;
		transform: rotateY(180deg);
	}

	.poker-card .card-back {
		background: linear-gradient(135deg, #1e3a5f 0%, #0c1929 100%);
		border: 3px solid #fbbf24;
	}

	.poker-card .card-pattern {
		width: 100%;
		height: 100%;
		background: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 10px,
			rgba(251, 191, 36, 0.1) 10px,
			rgba(251, 191, 36, 0.1) 20px
		);
		border-radius: 7px;
	}

	.poker-card.revealed .card-front {
		transform: rotateY(0deg);
	}

	.poker-card.revealed .card-back {
		transform: rotateY(180deg);
	}

	.card-suit {
		font-size: 24px;
		font-weight: bold;
	}

	.card-suit-bottom {
		font-size: 24px;
		font-weight: bold;
		margin-top: auto;
		text-align: right;
		transform: rotate(180deg);
	}

	.card-company {
		font-size: 14px;
		font-weight: bold;
		text-align: center;
		margin-top: 10px;
	}

	.card-role {
		font-size: 12px;
		text-align: center;
		color: #666;
	}

	.highlight-text {
		font-size: 11px;
		text-align: center;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px;
	}

	.deal-button {
		display: block;
		margin: 30px auto 0;
		padding: 15px 50px;
		font-size: 18px;
		font-weight: bold;
		background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%);
		border: none;
		border-radius: 10px;
		color: #000;
		cursor: pointer;
		font-family: inherit;
	}

	/* ============== BLACKJACK TABLE ============== */
	.blackjack-section {
		background: radial-gradient(ellipse at center, #1a0a1a 0%, #0a0a0a 70%);
	}

	.blackjack-table {
		width: min(800px, 95vw);
	}

	.blackjack-felt {
		background: linear-gradient(180deg, #166534 0%, #14532d 100%);
		border: 8px solid #854d0e;
		border-radius: 20px 20px 200px 200px;
		padding: 40px;
		position: relative;
		box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5);
		min-height: 500px;
	}

	.dealer-area, .player-area {
		text-align: center;
		margin: 20px 0;
	}

	.hand-label {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.5);
		letter-spacing: 2px;
		margin: 10px 0;
	}

	.card-hand {
		display: flex;
		justify-content: center;
		gap: 10px;
		min-height: 100px;
	}

	.bj-card {
		width: 70px;
		height: 100px;
		background: linear-gradient(180deg, #fff 0%, #f0f0f0 100%);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
	}

	.card-value {
		font-size: 28px;
		font-weight: bold;
		color: #000;
	}

	.card-suit-small {
		font-size: 20px;
	}

	.hand-value {
		margin-top: 10px;
		font-size: 14px;
		color: #fbbf24;
	}

	.project-display {
		margin: 30px 0;
	}

	.project-card {
		background: rgba(0, 0, 0, 0.5);
		border: 2px solid #fbbf24;
		border-radius: 10px;
		padding: 20px;
		text-align: center;
		max-width: 400px;
		margin: 0 auto;
	}

	.project-card h3 {
		color: #fbbf24;
		margin: 0 0 10px 0;
	}

	.project-card p {
		color: #ccc;
		margin: 0 0 10px 0;
		font-size: 14px;
	}

	.tech-stack {
		font-size: 12px;
		color: #888;
	}

	.result-banner {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 48px;
		font-weight: bold;
		padding: 20px 60px;
		border-radius: 10px;
		animation: pop 0.3s ease-out;
	}

	.result-banner.win {
		background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%);
		color: #fff;
	}

	.result-banner.lose {
		background: linear-gradient(180deg, #ef4444 0%, #dc2626 100%);
		color: #fff;
	}

	@keyframes pop {
		0% { transform: translate(-50%, -50%) scale(0); }
		80% { transform: translate(-50%, -50%) scale(1.1); }
		100% { transform: translate(-50%, -50%) scale(1); }
	}

	.bj-controls {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin-top: 30px;
	}

	.bj-button {
		padding: 15px 40px;
		font-size: 16px;
		font-weight: bold;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		font-family: inherit;
		transition: transform 0.1s;
	}

	.bj-button:hover {
		transform: scale(1.05);
	}

	.bj-button.hit {
		background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%);
		color: #fff;
	}

	.bj-button.stand {
		background: linear-gradient(180deg, #ef4444 0%, #dc2626 100%);
		color: #fff;
	}

	.bj-button:not(.hit):not(.stand) {
		background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%);
		color: #000;
	}

	/* ============== CONTACT SLOT ============== */
	.contact-section {
		background: radial-gradient(ellipse at center, #1a1a0a 0%, #0a0a0a 70%);
	}

	.contact-slot {
		width: min(600px, 90vw);
	}

	.contact-display {
		background: #000;
		border: 3px solid #333;
		border-radius: 10px;
		padding: 20px;
		margin-bottom: 20px;
	}

	.contact-reels {
		display: flex;
		justify-content: center;
		gap: 20px;
	}

	.contact-reel {
		transition: transform 0.3s;
	}

	.contact-reel.spinning {
		animation: shake 0.1s infinite;
	}

	@keyframes shake {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-5px); }
	}

	.contact-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		padding: 20px 30px;
		background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
		border: 2px solid #333;
		border-radius: 10px;
		text-decoration: none;
		transition: all 0.3s;
	}

	.contact-item:hover {
		border-color: #fbbf24;
		transform: scale(1.05);
	}

	.contact-icon {
		font-size: 40px;
	}

	.contact-name {
		color: #fff;
		font-weight: bold;
	}

	.contact-reward {
		color: #22c55e;
		font-size: 12px;
	}

	.final-cta {
		margin-top: 40px;
		text-align: center;
	}

	.final-cta p {
		color: #666;
		margin-bottom: 20px;
	}

	.resume-link {
		color: #fbbf24;
		text-decoration: none;
		font-size: 14px;
	}

	.resume-link:hover {
		text-decoration: underline;
	}
</style>
