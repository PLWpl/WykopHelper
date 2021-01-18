
import { $ } from '../utils/dom';
import { getLocalStorage } from '../utils/handleLocalStorage';
import { DOM } from '../constants/domSelectors';

export const removeAllComments = () => {
  const settings = getLocalStorage('settings');
  

  /**
   * Check if user turned off in settings removing comments.
   * @return {boolean} True if yes, false otherwise
   */
  const isSettingActive = () => {
    if (settings.GENERAL.REMOVE_ALL_COMMENTS) {
      return true;
    }

    return false;
  }

  const handleRemoval = () => {
    if ($(`#${DOM.COMMON.ID.COMMENTS_STREAM}`)) {
      $(`#${DOM.COMMON.ID.COMMENTS_STREAM}`).remove();
    }
  }

  if (isSettingActive()) {
    handleRemoval();
  }
}