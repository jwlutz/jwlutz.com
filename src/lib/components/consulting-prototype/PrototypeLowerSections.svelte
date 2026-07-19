<script lang="ts">
	import { enhance } from '$app/forms';
	import { tick } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { consultingSite, contactFormCopy, montageCopy } from '$lib/content/consulting-prototype';
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
	let mailHref = $derived(`mailto:${consultingSite.contactEmail}?subject=${encodeURIComponent(`${selectedOption} project | ${consultingSite.brand}`)}&body=${encodeURIComponent(`${contactFormCopy.mailIntro} ${selectedOption}\n\n${contactFormCopy.mailPrompts.join('\n\n')}\n`)}`);

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
				response = { success: false, message: contactFormCopy.sendFailed };
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
			<a class="mont mont-window mont-copytrade" href={projects[0].url} target="_blank" rel="noreferrer" aria-label={`Visit ${projects[0].name}`} onclick={() => trackOutbound(projects[0].url, 'proto_work_showcase')}>
				<div class="window-bar"><i></i><i></i><i></i><small>{montageCopy.copytrade}</small></div>
				<img src={projects[0].image} alt={projects[0].imageAlt} loading="lazy" decoding="async" />
			</a>
			<a class="mont mont-window mont-quant" href={projects[1].url} target="_blank" rel="noreferrer" aria-label={`Visit ${projects[1].name}`} onclick={() => trackOutbound(projects[1].url, 'proto_work_showcase')}>
				<div class="window-bar"><i></i><i></i><i></i><small>{montageCopy.quant}</small></div>
				<img src={projects[1].image} alt={projects[1].imageAlt} loading="lazy" decoding="async" />
			</a>
			<a class="mont mont-window mont-tss" href={projects[2].url} target="_blank" rel="noreferrer" aria-label={`Visit ${projects[2].name}`} onclick={() => trackOutbound(projects[2].url, 'proto_work_showcase')}>
				<div class="window-bar"><i></i><i></i><i></i><small>{montageCopy.tss}</small></div>
				<img src={projects[2].image} alt={projects[2].imageAlt} loading="lazy" decoding="async" />
			</a>
			<a class="mont mont-shoe" href={projects[2].url} target="_blank" rel="noreferrer" aria-label="Toe-tally Fresh pointe shoe inserts by The Sparkling Shoe" onclick={() => trackOutbound(projects[2].url, 'proto_work_showcase')}>
				<img src="/consulting/prototypes/sparkling-fresh.jpg" alt="Toe-tally Fresh pointe shoe inserts" loading="lazy" decoding="async" />
				<span>{montageCopy.shoe}</span>
			</a>
			<a class="mont mont-mind" href={projects[3].url} target="_blank" rel="noreferrer" aria-label={`Visit ${projects[3].name}`} onclick={() => trackOutbound(projects[3].url, 'proto_work_showcase')}>
				<small>{montageCopy.mind.tag}</small><strong>{montageCopy.mind.title}</strong><span>{montageCopy.mind.sub}</span>
			</a>
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
			<header><span>{contactFormCopy.header.title}</span><small>{contactFormCopy.header.hint}</small></header>
			<div class="brief-question">
				<small id="project-type-label">{contactFormCopy.question}</small>
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
				<div><small>{contactFormCopy.summaryLabel}</small><strong>{selectedOption}</strong><p>{contactFormCopy.summaryNote}</p></div>
			</div>
			<div class="contact-fields">
				<label>
					<span>{contactFormCopy.fields.name}</span>
					<input name="name" autocomplete="name" required maxlength="100" value={activeResponse?.values?.name ?? ''} aria-invalid={Boolean(activeResponse?.errors?.name)} aria-describedby={activeResponse?.errors?.name ? 'contact-name-error' : undefined} />
					{#if activeResponse?.errors?.name}<small id="contact-name-error">{activeResponse.errors.name}</small>{/if}
				</label>
				<label>
					<span>{contactFormCopy.fields.email}</span>
					<input type="email" name="email" autocomplete="email" required maxlength="254" value={activeResponse?.values?.email ?? ''} aria-invalid={Boolean(activeResponse?.errors?.email)} aria-describedby={activeResponse?.errors?.email ? 'contact-email-error' : undefined} />
					{#if activeResponse?.errors?.email}<small id="contact-email-error">{activeResponse.errors.email}</small>{/if}
				</label>
				<label class="message-field">
					<span>{contactFormCopy.fields.message}</span>
					<textarea name="message" required minlength="10" maxlength="4000" rows="5" value={activeResponse?.values?.message ?? ''} aria-invalid={Boolean(activeResponse?.errors?.message)} aria-describedby={activeResponse?.errors?.message ? 'contact-message-error' : undefined}></textarea>
					{#if activeResponse?.errors?.message}<small id="contact-message-error">{activeResponse.errors.message}</small>{/if}
				</label>
			</div>
			<label class="honeypot" aria-hidden="true">Company<input name="company" tabindex="-1" autocomplete="off" /></label>
			<div class="form-actions">
				<button class="submit-button" type="submit" disabled={submitting}><span>{submitting ? contactFormCopy.submit.busy : contactFormCopy.submit.idle}</span><small>{contactFormCopy.submit.note}</small></button>
				<p>{contactFormCopy.fallbackPrompt} <a href={mailHref} onclick={() => track('email_click', { source: 'consulting_prototype', location: 'final_cta_fallback', project_type: selectedOption })}>{consultingSite.finalCta.emailLabel}</a></p>
			</div>
			{#if activeResponse?.message}<p class:success={activeResponse.success} class="form-status" role="status" aria-live="polite">{activeResponse.message}</p>{/if}
		</form>
	</div>
</section>

<style>
	.shell{width:min(1380px,calc(100% - 80px));margin:0 auto}.eyebrow{margin:0 0 24px;color:var(--proto-brass);font:500 9px var(--proto-mono);letter-spacing:.14em}.work-showcase{padding:125px 0 145px;scroll-margin-top:84px;content-visibility:auto;contain-intrinsic-size:auto 1320px}.section-heading{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr);gap:100px;align-items:end;margin-bottom:64px}.section-heading h2{margin:0;color:var(--proto-text);font:400 clamp(60px,7vw,104px)/.88 var(--proto-display);letter-spacing:-.045em}.heading-detail{max-width:510px;justify-self:end}.heading-detail p{margin:0 0 30px;color:var(--proto-muted);font-size:15px;line-height:1.75}.text-button{display:inline-flex;padding:13px 16px;color:var(--proto-bg);background:var(--proto-paper);font-size:12px;font-weight:600;text-decoration:none;transition:background .25s ease,transform .25s ease}.text-button:hover{background:var(--proto-brass);transform:translateY(-2px)}.text-button:focus-visible{outline:2px solid var(--proto-brass);outline-offset:4px}
	.project-stage{position:relative;height:min(62vw,760px);min-height:600px;overflow:hidden;border:1px solid var(--proto-line-strong);background:var(--proto-surface);isolation:isolate}.stage-depth{position:absolute;inset:0;background:linear-gradient(135deg,rgba(7,84,63,.46),transparent 44%),linear-gradient(180deg,transparent 55%,rgba(0,0,0,.28))}.mont{position:absolute;display:block;overflow:hidden;color:inherit;text-decoration:none;box-shadow:0 30px 90px rgba(0,0,0,.42);transition:transform .55s cubic-bezier(.2,.75,.2,1),box-shadow .55s ease;will-change:transform;transform:rotate(var(--rot,0deg))}.mont:hover,.mont:focus-visible{transform:rotate(var(--rot,0deg)) translateY(-6px);box-shadow:0 42px 110px rgba(0,0,0,.5)}.mont:focus-visible{outline:2px solid var(--proto-brass);outline-offset:4px}.mont-window{background:#101411}.mont-window img{display:block;width:100%;height:calc(100% - 30px);object-fit:cover;object-position:top center;filter:saturate(.92) brightness(.9)}.mont:hover img{filter:saturate(1) brightness(.97)}.window-bar{height:30px;display:flex;align-items:center;gap:5px;padding:0 11px;background:#161a16;border-bottom:1px solid rgba(240,239,233,.08)}.window-bar i{width:8px;height:8px;border-radius:50%;background:linear-gradient(145deg,#3d423e,#262b27)}.window-bar small{margin-left:8px;color:#8a9089;font:500 7px var(--proto-mono);letter-spacing:.1em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mont-copytrade{z-index:2;left:3%;top:5%;width:40%;height:42%;--rot:.6deg}.mont-quant{z-index:1;right:3%;top:5%;width:51%;height:55%;--rot:-.8deg}.mont-tss{z-index:3;left:5%;bottom:6%;width:44%;height:46%;--rot:-.5deg}.mont-shoe{z-index:4;left:43%;bottom:9%;width:17%;height:30%;--rot:1.8deg;background:#eee8dd}.mont-shoe img{display:block;width:100%;height:calc(100% - 26px);object-fit:cover}.mont-shoe span{display:flex;align-items:center;height:26px;padding:0 10px;color:#5c5344;background:#eee8dd;font:500 7px var(--proto-mono);letter-spacing:.1em}.mont-mind{z-index:2;right:4%;bottom:8%;width:29%;padding:20px;color:#171713;background:var(--proto-paper);--rot:-.7deg}.mont-mind small{color:#8a6d3f;font:500 7px var(--proto-mono);letter-spacing:.11em}.mont-mind strong{display:block;margin:10px 0 8px;font:400 26px/1 var(--proto-display)}.mont-mind span{color:#55574f;font-size:10.5px;line-height:1.55}
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
	@media(max-width:1100px){.section-heading{gap:55px}.cta-grid{grid-template-columns:1fr 1fr;gap:55px}.contact-fields{grid-template-columns:1fr}.message-field{grid-column:auto}}
	@media(max-width:760px){.shell{width:calc(100% - 24px)}.work-showcase{padding:90px 0 100px}.section-heading{grid-template-columns:1fr;gap:28px;margin-bottom:38px}.section-heading h2{font-size:clamp(52px,15vw,70px)}.heading-detail{justify-self:start}.heading-detail p{font-size:14px}.project-stage{height:auto;min-height:0;margin:0 -12px;padding:12px;display:flex;flex-direction:column;gap:12px;border-left:0;border-right:0}.mont{position:static;width:auto;height:210px;--rot:0deg}.mont-mind{height:auto}.mont-shoe{height:230px}.cta-grid{min-height:0;padding:88px 0 72px;grid-template-columns:1fr;gap:60px}.cta-copy h2{font-size:clamp(58px,16vw,78px)}.brief-builder{margin:0 -1px}.brief-builder>header{padding:0 16px}.brief-question{padding:20px 16px 15px}.brief-question>div{grid-template-columns:1fr}.brief-question label{min-height:62px}.brief-summary{padding:0 16px 18px}.contact-fields{padding:0 16px 20px}.form-actions{padding:0 16px 18px;align-items:stretch;flex-direction:column}.submit-button{width:100%}.form-actions>p{text-align:left}.form-status{padding:13px 16px}}
</style>
