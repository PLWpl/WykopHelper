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

/**
 * Function removes provided nick from the blacklist.
 * @param {String} nick - nick to remove from blacklist
 */
export const removeFromBlackList = nickToRemove => {
  const blacklist = getLocalStorage('blacklist');
  const isBlacklisted = nick => blacklist.includes(nick);

  if (isBlacklisted(nickToRemove)) {
    const newBlacklist = blacklist.filter(el => el !== nickToRemove);
  
    localStorage.setItem(
      STORAGE_KEY_NAMES.BLACKLIST,
      JSON.stringify(newBlacklist)
    );
  }
}

/**
 * Decides how user profile is handled (wykop.pl/ludzie/*)
 */
export const handleBlacklistedProfile = () => {
  /** nick from location.path */
  const nick = location.pathname.split('/')[2];
  const blacklist = getLocalStorage('blacklist');
  const isBlacklisted = nick => blacklist.includes(nick);

  /**
   * if nick is blacklisted, make it greyed out, and add a padlock emoji
   */
  if (isBlacklisted(nick)) {
    $(`${DOM.BADGE.SELECTOR.USER_PROFILE_NICK}:not(:first-child)`).style.filter = 'grayscale(65%)';
    // eslint-disable-next-line max-len
    $(DOM.BADGE.SELECTOR.USER_PROFILE_NICK_ELEMENT).insertAdjacentHTML('beforeend', `<span class="${DOM.BADGE.CLASSNAME.PROFILE_BLACKLISTED}" id="${DOM.BADGE.ID.PROFILE_BLACKLISTED}">🔐</span>`);
  }

  /**
   * If user clicks on the padlock, remove user from blacklist
   */
  document.addEventListener('click', event => {
    if (event.target.id === DOM.BADGE.ID.PROFILE_BLACKLISTED) {
      removeFromBlackList(nick);
    }
  });
}