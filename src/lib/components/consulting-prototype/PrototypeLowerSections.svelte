<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { consultingSite } from '$lib/content/consulting-prototype';
	import { track, trackOutbound } from '$lib/analytics';
	import type { ContactFormState } from '$lib/types/consulting-contact';

	let { showWork = true, contactForm }: { showWork?: boolean; contactForm?: ContactFormState } = $props();
	const projects = consultingSite.workPreview.projects;
	const options = consultingSite.finalCta.options;
	let selectedOption = $state<string>(options[0]);
	let submitting = $state(false);
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
				return;
			}
			if (result.type === 'error') {
				response = { success: false, message: `The message did not send. Email ${consultingSite.contactEmail} instead.` };
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
			<a class="workspace-window" href={projects[0].url} target="_blank" rel="noreferrer" aria-label={`Visit ${projects[0].name}`} onclick={() => trackOutbound(projects[0].url, 'proto_work_showcase')}>
				<div class="window-bar"><i></i><i></i><i></i><small>CANDELLA QUANT / WORKSPACE</small></div>
				<img src={projects[0].image} alt={projects[0].imageAlt} loading="lazy" decoding="async" />
			</a>
			<a class="shoe-card" href={projects[1].url} target="_blank" rel="noreferrer" aria-label={`Visit ${projects[1].name}`} onclick={() => trackOutbound(projects[1].url, 'proto_work_showcase')}>
				<img src="/consulting/prototypes/sparkling-fresh.jpg" alt="The Sparkling Shoe pointe shoe inserts" loading="lazy" decoding="async" />
				<span>THE SPARKLING SHOE / COMMERCE</span>
			</a>
			<a class="mind-card" href={projects[2].url} target="_blank" rel="noreferrer" aria-label={`Visit ${projects[2].name}`} onclick={() => trackOutbound(projects[2].url, 'proto_work_showcase')}>
				<small>MINDLSN / ADAPTIVE PRODUCT</small><strong>MindLSN</strong><span>Adaptive drills · ELO · integrity checks</span>
			</a>
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

		<form class="brief-builder" method="POST" action="?/contact" use:enhance={enhanceContact} data-motion-item>
			<header><span>PROJECT STARTER</span><small>Choose the closest answer</small></header>
			<div class="brief-question">
				<small>WHAT ARE WE STARTING WITH?</small>
				<div>
					{#each options as option, index}
						<label class:selected={selectedOption === option}>
							<input type="radio" name="projectType" value={option} bind:group={selectedOption} />
							<i aria-hidden="true"></i><span>{option}</span><small>0{index + 1}</small>
						</label>
					{/each}
				</div>
				{#if activeResponse?.errors?.projectType}<p class="field-error">{activeResponse.errors.projectType}</p>{/if}
			</div>
			<div class="brief-summary">
				<div><small>SELECTED STARTING POINT</small><strong>{selectedOption}</strong><p>A link, screen recording, spreadsheet, or rough explanation is enough.</p></div>
			</div>
			<div class="contact-fields">
				<label>
					<span>YOUR NAME</span>
					<input name="name" autocomplete="name" required maxlength="100" value={activeResponse?.values?.name ?? ''} aria-invalid={Boolean(activeResponse?.errors?.name)} />
					{#if activeResponse?.errors?.name}<small>{activeResponse.errors.name}</small>{/if}
				</label>
				<label>
					<span>EMAIL</span>
					<input type="email" name="email" autocomplete="email" required maxlength="254" value={activeResponse?.values?.email ?? ''} aria-invalid={Boolean(activeResponse?.errors?.email)} />
					{#if activeResponse?.errors?.email}<small>{activeResponse.errors.email}</small>{/if}
				</label>
				<label class="message-field">
					<span>WHAT EXISTS TODAY?</span>
					<textarea name="message" required minlength="10" maxlength="4000" rows="5" value={activeResponse?.values?.message ?? ''} aria-invalid={Boolean(activeResponse?.errors?.message)}></textarea>
					{#if activeResponse?.errors?.message}<small>{activeResponse.errors.message}</small>{/if}
				</label>
			</div>
			<label class="honeypot" aria-hidden="true">Company<input name="company" tabindex="-1" autocomplete="off" /></label>
			<div class="form-actions">
				<button class="submit-button" type="submit" disabled={submitting}><span>{submitting ? 'Sending…' : 'Send project brief'}</span><small>Direct to Lutz Consulting Group</small></button>
				<p>Prefer email? <a href={mailHref} onclick={() => track('email_click', { source: 'consulting_prototype', location: 'final_cta_fallback', project_type: selectedOption })}>{consultingSite.finalCta.emailLabel}</a></p>
			</div>
			{#if activeResponse?.message}<p class:success={activeResponse.success} class="form-status" role="status">{activeResponse.message}</p>{/if}
		</form>
	</div>
</section>

<style>
	.shell{width:min(1380px,calc(100% - 80px));margin:0 auto}.eyebrow{margin:0 0 24px;color:var(--proto-green-light);font:500 9px var(--proto-mono);letter-spacing:.14em}.work-showcase{padding:125px 0 145px;scroll-margin-top:84px;content-visibility:auto;contain-intrinsic-size:auto 1320px}.section-heading{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr);gap:100px;align-items:end;margin-bottom:64px}.section-heading h2{margin:0;color:var(--proto-text);font:400 clamp(60px,7vw,104px)/.88 var(--proto-display);letter-spacing:-.045em}.heading-detail{max-width:510px;justify-self:end}.heading-detail p{margin:0 0 30px;color:var(--proto-muted);font-size:15px;line-height:1.75}.text-button{display:inline-flex;padding:13px 16px;color:var(--proto-bg);background:var(--proto-paper);font-size:12px;font-weight:600;text-decoration:none;transition:background .25s ease,transform .25s ease}.text-button:hover{background:var(--proto-brass);transform:translateY(-2px)}
	.project-stage{position:relative;height:min(62vw,780px);min-height:620px;overflow:hidden;border:1px solid var(--proto-line-strong);background:var(--proto-surface);isolation:isolate}.stage-depth{position:absolute;inset:0;background:radial-gradient(circle at 28% 26%,rgba(7,84,63,.85),transparent 47%),linear-gradient(180deg,transparent 45%,rgba(0,0,0,.4))}.workspace-window,.shoe-card,.mind-card{position:absolute;z-index:2;display:block;border:1px solid var(--proto-line-strong);box-shadow:0 30px 90px rgba(0,0,0,.42);color:inherit;text-decoration:none;transition:transform .55s cubic-bezier(.2,.75,.2,1),border-color .3s ease,box-shadow .55s ease}.workspace-window:hover,.workspace-window:focus-visible,.shoe-card:hover,.shoe-card:focus-visible,.mind-card:hover,.mind-card:focus-visible{z-index:5;border-color:rgba(240,239,233,.44);box-shadow:0 42px 110px rgba(0,0,0,.54);outline:none}.workspace-window{width:75%;height:58%;right:5%;top:16%;overflow:hidden;background:#1c1d22;transform:rotate(-1deg)}.workspace-window:hover,.workspace-window:focus-visible{transform:rotate(0) translateY(-6px)}.workspace-window img{width:100%;height:calc(100% - 34px);object-fit:cover;object-position:left top;filter:saturate(.92) brightness(.9);transition:filter .35s ease,transform .7s ease}.workspace-window:hover img,.workspace-window:focus-visible img{filter:saturate(1) brightness(1);transform:scale(1.01)}.window-bar{height:34px;display:flex;align-items:center;gap:5px;padding:0 11px;background:#1c1d22}.window-bar i{width:5px;height:5px;border-radius:50%;background:#707078}.window-bar small{margin-left:8px;color:#8b8b92;font:7px var(--proto-mono)}.shoe-card{width:29%;height:44%;left:4%;bottom:6%;overflow:hidden;background:#eee8dd;transform:rotate(1.5deg)}.shoe-card:hover,.shoe-card:focus-visible{transform:rotate(.25deg) translateY(-7px)}.shoe-card img{width:100%;height:100%;object-fit:cover;object-position:center 72%;transition:transform .7s ease}.shoe-card:hover img,.shoe-card:focus-visible img{transform:scale(1.025)}.shoe-card span{position:absolute;left:0;right:0;bottom:0;padding:12px;color:#38352f;background:rgba(238,232,221,.92);font:7px var(--proto-mono)}.mind-card{width:38%;right:1%;bottom:3%;padding:20px;color:#171713;background:var(--proto-paper);transform:rotate(-.7deg)}.mind-card:hover,.mind-card:focus-visible{transform:rotate(0) translateY(-7px)}.mind-card small{display:block;font:7px var(--proto-mono);letter-spacing:.12em}.mind-card strong{display:block;margin:11px 0 3px;font:400 50px var(--proto-display)}.mind-card span{color:#625e55;font-size:11px}.project-thread{position:absolute;z-index:1;left:0;right:0;top:41%;height:2px;background:rgba(7,84,63,.7)}.project-thread i{position:absolute;left:51%;top:-4px;width:9px;height:9px;border-radius:50%;background:var(--proto-brass)}
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
	.contact-fields input:focus,.contact-fields textarea:focus{border-color:var(--proto-brass);background:#101611}
	.contact-fields input[aria-invalid="true"],.contact-fields textarea[aria-invalid="true"]{border-color:#a8735f}
	.contact-fields label>small{display:block;margin-top:7px;color:#c89a84;font-size:10px}
	.message-field{grid-column:1/-1}
	.honeypot{position:absolute!important;left:-10000px!important;top:auto!important;width:1px!important;height:1px!important;overflow:hidden!important}
	.form-actions{padding:0 25px 25px;display:flex;align-items:center;justify-content:space-between;gap:22px}
	.submit-button{min-width:210px;padding:13px 15px;display:flex;align-items:flex-start;flex-direction:column;gap:6px;border:1px solid var(--proto-paper);border-radius:0;color:var(--proto-bg);background:var(--proto-paper);font:600 12px var(--proto-sans);text-align:left;cursor:pointer;transition:background .2s ease,border-color .2s ease,transform .2s ease}
	.submit-button:hover:not(:disabled){border-color:var(--proto-brass);background:var(--proto-brass);transform:translateY(-2px)}
	.submit-button:disabled{cursor:wait;opacity:.65}
	.submit-button small{font:500 9px var(--proto-mono);opacity:.6}
	.form-actions>p{margin:0;color:#858d87;font-size:10px;line-height:1.55;text-align:right}
	.form-actions a{color:var(--proto-paper);text-underline-offset:3px}
	.form-status{margin:0;padding:14px 25px;border-top:1px solid rgba(168,115,95,.35);color:#d8b4a4;background:rgba(168,115,95,.07);font-size:11px;line-height:1.55}
	.form-status.success{border-top-color:rgba(180,154,103,.45);color:#dfd2b8;background:rgba(180,154,103,.075)}
	@media(max-width:1100px){.section-heading{gap:55px}.project-stage{height:640px;min-height:0}.cta-grid{grid-template-columns:1fr 1fr;gap:55px}.contact-fields{grid-template-columns:1fr}.message-field{grid-column:auto}}
	@media(max-width:760px){.shell{width:calc(100% - 24px)}.work-showcase{padding:90px 0 100px}.section-heading{grid-template-columns:1fr;gap:28px;margin-bottom:38px}.section-heading h2{font-size:clamp(52px,15vw,70px)}.heading-detail{justify-self:start}.heading-detail p{font-size:14px}.project-stage{height:620px;min-height:620px;margin:0 -12px;border-left:0;border-right:0}.workspace-window{width:82%;height:45%;right:3%;top:14%}.shoe-card{width:40%;height:43%;left:3%;bottom:5%}.mind-card{width:51%;right:2%;bottom:4%;padding:16px}.mind-card strong{font-size:44px}.project-thread{top:42%}.cta-grid{min-height:0;padding:88px 0 72px;grid-template-columns:1fr;gap:60px}.cta-copy h2{font-size:clamp(58px,16vw,78px)}.brief-builder{margin:0 -1px}.brief-builder>header{padding:0 16px}.brief-question{padding:20px 16px 15px}.brief-question>div{grid-template-columns:1fr}.brief-question label{min-height:62px}.brief-summary{padding:0 16px 18px}.contact-fields{padding:0 16px 20px}.form-actions{padding:0 16px 18px;align-items:stretch;flex-direction:column}.submit-button{width:100%}.form-actions>p{text-align:left}.form-status{padding:13px 16px}}
	@media(max-width:430px){.project-stage{height:570px;min-height:570px}.mind-card strong{font-size:38px}.mind-card span{font-size:9px}}
</style>
