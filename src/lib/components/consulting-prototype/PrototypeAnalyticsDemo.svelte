<script lang="ts">
	let { playing = false }: { playing?: boolean } = $props();
</script>

<div class="demo" class:playing aria-label="An analytics workflow turning a business question into measurement, a useful signal, and a next action">
	<header><span>DECISION WORKSPACE / MOBILE CHECKOUT</span><small>Question → evidence → action</small></header>
	<div class="workspace">
		<section class="measure">
			<div class="question"><small>QUESTION</small><strong>Where are mobile customers getting stuck?</strong></div>
			<div class="funnel">
				<div><span>Product viewed</span><i style="--w:100%"></i></div>
				<div><span>Checkout started</span><i style="--w:76%"></i></div>
				<div class="friction"><span>Address entered</span><i style="--w:42%"></i><b>Highest friction</b></div>
				<div><span>Order completed</span><i style="--w:35%"></i></div>
			</div>
			<div class="filters"><span class="active">MOBILE</span><span>DESKTOP</span><span>NEW VISITORS</span></div>
		</section>

		<section class="evidence">
			<div class="panel-bar"><span>BEHAVIOR EVIDENCE</span><small>Compared by device</small></div>
			<div class="sessions">
				<div><small>01</small><span><strong>Address field rejected</strong><i></i><b>Repeated input</b></span></div>
				<div><small>02</small><span><strong>Keyboard covers action</strong><i></i><b>Mobile only</b></span></div>
				<div><small>03</small><span><strong>Return to cart</strong><i></i><b>After validation</b></span></div>
			</div>
			<div class="signal"><i></i><span><small>SIGNAL</small><strong>The address step—not demand—is creating the drop-off.</strong></span></div>
		</section>

		<aside class="decision">
			<div class="panel-bar"><span>NEXT USEFUL MOVE</span><small>Ready</small></div>
			<div class="action">
				<small>RECOMMENDATION</small>
				<strong>Simplify address validation on mobile.</strong>
				<p>Preserve entered values, expose the error, and keep the primary action above the keyboard.</p>
				<div><span><i></i>Instrument change</span><span><i></i>Run controlled test</span><span><i></i>Monitor the result</span></div>
			</div>
			<div class="mode"><small>OPERATING MODE</small><span class="selected">Monitor and act</span><span>Send a report</span></div>
		</aside>
	</div>
	<i class="progress" aria-hidden="true"></i>
</div>

<style>
	.demo{position:relative;height:610px;overflow:hidden;border:1px solid rgba(240,239,233,.18);background:#100e0a;box-shadow:0 36px 100px rgba(0,0,0,.34);contain:layout paint}.demo>header{height:54px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(240,239,233,.09);color:#877d6d;background:#13110d;font:500 7px var(--proto-mono);letter-spacing:.1em}.demo>header small{color:#b49a67;font:inherit}.workspace{height:calc(100% - 54px);display:grid;grid-template-columns:.82fr 1.08fr .9fr}.measure,.evidence,.decision{position:relative;min-width:0;border-right:1px solid rgba(240,239,233,.08);background:#12100c}.evidence{background:#100f0c}.decision{border-right:0;background:#15120d}.panel-bar{height:40px;padding:0 13px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(240,239,233,.07);color:#a0998d;font:500 7px var(--proto-mono)}.panel-bar small{color:#696257;font:inherit}.question{padding:28px 22px 23px;border-bottom:1px solid rgba(240,239,233,.07)}.question small{color:#8a806e;font:6px var(--proto-mono);letter-spacing:.1em}.question strong{display:block;margin-top:10px;color:#e1ddd3;font:400 24px/1.05 var(--proto-display)}.funnel{padding:25px 22px 12px}.funnel>div{position:relative;margin-bottom:20px}.funnel span{display:block;margin-bottom:7px;color:#918b80;font-size:8px}.funnel i{display:block;width:var(--w);height:9px;background:linear-gradient(90deg,#6f6043,#b49a67);transform:scaleX(.12);transform-origin:left}.playing .funnel i{animation:funnel 8.8s ease infinite}.funnel>div:nth-child(2) i{animation-delay:.3s}.funnel>div:nth-child(3) i{animation-delay:.6s}.funnel>div:nth-child(4) i{animation-delay:.9s}.funnel .friction i{background:linear-gradient(90deg,#7a4935,#b36c4d)}.funnel b{position:absolute;right:0;top:0;color:#b77559;font:500 6px var(--proto-mono);font-weight:500;opacity:0}.playing .funnel b{animation:friction 8.8s ease infinite}.filters{padding:15px 22px;display:flex;gap:6px;flex-wrap:wrap}.filters span{padding:7px 8px;border:1px solid rgba(240,239,233,.09);color:#6f695f;font:6px var(--proto-mono)}.filters .active{border-color:rgba(180,154,103,.4);color:#c0ad88;background:rgba(180,154,103,.07)}.sessions{padding:15px}.sessions>div{min-height:78px;padding:12px 5px;display:grid;grid-template-columns:28px 1fr;gap:7px;border-bottom:1px solid rgba(240,239,233,.06);opacity:.3;transform:translateY(8px)}.playing .sessions>div{animation:session 8.8s ease infinite}.sessions>div:nth-child(2){animation-delay:.45s}.sessions>div:nth-child(3){animation-delay:.9s}.sessions>div>small{color:#665f54;font:6px var(--proto-mono)}.sessions span{position:relative}.sessions strong{display:block;color:#bcb6ab;font-size:9px}.sessions span i{display:block;width:73%;height:3px;margin:12px 0 7px;background:#493f30}.sessions span b{color:#7c7468;font:500 6px var(--proto-mono);font-weight:500}.signal{margin:6px 17px;padding:17px;display:flex;gap:12px;border:1px solid rgba(180,154,103,.24);background:rgba(180,154,103,.055);opacity:.25;transform:translateY(8px)}.playing .signal{animation:signal 8.8s ease infinite}.signal>i{width:8px;height:8px;margin-top:3px;border-radius:50%;background:#b49a67;box-shadow:0 0 0 5px rgba(180,154,103,.08)}.signal small,.signal strong{display:block}.signal small{color:#8b7d64;font:6px var(--proto-mono)}.signal strong{margin-top:7px;color:#d9d1c1;font-size:10px;line-height:1.45}.action{margin:18px 15px;padding:19px;border:1px solid rgba(240,239,233,.1);background:#19160f;opacity:.28;transform:translateY(9px)}.playing .action{animation:action 8.8s ease infinite}.action>small{color:#b49a67;font:6px var(--proto-mono);letter-spacing:.1em}.action>strong{display:block;margin:13px 0 12px;color:#e5dfd3;font:400 22px/1.02 var(--proto-display)}.action>p{margin:0;color:#878076;font-size:8px;line-height:1.65}.action>div{margin-top:19px}.action>div span{padding:9px 0;display:flex;align-items:center;gap:9px;border-top:1px solid rgba(240,239,233,.06);color:#9b9487;font-size:8px}.action>div i{position:relative;width:12px;height:12px;border:1px solid #766c59;border-radius:50%}.playing .action>div i{animation:action-check 8.8s ease infinite}.action>div span:nth-child(2) i{animation-delay:.35s}.action>div span:nth-child(3) i{animation-delay:.7s}.mode{position:absolute;left:15px;right:15px;bottom:17px;padding:14px;border-top:1px solid rgba(240,239,233,.08)}.mode>small{display:block;margin-bottom:10px;color:#756c5d;font:6px var(--proto-mono)}.mode>span{display:inline-flex;margin-right:5px;padding:8px;border:1px solid rgba(240,239,233,.08);color:#756f66;font-size:7px}.mode .selected{border-color:rgba(180,154,103,.35);color:#c4b28e;background:rgba(180,154,103,.06)}.progress{position:absolute;left:0;right:0;bottom:0;height:2px;background:#b49a67;transform:scaleX(0);transform-origin:left}.playing .progress{animation:progress 8.8s linear infinite}
	@keyframes funnel{0%,8%{transform:scaleX(.12);opacity:.3}28%,90%{transform:scaleX(1);opacity:1}98%,100%{transform:scaleX(.12);opacity:.3}}@keyframes friction{0%,30%{opacity:0}42%,90%{opacity:1}98%,100%{opacity:0}}@keyframes session{0%,34%{opacity:.3;transform:translateY(8px)}47%,90%{opacity:1;transform:none}98%,100%{opacity:.3}}@keyframes signal{0%,52%{opacity:.25;transform:translateY(8px)}64%,90%{opacity:1;transform:none}98%,100%{opacity:.25}}@keyframes action{0%,62%{opacity:.28;transform:translateY(9px)}73%,91%{opacity:1;transform:none}98%,100%{opacity:.28}}@keyframes action-check{0%,68%{background:transparent}78%,92%{background:#b49a67}98%,100%{background:transparent}}@keyframes progress{to{transform:scaleX(1)}}
	@media(max-width:1050px){.workspace{grid-template-columns:1fr 1fr}.decision{display:none}.evidence{border-right:0}}@media(max-width:680px){.demo{height:520px}.workspace{grid-template-columns:1fr}.measure{display:none}.evidence{border-right:0}.signal{margin-top:22px}.demo>header small{display:none}}@media(prefers-reduced-motion:reduce){.demo *{animation:none!important}.funnel i{transform:scaleX(1)}.funnel b,.sessions>div,.signal,.action{opacity:1;transform:none}.progress{transform:scaleX(1)}}
</style>
