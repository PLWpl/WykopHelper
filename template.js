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

(function () {
"use strict";const e=()=>{const e=e=>JSON.parse(e),t=e=>JSON.stringify(e);let o,r=[];const n=e=>!!r.includes(e),a=(e,a)=>{n(e)||((e=>{r.push(e),localStorage.setItem("uniqueNicks",t(r))})(e),((e,r)=>{o.push({nick:e,link:r}),localStorage.setItem("trolls",t(o))})(e,a))},l=e=>e.querySelector(".showProfileSummary > b").innerText,i=()=>location.reload(),c=()=>{o=localStorage.getItem("trolls")?e(localStorage.getItem("trolls")):[],r=localStorage.getItem("uniqueNicks")?e(localStorage.getItem("uniqueNicks")):[]},s=(e="Troll")=>{try{document.querySelectorAll("li div.author").forEach(t=>{const o=l(t);n(o)&&(e=>!e.querySelector(".badge"))(t)?t.insertAdjacentHTML("afterbegin",((e="troll")=>`<span class="badge badge--${e.toLowerCase()}">${e.toLowerCase().capitalize()}</span>`)(e)):(e=>!!e.querySelector(".buttonWH"))(t)||t.insertAdjacentHTML("beforeend",'<span class="buttonWH">Add Troll</span>')})}catch(e){}},d=()=>{((()=>{const e=document.querySelector(".replyForm textarea"),t=document.querySelector("#commentFormContainer textarea");return!(e&&""!==e.value||t&&""!==t.value)})()||window.confirm('Wykryłem, że możesz właśnie pisać komentarz. Kliknięcie "OK" spowoduje odświeżenie strony i utratę tworzonego tekstu! Jeśli klikniesz "anuluj", odśwież później stronę ręcznie, by zobaczyć nowo-oznaczonego trola.'))&&i()};(e=>{const t=`<style> ${e} </style>`;document.body.insertAdjacentHTML("afterbegin",t)})("\n.buttonWH {\n  display: inline-block;\n  padding: .2rem .2rem;\n  border: 1px solid #999;\n  cursor: pointer;\n  margin-left: .5rem;\n  color: gray;\n  border-radius: .3rem;\n  font-size: .7rem;\n  line-height: .7rem;\n}\n.buttonWH:hover {\n  border-color: green;\n}\n.buttonWH--clicked {\n  border-color: green;\n}\n.badge--troll {\n  color: red;\n  font-weight: bold;\n  margin-right: .3rem;\n  border: 1px solid currentColor;\n  padding: .1rem .2rem;\n}"),c(),s(),document.getElementById("itemsStream").addEventListener("click",e=>{const t=e.target;t.classList.contains("buttonWH")&&(e=>{c();const t=l(e.target.closest(".author")),o=e.target.closest(".author").querySelector("a + a").href;e.target.classList.add("buttonWH--clicked"),e.target.innerText="OK",a(t,o),d()})(e),t.classList.contains("affect")&&t.closest(".more")&&setTimeout(()=>{c(),s()},500)}),document.querySelector(".more > .affect")},t=location.href;String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},localStorage.getItem("WHupdate")<.1?(alert("★★★WykopHelper właśnie został zaktualizowany.★★★ \n\n Nowe ficzery:\n\n ➥ Dodano alert powiadamiający o aktualizacji ( ͡° ͜ʖ ͡°)"),localStorage.setItem("WHupdate",.1)):localStorage.getItem("WHupdate")||localStorage.setItem("WHupdate",.1),(t.indexOf("wykop.pl/link/")>-1||t.indexOf("wykop.pl/mikroblog/")>-1||t.indexOf("wykop.pl/wpis/")>-1||t.indexOf("wykop.pl/moj/")>-1||t.indexOf("wykop.pl/tag/wpisy")>-1)&&e()
})();
