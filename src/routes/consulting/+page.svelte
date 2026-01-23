<script lang="ts">
	import { profile } from '$lib';
	import { onMount } from 'svelte';
	import { Motion } from 'svelte-motion';
	import mermaid from 'mermaid';
	import { darkMode } from '$lib/stores/darkMode';

	let ready = $state(false);
	let pipelineExpanded = $state(false);
	let feedmeExpanded = $state(false);
	let websiteExpanded = $state(false);
	let mermaidContainer: HTMLElement;
	let feedmeContainer: HTMLElement;
	let mermaidRendered = false;
	let feedmeRendered = false;
	let isMobile = $state(false);
	let lastMobileState = false;
	let lastDarkModeState: boolean | null = null;

	// Desktop diagrams (left to right)
	const ecommerceDiagramLR = `
flowchart LR
    A[Employee Photos] -->|40k+ items| B[CV + OCR]
    A --> C[AWS S3]
    B --> D[Supabase]
    C --> E[Streamlit Review App]
    D --> E
    E -->|Edit| D
    C --> F[Lightspeed POS]
    D --> F
    F --> G[Website]
`;

	const feedmeDiagramLR = `
flowchart LR
    A[Menu APIs] --> B[Scraper]
    B --> C[Supabase]
    C --> D[Router]
    D --> E[OR-Tools]
    D --> F[LLM]
    E --> G[Filter]
    F --> G
    G --> H[API]
    H --> I[Metrics]
    H --> J[App]
`;

	// Mobile diagrams (top to bottom)
	const ecommerceDiagramTB = `
flowchart TB
    A[Employee Photos] -->|40k+ items| B[CV + OCR]
    A --> C[AWS S3]
    B --> D[Supabase]
    C --> E[Streamlit App]
    D --> E
    E -->|Edit| D
    C --> F[Lightspeed POS]
    D --> F
    F --> G[Website]
`;

	const feedmeDiagramTB = `
flowchart TB
    A[Menu APIs] --> B[Scraper]
    B --> C[Supabase]
    C --> D[Router]
    D --> E[OR-Tools]
    D --> F[LLM]
    E --> G[Filter]
    F --> G
    G --> H[API]
    H --> I[Metrics]
    H --> J[App]
`;

	// Get current diagram based on screen size
	let ecommerceDiagram = $derived(isMobile ? ecommerceDiagramTB : ecommerceDiagramLR);
	let feedmeDiagram = $derived(isMobile ? feedmeDiagramTB : feedmeDiagramLR);

	// Tech stacks with SVG icons
	const techIcons: Record<string, { color: string; icon: string }> = {
		Python: {
			color: '#3776AB',
			icon: '<path d="M12 0C5.372 0 5.998 2.857 5.998 2.857l.007 2.96h6.115v.889H3.788S0 6.238 0 12.113c0 5.875 3.304 5.666 3.304 5.666h1.972v-2.727s-.106-3.304 3.25-3.304h5.6s3.147.051 3.147-3.042V3.148S17.78 0 12 0zm-3.11 1.817a1.015 1.015 0 110 2.03 1.015 1.015 0 010-2.03z"/><path d="M12 24c6.628 0 6.002-2.857 6.002-2.857l-.007-2.96h-6.115v-.889h8.332S24 17.762 24 11.887c0-5.875-3.304-5.666-3.304-5.666h-1.972v2.727s.106 3.304-3.25 3.304h-5.6s-3.147-.051-3.147 3.042v5.558S6.22 24 12 24zm3.11-1.817a1.015 1.015 0 110-2.03 1.015 1.015 0 010 2.03z"/>'
		},
		OpenCV: {
			color: '#5C3EE8',
			icon: '<circle cx="6" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="18" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M11 12h2" stroke="currentColor" stroke-width="2"/>'
		},
		'AWS S3': {
			color: '#FF9900',
			icon: '<path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.08 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z"/>'
		},
		Supabase: {
			color: '#3FCF8E',
			icon: '<path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.553 15.5 2.303 15.5h8.197v7.464c0 .986 1.26 1.41 1.874.637L21.236 11.95c1.093-1.378.21-3.45-1.54-3.45h-8.197V1.036h.4z"/>'
		},
		OpenAI: {
			color: '#000000',
			icon: '<path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>'
		},
		Streamlit: {
			color: '#FF4B4B',
			icon: '<path d="M12 2L2 19h20L12 2zm0 4l6.5 11h-13L12 6z"/><circle cx="12" cy="14" r="2"/>'
		},
		Lightspeed: {
			color: '#D93831',
			icon: '<path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>'
		},
		TypeScript: {
			color: '#3178C6',
			icon: '<path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>'
		},
		Go: {
			color: '#00ADD8',
			icon: '<path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .07.035.058.07l-.093.28c-.012.047-.058.07-.105.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.36c-.736.187-1.239.327-1.963.514-.176.046-.187.058-.34-.117-.176-.199-.304-.327-.549-.444-.737-.362-1.45-.257-2.115.175-.795.514-1.204 1.274-1.192 2.22.011.935.654 1.706 1.577 1.835.795.105 1.46-.175 1.987-.771.105-.129.199-.27.315-.433H10.47c-.245 0-.304-.152-.222-.35.152-.362.432-.97.596-1.274a.315.315 0 01.292-.187h4.253c-.023.316-.023.631-.07.947a4.983 4.983 0 01-.958 2.29c-.841 1.11-1.94 1.8-3.33 1.986-1.145.152-2.209-.07-3.143-.77-.865-.655-1.356-1.52-1.484-2.593-.152-1.274.222-2.419.935-3.435.772-1.098 1.811-1.8 3.097-2.115 1.075-.257 2.115-.21 3.097.292.736.374 1.286.947 1.682 1.682.07.105.046.164-.082.199z"/>'
		},
		FastAPI: {
			color: '#009688',
			icon: '<path d="M12 0L3 7v10l9 7 9-7V7l-9-7zm0 3.5L17.5 8 12 12.5 6.5 8 12 3.5zM5 9.5l6 4.5v6l-6-4.5v-6zm8 10.5v-6l6-4.5v6l-6 4.5z"/>'
		},
		'OR-Tools': {
			color: '#4285F4',
			icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
		},
		Grafana: {
			color: '#F46800',
			icon: '<path d="M23.472 10.838a5.27 5.27 0 0 0-.101-1.05 5.652 5.652 0 0 0-.197-.802c-.105-.284-.219-.498-.341-.64a.653.653 0 0 0-.505-.257c-.167 0-.357.085-.571.257-.213.17-.437.404-.67.702-.233.298-.47.647-.71 1.047-.241.4-.478.835-.71 1.305-.135-.535-.323-1.028-.564-1.478-.241-.45-.517-.842-.828-1.176a3.72 3.72 0 0 0-1.004-.802c-.375-.2-.766-.3-1.172-.3-.476 0-.898.127-1.265.381a3.194 3.194 0 0 0-.916.992c-.24.409-.42.87-.539 1.385a7.262 7.262 0 0 0-.178 1.63c0 .578.061 1.134.184 1.669.122.535.303 1.014.543 1.436.24.422.532.757.878 1.004.345.247.74.37 1.184.37.405 0 .79-.118 1.155-.352a4.4 4.4 0 0 0 1.004-.916c.298-.375.556-.798.773-1.27.218-.47.389-.952.514-1.443.125.491.296.973.514 1.443.217.472.475.895.773 1.27.298.375.634.682 1.004.916.37.234.755.352 1.155.352.444 0 .84-.123 1.184-.37.346-.247.638-.582.878-1.004.24-.422.42-.9.543-1.436a7.32 7.32 0 0 0 .184-1.67c0-.558-.04-1.095-.118-1.612zM12 22.096c-5.574 0-10.096-4.522-10.096-10.096S6.426 1.904 12 1.904 22.096 6.426 22.096 12 17.574 22.096 12 22.096zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>'
		},
		AWS: {
			color: '#FF9900',
			icon: '<path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.414l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.27-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.385.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z"/>'
		},
		FAISS: {
			color: '#0668E1',
			icon: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>'
		},
		Shopify: {
			color: '#96BF48',
			icon: '<path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.058-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.609 0 2.281-1.447 3.749-3.405 3.749-2.348 0-3.541-1.459-3.541-1.459l.631-2.07s1.238 1.062 2.28 1.062c.685 0 .963-.539.963-.931 0-1.619-2.654-1.694-2.654-4.343 0-2.236 1.605-4.398 4.848-4.398 1.238 0 1.854.357 1.854.357l-.938 2.707zm-1.037-7.216l.021-.006c-.012-.152-.088-.382-.148-.569-.177-.539-.517-1.636-.517-1.636s-1.291-.266-1.755-.355c-.158.453-.328.936-.51 1.466l2.909 1.1z"/>'
		},
		Vercel: {
			color: '#000000',
			icon: '<path d="M24 22.525H0l12-21.05 12 21.05z"/>'
		},
		'Next.js': {
			color: '#000000',
			icon: '<path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>'
		},
		Svelte: {
			color: '#FF3E00',
			icon: '<path d="M20.68 3.17a7.3 7.3 0 0 0-9.8-1.88L5.32 5.22a6.12 6.12 0 0 0-2.78 4.12 6.4 6.4 0 0 0 .64 4.12 6.12 6.12 0 0 0-.92 2.28 6.48 6.48 0 0 0 1.12 4.94 7.3 7.3 0 0 0 9.8 1.88l5.56-3.93a6.12 6.12 0 0 0 2.78-4.12 6.4 6.4 0 0 0-.64-4.12 6.12 6.12 0 0 0 .92-2.28 6.48 6.48 0 0 0-1.12-4.94zM9.88 20.12a4.38 4.38 0 0 1-4.72-1.64 3.9 3.9 0 0 1-.68-2.96 3.68 3.68 0 0 1 .16-.64l.12-.32.28.2a7.26 7.26 0 0 0 2.2 1.24l.2.08-.02.2a1.18 1.18 0 0 0 .22.84 1.32 1.32 0 0 0 1.42.5 1.22 1.22 0 0 0 .36-.14l5.56-3.92a1.14 1.14 0 0 0 .52-.78 1.18 1.18 0 0 0-.2-.9 1.32 1.32 0 0 0-1.42-.5 1.22 1.22 0 0 0-.36.14l-2.12 1.5a4.02 4.02 0 0 1-1.2.48 4.38 4.38 0 0 1-4.72-1.64 3.9 3.9 0 0 1-.68-2.96 3.76 3.76 0 0 1 1.72-2.58l5.56-3.92a4.02 4.02 0 0 1 1.2-.48 4.38 4.38 0 0 1 4.72 1.64 3.9 3.9 0 0 1 .68 2.96 3.68 3.68 0 0 1-.16.64l-.12.32-.28-.2a7.26 7.26 0 0 0-2.2-1.24l-.2-.08.02-.2a1.18 1.18 0 0 0-.22-.84 1.32 1.32 0 0 0-1.42-.5 1.22 1.22 0 0 0-.36.14l-5.56 3.92a1.14 1.14 0 0 0-.52.78 1.18 1.18 0 0 0 .2.9 1.32 1.32 0 0 0 1.42.5 1.22 1.22 0 0 0 .36-.14l2.12-1.5a4.02 4.02 0 0 1 1.2-.48 4.38 4.38 0 0 1 4.72 1.64 3.9 3.9 0 0 1 .68 2.96 3.76 3.76 0 0 1-1.72 2.58l-5.56 3.92a4.02 4.02 0 0 1-1.2.48z"/>'
		},
		React: {
			color: '#61DAFB',
			icon: '<circle cx="12" cy="12" r="2.5" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.5" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.5" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.5" fill="none" transform="rotate(120 12 12)"/>'
		},
		Squarespace: {
			color: '#222222',
			icon: '<path d="M22.655 8.719c-1.802-1.801-4.726-1.801-6.528 0l-7.851 7.85c-.903.902-.903 2.364 0 3.266.903.901 2.365.901 3.267 0l6.391-6.39a.726.726 0 0 0 0-1.022.723.723 0 0 0-1.022 0l-6.39 6.39c-.339.339-.89.339-1.228 0a.869.869 0 0 1 0-1.228l7.851-7.85c1.24-1.24 3.25-1.24 4.49 0 1.239 1.24 1.239 3.25 0 4.489l-8.122 8.122c-2.142 2.142-5.616 2.142-7.758 0-2.142-2.143-2.142-5.617 0-7.759l6.391-6.39a.726.726 0 0 0 0-1.022.723.723 0 0 0-1.022 0l-6.39 6.39c-2.706 2.706-2.706 7.095 0 9.801 2.706 2.706 7.095 2.706 9.8 0l8.122-8.122c1.8-1.8 1.8-4.726 0-6.525z"/>'
		},
		WordPress: {
			color: '#21759B',
			icon: '<path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.443 12c0-1.156.232-2.26.648-3.267l3.57 9.78A8.566 8.566 0 0 1 3.443 12zm8.557 8.557c-.905 0-1.78-.152-2.598-.428l2.76-8.017 2.828 7.749c.019.045.041.086.064.127a8.526 8.526 0 0 1-3.054.569zm1.238-12.607c.553-.029 1.052-.088 1.052-.088.495-.059.437-.786-.059-.757 0 0-1.488.117-2.448.117-.902 0-2.42-.117-2.42-.117-.495-.029-.553.728-.059.757 0 0 .47.059.965.088l1.432 3.924-2.012 6.036-3.35-9.96c.554-.029 1.052-.088 1.052-.088.495-.059.437-.786-.058-.757 0 0-1.488.117-2.449.117-.172 0-.375-.004-.592-.012A8.532 8.532 0 0 1 12 3.443c2.213 0 4.229.847 5.745 2.232-.037-.002-.072-.01-.111-.01-1.022 0-1.748.99-1.748 2.053 0 .758.369 1.4.758 2.159.293.583.635 1.33.635 2.41 0 .748-.222 1.691-.635 2.818l-.832 2.782-3.014-8.967zm3.918 12.007l2.8-8.092c.523-1.305.697-2.348.697-3.277 0-.337-.022-.65-.062-.94A8.537 8.537 0 0 1 20.557 12a8.547 8.547 0 0 1-3.401 6.957z"/>'
		},
		Framer: {
			color: '#0055FF',
			icon: '<path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>'
		}
	};

	const ecommerceTech = ['Python', 'OpenCV', 'AWS S3', 'Supabase', 'OpenAI', 'Streamlit', 'Lightspeed'];
	const feedmeTech = ['Python', 'TypeScript', 'Go', 'FastAPI', 'Supabase', 'OpenAI', 'OR-Tools', 'Grafana'];
	const chatbotTech = ['Python', 'OpenAI', 'AWS'];
	const websiteTech = ['Shopify', 'Lightspeed', 'Squarespace', 'WordPress', 'Vercel', 'Next.js', 'Svelte', 'React', 'Framer'];

	function checkMobile() {
		isMobile = window.innerWidth < 900;
	}

	function initMermaid(isDark: boolean) {
		const themeVariables = isDark
			? {
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
			  }
			: {
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

		mermaid.initialize({
			startOnLoad: false,
			theme: isDark ? 'dark' : 'default',
			themeVariables,
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
	}

	onMount(() => {
		ready = true;
		checkMobile();
		lastMobileState = isMobile;
		lastDarkModeState = $darkMode;
		window.addEventListener('resize', handleResize);

		initMermaid($darkMode);

		// Subscribe to dark mode changes to re-render charts
		const unsubscribe = darkMode.subscribe((isDark) => {
			if (lastDarkModeState !== null && lastDarkModeState !== isDark) {
				initMermaid(isDark);
				// Re-render charts if they're visible
				if (mermaidRendered) {
					mermaidRendered = false;
					renderEcommerce();
				}
				if (feedmeRendered) {
					feedmeRendered = false;
					renderFeedme();
				}
			}
			lastDarkModeState = isDark;
		});

		return () => {
			window.removeEventListener('resize', handleResize);
			unsubscribe();
		};
	});

	function handleResize() {
		checkMobile();
		// Re-render diagrams if mobile state changed
		if (lastMobileState !== isMobile) {
			lastMobileState = isMobile;
			if (mermaidRendered) {
				mermaidRendered = false;
				renderEcommerce();
			}
			if (feedmeRendered) {
				feedmeRendered = false;
				renderFeedme();
			}
		}
	}

	let renderCount = 0;

	async function renderEcommerce() {
		if (mermaidContainer) {
			try {
				renderCount++;
				const { svg } = await mermaid.render(`ecommerce-diagram-${renderCount}`, ecommerceDiagram);
				mermaidContainer.innerHTML = svg;
				mermaidRendered = true;
			} catch (e) {
				console.error('Mermaid render error:', e);
			}
		}
	}

	async function renderFeedme() {
		if (feedmeContainer) {
			try {
				renderCount++;
				const { svg } = await mermaid.render(`feedme-diagram-${renderCount}`, feedmeDiagram);
				feedmeContainer.innerHTML = svg;
				feedmeRendered = true;
			} catch (e) {
				console.error('Mermaid render error:', e);
			}
		}
	}

	$effect(() => {
		if (pipelineExpanded && !mermaidRendered) {
			renderEcommerce();
		}
	});

	$effect(() => {
		if (feedmeExpanded && !feedmeRendered) {
			renderFeedme();
		}
	});

	const work = [
		{
			id: 'ecommerce',
			title: 'Ecom Inventory Cleanup System',
			desc: 'Built a CV/OCR pipeline to clean up inventory for a business with untagged products. Employees took photos that fed into a computer vision pipeline, where AI-generated product data was validated and inserted into their POS and ecom systems. Client went from weeks of manual data entry to same-day processing.',
			tags: ['Python', 'Computer Vision', 'Supabase'],
			expandable: true
		},
		{
			id: 'feedme',
			title: 'FeedMe - UCLA Dining Startup',
			desc: 'Generates personalized meal plans for students using their school\'s dining hall menus. Factors in nutritional goals, dietary restrictions, and preferences.',
			tags: ['Python', 'FastAPI', 'Google OR-Tools', 'Go'],
			expandable: true
		},
		{
			id: 'chatbot',
			title: 'AI Underwriting Chatbot',
			desc: 'RAG-powered chatbot for New York Life that queries their underwriting manual. Made it to the finals of their company-wide AI competition.',
			tags: ['Python', 'OpenAI', 'AWS'],
			expandable: false
		},
		{
			id: 'website',
			title: 'Ecom Storefront Designs',
			desc: 'Full redesigns and facelifts for ecommerce businesses. Multiple platforms, modern frameworks, conversion-focused.',
			tags: ['Shopify', 'Lightspeed', 'Vercel', 'Next.js', 'Svelte', 'React', 'Framer'],
			expandable: true
		}
	];
</script>

<div class="page">
	<!-- Background -->
	<div class="bg">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
		<div class="grid-lines"></div>
	</div>

	<!-- Hero -->
	<section id="hero" class="hero">
		{#if ready}
			<Motion
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				let:motion
			>
				<div use:motion class="hero-content">
					<h1>Lutz Consulting Group</h1>
					<p>
						We'll solve your problems<br/>wherever you are in your tech journey.
					</p>
					<a href="mailto:{profile.email}" class="btn-primary">
						Email me
					</a>
				</div>
			</Motion>
		{/if}
	</section>

	<!-- Services -->
	<section id="services" class="services">
		<div class="section-header">
			<span class="label">Services</span>
			<h2>What I Can Build for You</h2>
		</div>

		<div class="services-grid">
			<Motion initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} let:motion>
				<div use:motion class="service-card">
					<div class="service-icon-large">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
							<path d="M9 22V12h6v10"/>
						</svg>
					</div>
					<h3>E-commerce & Storefronts</h3>
					<p>Full redesigns and facelifts for online stores. Shopify, Lightspeed, custom builds, whatever platform fits your business.</p>
					<ul class="service-features">
						<li>Shopify & Lightspeed</li>
						<li>Custom storefronts</li>
						<li>Inventory systems</li>
					</ul>
				</div>
			</Motion>

			<Motion initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} let:motion>
				<div use:motion class="service-card">
					<div class="service-icon-large">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
						</svg>
					</div>
					<h3>Automation & Integrations</h3>
					<p>Connect your tools. Automate the boring stuff. Data pipelines, webhooks, scheduled jobs that run while you sleep.</p>
					<ul class="service-features">
						<li>API integrations</li>
						<li>Data pipelines</li>
						<li>Scheduled tasks</li>
					</ul>
				</div>
			</Motion>

			<Motion initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} let:motion>
				<div use:motion class="service-card">
					<div class="service-icon-large">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<circle cx="12" cy="12" r="3"/>
							<path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
						</svg>
					</div>
					<h3>AI & Machine Learning</h3>
					<p>Chatbots, document processing, predictions. ML that actually works in production, not just demos that break in the real world.</p>
					<ul class="service-features">
						<li>RAG & chatbots</li>
						<li>Computer vision</li>
						<li>Custom models</li>
					</ul>
				</div>
			</Motion>

			<Motion initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} let:motion>
				<div use:motion class="service-card">
					<div class="service-icon-large">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<rect x="3" y="3" width="18" height="18" rx="2"/>
							<path d="M3 9h18M9 21V9"/>
						</svg>
					</div>
					<h3>Web Apps & Dashboards</h3>
					<p>Custom tools that replace your spreadsheet chaos. Inventory management, admin panels, customer portals, built to fit your workflow.</p>
					<ul class="service-features">
						<li>Real-time data sync</li>
						<li>Role-based access</li>
						<li>Mobile-friendly</li>
					</ul>
				</div>
			</Motion>
		</div>
	</section>

	<!-- Work -->
	<section id="work" class="work">
		<div class="section-header">
			<span class="label">Recent Work</span>
			<h2>Some Things I've Built</h2>
		</div>

		<div class="work-grid">
			{#each work as project, i}
				<Motion
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: i * 0.1 }}
					let:motion
				>
					<article
						use:motion
						class="work-card"
						class:expandable={project.expandable}
						class:expanded={(project.id === 'ecommerce' && pipelineExpanded) || (project.id === 'feedme' && feedmeExpanded) || (project.id === 'website' && websiteExpanded)}
					>
						<button
							class="card-header"
							onclick={() => {
								if (project.id === 'ecommerce') pipelineExpanded = !pipelineExpanded;
								if (project.id === 'feedme') feedmeExpanded = !feedmeExpanded;
								if (project.id === 'website') websiteExpanded = !websiteExpanded;
							}}
							disabled={!project.expandable}
						>
							<div class="card-content">
								<h3>{project.title}</h3>
								<p>{project.desc}</p>
								<!-- Tech icons (always visible) -->
								{#if project.id === 'ecommerce'}
									<div class="tech-stack-inline">
										<div class="tech-icons">
											{#each ecommerceTech as tech}
												<div class="tech-icon-wrapper">
													<span class="tech-tooltip">{tech}</span>
													<div class="tech-icon" style="background: {techIcons[tech]?.color || '#666'}">
														<svg viewBox="0 0 24 24" fill="currentColor">
															{@html techIcons[tech]?.icon || ''}
														</svg>
													</div>
												</div>
											{/each}
										</div>
									</div>
								{/if}
								{#if project.id === 'feedme'}
									<div class="tech-stack-inline">
										<div class="tech-icons">
											{#each feedmeTech as tech}
												<div class="tech-icon-wrapper">
													<span class="tech-tooltip">{tech}</span>
													<div class="tech-icon" style="background: {techIcons[tech]?.color || '#666'}">
														<svg viewBox="0 0 24 24" fill="currentColor">
															{@html techIcons[tech]?.icon || ''}
														</svg>
													</div>
												</div>
											{/each}
										</div>
									</div>
								{/if}
								{#if project.id === 'chatbot'}
									<div class="tech-stack-inline">
										<div class="tech-icons">
											{#each chatbotTech as tech}
												<div class="tech-icon-wrapper">
													<span class="tech-tooltip">{tech}</span>
													<div class="tech-icon" style="background: {techIcons[tech]?.color || '#666'}">
														<svg viewBox="0 0 24 24" fill="currentColor">
															{@html techIcons[tech]?.icon || ''}
														</svg>
													</div>
												</div>
											{/each}
										</div>
									</div>
								{/if}
								{#if project.id === 'website'}
									<div class="tech-stack-inline">
										<div class="tech-icons">
											{#each websiteTech as tech}
												<div class="tech-icon-wrapper">
													<span class="tech-tooltip">{tech}</span>
													<div class="tech-icon" style="background: {techIcons[tech]?.color || '#666'}">
														<svg viewBox="0 0 24 24" fill="currentColor">
															{@html techIcons[tech]?.icon || ''}
														</svg>
													</div>
												</div>
											{/each}
										</div>
									</div>
								{/if}
							</div>
							{#if project.expandable}
								<div class="expand-icon" class:rotated={(project.id === 'ecommerce' && pipelineExpanded) || (project.id === 'feedme' && feedmeExpanded) || (project.id === 'website' && websiteExpanded)}>
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M6 9l6 6 6-6"/>
									</svg>
								</div>
							{/if}
						</button>

						{#if project.id === 'ecommerce'}
							<div class="pipeline-container" class:visible={pipelineExpanded}>
								<div class="mermaid-wrapper" bind:this={mermaidContainer}></div>
							</div>
						{/if}

						{#if project.id === 'feedme'}
							<div class="pipeline-container" class:visible={feedmeExpanded}>
								<div class="mermaid-wrapper" bind:this={feedmeContainer}></div>
							</div>
						{/if}

						{#if project.id === 'website'}
							<div class="pipeline-container" class:visible={websiteExpanded}>
								<div class="examples-section">
									<span class="examples-label">See some examples</span>
									<div class="example-links">
										<a href="https://thesparklingshoe.com" target="_blank" rel="noopener noreferrer" class="example-link">
											<span>The Sparkling Shoe</span>
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
											</svg>
										</a>
										<a href="https://www.thedancestore.com" target="_blank" rel="noopener noreferrer" class="example-link">
											<span>The Dance Store</span>
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
											</svg>
										</a>
									</div>
								</div>
							</div>
						{/if}
					</article>
				</Motion>
			{/each}
		</div>
	</section>

	<!-- CTA -->
	<section id="cta" class="cta">
		<Motion initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} let:motion>
			<div use:motion class="cta-content">
				<h2>Got a Project?</h2>
				<p>Tell me what you're trying to build. I'll let you know if I can help.</p>
				<a href="mailto:{profile.email}" class="btn-primary btn-lg">
					Email me
				</a>
			</div>
		</Motion>
	</section>
</div>

<style>
	.page {
		--accent: var(--color-accent);
		--accent-secondary: var(--color-accent-secondary);
		--text: var(--color-text-primary);
		--text-muted: var(--color-text-secondary);
		--text-dim: var(--color-text-secondary);
		--border: var(--color-border);
		--card: var(--color-surface);
		--card-hover: var(--color-surface-hover);
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* Background */
	.bg {
		position: fixed;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.4;
	}

	.orb-1 {
		width: 600px;
		height: 600px;
		background: var(--accent);
		top: -200px;
		right: -100px;
	}

	.orb-2 {
		width: 400px;
		height: 400px;
		background: var(--accent-secondary);
		bottom: 20%;
		left: -100px;
		opacity: 0.2;
	}

	.grid-lines {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
		background-size: 80px 80px;
		mask-image: radial-gradient(ellipse 100% 80% at 50% 20%, black, transparent);
	}

	/* Hero */
	.hero {
		width: 100%;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8rem 1.5rem;
		position: relative;
		box-sizing: border-box;
	}

	.hero-content {
		max-width: 720px;
		text-align: center;
		width: 100%;
		padding: 0 1rem;
		box-sizing: border-box;
	}

	h1 {
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 600;
		line-height: 1.1;
		letter-spacing: -0.03em;
		margin-bottom: 1.5rem;
	}

	.hero-content > p {
		font-size: 1.25rem;
		color: var(--text-muted);
		line-height: 1.6;
		max-width: 540px;
		margin: 0 auto 2rem;
	}

	.hero-cta {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 1.5rem;
		background: var(--accent);
		color: #000;
		font-weight: 600;
		font-size: 0.9375rem;
		border-radius: 8px;
		text-decoration: none;
		transition: all 0.2s;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 40px rgba(16, 185, 129, 0.3);
	}

	.btn-lg {
		padding: 1rem 2rem;
		font-size: 1rem;
	}

	.response-time {
		font-size: 0.875rem;
		color: var(--text-dim);
	}

	/* Sections */
	section:not(.hero) {
		width: 100%;
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
		padding: 6rem 1.5rem;
		position: relative;
		box-sizing: border-box;
	}

	.section-header {
		margin-bottom: 3rem;
		text-align: center;
	}

	.label {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--accent);
		margin-bottom: 0.75rem;
	}

	.section-header h2 {
		font-size: 1.75rem;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	/* Work */
	.work {
		border-top: 1px solid var(--border);
	}

	.work-grid {
		display: grid;
		gap: 1rem;
	}

	.work-card {
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 2rem;
		transition: all 0.25s;
		overflow: visible;
	}

	.work-card:hover {
		background: var(--card-hover);
		border-color: var(--accent);
		transform: translateY(-2px);
		box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.15);
	}

	.work-card.expandable {
		cursor: pointer;
	}

	.work-card.expandable:hover h3 {
		color: var(--accent);
	}

	.work-card h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
	}

	.work-card p {
		font-size: 0.9375rem;
		color: var(--text-muted);
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.tags span {
		font-size: 0.75rem;
		color: var(--text-muted);
		padding: 0.25rem 0.625rem;
		background: var(--color-surface-hover);
		border: 1px solid var(--border);
		border-radius: 4px;
	}

	/* Expandable card */
	.card-header {
		all: unset;
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		cursor: default;
		box-sizing: border-box;
		overflow: visible;
	}

	.work-card.expandable .card-header {
		cursor: pointer;
	}

	.work-card.expandable .card-header:hover .expand-icon {
		color: var(--accent);
	}

	.card-content {
		flex: 1;
		text-align: left;
		min-width: 0;
	}

	.card-content h3,
	.card-content p {
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.expand-icon {
		color: var(--text-dim);
		transition: transform 0.3s ease, color 0.2s;
		flex-shrink: 0;
		margin-top: 0.25rem;
	}

	.expand-icon.rotated {
		transform: rotate(180deg);
		color: var(--accent);
	}

	.work-card.expandable:hover .expand-icon {
		color: var(--accent);
	}

	/* Pipeline / Mermaid */
	.pipeline-container {
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.5s ease, opacity 0.4s ease, margin 0.3s ease;
		opacity: 0;
		margin-top: 0;
	}

	.pipeline-container.visible {
		max-height: 1200px;
		opacity: 1;
		margin-top: 1.5rem;
	}

	.mermaid-wrapper {
		padding: 1.5rem;
		background: rgba(16, 185, 129, 0.03);
		border: 1px solid rgba(16, 185, 129, 0.15);
		border-radius: 12px;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mermaid-wrapper :global(svg) {
		display: block;
		height: auto;
		min-height: 120px;
		max-width: 100%;
	}

	.mermaid-wrapper :global(.nodeLabel) {
		font-family: inherit;
		font-weight: 500;
	}

	.mermaid-wrapper :global(.node rect),
	.mermaid-wrapper :global(.node polygon) {
		rx: 6px;
		ry: 6px;
	}

	.mermaid-wrapper :global(.edgeLabel) {
		font-size: 0.75rem;
	}

	/* Tech Stack */
	.tech-stack {
		margin-bottom: 1.5rem;
		padding: 2.5rem 0 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tech-label {
		display: none;
	}

	.tech-icons {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.875rem;
		padding: 0.25rem;
	}

	.tech-icon-wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tech-tooltip {
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		margin-bottom: 8px;
		padding: 0.5rem 0.75rem;
		background: var(--card);
		color: var(--text);
		font-size: 0.75rem;
		font-weight: 600;
		border-radius: 6px;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s ease;
		z-index: 100;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		border: 1px solid var(--border);
	}

	.tech-icon-wrapper:hover .tech-tooltip {
		opacity: 1;
	}

	.tech-icon {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		cursor: pointer;
	}

	.tech-icon-wrapper:hover .tech-icon {
		transform: scale(1.1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.tech-icon svg {
		width: 26px;
		height: 26px;
	}

	/* Inline tech stack for non-expandable cards */
	.tech-stack-inline {
		margin-top: 1rem;
		padding-top: 1rem;
		padding-bottom: 0.5rem;
		margin-bottom: -0.5rem;
	}

	.tech-stack-inline .tech-icons {
		justify-content: flex-start;
		gap: 0.625rem;
	}

	.tech-stack-inline .tech-icon {
		width: 40px;
		height: 40px;
	}

	.tech-stack-inline .tech-icon svg {
		width: 20px;
		height: 20px;
	}

	/* Examples section */
	.examples-section {
		padding: 2rem;
		background: rgba(16, 185, 129, 0.03);
		border: 1px solid rgba(16, 185, 129, 0.15);
		border-radius: 12px;
		text-align: center;
	}

	.examples-label {
		display: block;
		font-size: 0.875rem;
		color: var(--text-muted);
		margin-bottom: 1.25rem;
		font-weight: 500;
	}

	.example-links {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.example-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		background: rgba(16, 185, 129, 0.1);
		border: 1px solid rgba(16, 185, 129, 0.25);
		border-radius: 8px;
		color: var(--accent);
		text-decoration: none;
		font-weight: 500;
		font-size: 0.9375rem;
		transition: all 0.2s ease;
	}

	.example-link:hover {
		background: rgba(16, 185, 129, 0.2);
		border-color: var(--accent);
		transform: translateY(-2px);
	}

	.example-link svg {
		opacity: 0.7;
		transition: opacity 0.2s;
	}

	.example-link:hover svg {
		opacity: 1;
	}

	/* Services */
	.services {
		border-top: 1px solid var(--border);
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	.service-card {
		padding: 2rem;
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 16px;
		transition: all 0.25s;
		overflow: hidden;
	}

	.service-card h3,
	.service-card p {
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.service-card:hover {
		border-color: rgba(16, 185, 129, 0.3);
		background: var(--card-hover);
		transform: translateY(-4px);
	}

	.service-icon-large {
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(16, 185, 129, 0.1);
		border: 1px solid rgba(16, 185, 129, 0.2);
		border-radius: 12px;
		color: var(--accent);
		margin-bottom: 1.25rem;
	}

	.service-card h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
	}

	.service-card p {
		font-size: 0.9375rem;
		color: var(--text-muted);
		line-height: 1.6;
		margin-bottom: 1.25rem;
	}

	.service-features {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.service-features li {
		font-size: 0.8125rem;
		color: var(--text-dim);
		padding: 0.375rem 0.75rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 6px;
	}

	/* CTA */
	.cta {
		border-top: 1px solid var(--border);
	}

	.cta-content {
		text-align: center;
		padding: 3rem;
		background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(59, 130, 246, 0.05));
		border: 1px solid var(--border);
		border-radius: 20px;
	}

	.cta-content h2 {
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.cta-content p {
		color: var(--text-muted);
		margin-bottom: 1.5rem;
	}

	/* Responsive */
	@media (max-width: 900px) {
		.mermaid-wrapper {
			display: flex;
			justify-content: center;
		}

		.mermaid-wrapper :global(svg) {
			max-width: 100%;
		}
	}

	@media (max-width: 768px) {
		.hero {
			padding: 6rem 1.5rem;
		}

		section:not(.hero) {
			padding: 4rem 1.5rem;
		}

		.services-grid {
			grid-template-columns: 1fr;
		}

		.service-card {
			padding: 1.5rem;
		}

		.work-card {
			padding: 1.5rem;
		}

		.mermaid-wrapper {
			padding: 1rem;
		}

		.tech-icon {
			width: 44px;
			height: 44px;
		}

		.tech-icon svg {
			width: 22px;
			height: 22px;
		}

		.tech-icons {
			gap: 0.625rem;
		}

		.tech-stack-inline .tech-icon {
			width: 36px;
			height: 36px;
		}

		.tech-stack-inline .tech-icon svg {
			width: 18px;
			height: 18px;
		}

		.cta-content {
			padding: 2rem 1.5rem;
		}

		.cta-content h2 {
			font-size: 1.5rem;
		}

		.example-links {
			flex-direction: column;
			gap: 0.75rem;
		}

		.example-link {
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.hero {
			padding: 5rem 1rem;
		}

		section:not(.hero) {
			padding: 3rem 1rem;
		}

		.work-card,
		.service-card {
			padding: 1.25rem;
		}

		.work-card h3 {
			font-size: 1rem;
		}

		.work-card p {
			font-size: 0.875rem;
		}

		.service-card h3 {
			font-size: 1.1rem;
		}

		.service-card p {
			font-size: 0.875rem;
		}

		.tech-stack-inline .tech-icon {
			width: 32px;
			height: 32px;
		}

		.tech-stack-inline .tech-icon svg {
			width: 16px;
			height: 16px;
		}

		.tech-stack-inline .tech-icons {
			gap: 0.5rem;
		}

		.examples-section {
			padding: 1.25rem;
		}

		.cta-content {
			padding: 1.5rem 1rem;
		}

		.cta-content h2 {
			font-size: 1.375rem;
		}

		.btn-lg {
			padding: 0.875rem 1.5rem;
			font-size: 0.9375rem;
		}
	}
</style>
