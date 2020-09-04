import { $, $$ } from '../utils/dom';
import STORAGE_KEY_NAMES from '../constants/localStorageKeyNames';
import DOM_SELECTORS from '../constants/domSelectors';

import styles from '../model/styles.js';
import { buttonMarkup, badge } from '../model/modules/badges.model';
import { modalMarkup } from '../model/utils/badgeInfoModal';
import { addModal } from '../utils/addModal';
import { injectStyles } from '../utils/inject';
import { isTextareaEmpty } from './warnOnReload';
import { getLocalStorage } from '../utils/handleLocalStorage';

const { BADGE: DOM } = DOM_SELECTORS;

export const handleBadges = () => {
  /**
   * uniqueNicksSet - an array keeping nicks of all users added to the troll list. It exists so that before adding any user on a list we can easily check if they haven't already been added, using simple includes() method.
   * markedUsers - an object with user nicks and links to offending posts.
   */
  let uniqueNicksSet = getLocalStorage('unique');
  let markedUsers = getLocalStorage('marked');
  let settings = getLocalStorage('settings');

  //checks if user of provided nick is already in uniqueNicksSet array
  const isMarked = nick => {
    uniqueNicksSet = getLocalStorage('unique');
    return !!(uniqueNicksSet.includes(nick));
  }

  // Adds new nick to uniqueNicksSet array.
  const addNickToUniqueNicksArray = nick => {
    const uniqueNicks = [...uniqueNicksSet, nick]
    localStorage.setItem(STORAGE_KEY_NAMES.UNIQUE_USERS, JSON.stringify(uniqueNicks));
  };

  // adds nick to marked users array of objects along with the link and desired label
  const addNickToTrollsArray = (nick, link, label) => {
    const marked = [...markedUsers, { nick, link, label }];
    localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, JSON.stringify(marked));
  }

  const addNickToArrays = (nick, link, label = settings.BADGE.DEFAULT_NAME) => {
    if (!isMarked(nick)) {
      addNickToUniqueNicksArray(nick);
      addNickToTrollsArray(nick, link, label);
    }
  }

  // function returns a nodeList with all <div> elements containing line with nick, time since comment made, [+][-]
  const getAllNickElements = () => $$(DOM.SELECTOR.NICK_ELEMENTS);
  
  //used on element - preferably one returned from getAllNickElements() - returns string with nick name.
  const getNick = el => $(DOM.SELECTOR.NICK, el).innerText;

  const getAllElementsWithNick = nick => $$(`.${DOM.CLASSNAME.NICK}[class*="color"][href*="ludzie/${nick}"]`);

  // used on author element, returned from getAllNickElements(), checks if person has already been marked with a badge
  const isNotAwarded = element => !($(`.${DOM.CLASSNAME.BADGE}`, element));

  // used on author element, returned from getAllNickElements(), checks if person has already been given a button
  const hasButtonAppended = element => !!($(`.${DOM.CLASSNAME.MARK_BUTTON}`, element));

  const getDefaultBadgeLabelFromSettings = () => settings.BADGE.DEFAULT_NAME;

  // goes through all user elements on a page and checks, if user nicks are present in uniqueNicksSet array. If they are, AND they haven't yet been awarded a badge, it injects the badge.
  // takes optional parameter of type, possibly for future expansion.
  const markUsers = (label = getDefaultBadgeLabelFromSettings()) => {
    try {
      const elements = getAllNickElements();
      elements.forEach(element =>{
        const nick = getNick(element);

        if (isMarked(nick) && isNotAwarded(element)) {
          element.insertAdjacentHTML('afterbegin', badge(nick, label));
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

  
  const updateView = () => {
    markedUsers = getLocalStorage('marked');
    // const label = () => {
    //   for (let i = 0; i < markedUsers.length; i++) {
    //     if (markedUsers[i].nick === nick) {
    //       return markedUsers[i].label;
    //     } else if (markedUsers[i] === undefined || markedUsers[i] === null) {
    //       continue;
    //     } else {
    //       return settings.BADGE.DEFAULT_NAME;
    //     }
    //   }
    // };
    markUsers();

    const elements = getAllNickElements();

    elements.forEach(element => {
      const nick = getNick(element);

      if (isMarked(nick) && isNotAwarded(element)) {
        element.insertAdjacentHTML('afterbegin', badge(nick));
        console.log('marked!')
      }
      if (isMarked(nick) 
        && $(`.${DOM.CLASSNAME.MARK_BUTTON}`, element) 
        && !$(`.${DOM.CLASSNAME.MARK_BUTTON_CLICKED}`, element)) 
      {
        getAllElementsWithNick(nick).forEach(el => {
          $(`.${DOM.CLASSNAME.MARK_BUTTON}`, el) ? 
            $(`.${DOM.CLASSNAME.MARK_BUTTON}`, el).remove() :
            null;
        });
      }
    })
  }


  // fired on clicking a button "Oznacz". 
  // First, get nick of the author. Then, get link of the offending comment. 
  const addNewMarked = event => {
    const nick = getNick(event.target.closest(`.${DOM.CLASSNAME.NICK_ELEMENT}`));

    // verified accounts need be handled slightly differently
    const link = event.target.closest(`.${DOM.CLASSNAME.NICK_ELEMENT}`).querySelector(`.verified`) ? 
      event.target.closest(`.${DOM.CLASSNAME.NICK_ELEMENT}`)
        .querySelector(`.${DOM.CLASSNAME.NICK_VERIFIED_BADGE} + a`).href
      : event.target.closest(`.${DOM.CLASSNAME.NICK_ELEMENT}`).querySelector("a + a").href;

    event.target.classList.add(DOM.CLASSNAME.MARK_BUTTON_CLICKED);
    event.target.innerText = "✔";
    addNickToArrays(nick, link);
    
    setTimeout(() => {
      event.target.remove();
    }, 700)

    // while checking if button is appended, button is still there, just invisible! Hence, below as a test:

    setTimeout(() => {
      updateView();
    }, 780)
  }

  const removeTroll = nick => {
    for (let [index, item] of markedUsers.entries()) {
      if (item.nick === nick) {
        delete markedUsers[index];
        const marked = markedUsers.filter(el => el != null);
        localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, JSON.stringify(marked));
      }
    }
    const unique = uniqueNicksSet.filter(el => el !== nick);
    localStorage.setItem(STORAGE_KEY_NAMES.UNIQUE_USERS, JSON.stringify(unique));
    
    // checks if user is writing any new comment. If not, reloads the page. If yes, prompts the user for decision.
    if (isTextareaEmpty()) {
      // location.reload();
      updateView();
      console.log('did buttons disappear?')
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
          location.reload();
        }
      })
    }
  }

  // gets user data from objects inside marked users array. For now the only useful data returned is link to the offending post
  // @TODO: what if there is no nick? Check
  const getNickData = nick => {
    for (let i = 0; i < markedUsers.length; i++) {
      if (markedUsers[i].nick === nick) {
        return { link: markedUsers[i].link, nick: markedUsers[i].nick, label: markedUsers[i].label };
      } else if (markedUsers[i] === undefined || markedUsers[i] === null) {
        continue;
      }
    }
  };

  // shows modal with marked user info/options
  // eslint-disable-next-line 
  const showUserModal = element => {
    const nick = $(element).dataset.whusername;
    const userData = getNickData(nick);
    addModal(element, modalMarkup(userData));
  }

  const initializeModal = () => {
    if ($(`.${DOM.CLASSNAME.BADGE}`)) {
      $$(`.${DOM.CLASSNAME.BADGE}`).forEach(el => {
        const nick = el.dataset.whusername;
        setTimeout(showUserModal(DOM.DYNAMIC.DATASET.USERNAME(nick)), 1150);
      });
    }
  }

  /**
   * Above is setup. Actual job gets done below
   */

  injectStyles(styles.badge);
  markUsers();
  initializeModal();

  // on button click, add new troll
  document
    .getElementById('itemsStream')
    .addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains(DOM.CLASSNAME.MARK_BUTTON)) {
        addNewMarked(event);
      }
      if (target.classList.contains('affect') && target.closest('.more')) {
        setTimeout(() =>{
          markUsers();
        }, 500)  
      }
      if (target.classList.contains(DOM.CLASSNAME.MODAL_BUTTON_REMOVE)) {
        //eslint-disable-next-line
        const nick = target.dataset.whuserremove;
        removeTroll(nick);
      }
    });
}
