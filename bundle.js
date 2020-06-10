'use strict';

const styles = `
.buttonWH {
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
.buttonWH:hover {
  border-color: green;
}
.buttonWH--clicked {
  border-color: green;
}
.badge--troll {
  color: red;
  font-weight: bold;
  margin-right: .3rem;
  border: 1px solid currentColor;
  padding: .1rem .2rem;
}`;

const buttonMarkup = `<span class="buttonWH">Add Troll</span>`;

//returns SPAN element with badge element. If no parameter is provided, it will return default "Troll" badge.
// eslint-disable-next-line max-len 
const badge = (name = 'troll') => `<span class="badge badge--${name.toLowerCase()}">${name.toLowerCase().capitalize()}</span>`;

const mainFunctionality = () => {
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
    
  //checks if user of provided nick is already in uniqueNicksSet array
  const isTroll = nick => !!(uniqueNicksSet.includes(nick));

  // checks if provided nick has already been entered into the list. If it hasn't, it pushes it to the uniqueNicksSet array.
  const addNickToUniqueNicksArray = nick => {
    uniqueNicksSet.push(nick);
    localStorage.setItem("uniqueNicks", stringifyObject(uniqueNicksSet));
  };

  // adds nick to trolls array of objects along with the link
  const addNickToTrollsArray = (nick, link) => {
    trolls.push({ nick: nick, link: link });
    localStorage.setItem("trolls", stringifyObject(trolls));
  };

  const addNickToArrays = (nick, link) => {
    if (!isTroll(nick)) {
      addNickToUniqueNicksArray(nick);
      addNickToTrollsArray(nick, link);
    }
  };

  // function returns a nodeList with all <div> elements containing line with nick, time since comment made, [+][-]
  const getAllNickElements = () => document.querySelectorAll("li div.author");

  //used on element - preferably one returned from getAllNickElements() - returns string with nick name.
  const getNick = el => el.querySelector(".showProfileSummary > b")
    .innerText;

  const reloadPage = () => location.reload();

  // used on author element, returned from getAllNickElements(), checks if person has already been marked with a badge
  const isNotAwarded = element => !(element.querySelector('.badge'));

  // checks if any textarea on a page is empty, to prevent reloading of a page while user might be attempting to write some comment or similar
  const isTextareaEmpty = () => {
    const replyForm = document.querySelector('.replyForm textarea');
    const commentForm = document.querySelector('#commentFormContainer textarea');

    if ((replyForm && replyForm.value !== "") || (commentForm && commentForm.value !== "")) {
      return false;
    } else {
      return true;
    }
  };

  //inject styles. Parameter must be a string of CSS without any html tags
  const injectStyles = styles => {
    const styleMarkup = `<style> ${styles} </style>`;
    document.body.insertAdjacentHTML('afterbegin', styleMarkup);
  };

  // prepares localStorage. Checks if trolls and uniqueNicksSet are already present and saved to localStorage. If so, it parses it to arrays. If not, it initializes empty ones.
  const prepareLocalStorage = () => {
    if (localStorage.getItem("trolls")) {
      trolls = parseToObject(localStorage.getItem("trolls"));
    } else {
      trolls = [];
    }

    if (localStorage.getItem("uniqueNicks")) {
      uniqueNicksSet = parseToObject(localStorage.getItem("uniqueNicks"));
    } else {
      uniqueNicksSet = [];
    }
  };

  // goes through all user elements on a page and checks, if user nicks are present in uniqueNicksSet array. If they are, AND they haven't yet been awarded a badge, it injects the badge.
  // takes optional parameter of type, possibly for future expansions of this script.
  const markUsers = (type = 'Troll') => {
    try {
      const elements = getAllNickElements();
      elements.forEach(element =>{
        const nick = getNick(element);

        if (isTroll(nick) && isNotAwarded(element)) {
          element.insertAdjacentHTML('afterbegin', badge(type));
        }
        else {
          element.insertAdjacentHTML("beforeend", buttonMarkup);
        }
      });
    }
    catch (e) {
      //supress the error
    }
  };

  // checks if user is writing any new comment. If not, reloads the page. If yes, prompts the user for decision.
  const updateView = () => {
    if (!isTextareaEmpty()) {
      // eslint-disable-next-line no-alert, max-len
      if (window.confirm('Wykryłem, że możesz właśnie pisać komentarz. Kliknięcie "OK" spowoduje odświeżenie strony i utratę tworzonego tekstu! Jeśli klikniesz "anuluj", odśwież później stronę ręcznie, by zobaczyć nowo-oznaczonego trola.')) {
        reloadPage();
      }
    } else {
      reloadPage();
    }
  };

  // fired on clicking a button "Add troll". 
  // First, get nick of the author. Then, get link of the offending comment. 
  const addNewTroll = event => {
    if (event.target.classList.contains("buttonWH")) {
      prepareLocalStorage();
      const nick = getNick(event.target.closest(".author"));
      const link = event.target.closest(".author").querySelector("a + a").href;

      event.target.classList.add("buttonWH--clicked");
      event.target.innerText = "OK";

      addNickToArrays(nick, link);

      updateView();
    }
  };

  /**
   * Above is setup. Actual job gets done below
   */

  injectStyles(styles);
  prepareLocalStorage();
  markUsers();

  // on button click, add new troll
  document
    .getElementById("itemsStream")
    .addEventListener("click", event => {
      addNewTroll(event);
    });
};

const path = location.href;

const isPathForMain = () => {
  if (
    path.indexOf('wykop.pl/link/') > -1
    || path.indexOf('wykop.pl/mikroblog/') > -1
    || path.indexOf('wykop.pl/wpis/') > -1
    || path.indexOf('wykop.pl/moj/') > -1
    || path.indexOf('wykop.pl/tag/wpisy') > -1
  ) { 
    return true;
  }
  return false;
};

const updateAlert = () => {
  if (localStorage.getItem('WHupdate') < 0.1) {
    // eslint-disable-next-line no-alert, max-len
    alert(`★★★WykopHelper właśnie został zaktualizowany.★★★ \n\n Nowe ficzery:\n\n ➥ Dodano alert powiadamiający o aktualizacji ( ͡° ͜ʖ ͡°)`);
    localStorage.setItem('WHupdate',0.1);
  }
  else if (!localStorage.getItem('WHupdate')) {
    localStorage.setItem('WHupdate',0.1);
  }
};

/**
   * Helper methods and functions, not directly related to the script's purpose
   */
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

//shows alert if app has been updated
updateAlert();

if (isPathForMain()) {
  mainFunctionality();
}
