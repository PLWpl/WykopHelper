import DOM_SELECTORS from '../../constants/domSelectors';
import STORAGE_KEY_NAMES from '../../constants/localStorageKeyNames';
const { BADGE: DOM } = DOM_SELECTORS;

export const isTextareaEmpty = () => {
  const replyForm = document.querySelector(DOM.REPLY_FORM);
  const commentForm = document.querySelector(DOM.COMMENT_FORM);

  const isReplyNotEmpty = replyForm && replyForm.value.split(" ").length > 5;
  const isCommentNotEmpty = commentForm && commentForm.value.split(" ").length > 5;

  if (isReplyNotEmpty || isCommentNotEmpty) {
    return false;
  } else {
    return true;
  }
}

export const warnOnReload = () => {
  const settings = JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS));
  if (settings.GENERAL.WARN_ON_RELOAD) {
    window.addEventListener('beforeunload', e => {
      if (!isTextareaEmpty()) {
        e.preventDefault();
      }
    })
  }
}