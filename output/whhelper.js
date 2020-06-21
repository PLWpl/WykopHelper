// ==UserScript==
// @name         Wykopowe trole
// @version      0.21
// @updateURL    http://plw.usermd.net/whhelper.js
// @downloadURL  http://plw.usermd.net/whhelper.js
// @description  Zestaw narzędzi pomocnych na wykopie.
// @author       PLW
// @match        https://www.wykop.pl/*
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@9
// @require      https://unpkg.com/@popperjs/core@2
// @require      https://unpkg.com/tippy.js@6
// @grant        none
// ==/UserScript==
!function(){"use strict";const e=(e,t="debil")=>`<span class="badge badge--${t.toLowerCase()}" data-whusername="${e}">${t.toLowerCase().capitalize()}</span>`,t=()=>{const t=e=>JSON.parse(e),n=e=>JSON.stringify(e);let o,a=[];const r=e=>!!a.includes(e),i=(e,t)=>{r(e)||((e=>{a.push(e),localStorage.setItem("uniqueNicks",n(a))})(e),((e,t)=>{o.push({nick:e,link:t}),localStorage.setItem("trolls",n(o))})(e,t))},l=()=>document.querySelectorAll("li div.author"),s=e=>e.querySelector(".showProfileSummary > b").innerText,c=()=>location.reload(),u=e=>!e.querySelector(".badge"),m=()=>{const e=document.querySelector(".replyForm textarea"),t=document.querySelector("#commentFormContainer textarea");return!(e&&""!==e.value||t&&""!==t.value)},d=()=>{o=localStorage.getItem("trolls")?t(localStorage.getItem("trolls")):[],a=localStorage.getItem("uniqueNicks")?t(localStorage.getItem("uniqueNicks")):[]},p=(t="Debil")=>{try{l().forEach(n=>{const o=s(n);r(o)&&u(n)?n.insertAdjacentHTML("afterbegin",e(o,t)):(e=>!!e.querySelector(".buttonWH"))(n)||n.insertAdjacentHTML("beforeend",'<span class="buttonWH">Oznacz</span>')})}catch(e){}},g=t=>{d();const n=s(t.target.closest(".author")),o=t.target.closest(".author").querySelector("a + a").href;t.target.classList.add("buttonWH--clicked"),t.target.innerText="✔",setTimeout(()=>{t.target.remove()},700),i(n,o),(()=>{try{l().forEach(t=>{const n=s(t);r(n)&&u(t)&&t.insertAdjacentHTML("afterbegin",e(n)),r(n)&&u(t)&&t.querySelector("buttonWH")&&!t.querySelector("buttonWH--clicked")&&t.querySelector(".buttonWH").remove()})}catch(e){}})()},y=e=>{d();for(let[t,a]of o.entries())a.nick===e&&(delete o[t],o=o.filter(e=>null!=e),localStorage.setItem("trolls",n(o)));a=a.filter(t=>t!==e),localStorage.setItem("uniqueNicks",n(a)),m?c():Swal.fire({title:"Hej!",text:"Wygl&#x0105;da na to, &#x017c;e jeste&#x015b; w trakcie pisania komentarza. Kliknij &quot;Anuluj&quot;, &#x017c;eby doko&#x0144;czy&#x0107; pisanie i r&#x0119;cznie od&#x015b;wie&#x017c;y&#x0107; stron&#x0119; p&oacute;&#x017a;niej (to konieczne by znikn&#x0119;&#x0142;a odznaka przy nicku u&#x017c;ytkownika). Je&#x015b;li to pomy&#x0142;ka, i nie masz nic przeciw od&#x015b;wie&#x017c;eniu strony, naci&#x015b;nij &quot;OK&quot;.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Od&#x015b;wie&#x017c;",cancelButtonText:"Anuluj"}).then(e=>{e.value&&c()})},b=e=>{const t=(e=>{d();for(let t=0;t<o.length;t++){if(o[t].nick===e)return{link:o[t].link,nick:o[t].nick};void 0!==o[t]&&o[t]}})(document.querySelector(e).dataset.whusername);((e,t)=>{tippy(e,{content:t,allowHTML:!0,interactive:!0,placement:"bottom-start",followCursor:"initial"})})(e,((e,t)=>`\n  <p class="modalWH-text">Pow&oacute;d oznaczenia: \n    <a href="${e}" target="_blank">link</a>\n  </p>\n  <span class="modalWH-button modalWH-button--remove" data-whuserremove="${t}">Usu&#x0144; oznaczenie</span>\n`)(t.link,t.nick))};(e=>{const t=`<style> ${e} </style>`;document.body.insertAdjacentHTML("afterbegin",t)})("\n.buttonWH {\n  display: inline-block;\n  padding: .2rem .2rem;\n  border: 1px solid #9999996e;\n  cursor: pointer;\n  margin-left: .5rem;\n  color: #808080ba;\n  border-radius: .3rem;\n  font-size: .7rem;\n  line-height: .7rem;\n  transition: .3s all;\n}\n.buttonWH:hover {\n  border-color: green;\n}\n.buttonWH--clicked {\n  border-color: green;\n  opacity: 0;\n}\n.badge {\n  color: red;\n  font-weight: bold;\n  margin-right: .3rem;\n  border: 1px solid currentColor;\n  padding: .1rem .2rem;\n}\n.modalWH-button {\n  display: block;\n  padding: .4rem .8rem;\n  border: 1px solid #9999996e;\n  cursor: pointer;\n  color: #808080ba;\n  border-radius: .3rem;\n  font-size: 1rem;\n  line-height: 1rem;\n  transition: .3s all;\n}\n.author .modalWH-text {\n  position: relative;\n  margin-bottom: .5rem;\n  top: unset;\n  right: unset;\n  left: unset;\n  bottom: unset;\n}\n.tippy-box {\n  width: 20rem;\n}\n.tippy-content {\n  display: flex;\n  flex-direction: column;\n}"),d(),p(),document.querySelector(".badge")&&document.querySelectorAll(".badge").forEach(e=>{const t=e.dataset.whusername;setTimeout(b(`[data-whusername='${t}']`),1150)}),document.getElementById("itemsStream").addEventListener("click",e=>{const t=e.target;if(t.classList.contains("buttonWH")&&g(e),t.classList.contains("affect")&&t.closest(".more")&&setTimeout(()=>{d(),p()},500),t.classList.contains("modalWH-button--remove")){console.log(t);const e=t.dataset.whuserremove;y(e)}}),document.getElementById("itemsStream").addEventListener("mouseover",e=>{})},n=location.href;String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},localStorage.getItem("WHupdate")&&localStorage.getItem("WHupdate")<.21?(Swal.fire({title:"WykopHelper zaktualizowany!",html:'Dodatek WykopHelper zosta&#x0142; w&#x0142;a&#x015b;nie zaktualizowany. Wprowadzone zmiany to: <br><ul style="margin-top:1rem; list-style-type:square"><li style="text-align:left;margin-left:2rem">po najechaniu na odznakę usera pojawi się modal z linkiem do posta, przy którym został oznaczony</li><li style="text-align:left;margin-left:2rem">W modalu - button do usuwania oznaczenia</li><li style="text-align:left;margin-left:2rem">Nowy spos&oacute;b komunikowania o aktualizacjach</li><li style="text-align:left;margin-left:2rem">mniejsze i wi&#x0119;ksze poprawki poprawiaj&#x0105;ce stabilno&#x015b;&#x0107; i niezawodno&#x015b;&#x0107;</li></ul>',icon:"info",confirmButtonText:"Okej!"}),localStorage.setItem("WHupdate",.21)):localStorage.getItem("WHupdate")||(Swal.fire({title:"WykopHelper zainstalowany!",html:'Mi&#x0142;ego u&#x017c;ytkowania dodatku! Je&#x015b;li masz jakiekolwiek problemy, pytania lub sugestie, zg&#x0142;o&#x015b; je <a href="https://github.com/PLWpl/wykopoweTrole/issues" target="_blank">tutaj.</a>',icon:"success",confirmButtonText:"Super!"}),localStorage.setItem("WHupdate",.21)),(n.indexOf("wykop.pl/link/")>-1||n.indexOf("wykop.pl/mikroblog/")>-1||n.indexOf("wykop.pl/wpis/")>-1||n.indexOf("wykop.pl/moj/")>-1||n.indexOf("wykop.pl/tag/wpisy")>-1)&&t()}();
