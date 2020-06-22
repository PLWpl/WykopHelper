import DOM_SELECTORS from '../constants/domSelectors';
import STORAGE_KEY_NAMES from '../constants/localStorageKeyNames';
import { settingsMarkup, settingsNav } from '../markup/settings';

const { SETTINGS: DOM } = DOM_SELECTORS;

export const handleSettings = () => {
  document.querySelector(DOM.LAST_NAV_ELEMENT).insertAdjacentHTML('beforeend', settingsNav);
};

export const handleWhSettings = () => {
  let settings;
  const initialSettings = {
    BADGE: {
      HIDE_MARKED_USERS: false,
      DEFAULT_NAME: 'Debil',
      DEFAULT_COLOR: 'red'
    },
    GENERAL: {
      WARN_ON_RELOAD: false,
    }
  };

  const prepareLocalStorage = () => {
    if (localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS)) {
      settings = JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS));
    } else {
      settings = initialSettings;
    }
  };



  

  const init = () => {
    document.querySelector(DOM.ACTIVE_NAV_ELEMENT).classList.remove('active');
    document.querySelector(`.${DOM.WH_NAV_SETTINGS_LINK}`).classList.add('active');
    
    const settingsFormElement = document.querySelector(DOM.SETTINGS_FORM_ELEMENT);
  
    settingsFormElement.innerHTML = '';
    settingsFormElement.innerHTML = settingsMarkup;
    settingsFormElement.removeAttribute('method');
    settingsFormElement.removeAttribute('action');

    prepareLocalStorage();
  }

  init();
};
