const DOM = {
  COMMON: {
    CLASSNAME: {
      BUTTON: 'buttonWH',
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
    }
  },
};

export default DOM;