<script lang="ts">
	import { enhance } from '$app/forms';
	import { tick } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { consultingSite } from '$lib/content/consulting-prototype';
	import { track, trackOutbound } from '$lib/analytics';
	import type { ContactFormState } from '$lib/types/consulting-contact';

	let { showWork = true, contactForm }: { showWork?: boolean; contactForm?: ContactFormState } = $props();
	const projects = consultingSite.workPreview.projects;
	const options = consultingSite.finalCta.options;
	let selectedOption = $state<string>(options[0]);
	let submitting = $state(false);
	let formElement: HTMLFormElement;
	let response = $state<ContactFormState | undefined>();
	let activeResponse = $derived(response ?? contactForm);
	let mailHref = $derived(`mailto:${consultingSite.contactEmail}?subject=${encodeURIComponent(`${selectedOption} project | Lutz Consulting Group`)}&body=${encodeURIComponent(`I’d like help with: ${selectedOption}\n\nHere’s what exists today:\n\nThe part I’d most like to stop carrying:\n\nLinks or context:\n`)}`);

	$effect(() => {
		if (contactForm) {
			response = contactForm;
			if (contactForm.values?.projectType && options.some((option) => option === contactForm.values?.projectType)) {
				selectedOption = contactForm.values.projectType;
			}
		}
	});

	const enhanceContact: SubmitFunction = () => {
		submitting = true;
		response = undefined;
		return async ({ result, update }) => {
			submitting = false;
			if (result.type === 'success' || result.type === 'failure') {
				response = result.data as ContactFormState;
				if (result.type === 'success') {
					track('contact_form_submit', { source: 'consulting_prototype', project_type: selectedOption });
				}
				await update({ reset: result.type === 'success', invalidateAll: false });
				if (result.type === 'failure') {
					await tick();
					formElement.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
				}
				return;
			}
			if (result.type === 'error') {
				response = { success: false, message: 'The message did not send. Use the direct email link below instead.' };
				return;
			}
			await update();
		};
	};
</script>

{#if showWork}
	<section class="work-showcase shell" id="work" data-motion-section>
		<header class="section-heading">
			<div><p class="eyebrow" data-motion-item>{consultingSite.workPreview.eyebrow}</p><h2 data-motion-item>{consultingSite.workPreview.title}</h2></div>
			<div class="heading-detail" data-motion-item><p>{consultingSite.workPreview.body}</p><a class="text-button" href="/consulting/work">{consultingSite.workPreview.cta}</a></div>
		</header>

		<div class="project-stage" aria-label="Selected Lutz Consulting Group work" data-motion-item>
			<div class="stage-depth" aria-hidden="true"></div>
			<div class="project-grid">
				{#each projects as project, index}
					<a class={`project-card project-${index + 1}`} href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`} onclick={() => trackOutbound(project.url, 'proto_work_showcase')}>
						<div class="project-media">
							<img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
							{#if project.name === 'The Sparkling Shoe'}<img class="product-inset" src="/consulting/prototypes/sparkling-fresh.jpg" alt="Toe-tally Fresh pointe shoe inserts" loading="lazy" decoding="async" />{/if}
						</div>
						<div class="project-caption"><span><small>0{index + 1} / 04 · {project.category}</small><strong>{project.name}</strong></span><em>{project.host}</em></div>
					</a>
				{/each}
			</div>
			<div class="project-thread" aria-hidden="true"><i></i></div>
		</div>
	</section>
{/if}

<section class="project-cta" id="contact" data-motion-section>
	<div class="cta-grid shell">
		<div class="cta-copy">
			<p class="eyebrow" data-motion-item>{consultingSite.finalCta.eyebrow}</p>
			<h2 data-motion-item>{consultingSite.finalCta.title.lead}<br /><em>{consultingSite.finalCta.title.emphasis}</em></h2>
			<p data-motion-item>{consultingSite.finalCta.body}</p>
		</div>

		<form class="brief-builder" method="POST" action="?/contact" use:enhance={enhanceContact} bind:this={formElement} aria-busy={submitting} data-motion-item>
			<header><span>PROJECT STARTER</span><small>Choose the closest answer</small></header>
			<div class="brief-question">
				<small id="project-type-label">WHAT ARE WE STARTING WITH?</small>
				<div role="radiogroup" aria-labelledby="project-type-label" aria-invalid={Boolean(activeResponse?.errors?.projectType)} aria-describedby={activeResponse?.errors?.projectType ? 'project-type-error' : undefined}>
					{#each options as option, index}
						<label class:selected={selectedOption === option}>
							<input type="radio" name="projectType" value={option} bind:group={selectedOption} />
							<i aria-hidden="true"></i><span>{option}</span><small>0{index + 1}</small>
						</label>
					{/each}
				</div>
				{#if activeResponse?.errors?.projectType}<p class="field-error" id="project-type-error">{activeResponse.errors.projectType}</p>{/if}
			</div>
			<div class="brief-summary">
				<div><small>SELECTED STARTING POINT</small><strong>{selectedOption}</strong><p>A link, screen recording, spreadsheet, or rough explanation is enough.</p></div>
			</div>
			<div class="contact-fields">
				<label>
					<span>YOUR NAME</span>
					<input name="name" autocomplete="name" required maxlength="100" value={activeResponse?.values?.name ?? ''} aria-invalid={Boolean(activeResponse?.errors?.name)} aria-describedby={activeResponse?.errors?.name ? 'contact-name-error' : undefined} />
					{#if activeResponse?.errors?.name}<small id="contact-name-error">{activeResponse.errors.name}</small>{/if}
				</label>
				<label>
					<span>EMAIL</span>
					<input type="email" name="email" autocomplete="email" required maxlength="254" value={activeResponse?.values?.email ?? ''} aria-invalid={Boolean(activeResponse?.errors?.email)} aria-describedby={activeResponse?.errors?.email ? 'contact-email-error' : undefined} />
					{#if activeResponse?.errors?.email}<small id="contact-email-error">{activeResponse.errors.email}</small>{/if}
				</label>
				<label class="message-field">
					<span>WHAT EXISTS TODAY?</span>
					<textarea name="message" required minlength="10" maxlength="4000" rows="5" value={activeResponse?.values?.message ?? ''} aria-invalid={Boolean(activeResponse?.errors?.message)} aria-describedby={activeResponse?.errors?.message ? 'contact-message-error' : undefined}></textarea>
					{#if activeResponse?.errors?.message}<small id="contact-message-error">{activeResponse.errors.message}</small>{/if}
				</label>
			</div>
			<label class="honeypot" aria-hidden="true">Company<input name="company" tabindex="-1" autocomplete="off" /></label>
			<div class="form-actions">
				<button class="submit-button" type="submit" disabled={submitting}><span>{submitting ? 'Sending…' : 'Send project brief'}</span><small>Direct to Lutz Consulting Group</small></button>
				<p>Prefer email? <a href={mailHref} onclick={() => track('email_click', { source: 'consulting_prototype', location: 'final_cta_fallback', project_type: selectedOption })}>{consultingSite.finalCta.emailLabel}</a></p>
			</div>
			{#if activeResponse?.message}<p class:success={activeResponse.success} class="form-status" role="status" aria-live="polite">{activeResponse.message}</p>{/if}
		</form>
	</div>
</section>

<style>
	.shell{width:min(1380px,calc(100% - 80px));margin:0 auto}.eyebrow{margin:0 0 24px;color:var(--proto-brass);font:500 9px var(--proto-mono);letter-spacing:.14em}.work-showcase{padding:125px 0 145px;scroll-margin-top:84px;content-visibility:auto;contain-intrinsic-size:auto 1320px}.section-heading{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr);gap:100px;align-items:end;margin-bottom:64px}.section-heading h2{margin:0;color:var(--proto-text);font:400 clamp(60px,7vw,104px)/.88 var(--proto-display);letter-spacing:-.045em}.heading-detail{max-width:510px;justify-self:end}.heading-detail p{margin:0 0 30px;color:var(--proto-muted);font-size:15px;line-height:1.75}.text-button{display:inline-flex;padding:13px 16px;color:var(--proto-bg);background:var(--proto-paper);font-size:12px;font-weight:600;text-decoration:none;transition:background .25s ease,transform .25s ease}.text-button:hover{background:var(--proto-brass);transform:translateY(-2px)}.text-button:focus-visible{outline:2px solid var(--proto-brass);outline-offset:4px}
	.project-stage{position:relative;overflow:hidden;padding:18px;border:1px solid var(--proto-line-strong);background:var(--proto-surface);isolation:isolate}.stage-depth{position:absolute;inset:0;background:linear-gradient(135deg,rgba(7,84,63,.46),transparent 44%),linear-gradient(180deg,transparent 55%,rgba(0,0,0,.28))}.project-grid{position:relative;z-index:2;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:18px}.project-card{display:block;min-width:0;overflow:hidden;border:1px solid var(--proto-line-strong);color:inherit;background:#0b0e0c;text-decoration:none;transition:transform .45s cubic-bezier(.2,.75,.2,1),border-color .25s ease}.project-1,.project-4{grid-column:span 7}.project-2,.project-3{grid-column:span 5}.project-card:hover{border-color:rgba(240,239,233,.4);transform:translateY(-4px)}.project-card:focus-visible{outline:2px solid var(--proto-brass);outline-offset:4px}.project-media{position:relative;aspect-ratio:16/9;overflow:hidden;border-bottom:1px solid var(--proto-line)}.project-media>img:first-child{display:block;width:100%;height:100%;object-fit:cover;object-position:top center;filter:saturate(.88) brightness(.86);transition:filter .3s ease,transform .65s cubic-bezier(.2,.75,.2,1)}.project-card:hover .project-media>img:first-child,.project-card:focus-visible .project-media>img:first-child{filter:saturate(1) brightness(.96);transform:scale(1.012)}.product-inset{position:absolute;right:12px;bottom:12px;width:27%;height:42%;object-fit:cover;border:1px solid rgba(28,24,21,.35);box-shadow:0 12px 30px rgba(0,0,0,.3)}.project-caption{min-height:82px;padding:14px 16px;display:flex;align-items:flex-end;justify-content:space-between;gap:18px;background:#0c100d}.project-caption span{min-width:0}.project-caption small{display:block;overflow:hidden;color:#7c857e;font:500 9px var(--proto-mono);letter-spacing:.07em;text-overflow:ellipsis;white-space:nowrap}.project-caption strong{display:block;margin-top:8px;color:var(--proto-paper);font:400 24px/1 var(--proto-display)}.project-caption em{color:#737c75;font:500 9px var(--proto-mono);font-style:normal;white-space:nowrap}.project-thread{position:absolute;z-index:1;left:0;right:0;top:50%;height:1px;background:rgba(180,154,103,.38)}.project-thread i{position:absolute;left:50%;top:-4px;width:9px;height:9px;background:var(--proto-brass)}
	.project-cta{position:relative;overflow:hidden;border-top:1px solid var(--proto-line);background:linear-gradient(135deg,#071a14,#0d2d24 52%,#082119)}
	.project-cta::before{content:'';position:absolute;left:0;right:0;top:42%;height:1px;background:rgba(240,239,233,.09)}
	.cta-grid{position:relative;z-index:1;min-height:860px;padding:105px 0;display:grid;grid-template-columns:minmax(0,.9fr) minmax(540px,1.1fr);gap:clamp(64px,7vw,112px);align-items:center}
	.cta-copy h2{max-width:760px;margin:0;color:var(--proto-text);font:400 clamp(66px,7vw,108px)/.86 var(--proto-display);letter-spacing:-.045em}
	.cta-copy h2 em{font-weight:400;color:var(--proto-paper)}
	.cta-copy>p:not(.eyebrow){max-width:550px;margin:31px 0 0;color:#a7b1aa;font-size:15px;line-height:1.72}
	.brief-builder{position:relative;overflow:hidden;border:1px solid rgba(240,239,233,.2);background:#090d0a;box-shadow:0 36px 90px rgba(0,0,0,.28)}
	.brief-builder>header{height:52px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--proto-line);color:#a1a69f;background:#0d120e;font:500 9px var(--proto-mono);letter-spacing:.08em}
	.brief-builder>header small{font:inherit;color:#697169}
	.brief-question{padding:25px 25px 18px}
	.brief-question>small,.brief-summary>div>small{display:block;margin-bottom:13px;color:#8b928c;font:500 9px var(--proto-mono);letter-spacing:.1em}
	.brief-question>div{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid rgba(240,239,233,.11);border-left:1px solid rgba(240,239,233,.11)}
	.brief-question label{position:relative;min-height:72px;padding:14px;display:grid;grid-template-columns:13px 1fr auto;gap:11px;align-items:center;border-right:1px solid rgba(240,239,233,.11);border-bottom:1px solid rgba(240,239,233,.11);color:#959c96;background:rgba(255,255,255,.006);cursor:pointer;transition:color .2s ease,background .2s ease}
	.brief-question label:hover{background:rgba(180,154,103,.045)}
	.brief-question label.selected{color:#e2e3de;background:rgba(180,154,103,.075)}
	.brief-question label:focus-within{z-index:1;outline:2px solid var(--proto-brass);outline-offset:-2px}
	.brief-question label>input{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}
	.brief-question label>i{position:relative;width:12px;height:12px;border:1px solid #5c625d}
	.brief-question label.selected>i{border-color:var(--proto-brass)}
	.brief-question label.selected>i::after{content:'';position:absolute;inset:3px;background:var(--proto-brass)}
	.brief-question label>span{font-size:10px}
	.brief-question label>small{color:#5d655f;font:500 9px var(--proto-mono)}
	.field-error{margin:10px 0 0;color:#c89a84;font-size:10px}
	.brief-summary{padding:0 25px 20px}
	.brief-summary>div{padding-top:18px;border-top:1px solid var(--proto-line)}
	.brief-summary strong{display:block;color:#d9ded9;font:400 22px/1.1 var(--proto-display)}
	.brief-summary p{max-width:430px;margin:8px 0 0;color:#7b837d;font-size:10px;line-height:1.55}
	.contact-fields{padding:0 25px 24px;display:grid;grid-template-columns:1fr 1fr;gap:18px}
	.contact-fields label{display:block}
	.contact-fields label>span{display:block;margin-bottom:8px;color:#8b928c;font:500 9px var(--proto-mono);letter-spacing:.09em}
	.contact-fields input,.contact-fields textarea{width:100%;border:1px solid rgba(240,239,233,.16);border-radius:0;padding:12px 13px;color:#e7e8e2;background:#0d120e;font:400 13px/1.45 var(--proto-sans);outline:none;transition:border-color .2s ease,background .2s ease}
	.contact-fields input{height:44px}
	.contact-fields textarea{min-height:118px;resize:vertical}
	.contact-fields input:focus,.contact-fields textarea:focus{border-color:var(--proto-brass);background:#101611}.contact-fields input:focus-visible,.contact-fields textarea:focus-visible{outline:2px solid var(--proto-brass);outline-offset:2px}
	.contact-fields input[aria-invalid="true"],.contact-fields textarea[aria-invalid="true"]{border-color:#a8735f}
	.contact-fields label>small{display:block;margin-top:7px;color:#c89a84;font-size:10px}
	.message-field{grid-column:1/-1}
	.honeypot{position:absolute!important;left:-10000px!important;top:auto!important;width:1px!important;height:1px!important;overflow:hidden!important}
	.form-actions{padding:0 25px 25px;display:flex;align-items:center;justify-content:space-between;gap:22px}
	.submit-button{min-width:210px;padding:13px 15px;display:flex;align-items:flex-start;flex-direction:column;gap:6px;border:1px solid var(--proto-paper);border-radius:0;color:var(--proto-bg);background:var(--proto-paper);font:600 12px var(--proto-sans);text-align:left;cursor:pointer;transition:background .2s ease,border-color .2s ease,transform .2s ease}
	.submit-button:hover:not(:disabled){border-color:var(--proto-brass);background:var(--proto-brass);transform:translateY(-2px)}
	.submit-button:focus-visible{outline:2px solid var(--proto-brass);outline-offset:4px}
	.submit-button:disabled{cursor:wait;opacity:.65}
	.submit-button small{font:500 9px var(--proto-mono);opacity:.6}
	.form-actions>p{margin:0;color:#858d87;font-size:10px;line-height:1.55;text-align:right}
	.form-actions a{color:var(--proto-paper);text-underline-offset:3px}
	.form-status{margin:0;padding:14px 25px;border-top:1px solid rgba(168,115,95,.35);color:#d8b4a4;background:rgba(168,115,95,.07);font-size:11px;line-height:1.55}
	.form-status.success{border-top-color:rgba(180,154,103,.45);color:#dfd2b8;background:rgba(180,154,103,.075)}
	@media(max-width:1100px){.section-heading{gap:55px}.project-caption{align-items:flex-start;flex-direction:column;gap:8px}.cta-grid{grid-template-columns:1fr 1fr;gap:55px}.contact-fields{grid-template-columns:1fr}.message-field{grid-column:auto}}
	@media(max-width:760px){.shell{width:calc(100% - 24px)}.work-showcase{padding:90px 0 100px}.section-heading{grid-template-columns:1fr;gap:28px;margin-bottom:38px}.section-heading h2{font-size:clamp(52px,15vw,70px)}.heading-detail{justify-self:start}.heading-detail p{font-size:14px}.project-stage{margin:0 -12px;padding:12px;border-left:0;border-right:0}.project-grid{grid-template-columns:1fr;gap:12px}.project-1,.project-2,.project-3,.project-4{grid-column:auto}.project-caption{min-height:76px}.project-caption small{white-space:normal}.project-thread{display:none}.product-inset{right:8px;bottom:8px;width:30%;height:44%}.cta-grid{min-height:0;padding:88px 0 72px;grid-template-columns:1fr;gap:60px}.cta-copy h2{font-size:clamp(58px,16vw,78px)}.brief-builder{margin:0 -1px}.brief-builder>header{padding:0 16px}.brief-question{padding:20px 16px 15px}.brief-question>div{grid-template-columns:1fr}.brief-question label{min-height:62px}.brief-summary{padding:0 16px 18px}.contact-fields{padding:0 16px 20px}.form-actions{padding:0 16px 18px;align-items:stretch;flex-direction:column}.submit-button{width:100%}.form-actions>p{text-align:left}.form-status{padding:13px 16px}}
</style>
