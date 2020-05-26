// ==UserScript==
// @name         Wykopowe trole
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.wykop.pl/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  if (location.href.indexOf("ustawienia/trolls") > -1) {
    const settingsMarkup = `
      <fieldset>
        <h4>Znakuj Trola - Ustawienia</h4>
        <div class="space">
          <div class="row">
            <input
              class="checkbox"
              type="checkbox"
              name="troll[import_troll_list]"
              id="importTrolls"
            />
            <label class="inline" for="importTrolls">Zaciągaj listę troli z serwera</label>
          </div>
          <div class="row">
            <input
              class="checkbox"
              type="checkbox"
              name="troll[hide_trolls]"
              id="hideTrolls"
            />
            <label class="inline" for="hideTrolls">Usuwaj wszystkie trole</label>
          </div>
        </div>
      </fieldset>

      <div class="mark-bg space">
        <fieldset class="row buttons">
          <p>
            <button class="submit trolls-settings-submit">
              <i class="fa fa-spinner fa-spin" style="display: none;"></i> Zapisz
              ustawienia
            </button>
          </p>
        </fieldset>
      </div>`;

    const settingsMenu = '<li><a href="https://www.wykop.pl/ustawienia/trolls/"><span>Znakuj Trola</span></a></li>';

    // document.querySelector("#site > .wrapper form.settings").innerHTML = '';
    // document.querySelector("#site > .wrapper form.settings").innerHTML = settingsMarkup;
    // document.querySelector("#site > .wrapper nav ul").insertAdjacentHTML('beforeend', settingsMenu);
    
  }

  if (
    location.href.indexOf("/mikroblog/") > -1 ||
    location.href.indexOf("/wpis/") ||
    location.href.indexOf("/link/") ||
    location.href === "https://wykop.pl" ||
    location.href === "https://www.wykop.pl"
  ) {
    /**
     * Add styles
     */
    const trollsArrayUnique = JSON.parse(localStorage.getItem("unique"));
    const styleMarkup = `
  <style>
    .buttonPISList {
      display: inline-block;
      padding: .2rem .2rem;
      border: 1px solid #999;
      cursor: pointer;
      margin-left: 1.5rem;
      color: gray;
      border-radius: .3rem;
      box-shadow: 1px 1px #575757;
      font-size: .7rem;
      line-height: .7rem;
    }
    .buttonPISList:hover {
      border-color: green;
    }
    .buttonPISList-clicked {
      border-color: green;
    }
    .pis-badge {
      color: red;
      font-weight: bold;
      margin-right: .5rem;
    }
  </style>
  `;
    const profileNameElements = document.querySelectorAll("li div.author");
    const buttonMarkup = `<span class="buttonPISList">Add Troll</span>`;

    const markTrolls = () => {
      const badgeOfShame = '<span class="pis-badge">PiSior</span>';

      try {
        profileNameElements.forEach((element) => {
          const nick = element.querySelector(".showProfileSummary > b")
            .innerText;

          if (trollsArrayUnique.includes(nick)) {
            element.insertAdjacentHTML("afterbegin", badgeOfShame);
          }
        });
      } catch {}
      console.log("troll marked hopefully");
    };

    const updateView = () => {
      
    }

    document
      .querySelector("body")
      .insertAdjacentHTML("afterbegin", styleMarkup);
    markTrolls();

    /**
     * Add button next to nick
     */

    profileNameElements.forEach((element) => {
      if (!element.querySelector(".pis-badge")) {
        element.insertAdjacentHTML("beforeend", buttonMarkup);
      }
    });

    document
      .getElementById("itemsStream")
      .addEventListener("click", (event) => {
        let uniqueSet;
        let trolls;

        if (localStorage.getItem("trolls")) {
          trolls = JSON.parse(localStorage.getItem("trolls"));
        } else {
          trolls = [];
        }

        if (localStorage.getItem("unique")) {
          uniqueSet = JSON.parse(localStorage.getItem("unique"));
        } else {
          uniqueSet = [];
        }

        const checkUniqness = (item) => {
          if (!uniqueSet.includes(item)) {
            uniqueSet.push(item);
            localStorage.setItem("unique", JSON.stringify(uniqueSet));
            return true;
          } else {
            console.log("Item already exists in set");
            return false;
          }
        };

        if (event.target.classList.contains("buttonPISList")) {
          const nick = event.target
            .closest(".author")
            .querySelector(".showProfileSummary > b").innerText;
          const link = event.target.closest(".author").querySelector("a + a")
            .href;

          event.target.classList.add("buttonPISList-clicked");
          event.target.innerText = "OK";
          markTrolls();

          if (checkUniqness(nick)) {
            trolls.push({ nick: nick, link: link });
          }
        }

        const stringTrolls = JSON.stringify(trolls);
        localStorage.setItem("trolls", stringTrolls);
      });
  }
})();
