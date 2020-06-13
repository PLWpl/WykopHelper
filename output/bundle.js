'use strict';

const injectScripts = () => {
  const URLS = [
    'https://cdn.jsdelivr.net/npm/sweetalert2@9',
    'https://unpkg.com/@popperjs/core@2',
    'https://unpkg.com/tippy.js@6'
  ];
  
  const appendScript = src => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = false;
    script.defer = false;
    document.head.insertBefore(script, document.head.childNodes[0]);
  };
  
  URLS.forEach(src => appendScript(src));
};

const styles = `
.buttonWH {
  display: inline-block;
  padding: .2rem .2rem;
  border: 1px solid #9999996e;
  cursor: pointer;
  margin-left: .5rem;
  color: #808080ba;
  border-radius: .3rem;
  font-size: .7rem;
  line-height: .7rem;
  transition: .3s all;
}
.buttonWH:hover {
  border-color: green;
}
.buttonWH--clicked {
  border-color: green;
  opacity: 0;
}
.badge--troll {
  color: red;
  font-weight: bold;
  margin-right: .3rem;
  border: 1px solid currentColor;
  padding: .1rem .2rem;
}`;

const buttonMarkup = `<span class="buttonWH">Troll</span>`;

//returns SPAN element with badge element. If no parameter is provided, it will return default "Troll" badge.
// eslint-disable-next-line max-len 
const badge = (name = 'troll') => `<span class="badge badge--${name.toLowerCase()}">${name.toLowerCase().capitalize()}</span>`;

const modalMarkup = (link, nick) => `
<div class="wh__modal">
  <h1 class="wh__modal-title">Info</h1>
  <p class="wh__modal-text">Powód oznaczenia: 
    <a href="${link}" target="_blank" data-whuser-remove="${nick}">${nick} link</a>
  </p>
  <span class="wh__modal-button">Usuń oznaczenie</span>
</div>
`;

const addModal = (element, content) => {
  //eslint-disable-next-line no-undef
  tippy(element, {
    content: content,
    allowHTML: true,
    interactive: true,
    placement: 'bottom-start',
    followCursor: 'initial',
  });
};

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
  const getNick = el => el.querySelector(".showProfileSummary > b").innerText;
  
  const getNickElement = event => event.target.closest(".author");

  // used on author element, returned from getAllNickElements(), checks if person has already been marked with a badge
  const isNotAwarded = element => !(element.querySelector('.badge'));

  // used on author element, returned from getAllNickElements(), checks if person has already been given a button
  const hasButtonAppended = element => !!(element.querySelector('.buttonWH'));

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
        else if (!hasButtonAppended(element)) {
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
    try {
      const elements = getAllNickElements();
      elements.forEach(element =>{
        const nick = getNick(element);

        if (isTroll(nick) && isNotAwarded(element)) {
          element.insertAdjacentHTML('afterbegin', badge());
        }
        if (isTroll(nick) && isNotAwarded(element) && element.querySelector('buttonWH') && !element.querySelector('buttonWH--clicked')) {
          element.querySelector('.buttonWH').remove();
        }
      });
    }
    catch (e) {
      //supress the error
    }
  };

  // fired on clicking a button "Add troll". 
  // First, get nick of the author. Then, get link of the offending comment. 
  const addNewTroll = event => {
    prepareLocalStorage();
    const nick = getNick(event.target.closest(".author"));
    const link = event.target.closest(".author").querySelector("a + a").href;

    event.target.classList.add("buttonWH--clicked");
    event.target.innerText = "✔";
    setTimeout(() => {
      event.target.remove();
    }, 700);
    addNickToArrays(nick, link);

    updateView();
  };

  // const removeTroll = event => {
  //   prepareLocalStorage();
  //   //just a mockup from quokka, needs to be adjusted for the actual use
  //   for (let [index, item] of trolls.entries()) {
  //     if (item.nick === 'zofia') {
  //       delete trolls[index];
  //     }
  //   }
  // }

  // gets user data from objects inside trolls array. For now the only useful data returned is link to the offending post
  const getNickData = nick => {
    prepareLocalStorage();
    for (let item of trolls) {
      if (item.nick === nick) {
        return { link: item.link, nick: item.nick };
      }
    }
  };

  // shows modal with troll info/options
  // eslint-disable-next-line 
  const showUserModal = element => {
    const nick = getNick(element);
    const userData = getNickData(nick);
    addModal(element, modalMarkup(userData.link, userData.nick));
  };

  /**
   * Above is setup. Actual job gets done below
   */

  injectStyles(styles);
  prepareLocalStorage();
  markUsers();

  // on button click, add new troll
  document
    .getElementById('itemsStream')
    .addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains('buttonWH')) {
        addNewTroll(event);
      }
      if (target.classList.contains('affect') && target.closest('.more')) {
        setTimeout(() =>{
          prepareLocalStorage();
          markUsers();
        }, 500);  
      }
      if (target.classList.contains('badge')) {
        let nickElement = getNickElement(event);
        showUserModal(nickElement);
      }
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

/* eslint-disable no-undef */
const updateAlert = () => {
  const version = 0.123;

  if (localStorage.getItem('WHupdate') && localStorage.getItem('WHupdate') < version) {
    Swal.fire({
      title: 'WykopHelper zaktualizowany!',
      html: 'Dodatek WykopHelper został właśnie zaktualizowany. Wprowadzone zmiany to: <br><ul style="margin-top:1rem; list-style-type:square"><li style="text-align:left;margin-left:2rem">nowy sposób komunikowania o aktualizacjach :)</li></ul>',
      icon: 'info',
      confirmButtonText: 'Okej!'
    });
    localStorage.setItem('WHupdate',version);
  }
  else if (!localStorage.getItem('WHupdate')) {
    Swal.fire({
      title: 'WykopHelper zainstalowany!',
      html: 'Miłego użytkowania dodatku! Jeśli masz jakiekolwiek problemy, pytania lub sugestie, zgłoś je <a href="https://github.com/PLWpl/wykopoweTrole/issues" target="_blank">tutaj.</a>',
      icon: 'success',
      confirmButtonText: 'Super!'
    });
    localStorage.setItem('WHupdate',version);
  }
};

/**
   * Helper methods and functions, not directly related to the script's purpose
   */
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
//injects vendor scripts
injectScripts();


setTimeout(()=>{
  //shows alert if app has been updated
  updateAlert();


  if (isPathForMain()) {
    mainFunctionality();
  }
}, 250);
