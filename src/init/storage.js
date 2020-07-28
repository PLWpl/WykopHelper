import STORAGE_KEY_NAMES from '../constants/localStorageKeyNames';

const initialSettings = {
  BADGE: {
    HIDE_MARKED_USERS: false,
    DEFAULT_NAME: 'Debil',
    DEFAULT_COLOR: 'red',
  },
  GENERAL: {
    WARN_ON_RELOAD: true,
    WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA: true,
  }
}

/**
 * Initializes settings item in local storage if it's not yet initialized.
 */
export const initSettings = () => {
  if (!localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS)) {
    localStorage.setItem(STORAGE_KEY_NAMES.WH_SETTINGS, JSON.stringify(initialSettings));
  }
};