// ==UserScript==
// @name         WykopHelper
// @version      0.4
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
!function(){"use strict";const e=location.href,t=()=>e.indexOf("wykop.pl/link/")>-1||e.indexOf("wykop.pl/mikroblog/")>-1||e.indexOf("wykop.pl/wpis/")>-1||e.indexOf("wykop.pl/moj/")>-1||e.indexOf("wykop.pl/tag/")>-1,n=()=>!!(e.indexOf("wykop.pl/ustawienia/")>-1),a=()=>!!(e.indexOf("wykop.pl/ustawienia/wykophelper")>-1),o="trolls",i="uniqueNicks",l="whsettings",r={BADGE:{NICK_ELEMENTS:"li div.author",NICK_ELEMENT:"author",NICK:".showProfileSummary > b",BADGE:"badge",MARK_BUTTON:"buttonWH",MARK_BUTTON_CLICKED:"buttonWH--clicked",REPLY_FORM:".replyForm textarea",COMMENT_FORM:"#commentFormContainer textarea",DATASET:{USERNAME:e=>"[data-whusername='"+e},MODAL_BUTTON_REMOVE:"modalWH-button--remove"},SETTINGS:{LAST_NAV_ELEMENT:"#site .nav > ul > li:last-child",ACTIVE_NAV_ELEMENT:"#site .nav > ul .active",SETTINGS_FORM_ELEMENT:"#site .grid-main .settings",WH_NAV_SETTINGS_LINK:"whSettingsLink",WH_USER_TABLE:"tableWH",WH_USER_TABLE_CONTAINER:"tableWH__container",WH_USER_TABLE_BODY:"tableWH__body"}},s=(e,t="debil")=>`<span class="badge badge--${t.toLowerCase()}" data-whusername="${e}">${t.toLowerCase().capitalize()}</span>`,c=e=>{const t=`<style> ${e} </style>`;document.body.insertAdjacentHTML("afterbegin",t)},{BADGE:d}=r,u=()=>{let e,t=[];const n=e=>!!t.includes(e),a=(a,l)=>{n(a)||((e=>{t.push(e),localStorage.setItem(i,JSON.stringify(t))})(a),((t,n)=>{e.push({nick:t,link:n}),localStorage.setItem(o,JSON.stringify(e))})(a,l))},r=()=>document.querySelectorAll(d.NICK_ELEMENTS),u=e=>e.querySelector(d.NICK).innerText,y=()=>location.reload(),m=e=>!e.querySelector("."+d.BADGE),g=()=>{const e=document.querySelector(d.REPLY_FORM),t=document.querySelector(d.COMMENT_FORM);return!(e&&""!==e.value||t&&""!==t.value)},p=()=>{e=localStorage.getItem(o)?JSON.parse(localStorage.getItem(o)):[],t=localStorage.getItem(i)?JSON.parse(localStorage.getItem(i)):[]},k=(e=(()=>JSON.parse(localStorage.getItem(l)).BADGE.DEFAULT_NAME)())=>{try{r().forEach(t=>{const a=u(t);n(a)&&m(t)?t.insertAdjacentHTML("afterbegin",s(a,e)):(e=>!!e.querySelector("."+d.MARK_BUTTON))(t)||t.insertAdjacentHTML("beforeend",'<span class="buttonWH">Oznacz</span>')})}catch(e){}},w=e=>{p();const t=u(e.target.closest("."+d.NICK_ELEMENT)),o=e.target.closest("."+d.NICK_ELEMENT).querySelector("a + a").href;e.target.classList.add(d.MARK_BUTTON_CLICKED),e.target.innerText="✔",setTimeout(()=>{e.target.remove()},700),a(t,o),(()=>{try{r().forEach(e=>{const t=u(e);n(t)&&m(e)&&e.insertAdjacentHTML("afterbegin",s(t)),n(t)&&m(e)&&e.querySelector("."+d.MARK_BUTTON)&&!e.querySelector("."+d.MARK_BUTTON_CLICKED)&&e.querySelector("."+d.MARK_BUTTON).remove()})}catch(e){}})()},E=n=>{p();for(let[t,a]of e.entries())a.nick===n&&(delete e[t],e=e.filter(e=>null!=e),localStorage.setItem(o,JSON.stringify(e)));t=t.filter(e=>e!==n),localStorage.setItem(i,JSON.stringify(t)),g?y():Swal.fire({title:"Hej!",text:"Wygl&#x0105;da na to, &#x017c;e jeste&#x015b; w trakcie pisania komentarza. Kliknij &quot;Anuluj&quot;, &#x017c;eby doko&#x0144;czy&#x0107; pisanie i r&#x0119;cznie od&#x015b;wie&#x017c;y&#x0107; stron&#x0119; p&oacute;&#x017a;niej (to konieczne by znikn&#x0119;&#x0142;a odznaka przy nicku u&#x017c;ytkownika). Je&#x015b;li to pomy&#x0142;ka, i nie masz nic przeciw od&#x015b;wie&#x017c;eniu strony, naci&#x015b;nij &quot;OK&quot;.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Od&#x015b;wie&#x017c;",cancelButtonText:"Anuluj"}).then(e=>{e.value&&y()})},b=t=>{const n=(t=>{p();for(let n=0;n<e.length;n++){if(e[n].nick===t)return{link:e[n].link,nick:e[n].nick};void 0!==e[n]&&e[n]}})(document.querySelector(t).dataset.whusername);((e,t)=>{tippy(e,{content:t,allowHTML:!0,interactive:!0,placement:"bottom-start",followCursor:"initial"})})(t,((e,t)=>`\n  <p class="modalWH-text">Powód  oznaczenia: \n    <a href="${e}" target="_blank">link</a>\n  </p>\n  <span class="modalWH-button modalWH-button--remove" data-whuserremove="${t}">Usuń oznaczenie</span>\n`)(n.link,n.nick))};c("\n.buttonWH {\n  display: inline-block;\n  padding: .2rem .2rem;\n  border: 1px solid #9999996e;\n  cursor: pointer;\n  margin-left: .5rem;\n  color: #808080ba;\n  border-radius: .3rem;\n  font-size: .7rem;\n  line-height: .7rem;\n  transition: .3s all;\n}\n.buttonWH:hover {\n  border-color: green;\n}\n.buttonWH--clicked {\n  border-color: green;\n  opacity: 0;\n}\n.badge {\n  color: red;\n  font-weight: bold;\n  margin-right: .3rem;\n  border: 1px solid currentColor;\n  padding: .1rem .2rem;\n}\n.modalWH-button {\n  display: block;\n  padding: .4rem .8rem;\n  border: 1px solid #9999996e;\n  cursor: pointer;\n  color: #808080ba;\n  border-radius: .3rem;\n  font-size: 1rem;\n  line-height: 1rem;\n  transition: .3s all;\n}\n.author .modalWH-text {\n  position: relative;\n  margin-bottom: .5rem;\n  top: unset;\n  right: unset;\n  left: unset;\n  bottom: unset;\n}\n.tippy-box {\n  width: 20rem;\n}\n.tippy-content {\n  display: flex;\n  flex-direction: column;\n}\n"),p(),k(),document.querySelector("."+d.BADGE)&&document.querySelectorAll("."+d.BADGE).forEach(e=>{const t=e.dataset.whusername;setTimeout(b(d.DATASET.USERNAME(t)),1150)}),document.getElementById("itemsStream").addEventListener("click",e=>{const t=e.target;if(t.classList.contains(d.MARK_BUTTON)&&w(e),t.classList.contains("affect")&&t.closest(".more")&&setTimeout(()=>{p(),k()},500),t.classList.contains(d.MODAL_BUTTON_REMOVE)){console.log(t);const e=t.dataset.whuserremove;E(e)}})},{SETTINGS:y}=r,m=()=>{let e,t,n;const a={BADGE:{HIDE_MARKED_USERS:!1,DEFAULT_NAME:"Debil",DEFAULT_COLOR:"red"},GENERAL:{WARN_ON_RELOAD:!0,WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA:!0}},r=document.querySelector(y.SETTINGS_FORM_ELEMENT),s=(...r)=>{[...r].length<1||[...r].includes("settings")?localStorage.getItem(l)?e=JSON.parse(localStorage.getItem(l)):(e=a,localStorage.setItem(l,JSON.stringify(e))):[...r].includes("markedUsers")&&(t=localStorage.getItem(o)?JSON.parse(localStorage.getItem(o)):[],n=localStorage.getItem(i)?JSON.parse(localStorage.getItem(i)):[])},d=()=>{s(),document.querySelector(y.ACTIVE_NAV_ELEMENT).classList.remove("active"),document.querySelector("."+y.WH_NAV_SETTINGS_LINK).classList.add("active"),r.innerHTML="",r.innerHTML='\n<fieldset>\n  <h4>WykopHelper - Ustawienia</h4>\n\x3c!-- GENERAL --\x3e\n  <div class="space settings--general">\n    <div class="row">\n      <input\n        class="checkbox"\n        type="checkbox"\n        category="GENERAL"\n        name="WARN_ON_RELOAD"\n        id="warnOnReload"\n        checked\n        disabled\n      />\n      <label title="Ficzer jeszcze nieaktywny" class="settings__crossed inline" for="warnOnReload">Ostrzegaj przy próbie zamknięcia/przeładowania strony gdy wykryto pisanie komentarza</label>\n    </div>\n    <div class="row">\n      <input\n        class="checkbox"\n        type="checkbox"\n        category="GENERAL"\n        name="WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA"\n        id="warnOnRussian"\n        checked\n        disabled\n      />\n      <label title="Ficzer jeszcze nieaktywny" class="settings__crossed inline" for="warnOnRussian">Oznaczaj znaleziska ze źródeł podejrzewanych o szerzenie Rosyjskiej propagandy [<a href="#">Więcej -></a>]</label>\n    </div>\n  </div>\n\x3c!--  BADGE --\x3e\n  <div class="space settings--badge">\n    <div class="row">\n      <input\n        class="checkbox"\n        type="checkbox"\n        category="BADGE"\n        name="HIDE_MARKED_USERS"\n        id="hideMarkedUser"\n        disabled\n      />\n      <label title="Ficzer jeszcze nieaktywny" class="inline settings__crossed" for="hideMarkedUser">Ukrywaj treści oznakowanych użytkowników (tak jak na czarnej liście)</label>\n    </div>\n    <div class="row space">\n      <input placeholder="Domyślny tekst odznaki" id="badgeDefaultValue" category="BADGE" value="" name="DEFAULT_NAME" type="text">\n      <small>Domyślny tekst odznaki</small>\n    </div>\n  </div>\n\x3c!-- SPECIAL --\x3e\n  <div class="space settings--special">\n    <div class="row">\n      <small>Jeśli chcesz wyczyścić listę oznaczonych wcześniej użytkowników, możesz to zrobić poniżej. W związku z tym, że jest to akcja nieodwracalna, musisz najpierw potwierdzić, że na pewno taki jest Twój cel. Uwaga - po kliknięciu przycisku akcja wykonywana jest natychmiast, bez dodatkowych potwierdzeń!</small>\n    </div>\n    <div class="row">\n      <input\n        class="checkbox"\n        type="checkbox"\n        category="SPECIAL"\n        name="ALLOW_WIPE_MARKED_LIST"\n        id="allowWipeAllMarked"\n      />\n      <label class="inline" for="allowWipeAllMarked">Zaznacz by odblokować możliwość wyczyszczenia listy</label>\n    </div>\n    <div class="row space">\n      <button style="opacity:0.4" id="whsettings__remove-all-marked" disabled>Wyczyść</button>\n    </div>\n    <div class="row space">\n      <button class="button" id="showAllMarked">Pokaż wszystkich oznaczonych użytkowników</button>\n    </div>\n  </div>\n</fieldset>\n',r.removeAttribute("method"),r.removeAttribute("action"),r.insertAdjacentHTML("afterend",'\n<div class="tableWH__container tableWH__container--hidden">\n  <h4 class="tableWH__heading">WykopHelper - Lista oznaczonych użytkowników</h4>\n  <table class="tableWH">\n    <thead class="tableWH__head">\n      <tr>\n        <td>no.</td>\n        <td>Nick</td>\n        <td>Typ</td>\n        <td>Link</td>\n      </tr>\n    </thead>\n    <tbody class="tableWH__body">\n    </tbody>\n  </table> \n</div>\n'),(()=>{s("markedUsers");const e=document.querySelector("."+y.WH_USER_TABLE_BODY);for(let l=0;l<t.length;l++){const r=t[l];e.insertAdjacentHTML("beforeend",(n=l+1,a=r.nick,o=r.type||"Debil",i=r.link,`\n    <tr>\n      <td>${n}</td>\n      <td><a href="https://www.wykop.pl/ludzie/${a}" target="_blank">${a}</a></td>\n      <td>${o}</td>\n      <td><a href="${i}" target="_blank">&#128279</a></td>\n    </tr>\n    `))}var n,a,o,i})(),document.getElementById("badgeDefaultValue").value=e.BADGE.DEFAULT_NAME},u=()=>{r.addEventListener("change",t=>{const n=t.target.getAttribute("category"),a=t.target.name;"checkbox"===t.target.type&&"allowWipeAllMarked"!==t.target.id&&(e[n][a]=!e[n][a],localStorage.setItem(l,JSON.stringify(e)))}),r.addEventListener("click",e=>{"showAllMarked"===e.target.id&&(e.preventDefault(),document.querySelector("."+y.WH_USER_TABLE_CONTAINER).classList.toggle(y.WH_USER_TABLE_CONTAINER+"--hidden"),document.querySelector(`.${y.WH_USER_TABLE_CONTAINER}--hidden`)?document.getElementById("showAllMarked").textContent="Pokaż wszystkich oznaczonych użytkowników":document.getElementById("showAllMarked").textContent="Schowaj tabelę"),"allowWipeAllMarked"===e.target.id&&(e.target.disabled=!0,document.getElementById("whsettings__remove-all-marked").disabled=!1,document.getElementById("whsettings__remove-all-marked").style.opacity=1),"whsettings__remove-all-marked"===e.target.id&&(e.preventDefault(),n=[],t=[],localStorage.setItem(i,JSON.stringify(n)),localStorage.setItem(o,JSON.stringify(t)))}),r.addEventListener("keyup",t=>{const n=t.target.getAttribute("category"),a=t.target.name;"text"===t.target.type&&(e[n][a]=t.target.value.toLowerCase(),localStorage.setItem(l,JSON.stringify(e)))})};c("\n.tableWH__container {\n  padding: 1rem;\n}\n.tableWH__container--hidden {\n  display: none;\n}\n.tableWH__head {\n  font-weight: bold;\n  border-bottom: 2px solid currentColor;\n}\n.settings__crossed {\n  opacity: .4;\n  text-decoration: line-through;\n  cursor: not-allowed;\n}"),d(),s(),u()};String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},localStorage.getItem("WHupdate")&&localStorage.getItem("WHupdate")<.4?(Swal.fire({title:"WykopHelper zaktualizowany!",html:'Dodatek WykopHelper został właśnie zaktualizowany. Wprowadzone zmiany to: <br><ul style="margin-top:1rem; list-style-type:square"><li style="text-align:left;margin-left:2rem">W zakładce ustawień dodatku pojawiła się możliwość wpisania własnego domyślnego tekstu pojawiającego się na odznace przy oznaczonych użytkownikach. Obecnie tekst ten dotyczy wszystkich oznaczonych - docelowo będzie to tekst domyślny, jednak każdorazowo przy każdym userze będzie można sobie wpisać indywidualny tekst.</li></ul>',icon:"info",confirmButtonText:"Okej!"}),localStorage.setItem("WHupdate",.4)):localStorage.getItem("WHupdate")||(Swal.fire({title:"WykopHelper zainstalowany!",html:'Mi&#x0142;ego u&#x017c;ytkowania dodatku! Je&#x015b;li masz jakiekolwiek problemy, pytania lub sugestie, zg&#x0142;o&#x015b; je <a href="https://github.com/PLWpl/wykopoweTrole/issues" target="_blank">tutaj.</a>',icon:"success",confirmButtonText:"Super!"}),localStorage.setItem("WHupdate",.4)),t()&&u(),n()&&document.querySelector(y.LAST_NAV_ELEMENT).insertAdjacentHTML("beforeend",'<li class="whSettingsLink"><a href="https://www.wykop.pl/ustawienia/wykophelper/"><span><strong>WykopHelper</strong> &#10024;</span></a></li>'),a()&&m()}();
