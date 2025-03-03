var C=n=>{throw TypeError(n)};var T=(n,e,t)=>e.has(n)||C("Cannot "+t);var m=(n,e,t)=>(T(n,e,"read from private field"),t?t.call(n):e.get(n)),l=(n,e,t)=>e.has(n)?C("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),N=(n,e,t,r)=>(T(n,e,"write to private field"),r?r.call(n,t):e.set(n,t),t),o=(n,e,t)=>(T(n,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const g of i.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&r(g)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();class ee extends HTMLElement{constructor(){super(),this.innerHTML=`
      <div class="modal">
        ${this.innerHTML}
      </div>
      <div class="overlay" />
    `}}customElements.define("my-modal",ee);const te=(n,e)=>Math.floor(Math.random()*(e+1-n))+n,x=(n,{start:e,end:t})=>{const r=te(e,t);return n.includes(r)?x(n,{start:e,end:t}):r},ne=({start:n,end:e},t)=>new Array(t).fill(null).reduce(r=>{const s=x(r,{start:n,end:e});return[...r,s]},[]),re=(n,e)=>Number((n/e*100).toFixed(1)),se=n=>n.length===new Set(n).size,oe=(n,e)=>n.filter(t=>e.includes(t)).length,ie=(n,e)=>n.filter(t=>t===e).length;var b;class ae{constructor(e){l(this,b);N(this,b,e.sort((t,r)=>t-r))}calculateMatchWinning(e){return oe(m(this,b),e)}includes(e){return m(this,b).includes(e)}get numbers(){return m(this,b)}}b=new WeakMap;const S=1,R=45,A=6,H=1,q=1e3,ue=1e9,ce=",",k="당첨 없음",W="y",j="n",h="[ERROR]",p={purchaseAmount:{positiveInteger:`${h} 양의 정수를 입력해주세요.`,thousandUnit:`${h} ${q.toLocaleString()}단위로 입력해주세요.`,maxAmount:`${h} 1회에 구매 가능한 최대 금액은 1억원입니다.`},winNumber:{unique:`${h} 중복되지 않은 숫자로 입력해주세요.`,range:`${h} ${A}개의 ${S}~${R} 사이의 정수로 입력해주세요.`},bonusNumber:{unique:`${h} 당첨 번호와 중복되지 않게 입력해주세요.`,range:`${h} ${H}개의 ${S}~${R} 사이의 정수로 입력해주세요.`},retry:{yesOrNo:`${h} ${W} 또는 ${j}을 입력해주세요.`}},le={purchaseAmount:"구입금액을 입력해 주세요."},w={1:{winNumber:6,isBonusNumberRequired:!1,prize:2e9},2:{winNumber:5,isBonusNumberRequired:!0,prize:3e7},3:{winNumber:5,isBonusNumberRequired:!1,prize:15e5},4:{winNumber:4,isBonusNumberRequired:!1,prize:5e4},5:{winNumber:3,isBonusNumberRequired:!1,prize:5e3}};var y,L,O,z;class me{constructor(e,t){l(this,O);l(this,y);l(this,L);N(this,y,e),N(this,L,t)}calculateLottoRanks(e){return e.map(t=>{const r=t.calculateMatchWinning(m(this,y)),s=t.includes(m(this,L));return o(this,O,z).call(this,r,s)})}calculateTotalProfit(e){return e.filter(t=>t!==k).reduce((t,r)=>t+w[r].prize,0)}}y=new WeakMap,L=new WeakMap,O=new WeakSet,z=function(e,t){return Object.keys(w).find(s=>{const i=w[s];return i.winNumber===e&&(i.isBonusNumberRequired?t:!0)})??k};var $,F;const M=class M{static createLotto(e){const t=Math.floor(e/q);return Array.from({length:t},()=>{var r;return new ae(o(r=M,$,F).call(r))})}};$=new WeakSet,F=function(){return ne({start:S,end:R},A)},l(M,$);let B=M;var d,E,U;class v{static validatePurchaseAmount(e){if(!o(this,d,E).call(this,e))throw new Error(p.purchaseAmount.positiveInteger);if(e%q!==0)throw new Error(p.purchaseAmount.thousandUnit);if(e>ue)throw new Error(p.purchaseAmount.maxAmount)}static validateWinNumbers(e){if(e.length!==6||e.some(t=>!o(this,d,U).call(this,t)||!o(this,d,E).call(this,t)))throw new Error(p.winNumber.range);if(!se(e))throw new Error(p.winNumber.unique)}static validateBonusNumber(e,t){if(!o(this,d,E).call(this,e)||!o(this,d,U).call(this,e))throw new Error(p.bonusNumber.range);if(t.includes(e))throw new Error(p.bonusNumber.unique)}static validateRetry(e){if(e!==W&&e!==j)throw new Error(p.retry.yesOrNo)}}d=new WeakSet,E=function(e){return!Number.isNaN(e)&&e>0&&Number.isInteger(e)},U=function(e){return e>=S&&e<=R},l(v,d);class I{static readPurchaseAmount(){var t;const e=(t=document.querySelector(".purchase__input--amount"))==null?void 0:t.valueAsNumber;return v.validatePurchaseAmount(e),e}static readWinNumbers(){const t=[...document.querySelectorAll(".winning__input--lotto-number")].map(r=>Number(r.value));return v.validateWinNumbers(t),t}static readBonusNumber(e){var s;const t=(s=document.querySelector(".winning__input--bonus-number"))==null?void 0:s.value,r=Number(t);return v.validateBonusNumber(r,e),r}}const de=n=>{const e=document.createElement("div");return n&&Object.entries(n).forEach(([t,r])=>{e.setAttribute(t,r)}),e};var u,G,D,f;const P=class P{static renderLayout(){o(this,u,f).call(this,`<header class="lotto-title">🎱 행운의 로또</header>
        <main id="container" class="lotto-body"></main>
        <footer class="lotto-primary">Copyright 2023. woowacourse</footer>
      `,null,"app"),o(this,u,G).call(this)}static disablePurchaseForm(){const e=document.querySelector(".purchase__button-submit");e.disabled=!0;const t=document.querySelector(".purchase__input--amount");t.disabled=!0}static renderPurchaseSection(){o(this,u,f).call(this,`<section class="purchase">
        <h2 class="lotto-title">🎱내 번호 당첨 번호 확인2🎱</h2>
        <form class="purchase__form">
          <label for="purchase__amount">${le.purchaseAmount}</label>
          <div>
            <input type="number" placeholder="금액" value="5000" id="purchase__amount" class="purchase__input--amount"  />
            <button class="purchase__button-submit">구입</button>
          </div>
        </form>
      </section>
      `)}static renderPurchasedSection(e){o(this,u,f).call(this,`<section class="purchased">
        <p>총 ${e.length}개를 구매하였습니다.</p>
        <ul class="purchased__list">
          ${e.map(t=>`<li class="purchased__item"><span class="purchased__ticket">🎟️</span>${t.numbers.join(`${ce} `)}</li>`).join("")}
        </ul>
      </section>
    `)}static renderWinningNumberSection(){o(this,u,f).call(this,`<section class="winning">
        <form class="winning__form">
          <p>지난 주 당첨번호 ${A}개와 보너스 번호 ${H}개를 입력해주세요.</p>
          <div class="winning__box">
            <div class="winning__box-numbers">
              <label>당첨 번호</label>
              <div>
                ${new Array(A).fill(null).map((e,t)=>`<input class="winning__input--lotto-number" value="${t+1}" maxlength="2" min="1" max="45" />`).join("")}
              </div>
            </div>
            <div class="winning__box-bonus-number">
              <label>보너스 번호</label>
              <input class="winning__input--bonus-number" value="7" />
            </div>
          </div>
          <button class="winning__button-submit">결과 확인하기</button>
        </form>
      </section>
    `)}static renderStatisticModal(e,t){var r;o(this,u,f).call(this,`<my-modal>
        <span class="result__close" aria-label="닫기">X</span>
        <h2 class="lotto-subtitle result__title">🏆 당첨 통계 🏆</h2>
        <table aria-label="로또 당첨 통계">
          <tr class="result__table--title">
            <th>일치 갯수</th>
            <th>당첨금</th>
            <th>당첨 갯수</th>
          </tr>
          ${o(r=P,u,D).call(r,e)}
        </table>
        <p class="result__profile-rate">당신의 총 수익률은 ${t}%입니다.</p>
        <button class="result__button--retry">다시 시작하기</button>
      </my-modal>
    `,null,"app")}static removeModal(){var e;(e=document.querySelector("#app").querySelector("my-modal"))==null||e.remove()}static resetApp(){document.querySelector("#app").innerHTML="",new K().init()}};u=new WeakSet,G=function(){const e=document.querySelector("header").offsetHeight;document.documentElement.style.setProperty("--header-height",e+"px");const t=document.querySelector("footer").offsetHeight;document.documentElement.style.setProperty("--footer-height",t+"px")},D=function(e){return[...Object.keys(w)].reverse().map(t=>{const r=w[t],s=ie(e,t);return`
          <tr>
            <td>${r.winNumber}개</td>
            <td>${r.prize.toLocaleString()}</td>
            <td>${s}개</td>
          </tr>
        `}).join("")},f=function(e,t,r="container"){const s=document.getElementById(r);if(t){const i=de(t);i.insertAdjacentHTML("beforeend",e),s.appendChild(i);return}s.insertAdjacentHTML("beforeend",e)},l(P,u);let a=P;var _,c,X,V,Y,J,Q;class K{constructor(){l(this,c);l(this,_)}init(){a.renderLayout(),a.renderPurchaseSection()}attachEventListener(){o(this,c,X).call(this),o(this,c,V).call(this),o(this,c,Y).call(this)}}_=new WeakMap,c=new WeakSet,X=function(){window.addEventListener("submit",e=>{e.preventDefault();try{e.target.classList.contains("purchase__form")&&o(this,c,J).call(this),e.target.classList.contains("winning__form")&&o(this,c,Q).call(this)}catch(t){window.alert(t.message)}})},V=function(){window.addEventListener("click",e=>{e.target.classList.contains("result__button--retry")&&a.resetApp(),e.target.classList.contains("result__close")&&a.removeModal(),e.target.closest(".modal")||a.removeModal()})},Y=function(){window.addEventListener("keydown",e=>{e.key==="Escape"&&a.removeModal()})},J=function(){const e=I.readPurchaseAmount();a.disablePurchaseForm(),N(this,_,B.createLotto(e)),a.renderPurchasedSection(m(this,_)),a.renderWinningNumberSection()},Q=function(){const e=I.readWinNumbers(),t=I.readBonusNumber(e),r=new me(e,t),s=r.calculateLottoRanks(m(this,_)),i=r.calculateTotalProfit(s),g=re(i,m(this,_).length*q);a.renderStatisticModal(s,g)};const Z=new K;Z.init();Z.attachEventListener();
