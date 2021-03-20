export const DOM = {
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
      IMPORT_SETTINGS_BUTTON: 'buttonImportSettings',
      IMPORT_MARKED_BUTTON: 'buttonImportMarkedUsers'
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

export default DOM;