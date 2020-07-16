const DOM_SELECTORS = {
  BADGE: {
    NICK_ELEMENTS: 'li div.author',
    NICK_ELEMENT: 'author',
    NICK: '.showProfileSummary > b',
    BADGE: 'badge',
    MARK_BUTTON: 'buttonWH',
    MARK_BUTTON_CLICKED: 'buttonWH--clicked',
    REPLY_FORM: '.replyForm textarea',
    COMMENT_FORM: '#commentFormContainer textarea',
    DATASET: {
      USERNAME: nick => `[data-whusername='${nick}`,
    },
    MODAL_BUTTON_REMOVE: 'modalWH-button--remove',
    NICK_VERIFIED_BADGE: 'verified'
  },
  SETTINGS: {
    LAST_NAV_ELEMENT: '#site .nav > ul > li:last-child',
    ACTIVE_NAV_ELEMENT: '#site .nav > ul .active',
    SETTINGS_FORM_ELEMENT: '#site .grid-main .settings',
    WH_NAV_SETTINGS_LINK: 'whSettingsLink',
    WH_USER_TABLE: 'tableWH',
    WH_USER_TABLE_CONTAINER: 'tableWH__container',
    WH_USER_TABLE_BODY: 'tableWH__body',
    WH_USER_TABLE_REMOVE_BUTTON: 'tableWH__nick-remove',
  },
  HIGHLIGHT_OP: {
    OP_THREAD: '[data-type="entry"]',
    HIGHLIGHT_BUTTON: 'button--highlightOp',
    AUTHOR_COMMENTS: 'authorComment',
  },
  EMBED: {
    EMBED_FILE: 'embedFile',
  }
};

export default DOM_SELECTORS;