import { $ } from '../utils/dom';
import { DOM } from '../constants/domSelectors';
import { getLocalStorage } from '../utils/handleLocalStorage';

const { BADGE: EL } = DOM;

export const isTextareaEmpty = () => {
  const replyForm = $(EL.SELECTOR.REPLY_FORM);
  const commentForm = $(EL.SELECTOR.COMMENT_FORM);

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
    window.addEventListener('unload', e => {
      if (!isTextareaEmpty()) {
        e.preventDefault();
      }
    })
  }
}