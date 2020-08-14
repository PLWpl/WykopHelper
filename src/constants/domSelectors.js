const DOM = {
  BADGE: {
    CLASSNAME: {
      NICK_ELEMENT: 'author',
      BADGE: 'badge',
      MARK_BUTTON: 'buttonWH',
      MARK_BUTTON_CLICKED: 'buttonWH--clicked',
      MODAL_BUTTON_REMOVE: 'modalWH-button--remove',
      NICK_VERIFIED_BADGE: 'verified'
    },
    ID: {},
    SELECTOR: {
      NICK_ELEMENTS: 'li div.author',
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
      WH_NAV_SETTINGS_LINK: 'whSettingsLink',
      WH_USER_TABLE: 'tableWH',
      WH_USER_TABLE_CONTAINER: 'tableWH__container',
      WH_USER_TABLE_BODY: 'tableWH__body',
      WH_USER_TABLE_REMOVE_BUTTON: 'tableWH__nick-remove',
    },
    ID: {},
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
      WYKOP_ITEM_INTRO: 'bspace'
    },
    ID: {},
    SELECTOR: {
      THREAD_LINK: '.article h2 a',
    },
    DYNAMIC: {}
  }
};

export default DOM;