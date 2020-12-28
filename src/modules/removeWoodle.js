import { $ } from '../utils/dom';
import { getLocalStorage } from '../utils/handleLocalStorage';
import { DOM } from '../constants/domSelectors';

export const removeWoodle = () => {
  /**
   * Check if user settings allow for marking domains.
   * @return {boolean} True if yes, false otherwise
   */
  const isSettingActive = () => {
    const settings = getLocalStorage('settings');

    if (settings.GENERAL.REMOVE_WOODLE) {
      return true;
    }

    return false;
  }

  const handleRemoval = () => {
    $(`.${DOM.COMMON.CLASSNAME.WOODLE}`).style.display = 'none';
  }

  if (isSettingActive()) {
    handleRemoval();
  }
}