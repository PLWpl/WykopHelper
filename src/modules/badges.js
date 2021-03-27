import { $, $$ } from "../utils/dom";
import { STORAGE_KEY_NAMES } from "../constants/localStorageKeyNames";
import { DOM } from "../constants/domSelectors";
import isPath from '../utils/checkPath';

import styles from "../model/styles.js";
import { buttonMarkup, badge, markedInBulk, buttonBulkMarkup } from "../model/modules/badges.model";
import { badgeUserModal } from "../model/utils/modals";
import { injectStyles } from "../utils/inject";
import { getLocalStorage } from "../utils/handleLocalStorage";

const { BADGE: EL } = DOM;

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
  const addNickToMarkedUsersArray = (nick, link, label, content, media, color) => {
    markedUsers = getLocalStorage("marked");
    const marked = [...markedUsers, { nick, link, label, content, media, color }];
    localStorage.setItem(
      STORAGE_KEY_NAMES.MARKED_USERS,
      JSON.stringify(marked)
    );
  };

  const addNickToArrays = (
    nick, 
    link, 
    content = '', 
    media = '', 
    label = settings.BADGE.DEFAULT_NAME, 
    color = settings.BADGE.DEFAULT_COLOR
  ) => {
    if (!isMarked(nick)) {
      addNickToUniqueNicksArray(nick);
      addNickToMarkedUsersArray(nick, link, label, content, media, color);
    }
  };

  // function returns a nodeList with all <div> elements containing line with nick, time since comment made, [+][-]
  const getAllNickElements = () => $$(EL.SELECTOR.NICK_ELEMENTS);

  //used on element - preferably one returned from getAllNickElements() - returns string with nick name.
  const getNick = el => {
    if (
      (!$(EL.SELECTOR.NICK, el) || $(EL.SELECTOR.NICK, el) === null) && 
      (!$(EL.SELECTOR.NICK_DELETED, el) || $(EL.SELECTOR.NICK_DELETED, el) === null)) {
      throw new Error(`getNick didn't work for ${el}`);
    }
    if ($(EL.SELECTOR.NICK, el) !== null) {
      return $(EL.SELECTOR.NICK, el).innerText;
    } else if ($(EL.SELECTOR.NICK_DELETED, el) !== null) {
      return $(EL.SELECTOR.NICK_DELETED, el).innerText;
    }
    // @TODO: add something to handle nicks on the right panel, apparently there is different DOM structure there which causes this above to throw error as nullish
  };

  // const getAllElementsWithNick = nick => $$(`.${EL.CLASSNAME.NICK}[class*="color"][href*="ludzie/${nick}"]`);

  // used on author element, returned from getAllNickElements(), checks if person has already been marked with a badge
  const isNotAwarded = element => !$(`.${EL.CLASSNAME.BADGE}`, element);

  // used on author element, returned from getAllNickElements(), checks if person has already been given a button
  const hasButtonAppended = element =>
    !!$(`.${EL.CLASSNAME.MARK_BUTTON}`, element);

  const getDefaultBadgeLabelFromSettings = () => settings.BADGE.DEFAULT_NAME;
  const getDefaultBadgeColorFromSettings = () => settings.BADGE.DEFAULT_COLOR;

  // goes through all user elements on a page and checks, if user nicks are present in uniqueNicksSet array. If they are, AND they haven't yet been awarded a badge, it injects the badge.
  const markUsers = () => {
    try {
      const elements = getAllNickElements();
      elements.forEach(element => {
        const nick = getNick(element);
        
        if (isMarked(nick) && isNotAwarded(element)) {
          const userData = getNickData(nick) ? getNickData(nick) : null;
          const label = userData ? userData.label : getDefaultBadgeLabelFromSettings();
          const color = userData && userData.color ? userData.color : getDefaultBadgeColorFromSettings();
          element.insertAdjacentHTML("afterbegin", badge(nick, label, true, color));
        } else if (!hasButtonAppended(element)) {
          element.insertAdjacentHTML("beforeend", buttonMarkup);
        }
      });
    } catch (e) {
      // suppress errors
    }
  };

  const addMarkAllButton = () => {
    if (document.getElementById(EL.ID.VOTES_CONTAINER)) {
      const nav = document.getElementById(EL.ID.VOTES_CONTAINER).closest('.rbl-block').querySelector('.nav ul + ul');
      nav ? nav.insertAdjacentHTML("beforeend", buttonBulkMarkup) : '';
    }
  }

  /**
   * Updates view - checks if badges are already present on the page for marked users, and if not - injects them.
   * @param {boolean} dataChange - set to true if you only want to update label text or color 
   */
  const updateView = dataChange => {
    markUsers();

    // loop through all nicks on page
    const elements = getAllNickElements();
    elements.forEach(element => {
      const nick = getNick(element);

      // if user is marked, and there isn't a badge next to his nick, inject it.
      if (isMarked(nick) && isNotAwarded(element)) {
        element.insertAdjacentHTML("afterbegin", badge(nick));
      }
      // if user is marked and there already is a badge next to him - update text on the badge
      if (dataChange && isMarked(nick) && !isNotAwarded(element)) {
        $(`.${EL.CLASSNAME.BADGE}`, element).remove();
        const nickData = getNickData(nick);
        element.insertAdjacentHTML("afterbegin", badge(nick, nickData.label, true, nickData.color));
      }
      // if user is marked - remove button to mark him as it's not needed anymore
      if (
        isMarked(nick) &&
        $(`.${EL.CLASSNAME.MARK_BUTTON}`, element) &&
        !$(`.${EL.CLASSNAME.MARK_BUTTON_CLICKED}`, element)
      ) {
        $(`.${EL.CLASSNAME.MARK_BUTTON}`, element).remove();
      }
      // if user isn't marked and there is badge next to him (double negation here, might think on renaming it later on) - remove it
      if (!isMarked(nick) && !isNotAwarded(element)) {
        $(`.${EL.CLASSNAME.BADGE}`, element).remove();
      }
    });

    if (isPath.userProfile()) {
      setTimeout(() => {
        location.reload();
      }, 200)
    }
  };

  // fired on clicking a button "Oznacz".
  // First, get nick of the author. Then, get link of the offending comment.
  const addNewMarked = event => {
    const nick = getNick(
      event.target.closest(`.${EL.CLASSNAME.NICK_ELEMENT}`)
    );

    // verified accounts need be handled slightly differently
    // event.target = .buttonWH
    const link = event.target
      .closest(`.${EL.CLASSNAME.NICK_ELEMENT}`)
      .querySelector(`.verified`)
      ? event.target
        .closest(`.${EL.CLASSNAME.NICK_ELEMENT}`)
        .querySelector(`.${EL.CLASSNAME.NICK_VERIFIED_BADGE} + a`).href
      : event.target
        .closest(`.${EL.CLASSNAME.NICK_ELEMENT}`)
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

    event.target.classList.add(EL.CLASSNAME.MARK_BUTTON_CLICKED);
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

  const removeMarkedUser = nick => {
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

  const changeMarkedUser = (nick, prop, newValue) => {
    for (let item of markedUsers.entries()) {
      if (item[1].nick === nick) {
        item[1][prop] = newValue;
        const marked = markedUsers.filter(el => el != null);
        localStorage.setItem(
          STORAGE_KEY_NAMES.MARKED_USERS,
          JSON.stringify(marked)
        );
      }
    }
    updateView(true);
  }

  // gets user data from objects inside marked users array. 
  const getNickData = nick => {
    if (!nick) {
      throw new Error("getNickData requires nick to be provided.");
    }
    const updatedMarkedUsers = getLocalStorage("marked");

    for (let i = 0; i < updatedMarkedUsers.length; i++) {
      if (updatedMarkedUsers[i].nick === nick) {
        return {
          link: updatedMarkedUsers[i].link,
          nick: updatedMarkedUsers[i].nick,
          label: updatedMarkedUsers[i].label,
          color: updatedMarkedUsers[i].color,
          content: updatedMarkedUsers[i].content,
          media: updatedMarkedUsers[i].media,
        };
      } else if (updatedMarkedUsers[i] === undefined || updatedMarkedUsers[i] === null) {
        continue;
      }
    }
  };

  // shows modal with marked user info/options
  const showUserModal = element => {
    const nick = $(element).dataset.whusername;
    const userData = getNickData(nick);
    const blacklist = getLocalStorage('blacklist');
    const blocked = blacklist.includes(nick);
    const modal = badgeUserModal(userData, blocked);

    // eslint-disable-next-line
    Swal.fire({
      title: modal.title,
      html: modal.content,
      icon: "info",
      allowEnterKey: false,
      showCancelButton: false,
      showCloseButton: true,
      showDenyButton: true,
      confirmButtonText: modal.button,
      denyButtonText: modal.buttonClose,
      denyButtonColor: '#0a8658',
      width: "80%",
    }).then(result => {
      if (result.isConfirmed) {
        removeMarkedUser(nick);
        // eslint-disable-next-line
        Swal.fire(
          "Usunięto!",
          "Użytkownik nie będzie już więcej oznaczany.",
          "info"
        ).then(() => {
          if (isPath.userProfile()) {
            location.reload();
          }
        });
      } else if (result.isDenied) {
        const oldLabel = $(`#${DOM.MODAL.ID.BADGE_TEXT}`).dataset.label;
        const newLabel = $(`#${DOM.MODAL.ID.BADGE_TEXT}`).value;
        const oldColor = $(`#${DOM.MODAL.ID.BADGE_COLOR}`).dataset.color;
        const newColor = $(`#${DOM.MODAL.ID.BADGE_COLOR}`).value;
        const isBlocked = $(`#${DOM.MODAL.ID.BLACKLIST}`).dataset.blocked;
        const shouldBeBlocked = $(`#${DOM.MODAL.ID.BLACKLIST}`).checked;
        if (newLabel !== oldLabel) {
          changeMarkedUser(nick, 'label', newLabel);
        }
        if (newColor !== oldColor) {
          changeMarkedUser(nick, 'color', newColor);
        }
        if (isBlocked !== shouldBeBlocked) {
          let newBlacklist;
          if (shouldBeBlocked) {
            blacklist.push(nick);
            localStorage.setItem(
              STORAGE_KEY_NAMES.BLACKLIST,
              JSON.stringify(blacklist)
            );
          } else if (!shouldBeBlocked) {
            newBlacklist = blacklist.filter(el => el !== nick);
            localStorage.setItem(
              STORAGE_KEY_NAMES.BLACKLIST,
              JSON.stringify(newBlacklist)
            );
          }
        }
        updateView(true);
      } else {
        // supress
      }
    });
  };

  //Add all users that up/down-voted a thread
  const markAllWhoVoted = () => {
    const link = window.location.href;
    const userCards = $$(`#${EL.ID.VOTES_CONTAINER} .${EL.CLASSNAME.VOTES_USERCARD}`);
    
    let action;
    if ($('#voters').closest('li').classList.contains('active')) {
      action = 'wykop';
    } else if ($('#votersBury').closest('li').classList.contains('active')) {
      action = 'zakop';
    }

    userCards.forEach(el => {
      const nick = $('a', el).title;
      addNickToArrays(nick, link, markedInBulk(action))
    })

    setTimeout(() => {
      updateView();
    }, 780);
  }

  /**
   * Above is setup.
   */

  injectStyles(styles.badge);
  injectStyles(styles.modal);
  markUsers();
  addMarkAllButton();

  // on button click, add new marked user
  document.getElementById("itemsStream").addEventListener("click", event => {
    const target = event.target;
    if (target.classList.contains(EL.CLASSNAME.MARK_BUTTON)) {
      addNewMarked(event);
    }
    if (target.classList.contains("affect") && target.closest(".more")) {
      setTimeout(() => {
        markUsers();
      }, 500);
    }
    if (target.classList.contains(EL.CLASSNAME.BADGE)) {
      const nick = target.dataset.whusername;
      showUserModal(EL.DYNAMIC.DATASET.USERNAME(nick));
    }
  });

  $(`.${EL.CLASSNAME.USER_PROFILE}`).addEventListener("click", event => {
    const target = event.target;
    if (target.classList.contains(EL.CLASSNAME.BADGE)) {
      const nick = target.dataset.whusername;
      showUserModal(EL.DYNAMIC.DATASET.USERNAME(nick));
    }
  });

  if (document.getElementById(EL.ID.VOTES_CONTAINER)) {
    document.getElementById(EL.ID.VOTES_CONTAINER)
      .closest('.rbl-block').querySelector('.nav').addEventListener("click", event => {
        const target = event.target;
        if (target.classList.contains(EL.CLASSNAME.MARK_ALL_BUTTON)) {
          markAllWhoVoted();
          $(`.${EL.CLASSNAME.MARK_ALL_BUTTON}`).innerText = 'Zrobione :)';
          setTimeout(() => {
            $(`.${EL.CLASSNAME.MARK_ALL_BUTTON_ELEMENT}`).style.display = 'none';
            $(`.${EL.CLASSNAME.MARK_ALL_BUTTON}`).innerText = 'Oznacz wszystkich poniżej';
          }, 500);
        }
        if (target.closest('#voters') || target.closest('#votersBury')) {
          $(`.${EL.CLASSNAME.MARK_ALL_BUTTON_ELEMENT}`).style.display = 'block';
        }
      })
  }
};
