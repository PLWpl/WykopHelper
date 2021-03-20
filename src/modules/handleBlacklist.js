import { $, $$ } from '../utils/dom';
import { DOM } from '../constants/domSelectors';
import { getLocalStorage } from '../utils/handleLocalStorage';
import { STORAGE_KEY_NAMES } from "../constants/localStorageKeyNames";

/**
 * Handles removal of comments of users that are blacklisted.
 */
export const handleRemovalOfBlacklisted = () => {
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
  })
}

export const handleBlacklistedProfile = () => {
  const nick = location.pathname.split('/')[2];
  const blacklist = getLocalStorage('blacklist');
  const isBlacklisted = nick => blacklist.includes(nick);

  if (isBlacklisted(nick)) {
    $(`${DOM.BADGE.SELECTOR.USER_PROFILE_NICK}:not(:first-child)`).style.filter = 'grayscale(65%)';
    $(DOM.BADGE.SELECTOR.USER_PROFILE_NICK_ELEMENT).insertAdjacentHTML('beforeend', `<span class="${DOM.BADGE.CLASSNAME.PROFILE_BLACKLISTED}" id="${DOM.BADGE.ID.PROFILE_BLACKLISTED}">🔐</span>`);
  }

  document.addEventListener('click', event => {
    if (event.target.id === DOM.BADGE.ID.PROFILE_BLACKLISTED) {
      const newBlacklist = blacklist.filter(el => el !== nick);
      localStorage.setItem(
        STORAGE_KEY_NAMES.BLACKLIST,
        JSON.stringify(newBlacklist)
      );
      location.reload();
    }
  });
}