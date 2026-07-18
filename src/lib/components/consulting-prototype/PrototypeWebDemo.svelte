<script lang="ts">
	let { playing = false }: { playing?: boolean } = $props();
</script>

<div class="demo" class:playing aria-label="A website release moving from code review through responsive testing and launch">
	<header>
		<span>RELEASE / CONTACT FLOW</span>
		<div><i></i><small>Human review required</small></div>
	</header>

	<div class="workspace">
		<section class="editor">
			<div class="panel-bar"><span>contact.ts</span><small>3 changes</small></div>
			<div class="code">
				<p><em>18</em><code><b>const</b> inquiry = <b>await</b> request.formData();</code></p>
				<p class="added"><em>19</em><code><i>+</i> validateInquiry(inquiry);</code></p>
				<p class="added"><em>20</em><code><i>+</i> <b>await</b> sendProjectEmail(inquiry);</code></p>
				<p><em>21</em><code><b>return</b> success();</code></p>
			</div>
			<div class="review-note">
				<small>REVIEW NOTE</small>
				<strong>Failure state handled.</strong>
				<span>The visitor always knows whether the message was sent.</span>
			</div>
			<i class="review-cursor"></i>
		</section>

		<section class="preview">
			<div class="panel-bar"><span>preview.yourbusiness.com</span><small>Responsive preview</small></div>
			<div class="viewport">
				<div class="website">
					<nav><strong>YOUR BUSINESS</strong><span>Services&nbsp;&nbsp; Work&nbsp;&nbsp; Contact</span></nav>
					<div><small>BUILT AROUND THE BUSINESS</small><h4>A clearer way<br />to get started.</h4><button>Start here</button></div>
					<footer>Made by LCG</footer>
				</div>
			</div>
			<div class="viewport-labels"><span>DESKTOP</span><span>MOBILE</span></div>
		</section>

		<aside class="checks">
			<div class="panel-bar"><span>Release checks</span><small>4 / 4</small></div>
			<ul>
				<li><i></i><span><strong>Form submitted</strong><small>Success and failure tested</small></span></li>
				<li><i></i><span><strong>Responsive</strong><small>Desktop through mobile</small></span></li>
				<li><i></i><span><strong>Accessible</strong><small>Keyboard and screen reader</small></span></li>
				<li><i></i><span><strong>Human review</strong><small>Code read and understood</small></span></li>
			</ul>
			<div class="ready"><i></i><span><small>RELEASE</small><strong>Ready to ship</strong></span></div>
		</aside>
	</div>
	<i class="progress" aria-hidden="true"></i>
</div>

<style>
	.demo{position:relative;height:610px;overflow:hidden;border:1px solid rgba(240,239,233,.18);background:#0b0f0c;box-shadow:0 36px 100px rgba(0,0,0,.34);contain:layout paint}.demo>header{height:54px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(240,239,233,.1);color:#7d857f;background:#0e120f;font:500 7px var(--proto-mono);letter-spacing:.1em}.demo>header>div{display:flex;align-items:center;gap:8px}.demo>header i{width:6px;height:6px;border:1px solid #76a691;border-radius:50%}.demo>header small{font:inherit;color:#8ba99a}.workspace{height:calc(100% - 54px);display:grid;grid-template-columns:1.05fr .95fr 230px}.editor,.preview,.checks{position:relative;min-width:0;overflow:hidden;border-right:1px solid rgba(240,239,233,.09);background:#0d120e}.preview{background:#111512}.checks{border-right:0;background:#0d110e}.panel-bar{height:40px;padding:0 13px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(240,239,233,.08);color:#969d97;background:#121713;font:500 7px var(--proto-mono)}.panel-bar small{color:#5f6962;font:inherit}.code{padding:28px 16px}.code p{min-height:35px;margin:0;display:grid;grid-template-columns:30px 1fr;align-items:center;border-bottom:1px solid rgba(240,239,233,.035);color:#9da49e;font:8px/1.5 var(--proto-mono);opacity:.58}.code em{color:#475049;font-style:normal}.code b{color:#9f83c6;font-weight:500}.code i{margin-right:8px;color:#5dc495;font-style:normal}.code .added{position:relative;color:#d1d7d1;background:rgba(69,167,127,.06)}.code .added::after{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:#45a77f;transform:scaleY(0);transform-origin:top}.playing .code .added::after{animation:diff-line 8.4s ease infinite}.review-note{position:absolute;left:11%;right:8%;bottom:7%;padding:17px 19px;border:1px solid rgba(180,154,103,.28);background:#17160f;box-shadow:0 20px 55px rgba(0,0,0,.3);opacity:0;transform:translateY(13px)}.playing .review-note{animation:review-note 8.4s ease infinite}.review-note small,.review-note strong,.review-note span{display:block}.review-note small{color:#b49a67;font:6px var(--proto-mono);letter-spacing:.1em}.review-note strong{margin:9px 0 5px;color:#e5e1d8;font-size:11px}.review-note span{color:#89867e;font-size:8px;line-height:1.5}.review-cursor{position:absolute;left:72%;top:23%;width:0;height:0;border-top:12px solid #f0efe9;border-right:7px solid transparent;filter:drop-shadow(0 1px 2px #000);opacity:0}.playing .review-cursor{animation:review-cursor 8.4s cubic-bezier(.2,.7,.2,1) infinite}.viewport{height:calc(100% - 82px);padding:8%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 45%,rgba(69,167,127,.13),transparent 48%)}.website{width:92%;height:88%;overflow:hidden;border:1px solid rgba(18,22,18,.2);background:#e7e3d9;color:#121611;box-shadow:0 24px 60px rgba(0,0,0,.3);transform-origin:center}.playing .website{animation:responsive-frame 8.4s cubic-bezier(.2,.75,.2,1) infinite}.website nav{height:42px;padding:0 6%;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(18,22,18,.13);font:5px var(--proto-mono)}.website>div{height:calc(100% - 68px);padding:12% 8%;background:radial-gradient(circle at 82% 24%,rgba(7,84,63,.25),transparent 33%)}.website small{color:#07543f;font:5px var(--proto-mono);letter-spacing:.09em}.website h4{margin:11px 0 15px;font:400 clamp(24px,3vw,43px)/.88 var(--proto-display);letter-spacing:-.04em}.website button{padding:8px 10px;border:0;color:#fff;background:#07543f;font-size:6px}.website footer{height:26px;padding:0 6%;display:flex;align-items:center;color:#d7ddd7;background:#0d2d24;font:5px var(--proto-mono)}.viewport-labels{position:absolute;left:16px;right:16px;bottom:12px;display:flex;justify-content:space-between;color:#566059;font:5px var(--proto-mono);letter-spacing:.08em}.checks ul{list-style:none;margin:0;padding:9px 14px}.checks li{min-height:75px;padding:12px 3px;display:grid;grid-template-columns:18px 1fr;gap:10px;align-items:center;border-bottom:1px solid rgba(240,239,233,.07);opacity:.38}.playing .checks li{animation:check-row 8.4s ease infinite}.checks li:nth-child(2){animation-delay:.45s}.checks li:nth-child(3){animation-delay:.9s}.checks li:nth-child(4){animation-delay:1.35s}.checks li>i{position:relative;width:14px;height:14px;border:1px solid #566059;border-radius:50%}.checks li>i::after{content:'';position:absolute;left:4px;top:2px;width:4px;height:7px;border-right:1px solid #07110c;border-bottom:1px solid #07110c;transform:rotate(45deg);opacity:0}.checks strong,.checks small{display:block}.checks strong{color:#b6bdb7;font-size:9px}.checks small{margin-top:5px;color:#636c65;font-size:6px;line-height:1.4}.ready{margin:4px 16px;padding:15px;display:flex;align-items:center;gap:12px;border:1px solid rgba(69,167,127,.25);background:rgba(69,167,127,.055);opacity:.28}.playing .ready{animation:ready 8.4s ease infinite}.ready>i{position:relative;width:22px;height:22px;border:1px solid #45a77f;border-radius:50%}.ready>i::after{content:'';position:absolute;left:6px;top:4px;width:7px;height:10px;border-right:1px solid #45a77f;border-bottom:1px solid #45a77f;transform:rotate(45deg)}.ready small,.ready strong{display:block}.ready small{color:#61927d;font:5px var(--proto-mono)}.ready strong{margin-top:4px;color:#dbe7df;font-size:10px}.progress{position:absolute;z-index:20;left:0;right:0;bottom:0;height:2px;background:#45a77f;transform:scaleX(0);transform-origin:left}.playing .progress{animation:progress 8.4s linear infinite}
	@keyframes diff-line{0%,8%{transform:scaleY(0)}20%,86%{transform:scaleY(1)}100%{transform:scaleY(0)}}@keyframes review-note{0%,24%{opacity:0;transform:translateY(13px)}34%,83%{opacity:1;transform:none}94%,100%{opacity:0;transform:translateY(5px)}}@keyframes review-cursor{0%,8%{left:72%;top:23%;opacity:0}14%{opacity:1}28%{left:41%;top:33%}42%{left:30%;top:73%}65%{left:76%;top:84%;opacity:1}78%,100%{opacity:0}}@keyframes responsive-frame{0%,28%,100%{width:92%;height:88%}48%,73%{width:46%;height:92%}84%{width:92%;height:88%}}@keyframes check-row{0%,32%{opacity:.38}42%,86%{opacity:1}96%,100%{opacity:.38}}@keyframes ready{0%,63%{opacity:.28;transform:translateY(7px)}73%,88%{opacity:1;transform:none}98%,100%{opacity:.28}}@keyframes progress{to{transform:scaleX(1)}}
	@media(max-width:1050px){.workspace{grid-template-columns:1fr 1fr}.checks{display:none}.preview{border-right:0}}@media(max-width:680px){.demo{height:520px}.workspace{grid-template-columns:1fr}.editor{display:none}.preview{border-right:0}.website h4{font-size:32px}.viewport{padding:7% 5%}.demo>header small{display:none}}@media(prefers-reduced-motion:reduce){.demo *{animation:none!important}.code .added::after{transform:scaleY(1)}.review-note{opacity:1;transform:none}.checks li,.ready{opacity:1}.website{width:72%}.progress{transform:scaleX(1)}}
</style>
