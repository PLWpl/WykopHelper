import STORAGE_KEY_NAMES from '../../constants/localStorageKeyNames';
import DOM_SELECTORS from '../../constants/domSelectors';

import { stylesBadge } from '../../markup/styles.js';
import { buttonMarkup, badge } from '../../markup/minor.js';
import { modalMarkup } from '../../markup/badgeInfoModal.js';
import { addModal } from '../../utils/addModal.js';
import { injectStyles } from '../../utils/inject.js';
import { isTextareaEmpty } from './warnOnReload.js';

const { BADGE: DOM } = DOM_SELECTORS;

export const handleBadges = () => {
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
    localStorage.setItem(STORAGE_KEY_NAMES.UNIQUE_USERS, JSON.stringify(uniqueNicksSet));
  };

  // adds nick to trolls array of objects along with the link
  const addNickToTrollsArray = (nick, link) => {
    trolls.push({ nick: nick, link: link });
    localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, JSON.stringify(trolls));
  }

  const addNickToArrays = (nick, link) => {
    if (!isTroll(nick)) {
      addNickToUniqueNicksArray(nick);
      addNickToTrollsArray(nick, link);
    }
  }

  // function returns a nodeList with all <div> elements containing line with nick, time since comment made, [+][-]
  const getAllNickElements = () => document.querySelectorAll(DOM.NICK_ELEMENTS);

  
  //used on element - preferably one returned from getAllNickElements() - returns string with nick name.
  const getNick = el => el.querySelector(DOM.NICK).innerText;

  const reloadPage = () => location.reload();

  // used on author element, returned from getAllNickElements(), checks if person has already been marked with a badge
  const isNotAwarded = element => !(element.querySelector(`.${DOM.BADGE}`));

  // used on author element, returned from getAllNickElements(), checks if person has already been given a button
  const hasButtonAppended = element => !!(element.querySelector(`.${DOM.MARK_BUTTON}`));

  // prepares localStorage. Checks if trolls and uniqueNicksSet are already present and saved to localStorage. If so, it parses it to arrays. If not, it initializes empty ones.
  const prepareLocalStorage = () => {
    if (localStorage.getItem(STORAGE_KEY_NAMES.MARKED_USERS)) {
      trolls = JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.MARKED_USERS));
    } else {
      trolls = [];
    }

    if (localStorage.getItem(STORAGE_KEY_NAMES.UNIQUE_USERS)) {
      uniqueNicksSet = JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.UNIQUE_USERS));
    } else {
      uniqueNicksSet = [];
    }
  }

  const getBadgeLabelFromSettings = () => {
    const settings = JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS));
    return settings.BADGE.DEFAULT_NAME;
  }

  // goes through all user elements on a page and checks, if user nicks are present in uniqueNicksSet array. If they are, AND they haven't yet been awarded a badge, it injects the badge.
  // takes optional parameter of type, possibly for future expansions of this script.
  const markUsers = (type = getBadgeLabelFromSettings()) => {
    try {
      const elements = getAllNickElements();
      elements.forEach(element =>{
        const nick = getNick(element);

        if (isTroll(nick) && isNotAwarded(element)) {
          element.insertAdjacentHTML('afterbegin', badge(nick, type));
        }
        else if (!hasButtonAppended(element)) {
          element.insertAdjacentHTML("beforeend", buttonMarkup);
        }
      });
    }
    catch (e) {
      //supress the error
    }
  }

  // checks if user is writing any new comment. If not, reloads the page. If yes, prompts the user for decision.
  const updateView = () => {
    try {
      const elements = getAllNickElements();
      elements.forEach(element =>{
        const nick = getNick(element);

        if (isTroll(nick) && isNotAwarded(element)) {
          element.insertAdjacentHTML('afterbegin', badge(nick));
        }
        if (isTroll(nick) 
          && isNotAwarded(element) 
          && element.querySelector(`.${DOM.MARK_BUTTON}`) 
          && !element.querySelector(`.${DOM.MARK_BUTTON_CLICKED}`)) {
          element.querySelector(`.${DOM.MARK_BUTTON}`).remove();
        }
      });
    }
    catch (e) {
      //supress the error
    }
  }

  // fired on clicking a button "Add troll". 
  // First, get nick of the author. Then, get link of the offending comment. 
  const addNewTroll = event => {
    prepareLocalStorage();
    const nick = getNick(event.target.closest(`.${DOM.NICK_ELEMENT}`));
    const link = event.target.closest(`.${DOM.NICK_ELEMENT}`).querySelector(`.verified`) ? 
      event.target.closest(`.${DOM.NICK_ELEMENT}`).querySelector(`.${DOM.NICK_VERIFIED_BADGE} + a`).href
      : event.target.closest(`.${DOM.NICK_ELEMENT}`).querySelector("a + a").href;

    event.target.classList.add(DOM.MARK_BUTTON_CLICKED);
    event.target.innerText = "✔";
    setTimeout(() => {
      event.target.remove();
    }, 700)
    addNickToArrays(nick, link);

    updateView();
  }

  const removeTroll = nick => {
    prepareLocalStorage();
    for (let [index, item] of trolls.entries()) {
      if (item.nick === nick) {
        delete trolls[index];
        trolls = trolls.filter(el => el != null);
        localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, JSON.stringify(trolls));
      }
    }
    uniqueNicksSet = uniqueNicksSet.filter(el => el !== nick);
    localStorage.setItem(STORAGE_KEY_NAMES.UNIQUE_USERS, JSON.stringify(uniqueNicksSet));
    
    if (isTextareaEmpty()) {
      reloadPage();
    } else {
      // eslint-disable-next-line
      Swal.fire({
        title: 'Hej!',
        // eslint-disable-next-line
        text: 'Wygląda na to, że jesteś w trakcie pisania komentarza. Kliknij "Anuluj" aby dokończyć pisanie i odśwież stronę ręcznie (to aktualnie konieczne, by zniknęło oznaczenie użytkownika). Jeśli jednak nie planujesz nic publikować, naciśnij przycisk "Odśwież".',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Od&#x015b;wie&#x017c;',
        cancelButtonText: 'Anuluj',
      }).then(result => {
        if (result.value) {
          reloadPage();
        }
      })
    }
  }

  // gets user data from objects inside trolls array. For now the only useful data returned is link to the offending post
  const getNickData = nick => {
    prepareLocalStorage();
    for (let i = 0; i < trolls.length; i++) {
      if (trolls[i].nick === nick) {
        return { link: trolls[i].link, nick: trolls[i].nick };
      } else if (trolls[i] === undefined || trolls[i] === null) {
        continue;
      }
    }
  };

  // shows modal with troll info/options
  // eslint-disable-next-line 
  const showUserModal = element => {
    const nick = document.querySelector(element).dataset.whusername;
    const userData = getNickData(nick);
    addModal(element, modalMarkup(userData.link, userData.nick));
  }

  const initializeModal = () => {
    if (document.querySelector(`.${DOM.BADGE}`)) {
      document.querySelectorAll(`.${DOM.BADGE}`).forEach(el => {
        const nick = el.dataset.whusername;
        setTimeout(showUserModal(DOM.DATASET.USERNAME(nick)), 1150);
      });
    }
  }

  /**
   * Above is setup. Actual job gets done below
   */

  injectStyles(stylesBadge);
  prepareLocalStorage();
  markUsers();
  initializeModal();

  // on button click, add new troll
  document
    .getElementById('itemsStream')
    .addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains(DOM.MARK_BUTTON)) {
        addNewTroll(event);
      }
      if (target.classList.contains('affect') && target.closest('.more')) {
        setTimeout(() =>{
          prepareLocalStorage();
          markUsers();
        }, 500)  
      }
      if (target.classList.contains(DOM.MODAL_BUTTON_REMOVE)) {
        //eslint-disable-next-line
        console.log(target);
        const nick = target.dataset.whuserremove;
        removeTroll(nick);
      }
    });
}
