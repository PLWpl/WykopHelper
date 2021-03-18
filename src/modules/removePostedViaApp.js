import { $$ } from '../utils/dom';
import { getLocalStorage } from '../utils/handleLocalStorage';
import { DOM } from '../constants/domSelectors';

export const removePostedViaApp = () => {
  /**
   * Check if user settings allow for removing this text.
   * @return {boolean} True if yes, false otherwise
   */
  const isSettingActive = () => {
    const settings = getLocalStorage('settings');

    if (settings.GENERAL.REMOVE_POSTED_VIA_APP) {
      return true;
    }

    return false;
  }

  const handleRemoval = () => {
    $$(`.${DOM.BADGE.CLASSNAME.NICK_ELEMENT}`).forEach(el => {
      // tests show that using style.display = 'none' is significantly (around 3 times) faster than remove().
      el.querySelector('a + small').style.display = 'none';
    });
  }

  if (isSettingActive()) {
    handleRemoval();
  }
}