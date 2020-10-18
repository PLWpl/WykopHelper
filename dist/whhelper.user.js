// ==UserScript==
// @name         WykopHelper
// @version      0.52
// @updateURL    https://cdn.jsdelivr.net/gh/plwpl/WykopHelper/dist/whhelper.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/plwpl/WykopHelper/dist/whhelper.user.js
// @description  Zestaw narzędzi pomocnych na wykopie. Pełna, niezminifikowana wersja kodu dostępna na githubie - PLWpl/WykopHelper
// @author       PLW
// @match        https://www.wykop.pl/*
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@9
// @grant        none
// ==/UserScript==
!function(){"use strict";const e=location.href,t=()=>e.indexOf("wykop.pl/link/")>-1||e.indexOf("wykop.pl/mikroblog/")>-1||e.indexOf("wykop.pl/wpis/")>-1||e.indexOf("wykop.pl/moj/")>-1||e.indexOf("wykop.pl/ludzie/")>-1||e.indexOf("wykop.pl/tag/")>-1,n=()=>!!(e.indexOf("wykop.pl/ustawienia/")>-1),a=()=>!!(e.indexOf("wykop.pl/ustawienia/wykophelper")>-1),o=()=>!!(e.indexOf("wykop.pl/link/")>-1),i=()=>!!(e.indexOf("wykop.pl/wpis/")>-1),r=(e,t=document)=>t.querySelector(e),l=(e,t=document)=>t.querySelectorAll(e),s="whMarkedUsers",E="whUniqueNicks",c="whSettings",A={COMMON:{CLASSNAME:{BUTTON:"buttonWH"}},BADGE:{CLASSNAME:{NICK_ELEMENT:"author",NICK_VERIFIED_BADGE:"verified",NICK:"showProfileSummary",VOTES_USERCARD:"usercard",BADGE:"badgeWH",MARK_BUTTON:"buttonWH",MARK_BUTTON_CLICKED:"buttonWH--clicked",MARK_ALL_BUTTON_ELEMENT:"buttonWH--markAllContainer",MARK_ALL_BUTTON:"buttonWH--markAll",MODAL_BUTTON:"modalWH-button",MODAL_BUTTON_REMOVE:"modalWH-button--remove",MODAL_TEXT:"modalWH-text"},ID:{VOTES_CONTAINER:"votesContainer"},SELECTOR:{NICK_ELEMENTS:".grid-main li div.author",NICK:".showProfileSummary > b",NICK_DELETED:".author > .color-1002",REPLY_FORM:".replyForm textarea",COMMENT_FORM:"#commentFormContainer textarea"},DYNAMIC:{DATASET:{USERNAME:e=>"[data-whusername='"+e}}},SETTINGS:{CLASSNAME:{SETTINGS_NAV:"whSettingsLink",SETTINGS_GENERAL:"settings--general",SETTINGS_BADGE:"settings--badge",SETTINGS_SPECIAL:"settings--special",WH_NAV_SETTINGS_LINK:"whSettingsLink",WH_USER_TABLE:"tableWH",WH_USER_TABLE_ROW:"tableWH__row",WH_USER_TABLE_HEAD:"tableWH__head",WH_USER_TABLE_HEADING:"tableWH__heading",WH_USER_TABLE_CONTAINER:"tableWH__container",WH_USER_TABLE_CONTAINER_HIDDEN:"tableWH__container--hidden",WH_USER_TABLE_BODY:"tableWH__body",WH_USER_TABLE_REMOVE_BUTTON:"tableWH__nick-remove",WH_SETTINGS_CROSSED:"settings__crossed"},ID:{SHOW_MARKED_TABLE:"showAllMarked",ALLOW_WIPE_MARKED_LIST:"allowWipeAllMarked",REMOVE_ALL_MARKED:"whsettings__remove-all-marked",RUSSIAN_PROPAGANDA_INFO_LINK:"russianPropagandaInfo",WARN_ON_RELOAD_INFO_LINK:"warnOnReloadInfo"},SELECTOR:{LAST_NAV_ELEMENT:"#site .nav > ul > li:last-child",ACTIVE_NAV_ELEMENT:"#site .nav > ul .active",SETTINGS_FORM_ELEMENT:"#site .grid-main .settings"},DYNAMIC:{}},HIGHLIGHT_OP:{CLASSNAME:{HIGHLIGHT_BUTTON:"button--highlightOp",AUTHOR_COMMENTS:"authorComment"},ID:{},SELECTOR:{OP_THREAD:'[data-type="entry"]'},DYNAMIC:{}},EMBED:{CLASSNAME:{EMBED_FILE:"embedFile"},ID:{},SELECTOR:{},DYNAMIC:{}},DOMAIN_CHECKER:{CLASSNAME:{WYKOP_ITEM_INTRO:"bspace",WYKOP_ITEM_ANNOTATION:"annotation"},ID:{},SELECTOR:{THREAD_LINK:".article h2 a"},DYNAMIC:{}},MODAL:{CLASSNAME:{LINK:"whModalLink",LIST:"whModal__list",LIST_ITEM:"whModal__list-item"}}},S={badge:`\n.${A.BADGE.CLASSNAME.MARK_BUTTON} {\n  display: inline-block;\n  padding: .2rem .2rem;\n  border: 1px solid #9999996e;\n  cursor: pointer;\n  margin-left: .5rem;\n  color: #808080ba;\n  border-radius: .3rem;\n  font-size: .7rem;\n  line-height: .7rem;\n  transition: .3s all;\n}\n.${A.BADGE.CLASSNAME.MARK_BUTTON}:hover {\n  border-color: green;\n}\n.${A.BADGE.CLASSNAME.MARK_BUTTON_CLICKED} {\n  border-color: green;\n  opacity: 0;\n}\n.${A.BADGE.CLASSNAME.BADGE} {\n  color: red;\n  font-weight: bold;\n  margin-right: .3rem;\n  border: 1px solid currentColor;\n  padding: .1rem .2rem;\n  cursor: pointer;\n  position: relative;\n  top: .1rem;\n}\n.${A.BADGE.CLASSNAME.MODAL_BUTTON} {\n  display: block;\n  padding: .4rem .8rem;\n  border: 1px solid #9999996e;\n  cursor: pointer;\n  color: #808080ba;\n  border-radius: .3rem;\n  font-size: 1rem;\n  line-height: 1rem;\n  transition: .3s all;\n}\n.author .${A.BADGE.CLASSNAME.MODAL_TEXT} {\n  position: relative;\n  margin-bottom: .5rem;\n  top: unset;\n  right: unset;\n  left: unset;\n  bottom: unset;\n}\n\n.${A.BADGE.CLASSNAME.MARK_ALL_BUTTON} {\n  top: 0.8rem;\n  position: relative;\n}\n\n.${A.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON} {\n  position: absolute;\n  top: .1rem;\n  left: 0;\n}\n\n@media screen and (min-width: 722px) {\n  .${A.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON} {\n    top: 6rem;\n    left: 1rem;\n  }\n}\n\n.${A.DOMAIN_CHECKER.CLASSNAME.MODAL_TEXT_LIST} {\n  margin-top:1rem;list-style-type: circle;font-size:1rem;\n}\n\n.${A.DOMAIN_CHECKER.CLASSNAME.MODAL_TEXT_LIST_ITEM} {\n  text-align:left;margin-left:2rem;margin-bottom:.7rem\n}\n`,settings:`\n.${A.SETTINGS.CLASSNAME.WH_USER_TABLE_CONTAINER} {\n  padding: 1rem;\n}\n.${A.SETTINGS.CLASSNAME.WH_USER_TABLE_CONTAINER_HIDDEN} {\n  display: none;\n}\n.${A.SETTINGS.CLASSNAME.WH_USER_TABLE} {\n  counter-reset: row-num;\n}\n.${A.SETTINGS.CLASSNAME.WH_USER_TABLE} .${A.SETTINGS.CLASSNAME.WH_USER_TABLE_ROW} {\n  counter-increment: row-num;\n}\n.${A.SETTINGS.CLASSNAME.WH_USER_TABLE} .${A.SETTINGS.CLASSNAME.WH_USER_TABLE_ROW} td:first-child::before {\n  content: counter(row-num) ". ";\n}\n.${A.SETTINGS.CLASSNAME.WH_USER_TABLE_HEAD} {\n  font-weight: bold;\n  border-bottom: 2px solid currentColor;\n}\n.${A.SETTINGS.CLASSNAME.WH_SETTINGS_CROSSED} {\n  opacity: .4;\n  text-decoration: line-through;\n  cursor: not-allowed;\n}\n.${A.SETTINGS.CLASSNAME.WH_USER_TABLE_REMOVE_BUTTON} {\n  cursor: pointer;\n  color: #c0392b;\n}\n.${A.MODAL.CLASSNAME.LINK} {\n  color: #862828;\n}\n.${A.MODAL.CLASSNAME.LINK}:hover {\n  color: #4a1313 !important;\n}`,modal:`\n.swal2-popup.swal2-modal.swal2-show {\n  background-color: #1b1b1b !important;\n  border: 1px solid #ff5917 !important;\n}\n.swal2-icon.swal2-info {\n  border-color: #542621 !important;\n  color: #c0392b !important;\n}\n\n.swal2-title {\n  color: #a2a2a2 !important;\n}\n\n.swal2-content {\n  color: #888;\n}\n\n.swal2-styled.swal2-confirm {\n  background-color: #e74c3c6b !important;\n}\n.${A.MODAL.CLASSNAME.LIST} {\n  margin-top: 1rem;\n  list-style-type: square;\n}\n.${A.MODAL.CLASSNAME.LIST_ITEM} {\n  text-align: left;\n  margin-left: 2rem;\n  margin-bottom: .7rem\n}\n`},d=`<span class="${A.BADGE.CLASSNAME.MARK_BUTTON}">Oznacz</span>`,L=`<li class="${A.BADGE.CLASSNAME.MARK_ALL_BUTTON_ELEMENT}" style="display:none"><span class="${A.BADGE.CLASSNAME.MARK_BUTTON} ${A.BADGE.CLASSNAME.MARK_ALL_BUTTON}">Oznacz wszystkich poniżej</span></li>`,_=(e,t="debil")=>`<span class="${A.BADGE.CLASSNAME.BADGE} ${A.BADGE.CLASSNAME.BADGE}--${t.toLowerCase()}" data-whusername="${e}">${t.toLowerCase().capitalize()}</span>`,T=`\n  <p>Strony oznaczone jako potencjalnie szerzące rosyjską propagandę na wykopie zostały wyznaczone na podstawie następujących źródeł:\n  <ul class="${A.MODAL.CLASSNAME.LIST}">\n    <li class="${A.MODAL.CLASSNAME.LIST_ITEM}"><a class="${A.MODAL.CLASSNAME.LINK}" href="https://www.politicalcapital.hu/wp-content/uploads/PC_reactionary_values_CEE_20160727.pdf" target="_blank">Raport "The Weaponization of Culture: Kremlin's traditional agenda and the export of values to Central Europe" [PDF]</a></li>\n    <li class="${A.MODAL.CLASSNAME.LIST_ITEM}"><a class="${A.MODAL.CLASSNAME.LINK}" href="https://jagiellonia.org/mysl-polska-kresy-pl-geopolityka-org-etc-sa-kanalami-szerzenia-rosyjskich-wplywow-w-polsce-opublikowano-korespondencje-kremlowskich-urzednikow-rappoport-leaks/" target="_blank">Artykuł z Jagiellonia.org</a></li>\n    <li class="${A.MODAL.CLASSNAME.LIST_ITEM}"><a class="${A.MODAL.CLASSNAME.LINK}" href="https://euvsdisinfo.eu/reading-list/" target="_blank">EUvsDiSiNFO</a></li>\n    <li class="${A.MODAL.CLASSNAME.LIST_ITEM}"><a class="${A.MODAL.CLASSNAME.LINK}" href="https://oko.press/rosyjska-propagande-szerza-polskie-portale-znalezlismy-23-takie-witryny/" target="_blank">Artykuł z OKO.Press</a></li>\n  </ul>\n  <p>Lista z czasem będzie uzupełniana, a jedna z aktualizacji już wkrótce przyniesie możliwość przejrzenia (najpierw) i edycji (późniejsza aktualizacja) listy witryn.\n`,p=(e,t="")=>{const n=`<style ${t?'id="'+t+'"':""}> ${e} </style>`;document.body.insertAdjacentHTML("afterbegin",n)},N={BADGE:{HIDE_MARKED_USERS:!1,DEFAULT_NAME:"Debil",DEFAULT_COLOR:"red"},GENERAL:{WARN_ON_RELOAD:!1,WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA:!0}},k=[],m=[],y=()=>{localStorage.getItem(c)||localStorage.setItem(c,JSON.stringify(N))},w=(e="marked")=>{switch(e){case"settings":return y(),JSON.parse(localStorage.getItem(c));case"unique":return localStorage.getItem(E)||localStorage.setItem(E,JSON.stringify(k)),JSON.parse(localStorage.getItem(E));case"marked":return localStorage.getItem(s)||localStorage.setItem(s,JSON.stringify(m)),JSON.parse(localStorage.getItem(s));default:throw new Error(`Unknown storage type: ${e}. Pick either "unique", "marked" or "settings"`)}},{BADGE:u}=A,M=()=>{let e=w("unique"),t=w("marked"),n=w("settings");const a=t=>(e=w("unique"),!!e.includes(t)),o=(o,i,r="",l="",c=n.BADGE.DEFAULT_NAME)=>{a(o)||((t=>{const n=[...e,t];localStorage.setItem(E,JSON.stringify(n))})(o),((e,n,a,o,i)=>{t=w("marked");const r=[...t,{nick:e,link:n,label:a,content:o,media:i}];localStorage.setItem(s,JSON.stringify(r))})(o,i,c,r,l))},i=()=>l(u.SELECTOR.NICK_ELEMENTS),c=e=>{if(!(r(u.SELECTOR.NICK,e)&&null!==r(u.SELECTOR.NICK,e)||r(u.SELECTOR.NICK_DELETED,e)&&null!==r(u.SELECTOR.NICK_DELETED,e)))throw new Error("getNick didn't work for "+e);return null!==r(u.SELECTOR.NICK,e)?r(u.SELECTOR.NICK,e).innerText:null!==r(u.SELECTOR.NICK_DELETED,e)?r(u.SELECTOR.NICK_DELETED,e).innerText:void 0},A=e=>!r("."+u.CLASSNAME.BADGE,e),T=()=>{try{i().forEach(e=>{const t=c(e),o=k(t)?k(t):null,i=o?o.label:n.BADGE.DEFAULT_NAME;a(t)&&A(e)?e.insertAdjacentHTML("afterbegin",_(t,i)):(e=>!!r("."+u.CLASSNAME.MARK_BUTTON,e))(e)||e.insertAdjacentHTML("beforeend",d)})}catch(e){}},N=()=>{t=w("marked"),T();i().forEach(e=>{const t=c(e);a(t)&&A(e)&&e.insertAdjacentHTML("afterbegin",_(t)),a(t)&&r("."+u.CLASSNAME.MARK_BUTTON,e)&&!r("."+u.CLASSNAME.MARK_BUTTON_CLICKED,e)&&r("."+u.CLASSNAME.MARK_BUTTON,e).remove(),a(t)||A(e)||r("."+u.CLASSNAME.BADGE,e).remove()})},k=e=>{if(!e)throw new Error("getNickData requires nick to be provided.");for(let n=0;n<t.length;n++){if(t[n].nick===e)return{link:t[n].link,nick:t[n].nick,label:t[n].label,content:t[n].content,media:t[n].media};void 0!==t[n]&&t[n]}},m=n=>{const a=r(n).dataset.whusername,o=k(a),i={title:""+(l=o).nick,content:`\n    <p style="text-align:left">Przyczyna oznaczenia jako <strong>${l.label}</strong>:</p>\n    <div style="margin-top:.5rem;border:1px solid gray;padding: 1rem;text-align:left"><p>${l.content}</p>\n    ${l.media?(c=l.media,`<p style="margin-top:5px;"><a href="${c}" target="_blank">Link do osadzonej treści multimedialnej (obrazek lub film)</a></p>`):""}</div>\n    <p style="margin-top:1rem;text-align:right"><a href="${l.link}">Link do komentarza lub znaleziska</a></p>\n    `,button:"Usuń oznaczenie"};var l,c;Swal.fire({title:i.title,html:i.content,icon:"info",showCancelButton:!1,confirmButtonText:i.button,width:"80%"}).then(n=>{n.isConfirmed&&((n=>{for(let[e,a]of t.entries())if(a.nick===n){delete t[e];const n=t.filter(e=>null!=e);localStorage.setItem(s,JSON.stringify(n))}const a=e.filter(e=>e!==n);localStorage.setItem(E,JSON.stringify(a)),setTimeout(()=>{N()},780)})(a),Swal.fire("Usunięto!","Użytkownik nie będzie już więcej oznaczany.","info"))})};p(S.badge),p(S.modal),T(),(()=>{if(document.getElementById(u.ID.VOTES_CONTAINER)){const e=document.getElementById(u.ID.VOTES_CONTAINER).closest(".rbl-block").querySelector(".nav ul + ul");e&&e.insertAdjacentHTML("beforeend",L)}})(),document.getElementById("itemsStream").addEventListener("click",e=>{const t=e.target;if(t.classList.contains(u.CLASSNAME.MARK_BUTTON)&&(e=>{const t=c(e.target.closest("."+u.CLASSNAME.NICK_ELEMENT)),n=e.target.closest("."+u.CLASSNAME.NICK_ELEMENT).querySelector(".verified")?e.target.closest("."+u.CLASSNAME.NICK_ELEMENT).querySelector(`.${u.CLASSNAME.NICK_VERIFIED_BADGE} + a`).href:e.target.closest("."+u.CLASSNAME.NICK_ELEMENT).querySelector("a + a").href,a=e.target.closest(".wblock").querySelector(".text p").innerHTML,i=e.target.closest(".wblock").querySelector(".text .media-content a")?e.target.closest(".wblock").querySelector(".text .media-content a").href:null;e.target.classList.add(u.CLASSNAME.MARK_BUTTON_CLICKED),e.target.innerText="✔",o(t,n,a,i),setTimeout(()=>{e.target.remove()},700),setTimeout(()=>{N()},780)})(e),t.classList.contains("affect")&&t.closest(".more")&&setTimeout(()=>{T()},500),t.classList.contains(u.CLASSNAME.BADGE)){const e=t.dataset.whusername;m(u.DYNAMIC.DATASET.USERNAME(e))}}),document.getElementById(u.ID.VOTES_CONTAINER)&&document.getElementById(u.ID.VOTES_CONTAINER).closest(".rbl-block").querySelector(".nav").addEventListener("click",e=>{const t=e.target;t.classList.contains(u.CLASSNAME.MARK_ALL_BUTTON)&&((()=>{const e=window.location.href,t=l(`#${u.ID.VOTES_CONTAINER} .${u.CLASSNAME.VOTES_USERCARD}`);let n;r("#voters").closest("li").classList.contains("active")?n="wykop":r("#votersBury").closest("li").classList.contains("active")&&(n="zakop"),t.forEach(t=>{const a=r("a",t).title;o(a,e,(e=>`Użytkownik ${e}ał podlinkowane znalezisko.`)(n))}),setTimeout(()=>{N()},780)})(),r("."+u.CLASSNAME.MARK_ALL_BUTTON).innerText="Zrobione :)",setTimeout(()=>{r("."+u.CLASSNAME.MARK_ALL_BUTTON_ELEMENT).style.display="none",r("."+u.CLASSNAME.MARK_ALL_BUTTON).innerText="Oznacz wszystkich poniżej"},500)),(t.closest("#voters")||t.closest("#votersBury"))&&(r("."+u.CLASSNAME.MARK_ALL_BUTTON_ELEMENT).style.display="block")})},I=["alternews.pl","alexjones.pl","dziennik-polityczny.com","koniec-swiata.org","magnapolonia.org","narodowcy.net","nczas.com","mysl.pl","ndie.pl","neon24.pl","newsweb.pl","parezja.pl","prostozmostu24.pl","prawdaobiektywna.pl","reporters.pl","sioe.pl","wmeritum.pl","wolnosc24.pl","wolna-polska.pl","wprawo.pl","wsensie.pl","zmianynaziemi.pl","sputniknews.com","rt.com","ruptly.tv","prawica.net","xportal.pl","kresy.pl","bdp.xportal.pl","geopolityka.org","pravda.ru","voiceofrussia.com","ria.ru","ligakobietpolskich.pl","ronik.org.pl","obserwatorpolityczny.pl","mysl-polska.pl"].map(e=>["https://"+e,"https://www."+e,"http://"+e,"http://www."+e]).flat(),O=()=>{const e=()=>{if(!r(A.DOMAIN_CHECKER.SELECTOR.THREAD_LINK).href)return;const e=r(A.DOMAIN_CHECKER.SELECTOR.THREAD_LINK).href,t=new URL(e),n=t.protocol+"//"+t.hostname,a=((e,t="alert")=>`\n  <div class="${A.DOMAIN_CHECKER.CLASSNAME.WYKOP_ITEM_ANNOTATION} type-${t} space clearfix">\n\t\t<p>${e}</p>\n\t</div>\n`)("Uważaj! Źródło tego znaleziska jest podejrzewane o szerzenie rosyjskiej propagandy.");I.includes(n)&&r("."+A.DOMAIN_CHECKER.CLASSNAME.WYKOP_ITEM_INTRO).insertAdjacentHTML("beforebegin",a)};w("settings").GENERAL.WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA&&e()},g=()=>{w("settings").BADGE.HIDE_MARKED_USERS&&l("."+A.BADGE.CLASSNAME.BADGE).forEach(e=>{e.closest(".wblock").innerHTML='<p style="opacity:0.3">Tu był komentarz użytkownika, którego oznaczyłeś z pomocą WykopHelpera. Jeśli chcesz widzieć takie komentarze, edytuj swoje ustawienia w localStorage (bo zapewne tam aktywowałeś to ustawienie, czyż nie? :) ).</p>'})},{SETTINGS:{CLASSNAME:z}}=A,C={settingsMarkup:`\n<fieldset>\n  <h4>WykopHelper - Ustawienia</h4>\n\x3c!-- GENERAL --\x3e\n  <div class="space ${z.SETTINGS_GENERAL}">\n    <div class="row">\n      <input\n        class="checkbox"\n        type="checkbox"\n        category="GENERAL"\n        name="WARN_ON_RELOAD"\n        id="warnOnReload"\n      />\n      <label class="inline" for="warnOnReload">Ostrzegaj przy próbie zamknięcia/przeładowania strony gdy wykryto pisanie komentarza </label><span id="warnOnReloadInfo" style="cursor:pointer;border:1px solid currentcolor;padding:0 .5rem">ℹ</span>\n    </div>\n    <div class="row">\n      <input\n        class="checkbox"\n        type="checkbox"\n        category="GENERAL"\n        name="WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA"\n        id="warnOnRussian"\n      />\n      <label class="inline" for="warnOnRussian">Oznaczaj znaleziska ze źródeł podejrzewanych o szerzenie Rosyjskiej propagandy </label><span id="russianPropagandaInfo" style="cursor:pointer;border:1px solid currentcolor;padding:0 .5rem">ℹ</span>\n    </div>\n  </div>\n\x3c!--  BADGE --\x3e\n  <div class="space ${z.SETTINGS_BADGE}">\n    <div class="row">\n      <input\n        class="checkbox"\n        type="checkbox"\n        category="BADGE"\n        name="HIDE_MARKED_USERS"\n        id="hideMarkedUser"\n        disabled\n      />\n      <label title="Ficzer w trakcie prac koncepcyjnych :)" class="inline settings__crossed" for="hideMarkedUser">Ukrywaj treści oznakowanych użytkowników</label>\n    </div>\n    <div class="row space">\n      <input placeholder="Domyślny tekst odznaki" id="badgeDefaultValue" category="BADGE" value="" name="DEFAULT_NAME" type="text">\n      <small>Domyślny tekst odznaki</small>\n    </div>\n  </div>\n\x3c!-- SPECIAL --\x3e\n  <div class="space ${z.SETTINGS_SPECIAL}">\n    <div class="row">\n      <small>Jeśli chcesz wyczyścić listę oznaczonych wcześniej użytkowników, możesz to zrobić poniżej. W związku z tym, że jest to akcja nieodwracalna, musisz najpierw potwierdzić, że na pewno taki jest Twój cel. Uwaga - po kliknięciu przycisku akcja wykonywana jest natychmiast, bez dodatkowych potwierdzeń!</small>\n    </div>\n    <div class="row">\n      <input\n        class="checkbox"\n        type="checkbox"\n        category="SPECIAL"\n        name="ALLOW_WIPE_MARKED_LIST"\n        id="allowWipeAllMarked"\n      />\n      <label class="inline" for="allowWipeAllMarked">Zaznacz by odblokować możliwość wyczyszczenia listy</label>\n    </div>\n    <div class="row space">\n      <button style="opacity:0.4" id="whsettings__remove-all-marked" disabled>Wyczyść</button>\n    </div>\n    <div class="row space">\n      <button class="button" id="showAllMarked">Pokaż wszystkich oznaczonych użytkowników</button>\n    </div>\n  </div>\n</fieldset>\n`,settingsUserTable:`\n<div class="${z.WH_USER_TABLE_CONTAINER} ${z.WH_USER_TABLE_CONTAINER_HIDDEN}">\n  <h4 class="${z.WH_USER_TABLE_HEADING}">WykopHelper - Lista oznaczonych użytkowników</h4>\n  <table class="${z.WH_USER_TABLE}">\n    <thead class="${z.WH_USER_TABLE_HEAD}">\n      <tr>\n        <td>no.</td>\n        <td>Nick</td>\n        <td>Typ</td>\n        <td>Link</td>\n        <td>Usuń</td>\n      </tr>\n    </thead>\n    <tbody class="${z.WH_USER_TABLE_BODY}">\n    </tbody>\n  </table> \n</div>\n`,settingsNav:`<li class="${z.SETTINGS_NAV}"><a href="https://www.wykop.pl/ustawienia/wykophelper/"><span><strong>WykopHelper</strong> &#10024;</span></a></li>`,settingsUserTableRow:(e,t,n)=>`\n<tr class="${z.WH_USER_TABLE_ROW}">\n  <td></td>\n  <td><a href="https://www.wykop.pl/ludzie/${e}" target="_blank">${e}</a></td>\n  <td>${t}</td>\n  <td><a href="${n}" target="_blank">&#128279</a></td>\n  <td><span class="${z.WH_USER_TABLE_REMOVE_BUTTON}" data-whuserremove="${e}">&#x02717;</a></td>\n</tr>\n`,textContent:{SHOW_ALL_MARKED:"Pokaż wszystkich oznaczonych użytkowników",HIDE_TABLE:"Schowaj tabelę",RUSSIAN_PROPAGANDA_MODAL_TITLE:"Skąd lista stron z propagandą?",WARN_ON_RELOAD_MODAL_TITLE:"Ostrożnie z tym ficzerem... :("}},{SETTINGS:D}=A,R=()=>{const e=w("settings"),t=w(),n=w("unique"),a=r(D.SELECTOR.SETTINGS_FORM_ELEMENT),o=()=>{r(D.SELECTOR.ACTIVE_NAV_ELEMENT).classList.remove("active"),r("."+D.CLASSNAME.WH_NAV_SETTINGS_LINK).classList.add("active"),a.innerHTML="",a.innerHTML=C.settingsMarkup,a.removeAttribute("method"),a.removeAttribute("action"),a.insertAdjacentHTML("afterend",C.settingsUserTable),(()=>{const n=r("."+D.CLASSNAME.WH_USER_TABLE_BODY);t.forEach(t=>{n.insertAdjacentHTML("beforeend",C.settingsUserTableRow(t.nick,t.label||e.BADGE.DEFAULT_NAME,t.link))})})(),l("input").forEach(t=>{const n=t.getAttribute("category");t.id!==D.ID.ALLOW_WIPE_MARKED_LIST&&"checkbox"===t.type?t.checked=e[n][t.name]:"text"===t.type&&"nsQ"!==t.name&&(t.value=e[n][t.name])})},i=()=>{a.addEventListener("change",t=>{const n=t.target.getAttribute("category"),a=t.target.name;"checkbox"===t.target.type&&t.target.id!==D.ID.ALLOW_WIPE_MARKED_LIST&&(e[n][a]=!e[n][a],localStorage.setItem(c,JSON.stringify(e)))},{passive:!0}),a.addEventListener("click",e=>{e.target.id===D.ID.SHOW_MARKED_TABLE&&(e.preventDefault(),r("."+D.CLASSNAME.WH_USER_TABLE_CONTAINER).classList.toggle(D.CLASSNAME.WH_USER_TABLE_CONTAINER+"--hidden"),r(`.${D.CLASSNAME.WH_USER_TABLE_CONTAINER}--hidden`)?document.getElementById(D.ID.SHOW_MARKED_TABLE).textContent=C.textContent.SHOW_ALL_MARKED:document.getElementById(D.ID.SHOW_MARKED_TABLE).textContent=C.textContent.HIDE_TABLE),e.target.id===D.ID.ALLOW_WIPE_MARKED_LIST&&(e.target.disabled=!0,document.getElementById(D.ID.REMOVE_ALL_MARKED).disabled=!1,document.getElementById(D.ID.REMOVE_ALL_MARKED).style.opacity=1),e.target.id===D.ID.REMOVE_ALL_MARKED&&(e.preventDefault(),localStorage.setItem(E,"[]"),localStorage.setItem(s,"[]"),location.reload()),e.target.id===D.ID.RUSSIAN_PROPAGANDA_INFO_LINK&&Swal.fire({title:C.textContent.RUSSIAN_PROPAGANDA_MODAL_TITLE,html:T,icon:"info",showCancelButton:!1,confirmButtonColor:"#3085d6",confirmButtonText:"OK",width:"80%"}),e.target.id===D.ID.WARN_ON_RELOAD_INFO_LINK&&Swal.fire({title:C.textContent.WARN_ON_RELOAD_MODAL_TITLE,html:'\n  <p>Ten ficzer jest eksperymentalny. Z nie do końca dla mnie zrozumiałych powodów (podejrzewam, że przeszkadza tu jakiś wykopowy skrypt reklamowy), na niektórych przeglądarkach (np. firefox z ublockiem) działa jak powinien, a na innych (czysty Chrome) nie działa w ogóle. Dlatego zanim zdecydujesz się mu zaufać, przeprowadź kilka testów. Ostrzeżenie powinno aktywować się, gdy w okienku pisania komentarza znajdować się będzie 6 słów i więcej.\n  <p style="margin-top:.5rem">W najbliższej przyszłości poświęcę nieco więcej czasu na debugging i, mam nadzieję, odkryję przyczynę tej niestabilności. Sorry za utrudnienia, ale to wciąż wersja beta ;)\n',icon:"info",showCancelButton:!1,confirmButtonColor:"#3085d6",confirmButtonText:"OK",width:"80%"})},{passive:!1}),a.addEventListener("keyup",t=>{const n=t.target.getAttribute("category"),a=t.target.name;"text"===t.target.type&&(e[n][a]=t.target.value.toLowerCase(),localStorage.setItem(c,JSON.stringify(e)))},{passive:!0})};p(S.settings),p(S.modal),o(),i(),r("."+A.SETTINGS.CLASSNAME.WH_USER_TABLE).addEventListener("click",e=>{const a=e.target;a.classList.contains(""+A.SETTINGS.CLASSNAME.WH_USER_TABLE_REMOVE_BUTTON)&&((e=>{for(let[n,a]of t.entries())if(a.nick===e){delete t[n];const e=t.filter(e=>null!=e);localStorage.setItem(s,JSON.stringify(e))}const a=n.filter(t=>t!==e);localStorage.setItem(E,JSON.stringify(a))})(a.dataset.whuserremove),a.closest("tr").remove())})},h="WykopHelper zainstalowany!",b='Miłego używania dodatku! Jeśli masz jakiekolwiek problemy, pytania lub sugestie, zgłoś je <a href="https://github.com/PLWpl/WykopHelper/issues" target="_blank">tutaj.</a>',f="Super!",H={title:"WykopHelper zaktualizowany!",content:`\nDodatek WykopHelper został właśnie zaktualizowany do wersji 0.52. Wprowadzone zmiany to: <br>\n<ul class="${A.MODAL.CLASSNAME.LIST}">\n  <li class="${A.MODAL.CLASSNAME.LIST_ITEM}">\n    <strong>Istotna zmiana</strong>: jeśli używałeś do tej pory oznaczania użytkowników, najprawdopodobniej po tej aktualizacji nie będą oni już dłużej oznaczani, ze względu na zmiany nazw niektórych kluczy. Jeśli zależy Ci na tym, by ich odzyskać, skontaktuj się z autorem dodatku ;) \n  </li>\n  <li class="${A.MODAL.CLASSNAME.LIST_ITEM}">\n    Od teraz, najechanie myszką na odznakę nic nie da - należy w nią kliknąć. Po kliknięciu otworzy się okienko z informacjami. Aktualnie znajduje się tam informacja o przyczynie oznaczenia; treść komentarza, link do ew. treści multimedialnych w nim osadzonych oraz link do samego komentarza. Wkrótce pojawi się tutaj kilka innych opcji, w tym m.in. zmiana nazwy oznaczenia na customową, zmiana koloru oznaczenia czy całkowite usuwanie aktywności użytkownika z wykopu.\n  </li>\n  <li class="${A.MODAL.CLASSNAME.LIST_ITEM}">\n    Opcja dodania oznaczenia hurtem, dla wszystkich użytkowników któzy wykopali/zakopali dane znalezisko. Aby skorzystać, zjedź na sam dół i otwórz listę użytkowników, którzy wykonali interesującą Cię akcję, a następnie kliknij przycisk "Oznacz wszystkich poniżej".\n  </li>\n  <li class="${A.MODAL.CLASSNAME.LIST_ITEM}">\n    Ujednolicony styl graficzny modali, czyli takich informacji jak ta.\n  </li>\n  <li class="${A.MODAL.CLASSNAME.LIST_ITEM}">\n    Pojawiły się ikony informacji (ℹ) przy niektórych opcjach w ustawieniach dodatku. Po kliknięciu na nie, naturalnie, pojawią się informacje dodatkowe :)\n  </li>\n  <li class="${A.MODAL.CLASSNAME.LIST_ITEM}">\n    Naprawiono wiele bugów, w tym m.in. nieznikające odznaki po usunięciu oznaczenia, czerwona obwódka wokół wykopowych osiągnięć.\n  </li>\n  <li class="${A.MODAL.CLASSNAME.LIST_ITEM}">\n    Uporządkowano (trochę :D) kod dodatku, który umożliwi szybszy dalszy rozwój.\n  </li>\n</ul>\n`,button:"Okej!"},B=`<span class="${A.COMMON.CLASSNAME.BUTTON} ${A.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON}">Pokaż OPa</span>`,{BADGE:j}=A,U=()=>{w("settings").GENERAL.WARN_ON_RELOAD&&window.addEventListener("unload",e=>{(()=>{const e=r(j.SELECTOR.REPLY_FORM),t=r(j.SELECTOR.COMMENT_FORM),n=e&&e.value.split(" ").length>5,a=t&&t.value.split(" ").length>5;return!n&&!a})()||e.preventDefault()})};String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},p(S.modal,"whInitModalStyle"),localStorage.getItem("WHupdate")&&localStorage.getItem("WHupdate")<"0.52"?(Swal.fire({title:H.title,html:H.content,icon:"info",width:"80%",confirmButtonText:H.button}),localStorage.setItem("WHupdate","0.52"),(()=>{let e;e=localStorage.getItem(s)?w("marked"):[],e.forEach(e=>{e.label||(e.label=""),e.content||(e.content="Niestety, użytkownik został oznaczony PRZED uaktywnieniem funkcji zapisywania treści komentarzy. Jeśli chcesz by pojawiła się tu jego treść, przejdź do podlinkowanego niżej komentarza, a następnie usuń oznaczenie i dodaj je ponownie.")}),localStorage.setItem(s,JSON.stringify(e))})()):localStorage.getItem("WHupdate")||(Swal.fire({title:h,html:b,icon:"warning",width:"80%",confirmButtonText:f}),localStorage.setItem("WHupdate","0.52")),y(),t()&&(M(),U(),document.addEventListener("paste",e=>{if(r("."+A.EMBED.CLASSNAME.EMBED_FILE)&&e.clipboardData.files[0]){const t=r(`.${A.EMBED.CLASSNAME.EMBED_FILE} input`);t.files=e.clipboardData.files;const n=new Event("UIEvent");n.initEvent("change",!1,!0),t.dispatchEvent(n)}},{passive:!0}),g()),n()&&r(D.SELECTOR.LAST_NAV_ELEMENT).insertAdjacentHTML("beforeend",C.settingsNav),a()&&R(),o()&&O(),i()&&(r(`${A.HIGHLIGHT_OP.SELECTOR.OP_THREAD} .${A.BADGE.CLASSNAME.NICK_ELEMENT}`).insertAdjacentHTML("afterbegin",B),r("."+A.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON).addEventListener("click",()=>{const e=r(".night")?"rgb(7, 68, 91)":"#ffeac1";l("."+A.HIGHLIGHT_OP.CLASSNAME.AUTHOR_COMMENTS).forEach(t=>{t.style.backgroundColor=e}),r("."+A.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON).remove()}))}();
