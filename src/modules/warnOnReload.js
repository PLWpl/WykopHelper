import { $ } from '../utils/dom';
import { DOM } from '../constants/domSelectors';
import { getLocalStorage } from '../utils/handleLocalStorage';

const { BADGE: EL } = DOM;

export const isTextareaEmpty = () => {
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
}

export const warnOnReload = () => {
  const settings = getLocalStorage('settings');
  if (settings.GENERAL.WARN_ON_RELOAD) {
    window.addEventListener('beforeunload', e => {
      if (!isTextareaEmpty()) {
        e.preventDefault();
        e.returnValue = 'Wygląda na to, że jesteś w trakcie pisania komentarza. Czy na pewno chcesz opuścić stronę?';
      }
    })
  }
}