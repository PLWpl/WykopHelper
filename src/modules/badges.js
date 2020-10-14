import { $, $$ } from "../utils/dom";
import STORAGE_KEY_NAMES from "../constants/localStorageKeyNames";
import DOM_SELECTORS from "../constants/domSelectors";

import styles from "../model/styles.js";
import { buttonMarkup, badge, markedInBulk } from "../model/modules/badges.model";
import { badgeUserModal } from "../model/utils/modals";
import { injectStyles } from "../utils/inject";
import { getLocalStorage } from "../utils/handleLocalStorage";

const { BADGE: DOM } = DOM_SELECTORS;

export const handleBadges = () => {
  /**
   * uniqueNicksSet - an array keeping nicks of all users added to the troll list. It exists so that before adding any user on a list we can easily check if they haven't already been added, using simple includes() method.
   * markedUsers - an object with user nicks and links to offending posts.
   */
  let uniqueNicksSet = getLocalStorage("unique");
  let markedUsers = getLocalStorage("marked");
  let settings = getLocalStorage("settings");

  //checks if user of provided nick is already in uniqueNicksSet array
  const isMarked = nick => {
    uniqueNicksSet = getLocalStorage("unique");
    return !!uniqueNicksSet.includes(nick);
  };

  // Adds new nick to uniqueNicksSet array.
  const addNickToUniqueNicksArray = nick => {
    const uniqueNicks = [...uniqueNicksSet, nick];
    localStorage.setItem(
      STORAGE_KEY_NAMES.UNIQUE_USERS,
      JSON.stringify(uniqueNicks)
    );
  };

  // adds nick to marked users array of objects along with the link and desired label
  const addNickToTrollsArray = (nick, link, label, content, media) => {
    const marked = [...markedUsers, { nick, link, label, content, media }];
    localStorage.setItem(
      STORAGE_KEY_NAMES.MARKED_USERS,
      JSON.stringify(marked)
    );
  };

  const addNickToArrays = (nick, link, content = '', media = '', label = settings.BADGE.DEFAULT_NAME) => {
    if (!isMarked(nick)) {
      addNickToUniqueNicksArray(nick);
      addNickToTrollsArray(nick, link, label, content, media);
    }
  };

  // function returns a nodeList with all <div> elements containing line with nick, time since comment made, [+][-]
  const getAllNickElements = () => $$(DOM.SELECTOR.NICK_ELEMENTS);

  //used on element - preferably one returned from getAllNickElements() - returns string with nick name.
  const getNick = el => {
    if (!$(DOM.SELECTOR.NICK, el) || $(DOM.SELECTOR.NICK, el) === null) {
      throw new Error(`getNick didn't work for ${el}`);
    }
    if ($(DOM.SELECTOR.NICK, el) !== null) {
      return $(DOM.SELECTOR.NICK, el).innerText;
    }
    // @TODO: add something to handle nicks on the right panel, apparently there is different DOM structure there which causes this above to throw error as nullish
  };

  // const getAllElementsWithNick = nick => $$(`.${DOM.CLASSNAME.NICK}[class*="color"][href*="ludzie/${nick}"]`);

  // used on author element, returned from getAllNickElements(), checks if person has already been marked with a badge
  const isNotAwarded = element => !$(`.${DOM.CLASSNAME.BADGE}`, element);

  // used on author element, returned from getAllNickElements(), checks if person has already been given a button
  const hasButtonAppended = element =>
    !!$(`.${DOM.CLASSNAME.MARK_BUTTON}`, element);

  const getDefaultBadgeLabelFromSettings = () => settings.BADGE.DEFAULT_NAME;

  // goes through all user elements on a page and checks, if user nicks are present in uniqueNicksSet array. If they are, AND they haven't yet been awarded a badge, it injects the badge.
  // takes optional parameter of type, possibly for future expansion.
  const markUsers = (label = getDefaultBadgeLabelFromSettings()) => {
    try {
      const elements = getAllNickElements();
      elements.forEach(element => {
        const nick = getNick(element);

        if (isMarked(nick) && isNotAwarded(element)) {
          element.insertAdjacentHTML("afterbegin", badge(nick, label));
        } else if (!hasButtonAppended(element)) {
          element.insertAdjacentHTML("beforeend", buttonMarkup);
        }
      });
    } catch (e) {
      //supress the error
    }
  };

  const addMarkAllButton = () => {
    const nav = document.getElementById(DOM.ID.VOTES_CONTAINER).closest('.rbl-block').querySelector('.nav');

    // @TODO Add button

  }

  const updateView = () => {
    markedUsers = getLocalStorage("marked");
    markUsers();

    const elements = getAllNickElements();

    elements.forEach(element => {
      const nick = getNick(element);

      if (isMarked(nick) && isNotAwarded(element)) {
        element.insertAdjacentHTML("afterbegin", badge(nick));
      }
      if (
        isMarked(nick) &&
        $(`.${DOM.CLASSNAME.MARK_BUTTON}`, element) &&
        !$(`.${DOM.CLASSNAME.MARK_BUTTON_CLICKED}`, element)
      ) {
        $(`.${DOM.CLASSNAME.MARK_BUTTON}`, element).remove();
      }
      if (!isMarked(nick) && !isNotAwarded(element)) {
        $(`.${DOM.CLASSNAME.BADGE}`, element).remove();
      }
    });
  };

  // fired on clicking a button "Oznacz".
  // First, get nick of the author. Then, get link of the offending comment.
  const addNewMarked = event => {
    const nick = getNick(
      event.target.closest(`.${DOM.CLASSNAME.NICK_ELEMENT}`)
    );

    // verified accounts need be handled slightly differently
    // event.target = .buttonWH
    const link = event.target
      .closest(`.${DOM.CLASSNAME.NICK_ELEMENT}`)
      .querySelector(`.verified`)
      ? event.target
        .closest(`.${DOM.CLASSNAME.NICK_ELEMENT}`)
        .querySelector(`.${DOM.CLASSNAME.NICK_VERIFIED_BADGE} + a`).href
      : event.target
        .closest(`.${DOM.CLASSNAME.NICK_ELEMENT}`)
        .querySelector("a + a").href;

    const content = event.target
      .closest('.wblock')
      .querySelector('.text p').innerHTML;

    const media = event.target
      .closest('.wblock')
      .querySelector('.text .media-content a') ? 
      event.target
        .closest('.wblock')
        .querySelector('.text .media-content a').href : null;

    event.target.classList.add(DOM.CLASSNAME.MARK_BUTTON_CLICKED);
    event.target.innerText = "✔";
    addNickToArrays(nick, link, content, media);

    setTimeout(() => {
      event.target.remove();
    }, 700);

    // while checking if button is appended, button is still there, just invisible! Hence, below:

    setTimeout(() => {
      updateView();
    }, 780);
  };

  const removeTroll = nick => {
    for (let [index, item] of markedUsers.entries()) {
      if (item.nick === nick) {
        delete markedUsers[index];
        const marked = markedUsers.filter(el => el != null);
        localStorage.setItem(
          STORAGE_KEY_NAMES.MARKED_USERS,
          JSON.stringify(marked)
        );
      }
    }
    const unique = uniqueNicksSet.filter(el => el !== nick);
    localStorage.setItem(
      STORAGE_KEY_NAMES.UNIQUE_USERS,
      JSON.stringify(unique)
    );

    setTimeout(() => {
      updateView();
    }, 780);
  };

  // gets user data from objects inside marked users array. For now the only useful data returned is link to the offending post
  const getNickData = nick => {
    if (!nick) {
      throw new Error("getNickData requires nick to be provided (line 153).");
    }
    for (let i = 0; i < markedUsers.length; i++) {
      if (markedUsers[i].nick === nick) {
        return {
          link: markedUsers[i].link,
          nick: markedUsers[i].nick,
          label: markedUsers[i].label,
          content: markedUsers[i].content,
          media: markedUsers[i].media,
        };
      } else if (markedUsers[i] === undefined || markedUsers[i] === null) {
        continue;
      }
    }
  };

  // shows modal with marked user info/options
  const showUserModal = element => {
    const nick = $(element).dataset.whusername;
    const userData = getNickData(nick);
    const modal = badgeUserModal(userData);

    // eslint-disable-next-line
    Swal.fire({
      title: modal.title,
      html: modal.content,
      icon: "info",
      showCancelButton: false,
      confirmButtonText: modal.button,
      width: "80%",
    }).then(result => {
      if (result.isConfirmed) {
        removeTroll(nick);
        // eslint-disable-next-line
        Swal.fire(
          "Usunięto!",
          "Użytkownik nie będzie już więcej oznaczany.",
          "info"
        );
      }
    });
  };

  //Add all users that up/down-voted a thread
  const markAllWhoVoted = () => {
    const link = window.location.href;
    const userCards = $$(`${DOM.ID.VOTES_CONTAINER} .${DOM.CLASSNAME.VOTES_USERCARD}`);
    const nickArray = [];

    userCards.forEach(el => {
      const nick = $('a', el).title;
      nickArray.push(nick);
    })

    //@TODO Check if id voters or votersBury is active, then use this to pick appropriate form for content message

    nickArray.forEach(el => {
      addNickToArrays(el, link, markedInBulk)
    })
  }

  /**
   * Above is setup. Actual job gets done below
   */

  injectStyles(styles.badge);
  markUsers();

  // on button click, add new marked user
  document.getElementById("itemsStream").addEventListener("click", event => {
    const target = event.target;
    if (target.classList.contains(DOM.CLASSNAME.MARK_BUTTON)) {
      addNewMarked(event);
    }
    if (target.classList.contains("affect") && target.closest(".more")) {
      setTimeout(() => {
        markUsers();
      }, 500);
    }
    if (target.classList.contains(DOM.CLASSNAME.BADGE)) {
      const nick = target.dataset.whusername;
      showUserModal(DOM.DYNAMIC.DATASET.USERNAME(nick));
    }
  });

  document.getElementById(DOM.ID.VOTES_CONTAINER).closest('.rbl-block').querySelector('.nav').addEventListener("click", event => {
    const target = event.target;
    if (target.classList.contains(DOM.CLASSNAME.MARK_ALL_BUTTON)) {
      markAllWhoVoted();
    }
  })
};
