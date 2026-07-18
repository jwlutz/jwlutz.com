<script lang="ts">
	let { playing = false }: { playing?: boolean } = $props();
</script>

<div class="demo" class:playing aria-label="An AI-assisted inquiry moving through context gathering, drafting, human approval, and follow-up">
	<header><span>WORKFLOW / NEW CUSTOMER INQUIRY</span><small>AI prepares · a person decides</small></header>
	<div class="workspace">
		<section class="inbox">
			<div class="panel-bar"><span>INBOX</span><small>1 new</small></div>
			<div class="message">
				<div><i>AM</i><span><strong>Alex Morgan</strong><small>2 minutes ago</small></span></div>
				<h4>We need to replace our Squarespace site.</h4>
				<p>We also lose track of inquiries between the website, email, and our customer list.</p>
			</div>
			<div class="source-tags"><span>Website form</span><span>Existing customer</span></div>
		</section>

		<section class="context">
			<div class="panel-bar"><span>ATTACHED CONTEXT</span><small>Kept together</small></div>
			<div class="context-items">
				<div><i></i><span><strong>Current website</strong><small>Pages, forms, platform</small></span></div>
				<div><i></i><span><strong>Prior conversation</strong><small>Needs and timeline</small></span></div>
				<div><i></i><span><strong>Customer record</strong><small>History and contact details</small></span></div>
			</div>
			<div class="draft">
				<small>PREPARED RESPONSE</small>
				<p>Thanks, Alex. The right first move is to map the current inquiry flow before rebuilding the site…</p>
				<span><i></i>Generated from attached context</span>
			</div>
		</section>

		<aside class="approval">
			<div class="panel-bar"><span>HUMAN CHECKPOINT</span><small>Required</small></div>
			<div class="review">
				<small>READY FOR REVIEW</small>
				<strong>Nothing leaves without judgment.</strong>
				<ul><li><i></i>Scope is accurate</li><li><i></i>No invented promises</li><li><i></i>Clear next step</li></ul>
				<div><button>Revise</button><button class="approve">Approve and send</button></div>
			</div>
			<div class="completed"><i></i><span><strong>Follow-up sent</strong><small>Email and customer record updated</small></span></div>
			<i class="cursor"></i>
		</aside>
	</div>
	<i class="progress" aria-hidden="true"></i>
</div>

<style>
	.demo{position:relative;height:610px;overflow:hidden;border:1px solid rgba(240,239,233,.18);background:#0d100e;box-shadow:0 36px 100px rgba(0,0,0,.34);contain:layout paint}.demo>header{height:54px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(240,239,233,.09);color:#848a83;background:#101411;font:500 7px var(--proto-mono);letter-spacing:.1em}.demo>header small{color:#b49a67;font:inherit}.workspace{height:calc(100% - 54px);display:grid;grid-template-columns:.72fr 1.15fr .9fr}.inbox,.context,.approval{position:relative;min-width:0;border-right:1px solid rgba(240,239,233,.08);background:#101411}.context{background:#0e120f}.approval{border-right:0;background:#111512}.panel-bar{height:40px;padding:0 13px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(240,239,233,.07);color:#9aa09a;font:500 7px var(--proto-mono)}.panel-bar small{color:#666d66;font:inherit}.message{margin:19px 15px;padding:17px;border:1px solid rgba(240,239,233,.1);background:#161a16;opacity:0;transform:translateY(14px)}.playing .message{animation:message 9s ease infinite}.message>div{display:flex;gap:10px;align-items:center}.message>div>i{width:28px;height:28px;display:grid;place-items:center;border-radius:50%;color:#f0ece4;background:#774633;font:600 8px var(--proto-sans);font-style:normal}.message span strong,.message span small{display:block}.message span strong{color:#dcdfd8;font-size:9px}.message span small{margin-top:3px;color:#6e746d;font-size:6px}.message h4{margin:21px 0 9px;color:#e9ebe4;font-size:13px;line-height:1.35}.message p{margin:0;color:#8b9089;font-size:8px;line-height:1.65}.source-tags{padding:0 15px;display:flex;gap:6px;flex-wrap:wrap}.source-tags span{padding:7px 8px;border:1px solid rgba(180,154,103,.22);color:#9b9d98;background:rgba(180,154,103,.05);font:6px var(--proto-mono);opacity:0}.playing .source-tags span{animation:tag 9s ease infinite}.source-tags span+span{animation-delay:.35s}.context-items{margin:10px 16px}.context-items>div{min-height:67px;padding:10px 4px;display:flex;align-items:center;gap:11px;border-bottom:1px solid rgba(240,239,233,.065);opacity:.25;transform:translateX(-8px)}.playing .context-items>div{animation:context 9s ease infinite}.context-items>div:nth-child(2){animation-delay:.4s}.context-items>div:nth-child(3){animation-delay:.8s}.context-items>div>i{width:24px;height:30px;border:1px solid #6e6553;border-radius:2px;background:linear-gradient(135deg,rgba(180,154,103,.16),transparent)}.context-items strong,.context-items small{display:block}.context-items strong{color:#bcc1ba;font-size:9px}.context-items small{margin-top:4px;color:#6b716a;font-size:6px}.draft{margin:16px;padding:18px;border:1px solid rgba(180,154,103,.3);background:linear-gradient(145deg,rgba(180,154,103,.09),rgba(180,154,103,.02));opacity:0;transform:translateY(10px)}.playing .draft{animation:draft 9s ease infinite}.draft>small{color:#b49a67;font:6px var(--proto-mono);letter-spacing:.09em}.draft p{min-height:63px;margin:12px 0;color:#ccd0c8;font-size:9px;line-height:1.65}.draft>span{display:flex;align-items:center;gap:7px;color:#70766f;font-size:6px}.draft>span i{width:5px;height:5px;border-radius:50%;background:#b49a67}.review{margin:18px 15px;padding:18px;border:1px solid rgba(180,154,103,.24);background:#191610;opacity:.28}.playing .review{animation:review 9s ease infinite}.review>small{color:#b49a67;font:6px var(--proto-mono);letter-spacing:.09em}.review>strong{display:block;margin:13px 0 19px;color:#e5e0d7;font:400 20px/1.05 var(--proto-display)}.review ul{list-style:none;margin:0 0 22px;padding:0}.review li{padding:9px 0;display:flex;align-items:center;gap:9px;border-bottom:1px solid rgba(240,239,233,.06);color:#979188;font-size:8px}.review li i{width:11px;height:11px;border:1px solid #766c59;border-radius:50%}.review>div{display:flex;gap:7px}.review button{padding:9px 10px;border:1px solid rgba(240,239,233,.12);color:#8b9089;background:transparent;font-size:7px}.review .approve{color:#15120d;background:#d7cab0}.completed{position:absolute;left:15px;right:15px;bottom:18px;padding:14px;display:flex;align-items:center;gap:11px;border:1px solid rgba(180,154,103,.3);background:#14120d;opacity:0;transform:translateY(10px)}.playing .completed{animation:completed 9s ease infinite}.completed>i{position:relative;width:24px;height:24px;border:1px solid #b49a67;border-radius:50%}.completed>i::after{content:'';position:absolute;left:7px;top:5px;width:7px;height:10px;border-right:1px solid #b49a67;border-bottom:1px solid #b49a67;transform:rotate(45deg)}.completed strong,.completed small{display:block}.completed strong{color:#ddd5c6;font-size:9px}.completed small{margin-top:4px;color:#8d8571;font-size:6px}.cursor{position:absolute;right:22%;top:59%;width:0;height:0;border-top:12px solid #f0efe9;border-right:7px solid transparent;filter:drop-shadow(0 1px 2px #000);opacity:0}.playing .cursor{animation:cursor 9s ease infinite}.playing .review .approve{animation:approve-press 9s ease infinite}.progress{position:absolute;left:0;right:0;bottom:0;height:2px;background:#b49a67;transform:scaleX(0);transform-origin:left}.playing .progress{animation:progress 9s linear infinite}
	@keyframes message{0%,5%{opacity:0;transform:translateY(14px)}13%,88%{opacity:1;transform:none}97%,100%{opacity:0}}@keyframes tag{0%,14%{opacity:0;transform:translateY(6px)}23%,88%{opacity:1;transform:none}97%,100%{opacity:0}}@keyframes context{0%,22%{opacity:.25;transform:translateX(-8px)}34%,88%{opacity:1;transform:none}97%,100%{opacity:.25}}@keyframes draft{0%,38%{opacity:0;transform:translateY(10px)}49%,88%{opacity:1;transform:none}97%,100%{opacity:0}}@keyframes review{0%,52%{opacity:.28}62%,88%{opacity:1}97%,100%{opacity:.28}}@keyframes cursor{0%,58%{opacity:0;right:40%;top:40%}64%{opacity:1}73%{right:22%;top:59%;opacity:1}79%,100%{opacity:0}}@keyframes completed{0%,73%{opacity:0;transform:translateY(10px)}82%,91%{opacity:1;transform:none}98%,100%{opacity:0}}@keyframes progress{to{transform:scaleX(1)}}@keyframes approve-press{0%,72%{transform:none}74.5%,76.5%{transform:scale(.94);background:#b49a67}79%,100%{transform:none}}
	@media(max-width:1050px){.workspace{grid-template-columns:.8fr 1.2fr}.approval{display:none}.context{border-right:0}}@media(max-width:680px){.demo{height:520px}.workspace{grid-template-columns:1fr}.inbox{display:none}.context{border-right:0}.draft{margin-top:24px}.demo>header small{display:none}}@media(prefers-reduced-motion:reduce){.demo *{animation:none!important}.message,.source-tags span,.context-items>div,.draft,.review,.completed{opacity:1;transform:none}.progress{transform:scaleX(1)}}
</style>
