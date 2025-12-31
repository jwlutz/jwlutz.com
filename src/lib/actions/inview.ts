export function inview(node: HTMLElement, options: { threshold?: number; once?: boolean } = {}) {
	const { threshold = 0.1, once = true } = options;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.classList.add('visible');
					if (once) {
						observer.unobserve(node);
					}
				} else if (!once) {
					node.classList.remove('visible');
				}
			});
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
