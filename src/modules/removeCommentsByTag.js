import { $ } from '../utils/dom';
import { getLocalStorage } from '../utils/handleLocalStorage';
import { DOM } from '../constants/domSelectors';

export const removeCommentsByTag = () => {
  const settings = getLocalStorage('settings');
  const tagsSubmitted = settings.GENERAL.REMOVE_BY_TAG;
  const offendingTags = tagsSubmitted.replace(' ', '').replace('#', '').split(',');
  let wykopTags;
  
  if (window.dataLayer2[1]) {
    wykopTags = Object.assign({}, window.dataLayer2[1]);

    // remove some key-values from that object that aren't needed, so only tags remain
    delete wykopTags.action;
    delete wykopTags.event;
    delete wykopTags.logged;
    delete wykopTags.method;
  } else {
    wykopTags = [];
    document.querySelectorAll(DOM.COMMON.SELECTOR.TAGS).forEach(el => {
      wykopTags.push(el.textContent.replace('#', ''));
    })
  }

  /**
   * Check if user settings have any tags added, and thus the feature is active.
   * @return {boolean} True if yes, false otherwise
   */
  const isSettingActive = () => {
    if (offendingTags.length > 0) {
      return true;
    }

    return false;
  }

  // check if tags in a thread match at least one of tags from user settings. If so - remove comments
  const test = tag => offendingTags.includes(tag);
  const checkIfTagsPresent = () => Object.values(wykopTags).some(test);

  const handleRemoval = () => {
    if (checkIfTagsPresent()) {
      $(`#${DOM.COMMON.ID.COMMENTS_STREAM}`).remove();
    }
  }

  if (isSettingActive()) {
    handleRemoval();
  }
}