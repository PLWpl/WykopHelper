import { $ } from '../utils/dom';
import DOM_SELECTORS from '../constants/domSelectors';
import { getLocalStorage } from '../utils/handleLocalStorage';
const { BADGE: DOM } = DOM_SELECTORS;

export const isTextareaEmpty = () => {
  const replyForm = $(DOM.SELECTOR.REPLY_FORM);
  const commentForm = $(DOM.SELECTOR.COMMENT_FORM);

  const isReplyNotEmpty = replyForm && replyForm.value.split(" ").length > 5;
  const isCommentNotEmpty = commentForm && commentForm.value.split(" ").length > 5;

  if (isReplyNotEmpty || isCommentNotEmpty) {
    console.log(`is full`)
    return false;
  } else {
    console.log(`is empty`)
    return true;
  }
}

export const warnOnReload = () => {
  console.log('module is working')
  const settings = getLocalStorage('settings');
  console.log(settings)
  if (settings.GENERAL.WARN_ON_RELOAD) {
    console.log(`settings are true`)
    window.addEventListener('unload', e => {
      console.log(`beforeunload event fired`)
      if (!isTextareaEmpty()) {
        console.log(`preventing default hopefully`)
        e.preventDefault();
      }
    })
  }
}