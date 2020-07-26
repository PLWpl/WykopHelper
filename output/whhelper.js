// ==UserScript==
// @name         WykopHelper
// @version      0.46
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
!function(){"use strict";const e=location.href,t=()=>e.indexOf("wykop.pl/link/")>-1||e.indexOf("wykop.pl/mikroblog/")>-1||e.indexOf("wykop.pl/wpis/")>-1||e.indexOf("wykop.pl/moj/")>-1||e.indexOf("wykop.pl/ludzie/")>-1||e.indexOf("wykop.pl/tag/")>-1,n=()=>!!(e.indexOf("wykop.pl/ustawienia/")>-1),a=()=>!!(e.indexOf("wykop.pl/ustawienia/wykophelper")>-1),o=()=>!!(e.indexOf("wykop.pl/link/")>-1),r=()=>!!(e.indexOf("wykop.pl/wpis/")>-1),l="trolls",i="uniqueNicks",s="whsettings",c={BADGE:{NICK_ELEMENTS:"li div.author",NICK_ELEMENT:"author",NICK:".showProfileSummary > b",BADGE:"badge",MARK_BUTTON:"buttonWH",MARK_BUTTON_CLICKED:"buttonWH--clicked",REPLY_FORM:".replyForm textarea",COMMENT_FORM:"#commentFormContainer textarea",DATASET:{USERNAME:e=>"[data-whusername='"+e},MODAL_BUTTON_REMOVE:"modalWH-button--remove",NICK_VERIFIED_BADGE:"verified"},SETTINGS:{LAST_NAV_ELEMENT:"#site .nav > ul > li:last-child",ACTIVE_NAV_ELEMENT:"#site .nav > ul .active",SETTINGS_FORM_ELEMENT:"#site .grid-main .settings",WH_NAV_SETTINGS_LINK:"whSettingsLink",WH_USER_TABLE:"tableWH",WH_USER_TABLE_CONTAINER:"tableWH__container",WH_USER_TABLE_BODY:"tableWH__body",WH_USER_TABLE_REMOVE_BUTTON:"tableWH__nick-remove"},HIGHLIGHT_OP:{OP_THREAD:'[data-type="entry"]',HIGHLIGHT_BUTTON:"button--highlightOp",AUTHOR_COMMENTS:"authorComment"},EMBED:{EMBED_FILE:"embedFile"}},d=(e,t="debil")=>`<span class="badge badge--${t.toLowerCase()}" data-whusername="${e}">${t.toLowerCase().capitalize()}</span>`,p=e=>{const t=`<style> ${e} </style>`;document.body.insertAdjacentHTML("afterbegin",t)},{BADGE:m}=c,u=()=>{const e=document.querySelector(m.REPLY_FORM),t=document.querySelector(m.COMMENT_FORM),n=e&&e.value.split(" ").length>5,a=t&&t.value.split(" ").length>5;return!n&&!a},{BADGE:y}=c,g=()=>{let e,t=[];const n=e=>!!t.includes(e),a=(a,o)=>{n(a)||((e=>{t.push(e),localStorage.setItem(i,JSON.stringify(t))})(a),((t,n)=>{e.push({nick:t,link:n}),localStorage.setItem(l,JSON.stringify(e))})(a,o))},o=()=>document.querySelectorAll(y.NICK_ELEMENTS),r=e=>e.querySelector(y.NICK).innerText,c=()=>location.reload(),m=e=>!e.querySelector("."+y.BADGE),g=()=>{e=localStorage.getItem(l)?JSON.parse(localStorage.getItem(l)):[],t=localStorage.getItem(i)?JSON.parse(localStorage.getItem(i)):[]},w=(e=(()=>JSON.parse(localStorage.getItem(s)).BADGE.DEFAULT_NAME)())=>{try{o().forEach(t=>{const a=r(t);n(a)&&m(t)?t.insertAdjacentHTML("afterbegin",d(a,e)):(e=>!!e.querySelector("."+y.MARK_BUTTON))(t)||t.insertAdjacentHTML("beforeend",'<span class="wh-button buttonWH">Oznacz</span>')})}catch(e){}},k=e=>{g();const t=r(e.target.closest("."+y.NICK_ELEMENT)),l=e.target.closest("."+y.NICK_ELEMENT).querySelector(".verified")?e.target.closest("."+y.NICK_ELEMENT).querySelector(`.${y.NICK_VERIFIED_BADGE} + a`).href:e.target.closest("."+y.NICK_ELEMENT).querySelector("a + a").href;e.target.classList.add(y.MARK_BUTTON_CLICKED),e.target.innerText="✔",setTimeout(()=>{e.target.remove()},700),a(t,l),(()=>{try{o().forEach(e=>{const t=r(e);n(t)&&m(e)&&e.insertAdjacentHTML("afterbegin",d(t)),n(t)&&m(e)&&e.querySelector("."+y.MARK_BUTTON)&&!e.querySelector("."+y.MARK_BUTTON_CLICKED)&&e.querySelector("."+y.MARK_BUTTON).remove()})}catch(e){}})()},E=t=>{const n=(t=>{g();for(let n=0;n<e.length;n++){if(e[n].nick===t)return{link:e[n].link,nick:e[n].nick};void 0!==e[n]&&e[n]}})(document.querySelector(t).dataset.whusername);((e,t,n)=>{tippy(e,{content:t,allowHTML:!0,interactive:!0,placement:"bottom-start",followCursor:"initial",delay:n?[n,null]:0})})(t,((e,t)=>`\n  <p class="modalWH-text">Powód  oznaczenia: \n    <a href="${e}" target="_blank">link</a>\n  </p>\n  <span class="modalWH-button modalWH-button--remove" data-whuserremove="${t}">Usuń oznaczenie</span>\n`)(n.link,n.nick))};p("\n.wh-button {\n  display: inline-block;\n  padding: .2rem .2rem;\n  border: 1px solid #9999996e;\n  cursor: pointer;\n  margin-left: .5rem;\n  color: #808080ba;\n  border-radius: .3rem;\n  font-size: .7rem;\n  line-height: .7rem;\n  transition: .3s all;\n}\n.buttonWH:hover {\n  border-color: green;\n}\n.buttonWH--clicked {\n  border-color: green;\n  opacity: 0;\n}\n.badge {\n  color: red;\n  font-weight: bold;\n  margin-right: .3rem;\n  border: 1px solid currentColor;\n  padding: .1rem .2rem;\n  cursor: pointer;\n}\n.modalWH-button {\n  display: block;\n  padding: .4rem .8rem;\n  border: 1px solid #9999996e;\n  cursor: pointer;\n  color: #808080ba;\n  border-radius: .3rem;\n  font-size: 1rem;\n  line-height: 1rem;\n  transition: .3s all;\n}\n.author .modalWH-text {\n  position: relative;\n  margin-bottom: .5rem;\n  top: unset;\n  right: unset;\n  left: unset;\n  bottom: unset;\n}\n.tippy-box {\n  width: 20rem;\n}\n.tippy-content {\n  display: flex;\n  flex-direction: column;\n}\n\n.button--highlightOp {\n  position: absolute;\n  top: .1rem;\n  left: 0;\n}\n\n@media screen and (min-width: 722px) {\n  .button--highlightOp {\n    top: 6rem;\n    left: 1rem;\n  }\n}\n"),g(),w(),document.querySelector("."+y.BADGE)&&document.querySelectorAll("."+y.BADGE).forEach(e=>{const t=e.dataset.whusername;setTimeout(E(y.DATASET.USERNAME(t)),1150)}),document.getElementById("itemsStream").addEventListener("click",n=>{const a=n.target;if(a.classList.contains(y.MARK_BUTTON)&&k(n),a.classList.contains("affect")&&a.closest(".more")&&setTimeout(()=>{g(),w()},500),a.classList.contains(y.MODAL_BUTTON_REMOVE)){(n=>{g();for(let[t,a]of e.entries())a.nick===n&&(delete e[t],e=e.filter(e=>null!=e),localStorage.setItem(l,JSON.stringify(e)));t=t.filter(e=>e!==n),localStorage.setItem(i,JSON.stringify(t)),u()?c():Swal.fire({title:"Hej!",text:'Wygląda na to, że jesteś w trakcie pisania komentarza. Kliknij "Anuluj" aby dokończyć pisanie i odśwież stronę ręcznie (to aktualnie konieczne, by zniknęło oznaczenie użytkownika). Jeśli jednak nie planujesz nic publikować, naciśnij przycisk "Odśwież".',icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Od&#x015b;wie&#x017c;",cancelButtonText:"Anuluj"}).then(e=>{e.value&&c()})})(a.dataset.whuserremove)}})};let w=["alternews.pl","alexjones.pl","dziennik-polityczny.com","koniec-swiata.org","magnapolonia.org","narodowcy.net","nczas.com","mysl.pl","ndie.pl","neon24.pl","newsweb.pl","parezja.pl","prostozmostu24.pl","prawdaobiektywna.pl","reporters.pl","sioe.pl","wmeritum.pl","wolnosc24.pl","wolna-polska.pl","wprawo.pl","wsensie.pl","zmianynaziemi.pl","sputniknews.com","rt.com","ruptly.tv","prawica.net","xportal.pl","kresy.pl","bdp.xportal.pl","geopolityka.org","pravda.ru","voiceofrussia.com","ria.ru","ligakobietpolskich.pl","ronik.org.pl","obserwatorpolityczny.pl","mysl-polska.plw"];w.forEach(e=>{w.push("https://"+e),w.push("https://www."+e),w.push("http://"+e),w.push("http://www."+e)});const k=w,E=()=>{(()=>{let e;return localStorage.getItem(s)&&(e=JSON.parse(localStorage.getItem(s))),!!e.GENERAL.WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA})()&&(()=>{const e=document.querySelector(".article h2 a").href,t=new URL(e),n=t.protocol+"//"+t.hostname,a=((e,t="alert")=>`\n  <div class="annotation type-${t} space clearfix">\n\t\t<p>${e}</p>\n\t</div>\n`)("Uważaj! Źródło tego znaleziska jest podejrzewane o szerzenie rosyjskiej propagandy.");k.includes(n)&&document.querySelector(".bspace").insertAdjacentHTML("beforebegin",a)})()},_={BADGE:{HIDE_MARKED_USERS:!1,DEFAULT_NAME:"Debil",DEFAULT_COLOR:"red"},GENERAL:{WARN_ON_RELOAD:!0,WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA:!0}},h=()=>{localStorage.getItem(s)||localStorage.setItem(s,JSON.stringify(_))},{SETTINGS:b}=c,z=()=>{let e,t,n;const a=document.querySelector(b.SETTINGS_FORM_ELEMENT),o=(...a)=>{[...a].length<1||[...a].includes("settings")?localStorage.getItem(s)?e=JSON.parse(localStorage.getItem(s)):h():[...a].includes("markedUsers")&&(t=localStorage.getItem(l)?JSON.parse(localStorage.getItem(l)):[],n=localStorage.getItem(i)?JSON.parse(localStorage.getItem(i)):[])},r=()=>{o(),document.querySelector(b.ACTIVE_NAV_ELEMENT).classList.remove("active"),document.querySelector("."+b.WH_NAV_SETTINGS_LINK).classList.add("active"),a.innerHTML="",a.innerHTML='\n<fieldset>\n  <h4>WykopHelper - Ustawienia</h4>\n\x3c!-- GENERAL --\x3e\n  <div class="space settings--general">\n    <div class="row">\n      <input\n        class="checkbox"\n        type="checkbox"\n        category="GENERAL"\n        name="WARN_ON_RELOAD"\n        id="warnOnReload"\n      />\n      <label class="inline" for="warnOnReload">Ostrzegaj przy próbie zamknięcia/przeładowania strony gdy wykryto pisanie komentarza</label>\n    </div>\n    <div class="row">\n      <input\n        class="checkbox"\n        type="checkbox"\n        category="GENERAL"\n        name="WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA"\n        id="warnOnRussian"\n      />\n      <label class="inline" for="warnOnRussian">Oznaczaj znaleziska ze źródeł podejrzewanych o szerzenie Rosyjskiej propagandy </label><span id="russianPropagandaInfo" style="cursor:pointer">[Więcej ->]</span>\n    </div>\n  </div>\n\x3c!--  BADGE --\x3e\n  <div class="space settings--badge">\n    <div class="row">\n      <input\n        class="checkbox"\n        type="checkbox"\n        category="BADGE"\n        name="HIDE_MARKED_USERS"\n        id="hideMarkedUser"\n        disabled\n      />\n      <label title="Ficzer jeszcze nieaktywny" class="inline settings__crossed" for="hideMarkedUser">Ukrywaj treści oznakowanych użytkowników (tak jak na czarnej liście)</label>\n    </div>\n    <div class="row space">\n      <input placeholder="Domyślny tekst odznaki" id="badgeDefaultValue" category="BADGE" value="" name="DEFAULT_NAME" type="text">\n      <small>Domyślny tekst odznaki</small>\n    </div>\n  </div>\n\x3c!-- SPECIAL --\x3e\n  <div class="space settings--special">\n    <div class="row">\n      <small>Jeśli chcesz wyczyścić listę oznaczonych wcześniej użytkowników, możesz to zrobić poniżej. W związku z tym, że jest to akcja nieodwracalna, musisz najpierw potwierdzić, że na pewno taki jest Twój cel. Uwaga - po kliknięciu przycisku akcja wykonywana jest natychmiast, bez dodatkowych potwierdzeń!</small>\n    </div>\n    <div class="row">\n      <input\n        class="checkbox"\n        type="checkbox"\n        category="SPECIAL"\n        name="ALLOW_WIPE_MARKED_LIST"\n        id="allowWipeAllMarked"\n      />\n      <label class="inline" for="allowWipeAllMarked">Zaznacz by odblokować możliwość wyczyszczenia listy</label>\n    </div>\n    <div class="row space">\n      <button style="opacity:0.4" id="whsettings__remove-all-marked" disabled>Wyczyść</button>\n    </div>\n    <div class="row space">\n      <button class="button" id="showAllMarked">Pokaż wszystkich oznaczonych użytkowników</button>\n    </div>\n  </div>\n</fieldset>\n',a.removeAttribute("method"),a.removeAttribute("action"),a.insertAdjacentHTML("afterend",'\n<div class="tableWH__container tableWH__container--hidden">\n  <h4 class="tableWH__heading">WykopHelper - Lista oznaczonych użytkowników</h4>\n  <table class="tableWH">\n    <thead class="tableWH__head">\n      <tr>\n        <td>no.</td>\n        <td>Nick</td>\n        <td>Typ</td>\n        <td>Link</td>\n        <td>Usuń</td>\n      </tr>\n    </thead>\n    <tbody class="tableWH__body">\n    </tbody>\n  </table> \n</div>\n'),(()=>{o("markedUsers");const e=document.querySelector("."+b.WH_USER_TABLE_BODY);for(let o=0;o<t.length;o++){const l=t[o];e.insertAdjacentHTML("beforeend",(n=l.nick,a=l.type||"Debil",r=l.link,`\n    <tr class="tableWH__row">\n      <td></td>\n      <td><a href="https://www.wykop.pl/ludzie/${n}" target="_blank">${n}</a></td>\n      <td>${a}</td>\n      <td><a href="${r}" target="_blank">&#128279</a></td>\n      <td><span class="tableWH__nick-remove" data-whuserremove="${n}">&#x02717;</a></td>\n    </tr>\n    `))}var n,a,r})(),document.getElementById("badgeDefaultValue").value=e.BADGE.DEFAULT_NAME,document.getElementById("warnOnRussian").checked=e.GENERAL.WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA,document.getElementById("warnOnReload").checked=e.GENERAL.WARN_ON_RELOAD},d=()=>{a.addEventListener("change",t=>{const n=t.target.getAttribute("category"),a=t.target.name;"checkbox"===t.target.type&&"allowWipeAllMarked"!==t.target.id&&(e[n][a]=!e[n][a],localStorage.setItem(s,JSON.stringify(e)))}),a.addEventListener("click",e=>{"showAllMarked"===e.target.id&&(e.preventDefault(),document.querySelector("."+b.WH_USER_TABLE_CONTAINER).classList.toggle(b.WH_USER_TABLE_CONTAINER+"--hidden"),document.querySelector(`.${b.WH_USER_TABLE_CONTAINER}--hidden`)?document.getElementById("showAllMarked").textContent="Pokaż wszystkich oznaczonych użytkowników":document.getElementById("showAllMarked").textContent="Schowaj tabelę"),"allowWipeAllMarked"===e.target.id&&(e.target.disabled=!0,document.getElementById("whsettings__remove-all-marked").disabled=!1,document.getElementById("whsettings__remove-all-marked").style.opacity=1),"whsettings__remove-all-marked"===e.target.id&&(e.preventDefault(),n=[],t=[],localStorage.setItem(i,JSON.stringify(n)),localStorage.setItem(l,JSON.stringify(t)),location.reload()),"russianPropagandaInfo"===e.target.id&&Swal.fire({title:"Skąd lista stron z propagandą?",html:'\n  <p>Strony oznaczone jako potencjalnie szerzące rosyjską propagandę na wykopie zostały wyznaczone na podstawie następujących źródeł:\n  <ul style="margin-top:1rem;list-style-type: circle;font-size:1rem;">\n    <li style="text-align:left;margin-left:2rem;margin-bottom:.7rem"><a class="whModalLink" href="https://www.politicalcapital.hu/wp-content/uploads/PC_reactionary_values_CEE_20160727.pdf" target="_blank">Raport "The Weaponization of Culture: Kremlin\'s traditional agenda and the export of values to Central Europe" [PDF]</a></li>\n    <li style="text-align:left;margin-left:2rem;margin-bottom:.7rem"><a class="whModalLink" href="https://jagiellonia.org/mysl-polska-kresy-pl-geopolityka-org-etc-sa-kanalami-szerzenia-rosyjskich-wplywow-w-polsce-opublikowano-korespondencje-kremlowskich-urzednikow-rappoport-leaks/" target="_blank">Artykuł z Jagiellonia.org</a></li>\n    <li style="text-align:left;margin-left:2rem;margin-bottom:.7rem"><a class="whModalLink" href="https://euvsdisinfo.eu/reading-list/" target="_blank">EUvsDiSiNFO</a></li>\n    <li style="text-align:left;margin-left:2rem;margin-bottom:.7rem"><a class="whModalLink" href="https://oko.press/rosyjska-propagande-szerza-polskie-portale-znalezlismy-23-takie-witryny/" target="_blank">Artykuł z OKO.Press</a></li>\n  </ul>\n  <p>Lista z czasem będzie uzupełniana, a jedna z aktualizacji już wkrótce przyniesie możliwość przejrzenia (najpierw) i edycji (późniejsza aktualizacja) listy witryn.\n',icon:"info",showCancelButton:!1,confirmButtonColor:"#3085d6",confirmButtonText:"OK",width:"80%"})}),a.addEventListener("keyup",t=>{const n=t.target.getAttribute("category"),a=t.target.name;"text"===t.target.type&&(e[n][a]=t.target.value.toLowerCase(),localStorage.setItem(s,JSON.stringify(e)))})};p('\n.tableWH__container {\n  padding: 1rem;\n}\n.tableWH__container--hidden {\n  display: none;\n}\n.tableWH {\n  counter-reset: row-num;\n}\n.tableWH .tableWH__row {\n  counter-increment: row-num;\n}\n.tableWH .tableWH__row td:first-child::before {\n  content: counter(row-num) ". ";\n}\n.tableWH__head {\n  font-weight: bold;\n  border-bottom: 2px solid currentColor;\n}\n.settings__crossed {\n  opacity: .4;\n  text-decoration: line-through;\n  cursor: not-allowed;\n}\n.tableWH__nick-remove {\n  cursor: pointer;\n  color: #c0392b;\n}\n.whModalLink {\n  color: #862828;\n}\n.whModalLink:hover {\n  color: #4a1313 !important;\n}'),r(),o(),d(),document.querySelector("."+c.SETTINGS.WH_USER_TABLE).addEventListener("click",e=>{const a=e.target;a.classList.contains(""+c.SETTINGS.WH_USER_TABLE_REMOVE_BUTTON)&&((e=>{o("markedUsers");for(let[n,a]of t.entries())a.nick===e&&(delete t[n],t=t.filter(e=>null!=e),localStorage.setItem(l,JSON.stringify(t)));n=n.filter(t=>t!==e),localStorage.setItem(i,JSON.stringify(n))})(a.dataset.whuserremove),a.closest("tr").remove())})};String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},localStorage.getItem("WHupdate")&&localStorage.getItem("WHupdate")<.46?(Swal.fire({title:"WykopHelper zaktualizowany!",html:'\nDodatek WykopHelper został właśnie zaktualizowany. Wprowadzone zmiany to: <br>\n<ul style="margin-top:1rem; list-style-type:square">\n  <li style="text-align:left;margin-left:2rem;margin-bottom:.7rem">\n    Funkcja ostrzegania przed opuszczeniem strony, gdy wykryte zostanie pisanie komentarza (na mikroblogu i w znaleziskach) została nieco zmodyfikowana: od teraz ostrzeżenie będzie wyświetlane tylko wtedy, jeśli w polu tekstowym komentarza/odpowiedzi wpisane będzie więcej niż 5 słów. Dzięki temu alert nie będzie się włączał za każdym razem przy wychodzeniu z widoku użytkownika lub tagu.\n  </li>\n  <li style="text-align:left;margin-left:2rem;margin-bottom:.7rem">\n    Od teraz możliwe jest wgrywanie obrazków na wykop prosto ze schowka, z pominięciem dysku. Po kliknięciu przycisku dodawania zdjęcia/filmu, wystarczy w otworzonym okienku przycisnąć kombinację Ctrl + V, a skopiowany obrazek zostanie automatycznie wgrany, bez potrzeby zapisywania go najpierw na dysk.\n  </li>\n  <li style="text-align:left;margin-left:2rem;margin-bottom:.7rem">\n    W ustawieniach, pod linkiem "Więcej", pojawił się popup z linkami do stron, na podstawie których została wyznaczona lista źródeł podejrzewanych o szerzenie rosyjskiej propagandy.\n  </li>\n</ul>\n',icon:"info",width:"80%",confirmButtonText:"Okej!"}),localStorage.setItem("WHupdate",.46),(()=>{let e;e=localStorage.getItem("trolls")?JSON.parse(localStorage.getItem("trolls")):[],e.forEach(e=>{e.label||(e.label="")}),localStorage.setItem("trolls",JSON.stringify(e))})()):localStorage.getItem("WHupdate")||(Swal.fire({title:"WykopHelper zainstalowany!",html:'Miłego używania dodatku! Jeśli masz jakiekolwiek problemy, pytania lub sugestie, zgłoś je <a href="https://github.com/PLWpl/wykopoweTrole/issues" target="_blank">tutaj.</a>',icon:"success",width:"80%",confirmButtonText:"Super!"}),localStorage.setItem("WHupdate",.46)),h(),t()&&(g(),JSON.parse(localStorage.getItem(s)).GENERAL.WARN_ON_RELOAD&&window.addEventListener("beforeunload",e=>{u()||e.preventDefault()}),document.addEventListener("paste",e=>{if(document.querySelector("."+c.EMBED.EMBED_FILE)&&e.clipboardData.files[0]){const t=document.querySelector(`.${c.EMBED.EMBED_FILE} input`);t.files=e.clipboardData.files;let n=new Event("UIEvent");n.initEvent("change",!1,!0),t.dispatchEvent(n)}})),n()&&document.querySelector(b.LAST_NAV_ELEMENT).insertAdjacentHTML("beforeend",'<li class="whSettingsLink"><a href="https://www.wykop.pl/ustawienia/wykophelper/"><span><strong>WykopHelper</strong> &#10024;</span></a></li>'),a()&&z(),o()&&E(),r()&&(document.querySelector(`${c.HIGHLIGHT_OP.OP_THREAD} .${c.BADGE.NICK_ELEMENT}`).insertAdjacentHTML("afterbegin",'<span class="wh-button button--highlightOp">Pokaż OPa</span>'),document.querySelector("."+c.HIGHLIGHT_OP.HIGHLIGHT_BUTTON).addEventListener("click",()=>{const e=document.querySelector(".night")?"rgb(7, 68, 91)":"#ffeac1";document.querySelectorAll("."+c.HIGHLIGHT_OP.AUTHOR_COMMENTS).forEach(t=>{t.style.backgroundColor=e}),document.querySelector("."+c.HIGHLIGHT_OP.HIGHLIGHT_BUTTON).remove()}))}();
