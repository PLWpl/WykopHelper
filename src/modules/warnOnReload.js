import DOM_SELECTORS from '../constants/domSelectors';
import { getLocalStorage } from '../utils/handleLocalStorage';
const { BADGE: DOM } = DOM_SELECTORS;

export const isTextareaEmpty = () => {
  const replyForm = document.querySelector(DOM.SELECTOR.REPLY_FORM);
  const commentForm = document.querySelector(DOM.SELECTOR.COMMENT_FORM);

  const isReplyNotEmpty = replyForm && replyForm.value.split(" ").length > 5;
  const isCommentNotEmpty = commentForm && commentForm.value.split(" ").length > 5;

  if (isReplyNotEmpty || isCommentNotEmpty) {
    return false;
  } else {
    return true;
  }
}

export const warnOnReload = () => {
  const settings = getLocalStorage('settings');
  if (settings.GENERAL.WARN_ON_RELOAD) {
    window.addEventListener('beforeunload', e => {
      if (!isTextareaEmpty()) {
        e.preventDefault();
      }
    })
  }
}