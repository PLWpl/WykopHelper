// ==UserScript==
// @name         Wykopowe trole - DEV
// @version      0.2
// @updateURL    http://plw.usermd.net/whhelper.js
// @downloadURL  http://plw.usermd.net/whhelper.js
// @description  Zestaw narzędzi pomocnych na wykopie.
// @author       PLW
// @match        https://www.wykop.pl/*
// @grant        none
// ==/UserScript==
!function(){"use strict";const e=(e,t="debil")=>`<span class="badge badge--${t.toLowerCase()}" data-whusername="${e}">${t.toLowerCase().capitalize()}</span>`,t=()=>{const t=e=>JSON.parse(e),o=e=>JSON.stringify(e);let n,a=[];const r=e=>!!a.includes(e),l=(e,t)=>{r(e)||((e=>{a.push(e),localStorage.setItem("uniqueNicks",o(a))})(e),((e,t)=>{n.push({nick:e,link:t}),localStorage.setItem("trolls",o(n))})(e,t))},i=()=>document.querySelectorAll("li div.author"),s=e=>e.querySelector(".showProfileSummary > b").innerText,c=e=>!e.querySelector(".badge"),u=()=>{n=localStorage.getItem("trolls")?t(localStorage.getItem("trolls")):[],a=localStorage.getItem("uniqueNicks")?t(localStorage.getItem("uniqueNicks")):[]},d=(t="Troll")=>{try{i().forEach(o=>{const n=s(o);r(n)&&c(o)?o.insertAdjacentHTML("afterbegin",e(n,t)):(e=>!!e.querySelector(".buttonWH"))(o)||o.insertAdjacentHTML("beforeend",'<span class="buttonWH">Troll</span>')})}catch(e){}},m=()=>{try{i().forEach(t=>{const o=s(t);r(o)&&c(t)&&t.insertAdjacentHTML("afterbegin",e(o)),r(o)&&c(t)&&t.querySelector("buttonWH")&&!t.querySelector("buttonWH--clicked")&&t.querySelector(".buttonWH").remove()})}catch(e){}},p=e=>{const t=(e=>{u();for(let t of n)if(t.nick===e)return{link:t.link,nick:t.nick}})(document.querySelector(e).dataset.whusername);((e,t)=>{tippy(e,{content:t,allowHTML:!0,interactive:!0,placement:"bottom-start",followCursor:"initial"})})(e,((e,t)=>`\n<div class="modalWH">\n  <h1 class="modalWH-title">Info</h1>\n  <p class="modalWH-text">Powód oznaczenia: \n    <a href="${e}" target="_blank">link</a>\n  </p>\n  <span class="modalWH-button modalWH-button--remove" data-whuserremove="${t}">Usuń oznaczenie</span>\n</div>\n`)(t.link,t.nick))};(e=>{const t=`<style> ${e} </style>`;document.body.insertAdjacentHTML("afterbegin",t)})("\n.buttonWH {\n  display: inline-block;\n  padding: .2rem .2rem;\n  border: 1px solid #9999996e;\n  cursor: pointer;\n  margin-left: .5rem;\n  color: #808080ba;\n  border-radius: .3rem;\n  font-size: .7rem;\n  line-height: .7rem;\n  transition: .3s all;\n}\n.buttonWH:hover {\n  border-color: green;\n}\n.buttonWH--clicked {\n  border-color: green;\n  opacity: 0;\n}\n.badge {\n  color: red;\n  font-weight: bold;\n  margin-right: .3rem;\n  border: 1px solid currentColor;\n  padding: .1rem .2rem;\n}\n.modalWH-button {\n  display: inline-block;\n  padding: .4rem .8rem;\n  border: 1px solid #9999996e;\n  cursor: pointer;\n  color: #808080ba;\n  border-radius: .3rem;\n  font-size: 1rem;\n  line-height: 1rem;\n  transition: .3s all;\n}"),u(),d(),document.getElementById("itemsStream").addEventListener("click",e=>{const t=e.target;if(t.classList.contains("buttonWH")&&(e=>{u();const t=s(e.target.closest(".author")),o=e.target.closest(".author").querySelector("a + a").href;e.target.classList.add("buttonWH--clicked"),e.target.innerText="✔",setTimeout(()=>{e.target.remove()},700),l(t,o),m()})(e),t.classList.contains("affect")&&t.closest(".more")&&setTimeout(()=>{u(),d()},500),t.classList.contains("badge")){const e=t.dataset.whusername;p(`[data-whusername='${e}']`)}if(t.classList.contains("modalWH-button--remove")){console.log(t);(e=>{u();for(let[t,a]of n.entries())a.nick===e&&(delete n[t],localStorage.setItem("trolls",o(n)));a=a.filter(t=>t!==e),localStorage.setItem("uniqueNicks",o(a)),m()})(t.dataset.whuserremove)}})},o=location.href;String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},["https://cdn.jsdelivr.net/npm/sweetalert2@9","https://unpkg.com/@popperjs/core@2","https://unpkg.com/tippy.js@6"].forEach(e=>(e=>{const t=document.createElement("script");t.type="text/javascript",t.src=e,t.async=!1,t.defer=!1,document.head.insertBefore(t,document.head.childNodes[0])})(e)),setTimeout(()=>{localStorage.getItem("WHupdate")&&localStorage.getItem("WHupdate")<.123?(Swal.fire({title:"WykopHelper zaktualizowany!",html:'Dodatek WykopHelper został właśnie zaktualizowany. Wprowadzone zmiany to: <br><ul style="margin-top:1rem; list-style-type:square"><li style="text-align:left;margin-left:2rem">nowy sposób komunikowania o aktualizacjach :)</li></ul>',icon:"info",confirmButtonText:"Okej!"}),localStorage.setItem("WHupdate",.123)):localStorage.getItem("WHupdate")||(Swal.fire({title:"WykopHelper zainstalowany!",html:'Miłego użytkowania dodatku! Jeśli masz jakiekolwiek problemy, pytania lub sugestie, zgłoś je <a href="https://github.com/PLWpl/wykopoweTrole/issues" target="_blank">tutaj.</a>',icon:"success",confirmButtonText:"Super!"}),localStorage.setItem("WHupdate",.123)),(o.indexOf("wykop.pl/link/")>-1||o.indexOf("wykop.pl/mikroblog/")>-1||o.indexOf("wykop.pl/wpis/")>-1||o.indexOf("wykop.pl/moj/")>-1||o.indexOf("wykop.pl/tag/wpisy")>-1)&&t()},250)}();
