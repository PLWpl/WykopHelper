'use strict';

const path = location.href;

/**
 * Checks for a path.
 * @returns boolean if current location matches checked path
 */
const isPath = {
  sitewide: () => !!(path.indexOf("wykop.pl") > -1),

  main: () => {
    if (
      path.indexOf("wykop.pl/link/") > -1 ||
      path.indexOf("wykop.pl/mikroblog/") > -1 ||
      path.indexOf("wykop.pl/wpis/") > -1 ||
      path.indexOf("wykop.pl/moj/") > -1 ||
      path.indexOf("wykop.pl/ludzie/") > -1 ||
      path.indexOf("wykop.pl/tag/") > -1
    ) {
      return true;
    }
    return false;
  },

  settings: () => !!(path.indexOf("wykop.pl/ustawienia/") > -1),
  
  whSettings: () => !!(path.indexOf("wykop.pl/ustawienia/wykophelper") > -1),

  thread: () => !!(path.indexOf("wykop.pl/link/") > -1),

  mirkoThread: () => !!(path.indexOf("wykop.pl/wpis/") > -1),
};

/** document.querySelector() */
const $ = (selector, node = document) => node.querySelector(selector);

/** document.querySelectorAll() */
const $$ = (selector, node = document) => node.querySelectorAll(selector);

const STORAGE_KEY_NAMES = {
  MARKED_USERS: 'whMarkedUsers',
  UNIQUE_USERS: 'whUniqueNicks',
  WH_SETTINGS: 'whSettings',
};

const DOM = {
  COMMON: {
    CLASSNAME: {
      // wykop.pl elements
      WOODLE: 'woodle',
      // custom WH elements
      BUTTON: 'buttonWH',
    },
    ID: {
      // wykop.pl elements
      COMMENTS_STREAM: 'itemsStream',
    },
    SELECTOR: {
      TAGS: '.fix-tagline > .tag.affect.create[href]'
    }
  },
  BADGE: {
    CLASSNAME: {
      // wykop.pl elements
      NICK_ELEMENT: 'author',
      NICK_VERIFIED_BADGE: 'verified',
      NICK: 'showProfileSummary',
      VOTES_USERCARD: 'usercard',
      // custom WH elements
      BADGE: 'badgeWH',
      MARK_BUTTON: 'buttonWH',
      MARK_BUTTON_CLICKED: 'buttonWH--clicked',
      MARK_ALL_BUTTON_ELEMENT: 'buttonWH--markAllContainer',
      MARK_ALL_BUTTON: 'buttonWH--markAll',
      MODAL_BUTTON: 'modalWH-button',
      MODAL_BUTTON_REMOVE: 'modalWH-button--remove',
      MODAL_TEXT: 'modalWH-text',
    },
    ID: {
      VOTES_CONTAINER: 'votesContainer',
    },
    SELECTOR: {
      // wykop.pl elements
      NICK_ELEMENTS: '.grid-main li div.author',
      NICK: '.showProfileSummary > b',
      NICK_DELETED: '.author > .color-1002',
      REPLY_FORM: '.replyForm textarea',
      COMMENT_FORM: '#commentFormContainer textarea',
    },
    DYNAMIC: {
      DATASET: {
        USERNAME: nick => `[data-whusername='${nick}`,
      }
    }
  },
  SETTINGS: {
    CLASSNAME: {
      SETTINGS_NAV: 'whSettingsLink',
      SETTINGS_GENERAL: 'settings--general',
      SETTINGS_BADGE: 'settings--badge',
      SETTINGS_SPECIAL: 'settings--special',
      SETTINGS_BOX: 'settings__box',
      WH_NAV_SETTINGS_LINK: 'whSettingsLink',
      WH_USER_TABLE: 'tableWH',
      WH_USER_TABLE_ROW: 'tableWH__row',
      WH_USER_TABLE_HEAD: 'tableWH__head',
      WH_USER_TABLE_HEADING: 'tableWH__heading',
      WH_USER_TABLE_CONTAINER: 'tableWH__container',
      WH_USER_TABLE_CONTAINER_HIDDEN: 'tableWH__container--hidden',
      WH_USER_TABLE_BODY: 'tableWH__body',
      WH_USER_TABLE_REMOVE_BUTTON: 'tableWH__nick-remove',
      WH_SETTINGS_CROSSED: 'settings__crossed',
    },
    ID: {
      SHOW_MARKED_TABLE: 'showAllMarked',
      ALLOW_WIPE_MARKED_LIST: 'allowWipeAllMarked',
      REMOVE_ALL_MARKED: 'whsettings__remove-all-marked',
      RUSSIAN_PROPAGANDA_INFO_LINK: 'russianPropagandaInfo',
      WARN_ON_RELOAD_INFO_LINK: 'warnOnReloadInfo'
    },
    SELECTOR: {
      LAST_NAV_ELEMENT: '#site .nav > ul > li:last-child',
      ACTIVE_NAV_ELEMENT: '#site .nav > ul .active',
      SETTINGS_FORM_ELEMENT: '#site .grid-main .settings',
    },
    DYNAMIC: {}
  },
  HIGHLIGHT_OP: {
    CLASSNAME: {
      HIGHLIGHT_BUTTON: 'button--highlightOp',
      AUTHOR_COMMENTS: 'authorComment',
    },
    ID: {},
    SELECTOR: {
      OP_THREAD: '[data-type="entry"]',
    },
    DYNAMIC: {}
  },
  EMBED: {
    CLASSNAME: {
      EMBED_FILE: 'embedFile',
    },
    ID: {},
    SELECTOR: {},
    DYNAMIC: {}
  },
  DOMAIN_CHECKER: {
    CLASSNAME: {
      WYKOP_ITEM_INTRO: 'bspace',
      WYKOP_ITEM_ANNOTATION: 'annotation',
    },
    ID: {},
    SELECTOR: {
      THREAD_LINK: '.article h2 a',
    },
    DYNAMIC: {}
  },
  MODAL: {
    CLASSNAME: {
      LINK: 'whModalLink',
      LIST: 'whModal__list',
      LIST_ITEM: 'whModal__list-item',
      INPUT_LABEL: 'whModal__label',
      INPUT_TEXT: 'whModal__inputText',
      SCROLLABLE_TEXT: 'whModal__scrollableText'
    },
    ID: {
      BADGE_TEXT: 'whModal_badgeText',
    }
  },
};

const badge = `
.${DOM.BADGE.CLASSNAME.MARK_BUTTON} {
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
.${DOM.BADGE.CLASSNAME.MARK_BUTTON}:hover {
  border-color: green;
}
.${DOM.BADGE.CLASSNAME.MARK_BUTTON_CLICKED} {
  border-color: green;
  opacity: 0;
}
.${DOM.BADGE.CLASSNAME.BADGE} {
  color: red;
  font-weight: bold;
  margin-right: .3rem;
  border: 1px solid currentColor;
  padding: .1rem .2rem;
  cursor: pointer;
  position: relative;
  top: .1rem;
}
.${DOM.BADGE.CLASSNAME.MODAL_BUTTON} {
  display: block;
  padding: .4rem .8rem;
  border: 1px solid #9999996e;
  cursor: pointer;
  color: #808080ba;
  border-radius: .3rem;
  font-size: 1rem;
  line-height: 1rem;
  transition: .3s all;
}
.author .${DOM.BADGE.CLASSNAME.MODAL_TEXT} {
  position: relative;
  margin-bottom: .5rem;
  top: unset;
  right: unset;
  left: unset;
  bottom: unset;
}

.${DOM.BADGE.CLASSNAME.MARK_ALL_BUTTON} {
  top: 0.8rem;
  position: relative;
}

.${DOM.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON} {
  position: absolute;
  top: .1rem;
  left: 0;
}

@media screen and (min-width: 722px) {
  .${DOM.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON} {
    top: 6rem;
    left: 1rem;
  }
}

.${DOM.DOMAIN_CHECKER.CLASSNAME.MODAL_TEXT_LIST} {
  margin-top:1rem;list-style-type: circle;font-size:1rem;
}

.${DOM.DOMAIN_CHECKER.CLASSNAME.MODAL_TEXT_LIST_ITEM} {
  text-align:left;margin-left:2rem;margin-bottom:.7rem
}
`;

const settings = `
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_CONTAINER} {
  padding: 1rem;
}
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_CONTAINER_HIDDEN} {
  display: none;
}
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE} {
  counter-reset: row-num;
}
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE} .${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_ROW} {
  counter-increment: row-num;
}
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE} .${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_ROW} td:first-child::before {
  content: counter(row-num) ". ";
}
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_HEAD} {
  font-weight: bold;
  border-bottom: 2px solid currentColor;
}
.${DOM.SETTINGS.CLASSNAME.WH_SETTINGS_CROSSED} {
  opacity: .4;
  text-decoration: line-through;
  cursor: not-allowed;
}
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_REMOVE_BUTTON} {
  cursor: pointer;
  color: #c0392b;
}
.${DOM.SETTINGS.CLASSNAME.SETTINGS_BOX} {
  border-bottom: 1px solid #d3d3d329;
  border-left: 1px solid #d3d3d329;
  border-right: 1px solid #d3d3d329;
}
.${DOM.MODAL.CLASSNAME.LINK} {
  color: #862828;
}
.${DOM.MODAL.CLASSNAME.LINK}:hover {
  color: #4a1313 !important;
}
`;

const modal = `
.swal2-popup.swal2-modal.swal2-show {
  background-color: #1b1b1b !important;
  border: 1px solid #ff5917 !important;
}
.swal2-icon.swal2-info {
  border-color: #542621 !important;
  color: #c0392b !important;
}

.swal2-title {
  color: #a2a2a2 !important;
}

.swal2-content {
  color: #888;
  text-align: unset;
}

.swal2-styled.swal2-confirm {
  background-color: #e74c3c6b !important;
}
.${DOM.MODAL.CLASSNAME.LIST} {
  margin-top: 1rem;
  list-style-type: square;
}
.${DOM.MODAL.CLASSNAME.LIST_ITEM} {
  text-align: left;
  margin-left: 2rem;
  margin-bottom: .7rem
}

.${DOM.MODAL.CLASSNAME.INPUT_LABEL} {
  text-transform: none;
}

.${DOM.MODAL.CLASSNAME.INPUT_TEXT}, .${DOM.MODAL.CLASSNAME.INPUT_TEXT}:focus {
  color: #464646 !important;
}

.${DOM.MODAL.CLASSNAME.SCROLLABLE_TEXT} {
  margin-top:.5rem;
  border:1px solid gray;
  padding: 1rem;
  text-align:left;
  overflow-y: auto;
  max-height: 15rem;
}
`;
const styles = {
  badge,
  settings,
  modal
};

const buttonMarkup = `<span class="${DOM.BADGE.CLASSNAME.MARK_BUTTON}">Oznacz</span>`;
const buttonBulkMarkup = `<li class="${DOM.BADGE.CLASSNAME.MARK_ALL_BUTTON_ELEMENT}" style="display:none"><span class="${DOM.BADGE.CLASSNAME.MARK_BUTTON} ${DOM.BADGE.CLASSNAME.MARK_ALL_BUTTON}">Oznacz wszystkich poniżej</span></li>`;

/**
 * 
 * @param {string} nick - nickname of user
 * @param {string} [label=debil] - what will be displayed as a badge
 */
const badge$1 = (nick, label = 'debil') => `<span class="${DOM.BADGE.CLASSNAME.BADGE} ${DOM.BADGE.CLASSNAME.BADGE}--${label.toLowerCase()}" data-whusername="${nick}">${label.toLowerCase().capitalize()}</span>`;

/**
 * 
 * @param {string} action - either "wykop" or "zakop". 
 */
const markedInBulk = action => {
  return `Użytkownik ${action}ał podlinkowane znalezisko.`;
};

/* eslint max-len: 0 */
const russianPropagandaModal = `
  <p>Strony oznaczone jako potencjalnie szerzące rosyjską propagandę na wykopie zostały wyznaczone na podstawie następujących źródeł:
  <ul class="${DOM.MODAL.CLASSNAME.LIST}">
    <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}"><a class="${DOM.MODAL.CLASSNAME.LINK}" href="https://www.politicalcapital.hu/wp-content/uploads/PC_reactionary_values_CEE_20160727.pdf" target="_blank">Raport "The Weaponization of Culture: Kremlin's traditional agenda and the export of values to Central Europe" [PDF]</a></li>
    <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}"><a class="${DOM.MODAL.CLASSNAME.LINK}" href="https://jagiellonia.org/mysl-polska-kresy-pl-geopolityka-org-etc-sa-kanalami-szerzenia-rosyjskich-wplywow-w-polsce-opublikowano-korespondencje-kremlowskich-urzednikow-rappoport-leaks/" target="_blank">Artykuł z Jagiellonia.org</a></li>
    <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}"><a class="${DOM.MODAL.CLASSNAME.LINK}" href="https://euvsdisinfo.eu/reading-list/" target="_blank">EUvsDiSiNFO</a></li>
    <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}"><a class="${DOM.MODAL.CLASSNAME.LINK}" href="https://oko.press/rosyjska-propagande-szerza-polskie-portale-znalezlismy-23-takie-witryny/" target="_blank">Artykuł z OKO.Press</a></li>
  </ul>
  <p>Lista z czasem będzie uzupełniana, a jedna z aktualizacji już wkrótce przyniesie możliwość przejrzenia (najpierw) i edycji (późniejsza aktualizacja) listy witryn.
`;

const warnOnReloadModal = `
  <p>Ten ficzer jest eksperymentalny. Z nie do końca dla mnie zrozumiałych powodów (podejrzewam, że przeszkadza tu jakiś wykopowy skrypt reklamowy), na niektórych przeglądarkach (np. firefox z ublockiem) działa jak powinien, a na innych (czysty Chrome) nie działa w ogóle. Dlatego zanim zdecydujesz się mu zaufać, przeprowadź kilka testów. Ostrzeżenie powinno aktywować się, gdy w okienku pisania komentarza znajdować się będzie 6 słów i więcej.
  <p style="margin-top:.5rem">W najbliższej przyszłości poświęcę nieco więcej czasu na debugging i, mam nadzieję, odkryję przyczynę tej niestabilności. Sorry za utrudnienia, ale to wciąż wersja beta ;)
`;

const badgeUserModal = props => {
  const mediaText = link => `<p style="margin-top:5px;"><a href="${link}" target="_blank">Link do osadzonej treści multimedialnej (obrazek lub film)</a></p>`;

  return {
    title: `${props.nick}`,
    content: `
    <p style="text-align:left">Przyczyna oznaczenia</strong>:</p>
    <div class="${DOM.MODAL.CLASSNAME.SCROLLABLE_TEXT}"><p>${props.content}</p>
    ${props.media ? mediaText(props.media) : ''}</div>
    <p style="margin-top:1rem;text-align:right"><a href="${props.link}">Link do komentarza lub znaleziska</a></p>
    <label class="${DOM.MODAL.CLASSNAME.INPUT_LABEL}">Treść odznaki: <input autocomplete="off" value="${props.label}" class="${DOM.MODAL.CLASSNAME.INPUT_TEXT}" id="${DOM.MODAL.ID.BADGE_TEXT}"></label>
    `,
    button: "Usu\u0144 oznaczenie",
    buttonClose: "Zapisz"
  };
};

/**
 * Injects styles in <style> tags at the beginning of a page
 * @param {string} styles - parameter must be a string of CSS without any html tags
 */
const injectStyles = (styles, id = '') => {
  const styleMarkup = `<style ${id ? 'id="' + id + '"': ''}> ${styles} </style>`;
  document.body.insertAdjacentHTML('afterbegin', styleMarkup);
};

/**
 * Initial values for all storage objects
 */
const initialSettings = {
  BADGE: {
    HIDE_MARKED_USERS: false,
    DEFAULT_NAME: "Debil",
    DEFAULT_COLOR: "#ff0000",
  },
  GENERAL: {
    WARN_ON_RELOAD: false,
    WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA: true,
    REMOVE_WOODLE: false,
    REMOVE_COMMENTS: '',
  },
};
const initialUnique = [];
const initialMarked = [];

/**
 * Initializes settings with initial values
 */
const initSettings = () => {
  if (!localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS)) {
    localStorage.setItem(
      STORAGE_KEY_NAMES.WH_SETTINGS,
      JSON.stringify(initialSettings)
    );
  }
};

/**
 * Returns parsed object from localStorage, based on param provided.
 * @param {string} [name=marked] - provide either "marked", "unique" or "settings" to get corresponding objects from localStorage. Default is "marked"
 */
const getLocalStorage = (name = "marked") => {
  switch (name) {
    case "settings":
      initSettings();
      return JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS));

    case "unique":
      if (!localStorage.getItem(STORAGE_KEY_NAMES.UNIQUE_USERS)) {
        localStorage.setItem(
          STORAGE_KEY_NAMES.UNIQUE_USERS,
          JSON.stringify(initialUnique)
        );
      }
      return JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.UNIQUE_USERS));

    case "marked":
      if (!localStorage.getItem(STORAGE_KEY_NAMES.MARKED_USERS)) {
        localStorage.setItem(
          STORAGE_KEY_NAMES.MARKED_USERS,
          JSON.stringify(initialMarked)
        );
      }
      return JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.MARKED_USERS));

    default:
      throw new Error(`Unknown storage type: ${name}. Pick either "unique", "marked" or "settings"`);
  }
};

const { BADGE: EL } = DOM;

const handleBadges = () => {
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
  const addNickToMarkedUsersArray = (nick, link, label, content, media) => {
    markedUsers = getLocalStorage("marked");
    const marked = [...markedUsers, { nick, link, label, content, media }];
    localStorage.setItem(
      STORAGE_KEY_NAMES.MARKED_USERS,
      JSON.stringify(marked)
    );
  };

  const addNickToArrays = (nick, link, content = '', media = '', label = settings.BADGE.DEFAULT_NAME) => {
    if (!isMarked(nick)) {
      addNickToUniqueNicksArray(nick);
      addNickToMarkedUsersArray(nick, link, label, content, media);
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

  // goes through all user elements on a page and checks, if user nicks are present in uniqueNicksSet array. If they are, AND they haven't yet been awarded a badge, it injects the badge.
  const markUsers = () => {
    try {
      const elements = getAllNickElements();
      elements.forEach(element => {
        const nick = getNick(element);
        const userData = getNickData(nick) ? getNickData(nick) : null;
        const label = userData ? userData.label : getDefaultBadgeLabelFromSettings();

        if (isMarked(nick) && isNotAwarded(element)) {
          element.insertAdjacentHTML("afterbegin", badge$1(nick, label));
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
  };

  /**
   * Updates view - checks if badges are already present on the page for marked users, and if not - injects them.
   * @param {boolean} dataChange - set to true if you only want to update label text 
   */
  const updateView = dataChange => {
    markUsers();

    // loop through all nicks on page
    const elements = getAllNickElements();
    elements.forEach(element => {
      const nick = getNick(element);

      // if user is marked, and there isn't a badge next to his nick, inject it.
      if (isMarked(nick) && isNotAwarded(element)) {
        element.insertAdjacentHTML("afterbegin", badge$1(nick));
      }
      // if user is marked and there already is a badge next to him - update text on the badge
      if (dataChange && isMarked(nick) && !isNotAwarded(element)) {
        $(`.${EL.CLASSNAME.BADGE}`, element).remove();
        const nickData = getNickData(nick);
        element.insertAdjacentHTML("afterbegin", badge$1(nick, nickData.label));
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
    event.target.innerText = "\u2714";
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
  };

  // gets user data from objects inside marked users array. For now the only useful data returned is link to the offending post
  const getNickData = nick => {
    if (!nick) {
      throw new Error("getNickData requires nick to be provided.");
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
      showDenyButton: true,
      confirmButtonText: modal.button,
      denyButtonText: 'Zapisz',
      width: "80%",
    }).then(result => {
      if (result.isConfirmed) {
        removeMarkedUser(nick);
        // eslint-disable-next-line
        Swal.fire(
          "Usuni\u0119to!",
          "U\u017Cytkownik nie b\u0119dzie ju\u017C wi\u0119cej oznaczany.",
          "info"
        );
      } else if (result.isDenied) {
        const newLabel = $(`#${DOM.MODAL.ID.BADGE_TEXT}`).value;
        changeMarkedUser(nick, 'label', newLabel);
        updateView();
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
      addNickToArrays(nick, link, markedInBulk(action));
    });

    setTimeout(() => {
      updateView();
    }, 780);
  };

  /**
   * Setting custom label value for user with given nick
   */
  // const setCustomLabelValue = nick => {
  //   const userData = getNickData(nick);
  //   const value = document.getElementById(EL.MODAL.ID.BADGE_TEXT).value;
  //   const marked = getLocalStorage('marked');
  //   const changedMarked = marked.map(el => el.nick === userData.nick ? { ...el, label: value } : el);

  //   localStorage.setItem(
      
  //     STORAGE_KEY_NAMES.MARKED_USERS,
  //     JSON.stringify(changedMarked)
  //   );
  // }

  /**
   * Above is setup. Actual job gets done below
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

  if (document.getElementById(EL.ID.VOTES_CONTAINER)) {
    document.getElementById(EL.ID.VOTES_CONTAINER)
      .closest('.rbl-block').querySelector('.nav').addEventListener("click", event => {
        const target = event.target;
        if (target.classList.contains(EL.CLASSNAME.MARK_ALL_BUTTON)) {
          markAllWhoVoted();
          $(`.${EL.CLASSNAME.MARK_ALL_BUTTON}`).innerText = 'Zrobione :)';
          setTimeout(() => {
            $(`.${EL.CLASSNAME.MARK_ALL_BUTTON_ELEMENT}`).style.display = 'none';
            $(`.${EL.CLASSNAME.MARK_ALL_BUTTON}`).innerText = 'Oznacz wszystkich poni\u017Cej';
          }, 500);
        }
        if (target.closest('#voters') || target.closest('#votersBury')) {
          $(`.${EL.CLASSNAME.MARK_ALL_BUTTON_ELEMENT}`).style.display = 'block';
        }
      });
  }
};

/** An array of all domains suspected of spreading russian propaganda.
 * When adding new domains, remember to add them without http(s) or www. Just name.domain.
 */
const rawDomains = [
  'alternews.pl',
  'alexjones.pl',
  'dziennik-polityczny.com',
  'koniec-swiata.org',
  'magnapolonia.org',
  'narodowcy.net',
  'nczas.com',
  'mysl.pl',
  'ndie.pl',
  'neon24.pl',
  'newsweb.pl',
  'parezja.pl',
  'prostozmostu24.pl',
  'prawdaobiektywna.pl',
  'reporters.pl',
  'sioe.pl',
  'wmeritum.pl',
  'wolnosc24.pl',
  'wolna-polska.pl',
  'wprawo.pl',
  'wsensie.pl',
  'zmianynaziemi.pl',
  'sputniknews.com',
  'rt.com',
  'ruptly.tv',
  'prawica.net',
  'xportal.pl',
  'kresy.pl',
  'bdp.xportal.pl',
  'geopolityka.org',
  'pravda.ru',
  'voiceofrussia.com',
  'ria.ru',
  'ligakobietpolskich.pl',
  'ronik.org.pl',
  'obserwatorpolityczny.pl',
  'mysl-polska.pl'
];

const processedDomains = rawDomains.map(domain => {
  const https = 'https://' + domain;
  const www = 'https://www.' + domain;
  const http = 'http://' + domain;
  const hwww = 'http://www.' + domain;

  return [https, www, http, hwww];
});

/** @returns array of strings (domains) */
const russianPropagandaDomains = processedDomains.flat();

/**
 * @param {string} content - what shall be included in the <p> tag.
 * @param {string} [type=alert] - type of annotation. Available types are: 'success', 'alert' (default), 'error', 'light-info'.
 */

const annotation = (content, type = 'alert') => `
  <div class="${DOM.DOMAIN_CHECKER.CLASSNAME.WYKOP_ITEM_ANNOTATION} type-${type} space clearfix">
		<p>${content}</p>
	</div>
`;

const warningAnnotation = 'Uwa\u017Caj! \u0179r\xF3d\u0142o tego znaleziska jest podejrzewane o szerzenie rosyjskiej propagandy.';

const handleDomainCheck = () => {
  /**
   * Check if user settings allow for marking domains.
   * @return {boolean} True if yes, false otherwise
   */
  const isSettingActive = () => {
    const settings = getLocalStorage('settings');

    if (settings.GENERAL.WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA) {
      return true;
    }

    return false;
  };

  /**
   * if current's thread url is present on the list of russian propaganda domains, then insert annotation with warning
   */
  const handleCheck = () => {
    if (!$(DOM.DOMAIN_CHECKER.SELECTOR.THREAD_LINK).href) {
      return;
    }
    const threadLink = $(DOM.DOMAIN_CHECKER.SELECTOR.THREAD_LINK).href;
    const url = new URL(threadLink);
    const threadLinkHostname = url.protocol + '//' + url.hostname;
    const annotationMarkup = annotation(warningAnnotation);

    if (russianPropagandaDomains.includes(threadLinkHostname)) {
      $(`.${DOM.DOMAIN_CHECKER.CLASSNAME.WYKOP_ITEM_INTRO}`).insertAdjacentHTML('beforebegin', annotationMarkup);
    }
  };

  if (isSettingActive()) {
    handleCheck();
  }
};

const hideMarkedUsers = () => {
  /**
   * Check if user settings allow for hiding marked users' comments.
   * @return {boolean} True if yes, false otherwise
   */
  const isSettingActive = () => {
    const settings = getLocalStorage('settings');

    if (settings.BADGE.HIDE_MARKED_USERS) {
      return true;
    }

    return false;
  };

  const handleHide = () => {
    const markedUsers = $$(`.${DOM.BADGE.CLASSNAME.BADGE}`);

    markedUsers.forEach(el => {
      const commentContainer = el.closest('.wblock');
      
      //eslint-disable-next-line
      commentContainer.innerHTML = `<p style="opacity:0.3">Tu był komentarz użytkownika, którego oznaczyłeś z pomocą WykopHelpera. Jeśli chcesz widzieć takie komentarze, edytuj swoje ustawienia w localStorage (bo zapewne tam aktywowałeś to ustawienie, czyż nie? :) ).</p>`;
    });
  };

  if (isSettingActive()) {
    handleHide();
  }
};

const { SETTINGS: {CLASSNAME} } = DOM;

const settingsMarkup = `
<fieldset>
  <small>
    <a target="_blank" href="https://plwpl.github.io/WykopHelper">ᴅᴏᴄs</a> ‖ <a target="_blank" href="https://plwpl.github.io/WykopHelper/#6-changelog">ᴄʜᴀɴɢᴇʟᴏɢ</a>
  <small>
  <h4>WykopHelper - Ustawienia</h4>
<!-- GENERAL -->
  <div class="space ${CLASSNAME.SETTINGS_BOX} ${CLASSNAME.SETTINGS_GENERAL}">
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="GENERAL"
        name="WARN_ON_RELOAD"
        id="warnOnReload"
      />
      <label class="inline" for="warnOnReload">Ostrzegaj przy próbie zamknięcia/przeładowania strony gdy wykryto pisanie komentarza </label><span id="warnOnReloadInfo" style="cursor:pointer;border:1px solid currentcolor;padding:0 .5rem">ℹ</span>
    </div>
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="GENERAL"
        name="WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA"
        id="warnOnRussian"
      />
      <label class="inline" for="warnOnRussian">Oznaczaj znaleziska ze źródeł podejrzewanych o szerzenie Rosyjskiej propagandy </label><span id="russianPropagandaInfo" style="cursor:pointer;border:1px solid currentcolor;padding:0 .5rem">ℹ</span>
    </div>
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="GENERAL"
        name="REMOVE_WOODLE"
        id="removeWoodle"
      />
      <label class="inline" for="removeWoodle">Usuwaj woodle (okolicznościowy obrazek na belce)</label>
    </div>
    <div class="row space">
      <label class="inline" for="removeByTag" style="margin-left:0;display:block;">Usuń komentarze w znaleziskach z następującymi tagami:</label>
      <input 
        value="" 
        type="text" 
        placeholder="Tagi oddzielaj przecinkiem, nie używaj hasha #" 
        category="GENERAL" 
        name="REMOVE_BY_TAG" 
        id="removeByTag"
      />
    </div>
  </div>
<!--  BADGE -->
  <div class="space ${CLASSNAME.SETTINGS_BOX} ${CLASSNAME.SETTINGS_BADGE}">
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="BADGE"
        name="HIDE_MARKED_USERS"
        id="hideMarkedUser"
        disabled
      />
      <label title="Ficzer w trakcie prac koncepcyjnych :)" class="inline settings__crossed" for="hideMarkedUser">Ukrywaj treści oznakowanych użytkowników</label>
    </div>
    <div class="row space">
      <label class="inline" for="badgeDefaultValue" style="margin-left:0;display:block;">Domyślny tekst odznaki:</label>
      <input 
        placeholder="Domyślny tekst odznaki" 
        id="badgeDefaultValue" 
        category="BADGE" 
        value=""
        name="DEFAULT_NAME" 
        type="text"
      />
    </div>
  </div>
<!-- SPECIAL -->
  <div class="space ${CLASSNAME.SETTINGS_BOX} ${CLASSNAME.SETTINGS_SPECIAL}">
    <div class="row">
      <small>Jeśli chcesz wyczyścić listę oznaczonych wcześniej użytkowników, możesz to zrobić poniżej. W związku z tym, że jest to akcja nieodwracalna, musisz najpierw potwierdzić, że na pewno taki jest Twój cel. Uwaga - po kliknięciu przycisku akcja wykonywana jest natychmiast, bez dodatkowych potwierdzeń!</small>
    </div>
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="SPECIAL"
        name="ALLOW_WIPE_MARKED_LIST"
        id="allowWipeAllMarked"
      />
      <label class="inline" for="allowWipeAllMarked">Zaznacz by odblokować możliwość wyczyszczenia listy</label>
    </div>
    <div class="row space">
      <button style="opacity:0.4" id="whsettings__remove-all-marked" disabled>Wyczyść</button>
    </div>
    <div class="row space">
      <button class="button" id="showAllMarked">Pokaż wszystkich oznaczonych użytkowników</button>
    </div>
  </div>
</fieldset>
`;

const settingsUserTable = `
<div class="${CLASSNAME.WH_USER_TABLE_CONTAINER} ${CLASSNAME.WH_USER_TABLE_CONTAINER_HIDDEN}">
  <h4 class="${CLASSNAME.WH_USER_TABLE_HEADING}">WykopHelper - Lista oznaczonych użytkowników</h4>
  <table class="${CLASSNAME.WH_USER_TABLE}">
    <thead class="${CLASSNAME.WH_USER_TABLE_HEAD}">
      <tr>
        <td>no.</td>
        <td>Nick</td>
        <td>Typ</td>
        <td>Link</td>
        <td>Usuń</td>
      </tr>
    </thead>
    <tbody class="${CLASSNAME.WH_USER_TABLE_BODY}">
    </tbody>
  </table> 
</div>
`;

const settingsUserTableRow = (nick, badgeLabel, link) => `
<tr class="${CLASSNAME.WH_USER_TABLE_ROW}">
  <td></td>
  <td><a href="https://www.wykop.pl/ludzie/${nick}" target="_blank">${nick}</a></td>
  <td>${badgeLabel}</td>
  <td><a href="${link}" target="_blank">&#128279</a></td>
  <td><span class="${CLASSNAME.WH_USER_TABLE_REMOVE_BUTTON}" data-whuserremove="${nick}">&#x02717;</a></td>
</tr>
`;

const settingsNav = `<li class="${CLASSNAME.SETTINGS_NAV}"><a href="https://www.wykop.pl/ustawienia/wykophelper/"><span><strong>WykopHelper</strong> &#10024;</span></a></li>`;

const textContent = {
  SHOW_ALL_MARKED: 'Poka\u017C wszystkich oznaczonych u\u017Cytkownik\xF3w',
  HIDE_TABLE: 'Schowaj tabel\u0119',
  RUSSIAN_PROPAGANDA_MODAL_TITLE: 'Sk\u0105d lista stron z propagand\u0105?',
  WARN_ON_RELOAD_MODAL_TITLE: 'Ostro\u017Cnie z tym ficzerem... :(',
};

/* ********************************/
const settingsModel = {
  settingsMarkup,
  settingsUserTable,
  settingsNav,
  settingsUserTableRow,
  textContent
};

/**
 * To add new setting option:
 *  - add it as a default in /utils/handleLocalStorage
 *  - add HTML for it in /model/modules/settings.model
 *  - add check in appropriate module. If you want it to be ON by default, you will need to make it so using /utils/rynOnceOnUpdate
 */

const { SETTINGS: EL$1 } = DOM;

/**
 * Inserts navigation item on a /ustawienia/ page with link to WykopHelper settings
 */
const createSettingsPage = () => {
  $(EL$1.SELECTOR.LAST_NAV_ELEMENT).insertAdjacentHTML('beforeend', settingsModel.settingsNav);
};

const handleSettings = () => {
  const settings = getLocalStorage('settings');
  const markedUsers = getLocalStorage();
  const uniqueNicksSet = getLocalStorage('unique');

  const settingsFormElement = $(EL$1.SELECTOR.SETTINGS_FORM_ELEMENT);

  /**
   * clears localstorage. Doesn't remove items, but sets them to empty array
   */
  const wipeAllMarkedUsers = () => {
    localStorage.setItem(STORAGE_KEY_NAMES.UNIQUE_USERS, '[]');
    localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, '[]');
    location.reload();
  };

  /**
   * Creates table with marked users.
   */
  const generateUserTables = () => {
    const tableBody = $(`.${EL$1.CLASSNAME.WH_USER_TABLE_BODY}`);

    markedUsers.forEach(el => {
      tableBody.insertAdjacentHTML(
        'beforeend', 
        settingsModel.settingsUserTableRow(
          el.nick, el.label || settings.BADGE.DEFAULT_NAME, el.link
        )
      );
    });
  };

  const toggleUserTableVisibility = () => {
    $(`.${EL$1.CLASSNAME.WH_USER_TABLE_CONTAINER}`)
      .classList.toggle(`${EL$1.CLASSNAME.WH_USER_TABLE_CONTAINER}--hidden`);

    if ($(`.${EL$1.CLASSNAME.WH_USER_TABLE_CONTAINER}--hidden`)) {
      document.getElementById(EL$1.ID.SHOW_MARKED_TABLE).textContent = settingsModel.textContent.SHOW_ALL_MARKED;
    } else {
      document.getElementById(EL$1.ID.SHOW_MARKED_TABLE).textContent = settingsModel.textContent.HIDE_TABLE;
    }
  };

  const showModalWithPropagandaExplanation = () => {
    // eslint-disable-next-line
    Swal.fire({
      title: settingsModel.textContent.RUSSIAN_PROPAGANDA_MODAL_TITLE,
      html: russianPropagandaModal,
      icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
      width: "80%"
    });
  };
  
  const showModalWithWarnOnReloadExplanation = () => {
    // eslint-disable-next-line
    Swal.fire({
      title: settingsModel.textContent.WARN_ON_RELOAD_MODAL_TITLE,
      html: warnOnReloadModal,
      icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
      width: "80%"
    });
  };

  /**
   * Assigns proper state to inputs in settings, based on saved settings object
   */
  const renderVisibleSettingsValues = () => {
    const inputs = $$('input');

    inputs.forEach(el => {
      const category = el.getAttribute('category');
      if (el.id !== EL$1.ID.ALLOW_WIPE_MARKED_LIST && el.type === 'checkbox') {
        el.checked = settings[category][el.name];
      } else if (el.type === 'text' && el.name !== 'nsQ') {
        el.value = settings[category][el.name] || '';
      }
    });    
  };

  const renderSettings = () => {
    $(EL$1.SELECTOR.ACTIVE_NAV_ELEMENT).classList.remove('active');
    $(`.${EL$1.CLASSNAME.WH_NAV_SETTINGS_LINK}`).classList.add('active');
  
    settingsFormElement.innerHTML = '';
    settingsFormElement.innerHTML = settingsModel.settingsMarkup;
    settingsFormElement.removeAttribute('method');
    settingsFormElement.removeAttribute('action');

    settingsFormElement.insertAdjacentHTML('afterend', settingsModel.settingsUserTable);

    generateUserTables();
    renderVisibleSettingsValues();
  };

  /**
   * Basically, sets up several event listeners and handles saving input to storage. onChange for checkboxes, onClick for buttons and onKeyUp for text inputs.
   */
  const handleSettingsForm = () => {
    settingsFormElement.addEventListener('change', event => {
      const category = event.target.getAttribute('category');
      const name = event.target.name;

      if (event.target.type === 'checkbox' && event.target.id !==  EL$1.ID.ALLOW_WIPE_MARKED_LIST) {
        settings[category][name] = !settings[category][name];
        localStorage.setItem(STORAGE_KEY_NAMES.WH_SETTINGS, JSON.stringify(settings));
      }
    }, {passive: true});

    settingsFormElement.addEventListener('click', event => {
      if (event.target.id === EL$1.ID.SHOW_MARKED_TABLE) {
        event.preventDefault();
        toggleUserTableVisibility();
      }
      if (event.target.id ===  EL$1.ID.ALLOW_WIPE_MARKED_LIST) {
        event.target.disabled = true;
        document.getElementById(EL$1.ID.REMOVE_ALL_MARKED).disabled = false;
        document.getElementById(EL$1.ID.REMOVE_ALL_MARKED).style.opacity = 1;
      }
      if (event.target.id === EL$1.ID.REMOVE_ALL_MARKED) {
        event.preventDefault();
        wipeAllMarkedUsers();
      }
      if (event.target.id === EL$1.ID.RUSSIAN_PROPAGANDA_INFO_LINK) {
        showModalWithPropagandaExplanation();
      }
      if (event.target.id === EL$1.ID.WARN_ON_RELOAD_INFO_LINK) {
        showModalWithWarnOnReloadExplanation();
      }
    }, {passive: false});

    settingsFormElement.addEventListener('keyup', event => {
      const category = event.target.getAttribute('category');
      const name = event.target.name;

      if (event.target.type === 'text') {
        settings[category][name] = event.target.value.toLowerCase();
        localStorage.setItem(STORAGE_KEY_NAMES.WH_SETTINGS, JSON.stringify(settings));
      }
    }, {passive: true});
  };

  /**
   * Handling removing mark from users
   */
  const removeTroll = nick => {
    for (let [index, item] of markedUsers.entries()) {
      if (item.nick === nick) {
        delete markedUsers[index];
        const filteredUsers = markedUsers.filter(el => el != null);
        localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, JSON.stringify(filteredUsers));
      }
    }
    const filteredUniqueUsers = uniqueNicksSet.filter(el => el !== nick);
    localStorage.setItem(STORAGE_KEY_NAMES.UNIQUE_USERS, JSON.stringify(filteredUniqueUsers));
  };

  const init = () => {
    injectStyles(styles.settings);
    injectStyles(styles.modal);
    renderSettings();
    handleSettingsForm();

    $(`.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE}`).addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains(`${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_REMOVE_BUTTON}`)) {
        const nick = target.dataset.whuserremove;
        removeTroll(nick);
        target.closest('tr').remove();
      }
    });
  };
  
  init();
};

/**
 * Util function that is supposed to run only once, immediately after script update.
 */
const runOnceOnUpdate = () => {
  let marked;

  // preparation
  if (localStorage.getItem(STORAGE_KEY_NAMES.MARKED_USERS)) {
    marked = getLocalStorage('marked');
  } else {
    marked = [];
  }

  // actual desired action
  marked.forEach(el => {
    if (!el.label) {
      el.label = '';
    }
    if (!el.content) {
      el.content = 'Niestety, u\u017Cytkownik zosta\u0142 oznaczony PRZED uaktywnieniem funkcji zapisywania tre\u015Bci komentarzy. Je\u015Bli chcesz by pojawi\u0142a si\u0119 tu jego tre\u015B\u0107, przejd\u017A do podlinkowanego ni\u017Cej komentarza, a nast\u0119pnie usu\u0144 oznaczenie i dodaj je ponownie.';
    }
  });

  localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, JSON.stringify(marked));
};

/* eslint max-len: 0 */

const version = `0.6`;

const welcomeText = {
  title: "WykopHelper zainstalowany!",
  content:
    'Mi\u0142ego u\u017Cywania dodatku! Je\u015Bli masz jakiekolwiek problemy, pytania lub sugestie, zg\u0142o\u015B je <a href="https://github.com/PLWpl/WykopHelper/issues" target="_blank">tutaj.</a>',
  button: "Super!",
};

const updateText = {
  title: "WykopHelper zaktualizowany!",
  content: `
Dodatek WykopHelper został właśnie zaktualizowany do wersji ${version}. Wprowadzone zmiany to: <br>
<ul class="${DOM.MODAL.CLASSNAME.LIST}">
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Dodano możliwość zmiany tekstu na odznace każdego użytkownika z osobna. By zmienić tekst wystarczy kliknąć na odznace przy danym userze, odszukać nowe pole tekstowe i wpisać tam, co dusza zapragnie :)
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Pole tekstowe wyświetlające tekst komentarza w popupie odznaki uzyskało możliwość przewijania. To oznacza, że teraz bardzo długie komentarze nie będą rozciągać okna popupu nawet poza monitor.
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    W ustawieniach można teraz zadecydować o ukrywaniu woodle (czyli wykopowej wersji doodle - okolicznościowy obrazek umieszczany na belce menu).
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Chcesz widzieć znaleziska z określonych kategorii (np. #polityka), ale dla własnego komfortu psychicznego preferujesz nie widzieć komentarzy pod nim? Od teraz możesz zdefiniować w ustawieniach listę tagów, dla których komentarze pod znaleziskiem będą usuwane.
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Na stronie ustawień pojawiły się linki do historii zmian oraz do strony opisującej ficzery dodatku.
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Kilka pomniejszych fixów i ulepszeń.
  </li>
</ul>
🎉🎉 <strong>Szczęśliwego Nowego Roku!</strong> 🎉🎉
`,
  button: "Okej!",
};

/**
 * Fires modal on update, if a different (lower) version is indicated in local storage. Alternatively, if no version is specified, a modal with "thanks for installation" is fired
 */
const updateAlert = () => {
  injectStyles(styles.modal, 'whInitModalStyle');
  if (localStorage.getItem('WHupdate') && localStorage.getItem('WHupdate') < version) {
    Swal.fire({
      title: updateText.title,
      html: updateText.content,
      icon: 'info',
      width: '80%',
      confirmButtonText: updateText.button
    });
    localStorage.setItem('WHupdate',version);
    runOnceOnUpdate();
  }
  else if (!localStorage.getItem('WHupdate')) {
    Swal.fire({
      title: welcomeText.title,
      html: welcomeText.content,
      icon: 'warning',
      width: '80%',
      confirmButtonText: welcomeText.button
    });
    localStorage.setItem('WHupdate',version);
  }
};

/** Just a button markup for highlighting thread op */
const highlightOpbuttonMarkup = `<span class="${DOM.COMMON.CLASSNAME.BUTTON} ${DOM.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON}">Pokaż OPa</span>`;

const highlightOp = () => {
  $(`${DOM.HIGHLIGHT_OP.SELECTOR.OP_THREAD} .${DOM.BADGE.CLASSNAME.NICK_ELEMENT}`)
    .insertAdjacentHTML('afterbegin', highlightOpbuttonMarkup);

  $(`.${DOM.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON}`).addEventListener('click', () => {
    const color = $('.night') ? 'rgb(7, 68, 91)' : '#ffeac1'; 

    $$(`.${DOM.HIGHLIGHT_OP.CLASSNAME.AUTHOR_COMMENTS}`).forEach(el => {
      el.style.backgroundColor = color;
    });

    $(`.${DOM.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON}`).remove();
  });
};

const { BADGE: EL$2 } = DOM;

const isTextareaEmpty = () => {
  const replyForm = $(EL$2.SELECTOR.REPLY_FORM);
  const commentForm = $(EL$2.SELECTOR.COMMENT_FORM);

  const isReplyNotEmpty = replyForm && replyForm.value.split(" ").length > 5;
  const isCommentNotEmpty = commentForm && commentForm.value.split(" ").length > 5;

  if (isReplyNotEmpty || isCommentNotEmpty) {
    return false;
  } else {
    return true;
  }
};

const warnOnReload = () => {
  const settings = getLocalStorage('settings');
  if (settings.GENERAL.WARN_ON_RELOAD) {
    window.addEventListener('beforeunload', e => {
      if (!isTextareaEmpty()) {
        e.preventDefault();
        e.returnValue = 'Wygl\u0105da na to, \u017Ce jeste\u015B w trakcie pisania komentarza. Czy na pewno chcesz opu\u015Bci\u0107 stron\u0119?';
      }
    });
  }
};

const embedOnPaste = () => {
  document.addEventListener('paste', event => {
    if ($(`.${DOM.EMBED.CLASSNAME.EMBED_FILE}`) && event.clipboardData.files[0]) {
      const input = $(`.${DOM.EMBED.CLASSNAME.EMBED_FILE} input`);
      input.files = event.clipboardData.files;

      const UIevent = new Event('UIEvent');
      UIevent.initEvent('change', false, true);
      input.dispatchEvent(UIevent);
    }
  }, {passive: true});
};

const removeWoodle = () => {
  /**
   * Check if user settings allow for marking domains.
   * @return {boolean} True if yes, false otherwise
   */
  const isSettingActive = () => {
    const settings = getLocalStorage('settings');

    if (settings.GENERAL.REMOVE_WOODLE) {
      return true;
    }

    return false;
  };

  const handleRemoval = () => {
    $(`.${DOM.COMMON.CLASSNAME.WOODLE}`).style.display = 'none';
  };

  if (isSettingActive()) {
    handleRemoval();
  }
};

const removeCommentsByTag = () => {
  const settings = getLocalStorage('settings');
  const tagsSubmitted = settings.GENERAL.REMOVE_BY_TAG;
  const offendingTags = tagsSubmitted.replace(' ', '').replace('#', '').split(',');
  let wykopTags;
  
  if (window.dataLayer2[1]) {
    wykopTags = Object.assign({}, window.dataLayer2[1]);

    // remove some key-values from that object that aren't needed, so only tags remain
    delete wykopTags.action;
    delete wykopTags.event;
    delete wykopTags.logged;
    delete wykopTags.method;
  } else {
    wykopTags = [];
    document.querySelectorAll(DOM.COMMON.SELECTOR.TAGS).forEach(el => {
      wykopTags.push(el.textContent.replace('#', ''));
    });
  }

  /**
   * Check if user settings have any tags added, and thus the feature is active.
   * @return {boolean} True if yes, false otherwise
   */
  const isSettingActive = () => {
    if (offendingTags.length > 0) {
      return true;
    }

    return false;
  };

  // check if tags in a thread match at least one of tags from user settings. If so - remove comments
  const test = tag => offendingTags.includes(tag);
  const checkIfTagsPresent = () => Object.values(wykopTags).some(test);

  const handleRemoval = () => {
    if (checkIfTagsPresent()) {
      $(`#${DOM.COMMON.ID.COMMENTS_STREAM}`).remove();
    }
  };

  if (isSettingActive()) {
    handleRemoval();
  }
};

/**
* Capitalize first letter
*/
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

//shows alert if app has been updated
updateAlert();

//initializes settings if none found
initSettings();

if (isPath.sitewide()) {
  removeWoodle();
}
if (isPath.main()) {
  handleBadges();
  warnOnReload();
  embedOnPaste();
  hideMarkedUsers();
}
if (isPath.settings()) {
  createSettingsPage();
}
if (isPath.whSettings()) {
  handleSettings();
}
if (isPath.thread()) {
  handleDomainCheck();
  removeCommentsByTag();
}
if (isPath.mirkoThread()) {
  highlightOp();
}
