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

  /**
   * Helper methods and functions, not directly related to the script's purpose
   */
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  const parseToObject = string => JSON.parse(string);
  const stringifyObject = object => JSON.stringify(object);

  /**
   * uniqueNicksSet - an array keeping nicks of all users added to the troll list. It exists so that before adding any user on a list we can easily check if they haven't already been added, using simple includes() method.
   * trolls - an object with user nicks and links to an offending posts.
   */
  let uniqueNicksSet = [];
  let trolls;

  /**
   * Functions. No explanation when easy-to-read, self-explanatory one-liner
   */
  
  //returns SPAN element with badge element. If no parameter is provided, it will return default "Troll" badge. 
  const badge = (name = 'troll') => `<span class="${name.toLowerCase()}__badge">${name.toLowerCase().capitalize()}</span>`;
    
  //checks if user of provided nick is already in uniqueNicksSet array
  const isTroll = nick => !!(uniqueNicksSet.includes(nick));

  // checks if provided nick has already been entered into the list. If it hasn't, it pushes it to the uniqueNicksSet array.
  const addNickToUniqueNicksArray = nick => {
    if (isTroll(nick)) {
      uniqueNicksSet.push(nick);
      localStorage.setItem("uniqueNicks", stringifyObject(uniqueSet));
    }
  };

  // adds nick to trolls array of objects along with the link
  const addNickToTrollsArray = (nick, link) => {
    if (isTroll(nick)) {
      trolls.push({ nick: nick, link: link });
      localStorage.setItem("trolls", stringifyObject(trolls));
    }
  }

  // object with methods to deal with buttons: adding, changing and removing.
  const button = {
    add: (label, element, className) => `<${element} class="${className}">${label}</${element}>`,
    change: ({element, newElement, newClassName, newLabel, newAttributes}) => document.querySelector(element).outerHTML = `<${newElement} class="${newClassName}" ${newAttributes}>${newLabel}</${newElement}>`,
    remove: element => document.querySelector(element).remove()
  }

  // function returns a nodeList with all <div> elements containing line with nick, time since comment made, [+][-]
  const getAllNickElements = () => document.querySelectorAll("li div.author");

  //used on element - preferably one returned from getAllNickElements() - returns string with nick name.
  const getNick = el => el.querySelector(".showProfileSummary > b")
  .innerText;

  const reloadPage = () => location.reload();

  // used on author element, returned from getAllNickElements(), checks if person has already been marked with a badge
  const isNotAwarded = element => !(element.querySelector('.troll__badge'));

  // checks if any textarea on a page is empty, to prevent reloading of a page while user might be attempting to write some comment or similar
  const isTextareaEmpty = () => {
    const elements = document.querySelectorAll('textarea');
    elements.forEach(element => {
      if (!element.value === '') {
        return false;
      }
    });
    return true;
  }

  //inject styles. Parameter must be a string of CSS without any html tags
  const injectStyles = (styles) => {
    const styleMarkup = `<style> ${styles} </style>`;
    document.body.appendChild(styleMarkup);
  }

  // prepares localStorage. Checks if trolls and uniqueNicksSet are already present and saved to localStorage. If so, it parses it to arrays. If not, it initializes empty ones.
  const prepareLocalStorage = () => {
    if (localStorage.getItem("trolls")) {
      trolls = parseToObject(localStorage.getItem("trolls"));
    } else {
      trolls = [];
    }

    if (localStorage.getItem("unique")) {
      uniqueNicksSet = parseToObject(localStorage.getItem("unique"));
    } else {
      uniqueNicksSet = [];
    }
  }

  // goes through all user elements on a page and checks, if user nicks are present in uniqueNicksSet array. If they are, AND they haven't yet been awarded a badge, it injects the badge.
  // takes optional parameter of type, possibly for future expansions of this script.
  const markUser = (type = 'Troll') => {
    try {
      const elements = getAllNickElements();
      elements.forEach(element =>{
        const nick = getNick(element);

        if (isTroll(nick) && isNotAwarded(element)) {
          element.insertAdjacentHTML('afterbegin', badge(type));
        }
      });
    }
    catch (e) {
      //supress the error
    }
  }

  // checks if user is writing any new comment. If not, reloads the page. If yes, prompts the user for decision.
  const updateView = () => {
    if (!isTextareaEmpty()) {
      if (window.confirm('Wykryłem, że możesz właśnie pisać komentarz. Kliknięcie "OK" spowoduje odświeżenie strony i utratę tworzonego tekstu! Jeśli klikniesz "anuluj", odśwież później stronę ręcznie, by zobaczyć nowo-oznaczonego trola.')) {
        reloadPage();
      }
    } else {
      reloadPage();
    }
  }

  // fired on clicking a button "Add troll". 
  // First, get nick of the author. Then, get link of the offending comment. 
  const addNewTroll = (event) => {
    prepareLocalStorage();

    if (event.target.classList.contains("troll__button--add")) {
      const nick = getNick(event.target.closest(".author"));
      const link = event.target.closest(".author").querySelector("a + a").href;

      event.target.classList.add("troll__button--clicked");
      event.target.innerText = "OK";

      addNickToUniqueNicksArray(nick);
      addNickToTrollsArray(nick, link);

      updateView();
    }
  }

  document
    .getElementById("itemsStream")
    .addEventListener("click", (event) => {
      addNewTroll(event)
  }

  /**
   * 
   * Up til now. Add styles, markup etc, but methods done and should work
   * 
   */

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

    document.querySelector("#site > .wrapper form.settings").innerHTML = '';
    document.querySelector("#site > .wrapper form.settings").innerHTML = settingsMarkup;
    document.querySelector("#site > .wrapper nav ul").insertAdjacentHTML('beforeend', settingsMenu);
    
  }

  if (
    location.href.indexOf("/mikroblog/") > -1 ||
    location.href.indexOf("/wpis/") > -1 ||
    location.href.indexOf("/link/") > -1 ||
    location.href === "https://wykop.pl" ||
    location.href === "https://www.wykop.pl"
  ) {
    /**
     * Add styles
     */
    const trollsArrayUnique = JSON.parse(localStorage.getItem("unique"));
    const styleMarkup = `
  <style>
    .trolls {
      display: inline-block;
      padding: .2rem .2rem;
      border: 1px solid #999;
      cursor: pointer;
      margin-left: .5rem;
      color: gray;
      border-radius: .3rem;
      box-shadow: 1px 1px #575757;
      font-size: .7rem;
      line-height: .7rem;
    }
    .trolls:hover {
      border-color: green;
    }
    .trolls-clicked {
      border-color: green;
    }
    .troll-badge {
      color: red;
      font-weight: bold;
      margin-right: .3rem;
      border: 1px solid currentColor;
      padding: .1rem .2rem;
    }
  </style>
  `;
    const profileNameElements = document.querySelectorAll("li div.author");
    const buttonMarkup = `<span class="trolls">Add Troll</span>`;

    const markTrolls = () => {
      const badgeOfShame = '<span class="troll-badge">Troll</span>';

      try {
        profileNameElements.forEach((element) => {
          const nick = element.querySelector(".showProfileSummary > b")
            .innerText;

          if (trollsArrayUnique.includes(nick) && !element.querySelector(`.troll-badge`)) {
            element.insertAdjacentHTML("afterbegin", badgeOfShame);
          }
        });
      } catch {}
      console.log("troll marked hopefully");
    };

    const updateView = () => {
      location.reload(); 
    }

    document
      .querySelector("body")
      .insertAdjacentHTML("afterbegin", styleMarkup);
    markTrolls();

    /**
     * Add button next to nick 
     */

    profileNameElements.forEach((element) => {
      if (!element.querySelector(".troll-badge")) {
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

        if (event.target.classList.contains("trolls")) {
          const nick = event.target
            .closest(".author")
            .querySelector(".showProfileSummary > b").innerText;
          const link = event.target.closest(".author").querySelector("a + a")
            .href;

          event.target.classList.add("trolls-clicked");
          event.target.innerText = "OK";
          markTrolls();
          updateView();

          if (checkUniqness(nick)) {
            trolls.push({ nick: nick, link: link });
          }
        }

        const stringTrolls = JSON.stringify(trolls);
        localStorage.setItem("trolls", stringTrolls);
      });
  }
})();
