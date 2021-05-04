// ==UserScript==
// @name         WykopHelper - DEV
// @version      0.72
// @updateURL    https://cdn.jsdelivr.net/gh/plwpl/WykopHelper/dist/whhelper-dev.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/plwpl/WykopHelper/dist/whhelper-dev.user.js
// @description  Zestaw narzędzi pomocnych na wykopie.
// @author       PLW
// @match        https://www.wykop.pl/*
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@10
// @grant        none
// ==/UserScript==
(function () {
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

    userProfile: () => !!(path.indexOf("wykop.pl/ludzie/") > -1),
  };

  /** document.querySelector() */
  const $ = (selector, node = document) => node.querySelector(selector);

  /** document.querySelectorAll() */
  const $$ = (selector, node = document) => node.querySelectorAll(selector);

  const STORAGE_KEY_NAMES = {
    MARKED_USERS: 'whMarkedUsers',
    UNIQUE_USERS: 'whUniqueNicks',
    WH_SETTINGS: 'whSettings',
    BLACKLIST: 'whBlacklist',
  };

  const DOM = {
    COMMON: {
      CLASSNAME: {
        // wykop.pl elements
        WOODLE: 'woodle',
        YT_EMBED: 'embed-youtube',
        // custom WH elements
        BUTTON: 'buttonWH',
      },
      ID: {
        // wykop.pl elements
        COMMENTS_STREAM: 'itemsStream',
      },
      SELECTOR: {
        TAGS: '.fix-tagline > .tag.affect.create[href]',
        COMMENT: '[data-type="comment"]',
        THREAD: '[data-type="entrycomment"]',
      }
    },
    BADGE: {
      CLASSNAME: {
        // wykop.pl elements
        NICK_ELEMENT: 'author',
        NICK_VERIFIED_BADGE: 'verified',
        NICK: 'showProfileSummary',
        VOTES_USERCARD: 'usercard',
        USER_PROFILE: 'user-profile',
        // custom WH elements
        BADGE: 'badgeWH',
        BADGE_UNCLICKABLE: 'badgeWH--unclickable',
        BADGE_CLICKABLE: 'badgeWH--clickable',
        MARK_BUTTON: 'buttonWH',
        MARK_BUTTON_CLICKED: 'buttonWH--clicked',
        MARK_ALL_BUTTON_ELEMENT: 'buttonWH--markAllContainer',
        MARK_ALL_BUTTON: 'buttonWH--markAll',
        MODAL_BUTTON: 'modalWH-button',
        MODAL_BUTTON_REMOVE: 'modalWH-button--remove',
        MODAL_TEXT: 'modalWH-text',
        PROFILE_BLACKLISTED: 'whProfile--blacklistedIcon',
      },
      ID: {
        VOTES_CONTAINER: 'votesContainer',
        PROFILE_BLACKLISTED: 'whBlacklistedIcon',
      },
      SELECTOR: {
        // wykop.pl elements
        NICK_ELEMENTS: '.grid-main li div.author',
        NICK: '.showProfileSummary > b',
        NICK_DELETED: '.author > .color-1002',
        REPLY_FORM: '.replyForm textarea',
        COMMENT_FORM: '#commentFormContainer textarea',
        USER_PROFILE_NICK_ELEMENT: '.user-profile h2',
        USER_PROFILE_NICK: '.user-profile h2 span',
        // custom WH elements
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
        WH_USER_TABLE_BADGE_COLOR: 'tableWH__badgeColor',
        WH_SETTINGS_CROSSED: 'settings__crossed',
      },
      ID: {
        SHOW_MARKED_TABLE: 'showAllMarked',
        ALLOW_WIPE_MARKED_LIST: 'allowWipeAllMarked',
        REMOVE_ALL_MARKED: 'whsettings__remove-all-marked',
        SUSPECT_DOMAINS_SETTING: 'warnOnSuspectDomain',
        SUSPECT_DOMAINS_SETTINGS_LINK: 'suspectDomainsSettings',
        SUSPECT_DOMAINS_SETTINGS_TEXTAREA: 'suspectDomains',
        WARN_ON_RELOAD_SETTING: 'warnOnReload',
        WARN_ON_RELOAD_INFO_LINK: 'warnOnReloadInfo',
        IMPORT_BUTTON: 'buttonImport',
        EXPORT_BUTTON: 'buttonExport',
        IMPORT_TEXTAREA: 'importArea',
        EXPORT_TEXTAREA: 'exportArea',
        EXPORT_SETTINGS_BUTTON: 'buttonExportSettings',
        EXPORT_MARKED_BUTTON: 'buttonExportMarkedUsers',
        EXPORT_BLACKLIST_BUTTON: 'buttonExportBlacklist',
        IMPORT_SETTINGS_BUTTON: 'buttonImportSettings',
        IMPORT_MARKED_BUTTON: 'buttonImportMarkedUsers',
        IMPORT_BLACKLIST_BUTTON: 'buttonImportBlacklist'
      },
      SELECTOR: {
        LAST_NAV_ELEMENT: '#site .nav > ul > li:last-child',
        ACTIVE_NAV_ELEMENT: '#site .nav > ul .active',
        SETTINGS_FORM_ELEMENT: '#site .grid-main .settings',
        IMPORT_CHECKBOX_NAME: 'whImportExportChoice',
      },
    },
    HIGHLIGHT_OP: {
      CLASSNAME: {
        HIGHLIGHT_BUTTON: 'button--highlightOp',
        AUTHOR_COMMENTS: 'authorComment',
      },
      SELECTOR: {
        OP_THREAD: '[data-type="entry"]',
      },
    },
    EMBED: {
      CLASSNAME: {
        EMBED_FILE: 'embedFile',
      },
    },
    DOMAIN_CHECKER: {
      CLASSNAME: {
        // wykop.pl elements
        WYKOP_ITEM_INTRO: 'bspace',
        WYKOP_ITEM_ANNOTATION: 'annotation',
        // custom WH elements
      },
      ID: {},
      SELECTOR: {
        THREAD_LINK: '.article h2 a',
      },
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
        BADGE_COLOR: 'whModal_badgeColor',
        BLACKLIST: 'whModal_blacklist'
      }
    },
  };

  const badge$1 = `
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
  color: var(--badgeColor);
  font-weight: bold;
  margin-right: .3rem;
  border: 1px solid currentColor;
  padding: .1rem .2rem;
  position: relative;
  top: .1rem;
}
.${DOM.BADGE.CLASSNAME.BADGE_CLICKABLE} {
  cursor: pointer;
}
.${DOM.BADGE.CLASSNAME.BADGE_UNCLICKABLE} {
  cursor: default;
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

.${DOM.BADGE.CLASSNAME.PROFILE_BLACKLISTED} {
  cursor: pointer;
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

  const settings$4 = `
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
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_BADGE_COLOR} {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: var(--settingsBadgeColor);
  border-radius: .5rem;
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
  align-items: center;
  display: inline-flex;
  margin: .3rem 0;
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
    badge: badge$1,
    settings: settings$4,
    modal
  };

  const warningAnnotation = 'Uwa\u017Caj! \u0179r\xF3d\u0142o tego znaleziska jest podejrzewane o szerzenie rosyjskiej propagandy.';

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
      SUSPECT_DOMAINS_LABEL: warningAnnotation,
      SUSPECT_DOMAINS: rawDomains,
      REMOVE_WOODLE: false,
      REMOVE_COMMENTS: '',
      REMOVE_ALL_COMMENTS: false,
      REMOVE_POSTED_VIA_APP: false,
      FIX_YOUTUBE: false,
    },
  };
  const initialUnique = [];
  const initialMarked = [];
  const initialBlacklist = [];

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
   * @param {string} [name=marked] - provide either "marked", "unique", "blacklist" or "settings" to get corresponding objects from localStorage. Default is "marked"
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

      case "blacklist":
        if (!localStorage.getItem(STORAGE_KEY_NAMES.BLACKLIST)) {
          localStorage.setItem(
            STORAGE_KEY_NAMES.BLACKLIST,
            JSON.stringify(initialBlacklist)
          );
        }
        return JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.BLACKLIST));

      default:
        throw new Error(`Unknown storage type: ${name}. Pick either "unique", "marked", "blacklist" or "settings"`);
    }
  };

  const settings$3 = getLocalStorage('settings');

  const defaultColor = settings$3.BADGE.DEFAULT_COLOR;

  const buttonMarkup = `<span class="${DOM.BADGE.CLASSNAME.MARK_BUTTON}">Oznacz</span>`;
  const buttonBulkMarkup = `<li class="${DOM.BADGE.CLASSNAME.MARK_ALL_BUTTON_ELEMENT}" style="display:none"><span class="${DOM.BADGE.CLASSNAME.MARK_BUTTON} ${DOM.BADGE.CLASSNAME.MARK_ALL_BUTTON}">Oznacz wszystkich poniżej</span></li>`;

  /**
   * 
   * @param {string} nick - nickname of user
   * @param {string} [label=debil] - what will be displayed as a badge
   * @param {boolean} [clickable=true] - if badge should be styled with cursor:pointer
   */
  const badge = (nick, label = 'debil', clickable = true, color = defaultColor) => `<span style="--badgeColor: ${color}" class="${DOM.BADGE.CLASSNAME.BADGE} ${clickable ? DOM.BADGE.CLASSNAME.BADGE_CLICKABLE : DOM.BADGE.CLASSNAME.BADGE_UNCLICKABLE}" data-whusername="${nick}">${label}</span>`;

  /**
   * 
   * @param {string} action - either "wykop" or "zakop". 
   */
  const markedInBulk = action => {
    return `Użytkownik ${action}ał podlinkowane znalezisko.`;
  };

  const settings$2 = getLocalStorage('settings');

  /* eslint max-len: 0 */
`
  <p>Strony oznaczone jako potencjalnie szerzące rosyjską propagandę na wykopie zostały wyznaczone na podstawie następujących źródeł:
  <ul class="${DOM.MODAL.CLASSNAME.LIST}">
    <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}"><a class="${DOM.MODAL.CLASSNAME.LINK}" href="https://www.politicalcapital.hu/wp-content/uploads/PC_reactionary_values_CEE_20160727.pdf" target="_blank">Raport "The Weaponization of Culture: Kremlin's traditional agenda and the export of values to Central Europe" [PDF]</a></li>
    <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}"><a class="${DOM.MODAL.CLASSNAME.LINK}" href="https://jagiellonia.org/mysl-polska-kresy-pl-geopolityka-org-etc-sa-kanalami-szerzenia-rosyjskich-wplywow-w-polsce-opublikowano-korespondencje-kremlowskich-urzednikow-rappoport-leaks/" target="_blank">Artykuł z Jagiellonia.org</a></li>
    <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}"><a class="${DOM.MODAL.CLASSNAME.LINK}" href="https://euvsdisinfo.eu/reading-list/" target="_blank">EUvsDiSiNFO</a></li>
    <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}"><a class="${DOM.MODAL.CLASSNAME.LINK}" href="https://oko.press/rosyjska-propagande-szerza-polskie-portale-znalezlismy-23-takie-witryny/" target="_blank">Artykuł z OKO.Press</a></li>
  </ul>
  <p>Lista z czasem będzie uzupełniana, a jedna z aktualizacji już wkrótce przyniesie możliwość przejrzenia (najpierw) i edycji (późniejsza aktualizacja) listy witryn.
`;

  const suspectDomainsSettingsModal = `
  <label>
    Treść komunikatu ostrzegającego, gdy znalezisko pochodzi z podejrzanego źródła:
    <input id="suspectDomainsLabel" value="${settings$2.GENERAL.SUSPECT_DOMAINS_LABEL || ''}" style="display: block;width: 100%;padding: .3rem 1rem;margin: .5rem 0 1rem;background: #2c2c2c;border: 1px solid #444;" class="">
  </label>
  <label>
    Lista domen uznawanych za podejrzane:
    <textarea class="" id="suspectDomains" style="display: block; width: 100%; padding: 0.3rem 1rem; margin: 0.5rem 0px 0; height: 150px; max-height: 15rem; overflow: auto; resize: none;">${settings$2.GENERAL.SUSPECT_DOMAINS ? settings$2.GENERAL.SUSPECT_DOMAINS.join('\n') : ''}</textarea>
  </label>
  <small>
    Same domeny, bez "https://" czy "www."; każda domena w osobnej linijce.
  </small>
`;

  const warnOnReloadModal = `
  <p>Ten ficzer jest eksperymentalny. Obecnie prawdopodobnie udało mi się wyeliminować błędy, które sprawiały, że w przeszłości (nie)działał jak chciał, ale mimo wszystko - proponuję najpierw przetestować, czy działa jak trzeba również u Ciebie, zanim zaczniesz na nim polegać dla ochrony przed utratą treści :) 
`;

  const badgeUserModal = (props, blocked) => {
    const mediaText = link => `<p style="margin-top:5px;"><a href="${link}" target="_blank">Link do osadzonej treści multimedialnej (obrazek lub film)</a></p>`;

    return {
      title: `${props.nick}`,
      content: `
    <p style="text-align:left">Przyczyna oznaczenia</strong>:</p>
    <div class="${DOM.MODAL.CLASSNAME.SCROLLABLE_TEXT}"><p>${props.content}</p>
    ${props.media ? mediaText(props.media) : ''}</div>
    <p style="margin-top:1rem;text-align:right"><a href="${props.link}">Link do komentarza lub znaleziska</a></p>
    <div style="display:flex;flex-direction:column;">
      <label class="${DOM.MODAL.CLASSNAME.INPUT_LABEL}">Treść odznaki: <input autocomplete="off" data-label="${props.label}" value="${props.label}" class="${DOM.MODAL.CLASSNAME.INPUT_TEXT}" id="${DOM.MODAL.ID.BADGE_TEXT}" style="margin-left: 1rem;"></label>
      <label class="${DOM.MODAL.CLASSNAME.INPUT_LABEL}">Kolor odznaki: <input type="color" data-color="${props.color ? props.color : settings$2.BADGE.DEFAULT_COLOR}" id="${DOM.MODAL.ID.BADGE_COLOR}" value="${props.color ? props.color : settings$2.BADGE.DEFAULT_COLOR}" style="margin-left: 1rem;height:2rem;border:0;padding:0;width:2rem;"></label>
      <label class="${DOM.MODAL.CLASSNAME.INPUT_LABEL}">Czarna lista: <input data-blocked="${blocked}" type="checkbox" id="${DOM.MODAL.ID.BLACKLIST}" style="margin-left: 2rem;" ${blocked ? 'checked' : ''}></label>
    </div>
    `,
      button: "Usu\u0144 oznaczenie",
      buttonClose: "Zapisz"
    };
  };

  const importSettingsModal = `
  <p>Wybierz, jaki typ danych importujesz:</p>
  <input type="radio" id="${DOM.SETTINGS.ID.IMPORT_SETTINGS_BUTTON}" name="${DOM.SETTINGS.SELECTOR.IMPORT_CHECKBOX_NAME}" value="settings">
  <label for="${DOM.SETTINGS.ID.IMPORT_SETTINGS_BUTTON}">Ustawienia</label><br>
  <input type="radio" id="${DOM.SETTINGS.ID.IMPORT_MARKED_BUTTON}" name="${DOM.SETTINGS.SELECTOR.IMPORT_CHECKBOX_NAME}" value="markedUsers">
  <label for="${DOM.SETTINGS.ID.IMPORT_MARKED_BUTTON}">Oznaczeni użytkownicy</label><br>
  <input type="radio" id="${DOM.SETTINGS.ID.IMPORT_BLACKLIST_BUTTON}" name="${DOM.SETTINGS.SELECTOR.IMPORT_CHECKBOX_NAME}" value="blacklist">
  <label for="${DOM.SETTINGS.ID.IMPORT_BLACKLIST_BUTTON}">Czarna lista</label><br>
  <label style="padding-top:1rem">
    Wklej swoje przenoszone dane poniżej:
    <textarea id="${DOM.SETTINGS.ID.IMPORT_TEXTAREA}" style="display: block; width: 100%; padding: 0.3rem 1rem; margin: 0.5rem 0px 0; height: 150px; max-height: 15rem; overflow: auto; resize: none;"></textarea>
  </label>
`;

  const exportSettingsModal = `
  <p>Wybierz, co chcesz wyeksportować:</p>
  <button class="button" id="${DOM.SETTINGS.ID.EXPORT_SETTINGS_BUTTON}">USTAWIENIA</button>
  <button class="button" id="${DOM.SETTINGS.ID.EXPORT_MARKED_BUTTON}">OZNACZONYCH UŻYTKOWNIKÓW</button>
  <button class="button" id="${DOM.SETTINGS.ID.EXPORT_BLACKLIST_BUTTON}">CZARNĄ LISTĘ</button>
  <label style="display:block;padding-top:1rem">
    DANE:
    <textarea id="${DOM.SETTINGS.ID.EXPORT_TEXTAREA}" style="display: block; width: 100%; padding: 0.3rem 1rem; margin: 0.5rem 0px 0; height: 150px; max-height: 15rem; overflow: auto; resize: none;"></textarea>
  </label>
  <small>Po skopiowaniu edytuj dane TYLKO jeśli wiesz, co robisz - inaczej możesz uszkodzić i stracić wszystkie swoje dane, co wymusi konieczność reinstalacji dodatku "na świeżo".</small>
`;

  /**
   * Injects styles in <style> tags at the beginning of a page
   * @param {string} styles - parameter must be a string of CSS without any html tags
   */
  const injectStyles = (styles, id = '') => {
    const styleMarkup = `<style ${id ? 'id="' + id + '"': ''}> ${styles} </style>`;
    document.body.insertAdjacentHTML('afterbegin', styleMarkup);
  };

  /**
   * Handles removal of comments of users that are blacklisted.
   */
  const handleRemovalOfBlacklisted = () => {
    const blacklist = getLocalStorage('blacklist');
    const isBlacklisted = nick => blacklist.includes(nick);
    $$(DOM.BADGE.SELECTOR.NICK).forEach(el => {
      if (isBlacklisted(el.innerText)) {
        if (el.closest(DOM.COMMON.SELECTOR.COMMENT)) {
          el.closest(DOM.COMMON.SELECTOR.COMMENT).remove();
        } else if (el.closest(DOM.COMMON.SELECTOR.THREAD)) {
          el.closest(DOM.COMMON.SELECTOR.THREAD).remove();
        }
      }
    });
  };

  /**
   * Function removes provided nick from the blacklist.
   * @param {String} nick - nick to remove from blacklist
   */
  const removeFromBlackList = nickToRemove => {
    const blacklist = getLocalStorage('blacklist');
    const isBlacklisted = nick => blacklist.includes(nick);

    if (isBlacklisted(nickToRemove)) {
      const newBlacklist = blacklist.filter(el => el !== nickToRemove);
    
      localStorage.setItem(
        STORAGE_KEY_NAMES.BLACKLIST,
        JSON.stringify(newBlacklist)
      );
    }
  };

  /**
   * Decides how user profile is handled (wykop.pl/ludzie/*)
   */
  const handleBlacklistedProfile = () => {
    /** nick from location.path */
    const nick = location.pathname.split('/')[2];
    const blacklist = getLocalStorage('blacklist');
    const isBlacklisted = nick => blacklist.includes(nick);

    /**
     * if nick is blacklisted, make it greyed out, and add a padlock emoji
     */
    if (isBlacklisted(nick)) {
      $(`${DOM.BADGE.SELECTOR.USER_PROFILE_NICK}:not(:first-child)`).style.filter = 'grayscale(65%)';
      // eslint-disable-next-line max-len
      $(DOM.BADGE.SELECTOR.USER_PROFILE_NICK_ELEMENT).insertAdjacentHTML('beforeend', `<span class="${DOM.BADGE.CLASSNAME.PROFILE_BLACKLISTED}" id="${DOM.BADGE.ID.PROFILE_BLACKLISTED}">🔐</span>`);
    }

    /**
     * If user clicks on the padlock, remove user from blacklist
     */
    document.addEventListener('click', event => {
      if (event.target.id === DOM.BADGE.ID.PROFILE_BLACKLISTED) {
        removeFromBlackList(nick);
      }
    });
  };

  const { BADGE: EL$4 } = DOM;

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
    const getAllNickElements = () => $$(EL$4.SELECTOR.NICK_ELEMENTS);

    //used on element - preferably one returned from getAllNickElements() - returns string with nick name.
    const getNick = el => {
      if (
        (!$(EL$4.SELECTOR.NICK, el) || $(EL$4.SELECTOR.NICK, el) === null) && 
        (!$(EL$4.SELECTOR.NICK_DELETED, el) || $(EL$4.SELECTOR.NICK_DELETED, el) === null)) {
        throw new Error(`getNick didn't work for ${el}`);
      }
      if ($(EL$4.SELECTOR.NICK, el) !== null) {
        return $(EL$4.SELECTOR.NICK, el).innerText;
      } else if ($(EL$4.SELECTOR.NICK_DELETED, el) !== null) {
        return $(EL$4.SELECTOR.NICK_DELETED, el).innerText;
      }
      // @TODO: add something to handle nicks on the right panel, apparently there is different DOM structure there which causes this above to throw error as nullish
    };

    // const getAllElementsWithNick = nick => $$(`.${EL.CLASSNAME.NICK}[class*="color"][href*="ludzie/${nick}"]`);

    // used on author element, returned from getAllNickElements(), checks if person has already been marked with a badge
    const isNotAwarded = element => !$(`.${EL$4.CLASSNAME.BADGE}`, element);

    // used on author element, returned from getAllNickElements(), checks if person has already been given a button
    const hasButtonAppended = element =>
      !!$(`.${EL$4.CLASSNAME.MARK_BUTTON}`, element);

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
      if (document.getElementById(EL$4.ID.VOTES_CONTAINER)) {
        const nav = document.getElementById(EL$4.ID.VOTES_CONTAINER).closest('.rbl-block').querySelector('.nav ul + ul');
        nav ? nav.insertAdjacentHTML("beforeend", buttonBulkMarkup) : '';
      }
    };

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
          $(`.${EL$4.CLASSNAME.BADGE}`, element).remove();
          const nickData = getNickData(nick);
          element.insertAdjacentHTML("afterbegin", badge(nick, nickData.label, true, nickData.color));
        }
        // if user is marked - remove button to mark him as it's not needed anymore
        if (
          isMarked(nick) &&
          $(`.${EL$4.CLASSNAME.MARK_BUTTON}`, element) &&
          !$(`.${EL$4.CLASSNAME.MARK_BUTTON_CLICKED}`, element)
        ) {
          $(`.${EL$4.CLASSNAME.MARK_BUTTON}`, element).remove();
        }
        // if user isn't marked and there is badge next to him (double negation here, might think on renaming it later on) - remove it
        if (!isMarked(nick) && !isNotAwarded(element)) {
          $(`.${EL$4.CLASSNAME.BADGE}`, element).remove();
        }
      });

      if (isPath.userProfile()) {
        setTimeout(() => {
          location.reload();
        }, 200);
      }
    };

    // fired on clicking a button "Oznacz".
    // First, get nick of the author. Then, get link of the offending comment.
    const addNewMarked = event => {
      const nick = getNick(
        event.target.closest(`.${EL$4.CLASSNAME.NICK_ELEMENT}`)
      );

      // verified accounts need be handled slightly differently
      // event.target = .buttonWH
      const link = event.target
        .closest(`.${EL$4.CLASSNAME.NICK_ELEMENT}`)
        .querySelector(`.verified`)
        ? event.target
          .closest(`.${EL$4.CLASSNAME.NICK_ELEMENT}`)
          .querySelector(`.${EL$4.CLASSNAME.NICK_VERIFIED_BADGE} + a`).href
        : event.target
          .closest(`.${EL$4.CLASSNAME.NICK_ELEMENT}`)
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

      event.target.classList.add(EL$4.CLASSNAME.MARK_BUTTON_CLICKED);
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

      removeFromBlackList(nick);

      setTimeout(() => {
        updateView();
      }, 780);
    };

    const changeMarkedUser = (nick, prop, newValue) => {
      const updatedMarkedUsers = getLocalStorage("marked");
      for (let item of updatedMarkedUsers.entries()) {
        if (item[1].nick === nick) {
          item[1][prop] = newValue;
          const marked = updatedMarkedUsers.filter(el => el != null);
          localStorage.setItem(
            STORAGE_KEY_NAMES.MARKED_USERS,
            JSON.stringify(marked)
          );
        }
      }
      updateView(true);
    };

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
            "Usuni\u0119to!",
            "U\u017Cytkownik nie b\u0119dzie ju\u017C wi\u0119cej oznaczany.",
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
        } else ;
      });
    };

    //Add all users that up/down-voted a thread
    const markAllWhoVoted = () => {
      const link = window.location.href;
      const userCards = $$(`#${EL$4.ID.VOTES_CONTAINER} .${EL$4.CLASSNAME.VOTES_USERCARD}`);
      
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
     * Above is setup.
     */

    injectStyles(styles.badge);
    injectStyles(styles.modal);
    markUsers();
    addMarkAllButton();

    // on button click, add new marked user
    document.getElementById("itemsStream").addEventListener("click", event => {
      const target = event.target;
      if (target.classList.contains(EL$4.CLASSNAME.MARK_BUTTON)) {
        addNewMarked(event);
      }
      if (target.classList.contains("affect") && target.closest(".more")) {
        setTimeout(() => {
          markUsers();
        }, 500);
      }
      if (target.classList.contains(EL$4.CLASSNAME.BADGE)) {
        const nick = target.dataset.whusername;
        showUserModal(EL$4.DYNAMIC.DATASET.USERNAME(nick));
      }
    });

    if (isPath.userProfile()) {
      $(`.${EL$4.CLASSNAME.USER_PROFILE}`).addEventListener("click", event => {
        const target = event.target;
        if (target.classList.contains(EL$4.CLASSNAME.BADGE)) {
          const nick = target.dataset.whusername;
          showUserModal(EL$4.DYNAMIC.DATASET.USERNAME(nick));
        }
      });
    }

    if (document.getElementById(EL$4.ID.VOTES_CONTAINER)) {
      document.getElementById(EL$4.ID.VOTES_CONTAINER)
        .closest('.rbl-block').querySelector('.nav').addEventListener("click", event => {
          const target = event.target;
          if (target.classList.contains(EL$4.CLASSNAME.MARK_ALL_BUTTON)) {
            markAllWhoVoted();
            $(`.${EL$4.CLASSNAME.MARK_ALL_BUTTON}`).innerText = 'Zrobione :)';
            setTimeout(() => {
              $(`.${EL$4.CLASSNAME.MARK_ALL_BUTTON_ELEMENT}`).style.display = 'none';
              $(`.${EL$4.CLASSNAME.MARK_ALL_BUTTON}`).innerText = 'Oznacz wszystkich poni\u017Cej';
            }, 500);
          }
          if (target.closest('#voters') || target.closest('#votersBury')) {
            $(`.${EL$4.CLASSNAME.MARK_ALL_BUTTON_ELEMENT}`).style.display = 'block';
          }
        });
    }
  };

  const { BADGE: EL$3 } = DOM;

  let uniqueNicksSet = getLocalStorage("unique");

  /**
   * Checks if user of provided nick is already in uniqueNicksSet array
   * @param {String} nick - nick to check
   */
  const isMarked = nick => {
    uniqueNicksSet = getLocalStorage("unique");
    return !!uniqueNicksSet.includes(nick);
  };

  /**
   * used on author element, returned from getAllNickElements(), checks if person has already been marked with a badge
   * @param {HTMLElement} element - element to check
   */
  const isNotAwarded = element => !$(`.${EL$3.CLASSNAME.BADGE}`, element);

  let settings$1 = getLocalStorage("settings");

  /**
   * gets user data from objects inside marked users array.
   * @param {String} nick 
   */
  const getNickData = nick => {
    if (!nick) {
      throw new Error("getNickData requires nick to be provided.");
    }

    const markedUsers = getLocalStorage("marked");

    for (let i = 0; i < markedUsers.length; i++) {
      if (markedUsers[i].nick === nick) {
        return {
          link: markedUsers[i].link,
          nick: markedUsers[i].nick,
          label: markedUsers[i].label,
          color: markedUsers[i].color,
          content: markedUsers[i].content,
          media: markedUsers[i].media,
        };
      } else if (markedUsers[i] === undefined || markedUsers[i] === null) {
        continue;
      }
    }
  };

  /**
   * @returns {String} default name for badge set in settings by user.
   */
  const getDefaultBadgeLabelFromSettings = () => settings$1.BADGE.DEFAULT_NAME;
  const getDefaultBadgeColorFromSettings = () => settings$1.BADGE.DEFAULT_COLOR;

  const { BADGE: EL$2 } = DOM;

  /**
   * This is responsible for displaying mark badge next to user's nickname in user's profile (wykop.pl/ludzie/XXXX).
   */
  const displayBadgeInUserProfile = () => {
    const nickElement = $(EL$2.SELECTOR.USER_PROFILE_NICK_ELEMENT);
    const nick = $(EL$2.SELECTOR.USER_PROFILE_NICK).textContent;
    const userData = getNickData(nick) ? getNickData(nick) : null;
    const label = userData ? userData.label : getDefaultBadgeLabelFromSettings();
    const color = userData ? userData.color : getDefaultBadgeColorFromSettings();

    if (isMarked(nick) && isNotAwarded(nickElement)) {
      nickElement.insertAdjacentHTML("afterbegin", badge(nick, label, true, color));
    }
  };

  /**
   * @param {string} content - what shall be included in the <p> tag.
   * @param {string} [type=alert] - type of annotation. Available types are: 'success', 'alert' (default), 'error', 'light-info'.
   */

  const annotation = (content, type = 'alert') => `
  <div class="${DOM.DOMAIN_CHECKER.CLASSNAME.WYKOP_ITEM_ANNOTATION} type-${type} space clearfix">
		<p>${content}</p>
	</div>
`;

  const settings = getLocalStorage('settings');

  const handleDomainCheck = () => {
    /**
     * Check if user settings allow for marking domains.
     * @return {boolean} True if yes, false otherwise
     */
    const isSettingActive = () => {
      if (settings.GENERAL.WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA) {
        return true;
      }

      return false;
    };

    const processDomains = () => {
      const domains = settings.GENERAL.SUSPECT_DOMAINS || [];

      const processedDomains = domains.map(domain => {
        const https = 'https://' + domain;
        const www = 'https://www.' + domain;
        const http = 'http://' + domain;
        const hwww = 'http://www.' + domain;
      
        return [https, www, http, hwww];
      });

      return processedDomains.flat();
    };

    /**
     * if current's thread url is present on the list of russian propaganda domains, then insert annotation with warning
     */
    const handleCheck = () => {
      if (!$(DOM.DOMAIN_CHECKER.SELECTOR.THREAD_LINK).href) {
        return;
      }

      const suspectDomains = processDomains();
      const threadLink = $(DOM.DOMAIN_CHECKER.SELECTOR.THREAD_LINK).href;
      const url = new URL(threadLink);
      const threadLinkHostname = url.protocol + '//' + url.hostname;
      const annotationMarkup = annotation(settings.GENERAL.SUSPECT_DOMAINS_LABEL);

      if (suspectDomains.includes(threadLinkHostname)) {
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

  const { SETTINGS: {CLASSNAME, ID} } = DOM;

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
        id="${ID.WARN_ON_RELOAD_SETTING}"
      />
      <label class="inline" for="${ID.WARN_ON_RELOAD_SETTING}">Ostrzegaj przy próbie zamknięcia/przeładowania strony gdy wykryto pisanie komentarza </label><svg  style="width: 1.5rem; stroke: currentColor; cursor: pointer;border: 1px solid currentColor;border-radius: 5px;padding: .1rem;" id="${ID.WARN_ON_RELOAD_INFO_LINK}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><path stroke-width="16" d="M60 67c0-13 1-19 8-26 7-9 18-10 28-8s22 12 22 26-11 19-15 22c-7 2-10 6-11 11v20m0 12v16"/></svg>
    </div>
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="GENERAL"
        name="WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA"
        id="${ID.SUSPECT_DOMAINS_SETTING}"
      />
      <label class="inline" for="${ID.SUSPECT_DOMAINS_SETTING}">Oznaczaj znaleziska z podejrzanych źródeł </label><svg id="${ID.SUSPECT_DOMAINS_SETTINGS_LINK}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style="width: 1.5rem;fill: currentColor;cursor: pointer;border: 1px solid currentColor;border-radius: 5px;padding: .25rem;"><path d="M14 0h4l1 6 1.707.707L26 3.293 28.707 6l-3.414 5.293L26 13l6 1v4l-6 1-.707 1.707L28.707 26 26 28.707l-5.293-3.414L19 26l-1 6h-4l-1-6-1.707-.707L6 28.707 3.293 26l3.414-5.293L6 19l-6-1v-4l6-1 .707-1.707L3.293 6 6 3.293l5.293 3.414L13 6l1-6zm2 10a6 6 0 000 12 6 6 0 000-12"></path></svg>
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
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="GENERAL"
        name="REMOVE_POSTED_VIA_APP"
        id="removePostedViaApp"
      />
      <label class="inline" for="removePostedViaApp">Usuwaj info o tym, że dany komentarz został wysłany przez aplikację (np. "via Android")</label>
    </div>
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="GENERAL"
        name="FIX_YOUTUBE"
        id="fixYoutube"
      />
      <label class="inline" for="fixYoutube">Napraw linki do YouTube (usuwa przekierowanie na francuską stronę z wyrażaniem zgody)</label>
    </div>
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="GENERAL"
        name="REMOVE_ALL_COMMENTS"
        id="removeAllComments"
      />
      <label class="inline" for="removeAllComments">Usuń komentarze we <strong>wszystkich</strong> znaleziskach</label>
    </div>
    <div class="row space">
      <label class="inline" for="removeByTag" style="margin-left:0;display:block;">Usuń komentarze tylko w znaleziskach z następującymi tagami:</label>
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
    <div class="row space" style="display:flex;align-items:center;">
      <input 
        type="color" 
        id="badgeDefaultColor" 
        name="DEFAULT_COLOR" 
        category="BADGE" 
        style="height:2rem; border:0; padding:0; width:2rem;" 
        value="#ff0000"
      />
      <label class="inline" for="badgeDefaultColor">Domyślny kolor odznaki</label> 
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
<!--  Export and import -->
  <div class="space ${CLASSNAME.SETTINGS_BOX} ${CLASSNAME.SETTINGS_IMPORT_EXPORT}">
    <div class="row" style="display:flex;align-items:center;">
      <small>Jeśli chcesz, możesz eksportować swoje ustawienia bądź bazę oznaczonych użytkowników, albo też ją zaimportować na innym komputerze. O proces przenosin musisz zadbać sam/a - możesz do tego wykorzystać na przykład plik tekstowy "notatnika".</small>
      <button class="button" style="margin: 0 .5rem" id="buttonImport">IMPORTUJ</button>
      <button class="button" style="margin: 0 .5rem" id="buttonExport">EKSPORTUJ</button>
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
        <td>Nazwa</td>
        <td>Kolor</td>
        <td>Link</td>
        <td>Usuń</td>
      </tr>
    </thead>
    <tbody class="${CLASSNAME.WH_USER_TABLE_BODY}">
    </tbody>
  </table> 
</div>
`;

  const settingsUserTableRow = (nick, badgeLabel, link, color) => `
<tr class="${CLASSNAME.WH_USER_TABLE_ROW}">
  <td></td>
  <td><a href="https://www.wykop.pl/ludzie/${nick}" target="_blank">${nick}</a></td>
  <td>${badgeLabel}</td>
  <td style="text-align: center"><span style="--settingsBadgeColor: ${color}" class="${CLASSNAME.WH_USER_TABLE_BADGE_COLOR}"></span></td>
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
   *  - add check in appropriate module. If you want it to be ON by default, you will need to make it so using /utils/runOnceOnUpdate
   *  - add module to index.js
   */

  const { SETTINGS: EL$1 } = DOM;

  /**
   * Inserts navigation item on a /ustawienia/ page with link to WykopHelper settings
   */
  const createSettingsPage = () => {
    $(EL$1.SELECTOR.LAST_NAV_ELEMENT).insertAdjacentHTML('beforeend', settingsModel.settingsNav);
  };

  const handleSettings = () => {
    let settings = getLocalStorage('settings');
    const markedUsers = getLocalStorage();
    const uniqueNicksSet = getLocalStorage('unique');
    const blacklist = getLocalStorage('blacklist');

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
            el.nick, el.label || settings.BADGE.DEFAULT_NAME, el.link, el.color || settings.BADGE.DEFAULT_COLOR
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

    const parseImportForUniqueNames = text => {
      const array = JSON.parse(text);
      const nicks = array.map(el => el.nick);
      return JSON.stringify(nicks);
    };

    const showModalWithPropagandaExplanation = () => {
      // eslint-disable-next-line
      Swal.fire({
        html: suspectDomainsSettingsModal,
        icon: 'info',
        // eslint-disable-next-line
        iconHtml: '<svg style="fill:currentColor;width:2rem;height: auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M14 0h4l1 6 1.707.707L26 3.293 28.707 6l-3.414 5.293L26 13l6 1v4l-6 1-.707 1.707L28.707 26 26 28.707l-5.293-3.414L19 26l-1 6h-4l-1-6-1.707-.707L6 28.707 3.293 26l3.414-5.293L6 19l-6-1v-4l6-1 .707-1.707L3.293 6 6 3.293l5.293 3.414L13 6l1-6zm2 10a6 6 0 000 12 6 6 0 000-12"/></svg>',
        iconColor: '#fff',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: '#0a8658',
        confirmButtonText: 'Zapisz',
        cancelButtonText: 'Anuluj',
        width: "80%",
        willOpen: modalElement => {
          $('#suspectDomainsLabel', modalElement).value = settings.GENERAL.SUSPECT_DOMAINS_LABEL;
          $('#suspectDomains', modalElement).value = settings.GENERAL.SUSPECT_DOMAINS.join('\n');
        }
      }).then(result => {
        if (result.isConfirmed) {
          let list = $(`#${EL$1.ID.SUSPECT_DOMAINS_SETTINGS_TEXTAREA}`).value;
          list.replace('https://', '').replace('http://', '').replace('www.', '').replace(' ', '');
          const arrayList = list.split('\n');
          settings.GENERAL.SUSPECT_DOMAINS = arrayList;

          const label = $('#suspectDomainsLabel').value;
          settings.GENERAL.SUSPECT_DOMAINS_LABEL = label;

          localStorage.setItem(STORAGE_KEY_NAMES.WH_SETTINGS, JSON.stringify(settings));
        }
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

    const showModalWithImport = () => {
      // eslint-disable-next-line
      Swal.fire({
        html: importSettingsModal,
        icon: 'info',
        // eslint-disable-next-line
        iconHtml: '<svg style="fill:currentColor;width:2rem;height: auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M0 0h48v48H0z" fill="none"/><path d="M38 8H10c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h8v-4h-8V16h28v20h-8v4h8c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM24 20l-8 8h6v12h4V28h6l-8-8z"/></svg>',
        iconColor: '#fff',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: '#0a8658',
        confirmButtonText: 'Zapisz nowe',
        showLoaderOnConfirm: true,
        cancelButtonText: 'Anuluj',
        width: "80%",
      }).then(result => {
        if (result.isConfirmed) {
          const imported = $(`#${EL$1.ID.IMPORT_TEXTAREA}`).value;
          const checkboxValue = $(`input[type="radio"][name="${EL$1.SELECTOR.IMPORT_CHECKBOX_NAME}"]:checked`).value;

          if (checkboxValue && checkboxValue === 'settings') {
            localStorage.setItem(STORAGE_KEY_NAMES.WH_SETTINGS, imported);
          } else if (checkboxValue && checkboxValue === 'markedUsers') {
            localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, imported);
            localStorage.setItem(STORAGE_KEY_NAMES.UNIQUE_USERS, parseImportForUniqueNames(imported));
          } else if (checkboxValue && checkboxValue === 'blacklist') {
            localStorage.setItem(STORAGE_KEY_NAMES.BLACKLIST, imported);
          } else {
            // eslint-disable-next-line no-alert
            alert('Nie wybrano typu danych: czy importujesz ustawienia, czy oznaczonych u\u017Cytkownik\xF3w?');
          }
        }
      });
    };

    const showModalWithExport = () => {
      // eslint-disable-next-line
      Swal.fire({
        html: exportSettingsModal,
        icon: 'info',
        // eslint-disable-next-line
        iconHtml: '<svg style="fill:currentColor;width:2rem;height: auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M0 0h48v48H0z" fill="none"/><path d="M34 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V14l-8-8zM24 38c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm6-20H10v-8h20v8z"/></svg>',
        iconColor: '#fff',
        showCloseButton: true,
        confirmButtonColor: '#0a8658',
        confirmButtonText: 'SKOPIUJ DO SCHOWKA',
        width: "80%",
      }).then(result => {
        if (result.isConfirmed) {
          const exportedData = $(`#${EL$1.ID.EXPORT_TEXTAREA}`);
          exportedData.select();
          document.execCommand('copy');
        }
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
        } else if (el.type === 'color') {
          el.value = settings[category][el.name];
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
     * Basically, sets up several event listeners and handles saving input to storage. onChange for checkboxes, onClick for buttons and onKeyUp for text inputs. For standard inputs, mentioned earlier, does not require any extra changes when adding new features.
     */
    const handleSettingsForm = () => {
      settingsFormElement.addEventListener('change', event => {
        const category = event.target.getAttribute('category');
        const name = event.target.name;

        if (event.target.type === 'checkbox' && event.target.id !==  EL$1.ID.ALLOW_WIPE_MARKED_LIST) {
          settings[category][name] = !settings[category][name];
          localStorage.setItem(STORAGE_KEY_NAMES.WH_SETTINGS, JSON.stringify(settings));
        }
        if (event.target.type === 'color') {
          settings[category][name] = event.target.value;
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
        if (event.target.id === EL$1.ID.SUSPECT_DOMAINS_SETTINGS_LINK) {
          showModalWithPropagandaExplanation();
        }
        if (event.target.id === EL$1.ID.WARN_ON_RELOAD_INFO_LINK) {
          showModalWithWarnOnReloadExplanation();
        }
        if (event.target.id === EL$1.ID.IMPORT_BUTTON) {
          event.preventDefault();
          showModalWithImport();
        }
        if (event.target.id === EL$1.ID.EXPORT_BUTTON) {
          event.preventDefault();
          showModalWithExport();
        }
      }, {passive: false});

      document.addEventListener('click', event => {
        if (event.target.id === EL$1.ID.EXPORT_SETTINGS_BUTTON) {
          $(`#${EL$1.ID.EXPORT_TEXTAREA}`).innerText = '';
          $(`#${EL$1.ID.EXPORT_TEXTAREA}`).innerText = JSON.stringify(settings);
        }
        if (event.target.id === EL$1.ID.EXPORT_MARKED_BUTTON) {
          $(`#${EL$1.ID.EXPORT_TEXTAREA}`).innerText = '';
          $(`#${EL$1.ID.EXPORT_TEXTAREA}`).innerText = JSON.stringify(markedUsers);
        }
        if (event.target.id === EL$1.ID.EXPORT_BLACKLIST_BUTTON) {
          $(`#${EL$1.ID.EXPORT_TEXTAREA}`).innerText = '';
          $(`#${EL$1.ID.EXPORT_TEXTAREA}`).innerText = JSON.stringify(blacklist);
        }
      }, {passive: true});

      settingsFormElement.addEventListener('keyup', event => {
        const category = event.target.getAttribute('category');
        const name = event.target.name;

        if (event.target.type === 'text') {
          settings[category][name] = event.target.value;
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
    if (!localStorage.getItem(STORAGE_KEY_NAMES.BLACKLIST)) {
      const initialBlacklist = [];
      localStorage.setItem(STORAGE_KEY_NAMES.BLACKLIST, JSON.stringify(initialBlacklist));
    }
  };

  /* eslint max-len: 0 */

  const changesArray = [
    'Dodana opcja "naprawiania" link\xF3w do YT; po jej w\u0142\u0105czeniu w ustawieniach, osadzone filmy z YT nie b\u0119d\u0105 ju\u017C linkowa\u0107 do jakiej\u015B francuskiej strony z wyra\u017Caniem zgody na kto-wie-co, tylko bezpo\u015Brednio do filmu.',
    'Poprawki w funkcjonalno\u015Bci usuwania informacji o postowaniu przez aplikacj\u0119;',
    'Usuni\u0119ty b\u0142\u0105d uniemo\u017Cliwiaj\u0105cy korzystanie z funkcjonalno\u015Bci oznaczania autora w\u0105tku na mikroblogu;',
    'Usuni\u0119ty b\u0142\u0105d kt\xF3ry powodowa\u0142, \u017Ce je\u015Bli X zosta\u0142 dodany na czarn\u0105 list\u0119, a potem zosta\u0142o usuni\u0119te odznaczenie, to zostawa\u0142 na czarnej li\u015Bcie na zawsze.'
  ];

  const listItem = text => `<li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">${text}</li>`;

  const version = `0.72`;

  const welcomeText = {
    title: "WykopHelper zainstalowany!",
    content:
      'Mi\u0142ego u\u017Cywania dodatku! Je\u015Bli masz jakiekolwiek problemy, pytania lub sugestie, zg\u0142o\u015B je <a href="https://github.com/PLWpl/WykopHelper/issues" target="_blank">tutaj.</a>',
    button: "Super!",
  };

  const updateText = {
    title: "WykopHelper zaktualizowany!",
    content: `
Dodatek WykopHelper został właśnie zaktualizowany do wersji <strong>${version}</strong>. Wprowadzone zmiany to: <br>
<ul class="${DOM.MODAL.CLASSNAME.LIST}">
  ${changesArray.map(el => listItem(el)).join('')}
</ul>
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
        showCloseButton: true,
        icon: 'info',
        iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" style="fill:currentColor;width:2rem;height: auto" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><defs><path d="M0 0h48v48H0V0z" id="a"/></defs><clipPath id="b"><use overflow="visible" xlink:href="#a"/></clipPath><path clip-path="url(#b)" d="M40 8H8c-2.21 0-3.98 1.79-3.98 4L4 36c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM17 30h-2.4l-5.1-7v7H7V18h2.5l5 7v-7H17v12zm10-9.49h-5v2.24h5v2.51h-5v2.23h5V30h-8V18h8v2.51zM41 28c0 1.1-.9 2-2 2h-8c-1.1 0-2-.9-2-2V18h2.5v9.01h2.25v-7.02h2.5v7.02h2.25V18H41v10z"/></svg>',
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
        iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" style="fill:currentColor;width:2rem;height: auto" viewBox="0 0 48 48"><path d="M0 0h48v48H0z" fill="none"/><path d="M2 42h8V18H2v24zm44-22c0-2.21-1.79-4-4-4H29.37l1.91-9.14c.04-.2.07-.41.07-.63 0-.83-.34-1.58-.88-2.12L28.34 2 15.17 15.17C14.45 15.9 14 16.9 14 18v20c0 2.21 1.79 4 4 4h18c1.66 0 3.08-1.01 3.68-2.44l6.03-14.1A4 4 0 0046 24v-3.83l-.02-.02L46 20z"/></svg>',
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

  const { BADGE: EL } = DOM;

  const isTextareaEmpty = () => {
    const replyForm = $(EL.SELECTOR.REPLY_FORM);
    const commentForm = $(EL.SELECTOR.COMMENT_FORM);

    // for whatever reason, chrome just can't handle belows checks the way they should work (so simply assigning the check to const); instead of simple boolean false if it encounters something like undef or null, it throws all sorts of different errors. Hence, it's done like that. Took about an hour experimenting.
    let isCommentNotEmpty = false;
    let isReplyNotEmpty = false;

    if (replyForm && replyForm.value.length > 0) {
      isReplyNotEmpty = replyForm && replyForm.value.split(" ").length > 5;
    }
    if (commentForm && commentForm.value.length > 0) {
      isCommentNotEmpty = commentForm && commentForm.value.split(" ").length > 5;
    }

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
    const offendingTags = tagsSubmitted ? tagsSubmitted.replace(' ', '').replace('#', '').split(',') : '';
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
      if (checkIfTagsPresent() && $(`#${DOM.COMMON.ID.COMMENTS_STREAM}`)) {
        $(`#${DOM.COMMON.ID.COMMENTS_STREAM}`).remove();
      }
    };

    if (isSettingActive()) {
      handleRemoval();
    }
  };

  const removeAllComments = () => {
    const settings = getLocalStorage('settings');
    

    /**
     * Check if user turned off in settings removing comments.
     * @return {boolean} True if yes, false otherwise
     */
    const isSettingActive = () => {
      if (settings.GENERAL.REMOVE_ALL_COMMENTS) {
        return true;
      }

      return false;
    };

    const handleRemoval = () => {
      if ($(`#${DOM.COMMON.ID.COMMENTS_STREAM}`)) {
        $(`#${DOM.COMMON.ID.COMMENTS_STREAM}`).remove();
      }
    };

    if (isSettingActive()) {
      handleRemoval();
    }
  };

  const removePostedViaApp = () => {
    /**
     * Check if user settings allow for removing this text.
     * @return {boolean} True if yes, false otherwise
     */
    const isSettingActive = () => {
      const settings = getLocalStorage('settings');

      if (settings.GENERAL.REMOVE_POSTED_VIA_APP) {
        return true;
      }

      return false;
    };

    const handleRemoval = () => {
      $$(`.${DOM.BADGE.CLASSNAME.NICK_ELEMENT}`).forEach(el => {
        // tests show that using style.display = 'none' is significantly (around 3 times) faster than remove().
        const postedViaAppElement = el.querySelector('a + small');
        if (postedViaAppElement) {
          postedViaAppElement.style.display = 'none';
        }
      });
    };

    if (isSettingActive()) {
      handleRemoval();
    }
  };

  const fixYoutubeLinks = () => {
    /**
     * Check if user settings allow for marking domains.
     * @return {boolean} True if yes, false otherwise
     */
    const isSettingActive = () => {
      const settings = getLocalStorage('settings');

      if (settings.GENERAL.FIX_YOUTUBE) {
        return true;
      }

      return false;
    };

    /**
     * Parses any and all `href`s of embeded youtube elements, removing useless "consent" part and further accompanying parameters, leaving only clean youtube address.
     */
    const fixYoutube = () => {
      if (isSettingActive()) {
        const ytPosts = $$(`.${DOM.COMMON.CLASSNAME.YT_EMBED} a.ajax`);

        ytPosts?.forEach(el => {
          let ytUrl = el.href;

          if (ytUrl.startsWith('https://consent.youtube.com/m?continue=')) {
            const decodedYtUrl = decodeURIComponent(ytUrl);
            const replacedUrl = decodedYtUrl.replace('https://consent.youtube.com/m?continue=', '');
            const newYtUrl = replacedUrl.split('&gl=')[0];
    
            el.href = newYtUrl;
            el.innerText = '[zobacz film z youtube.com]';
          }
        });
      }
    };

    if (isSettingActive()) {
      fixYoutube();
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
    handleRemovalOfBlacklisted();
    warnOnReload();
    embedOnPaste();
    hideMarkedUsers();
    removePostedViaApp();
    fixYoutubeLinks();
  }
  if (isPath.userProfile()) {
    displayBadgeInUserProfile();
    handleBlacklistedProfile();
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
    removeAllComments();
  }
  if (isPath.mirkoThread()) {
    highlightOp();
  }

}());
