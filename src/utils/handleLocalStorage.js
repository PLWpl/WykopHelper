import STORAGE_KEY_NAMES from '../constants/localStorageKeyNames';

/**
 * Initial values for all storage objects
 */
const initialSettings = {
  BADGE: {
    HIDE_MARKED_USERS: false,
    DEFAULT_NAME: "Debil",
    DEFAULT_COLOR: "red",
  },
  GENERAL: {
    WARN_ON_RELOAD: true,
    WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA: true,
  },
};
const initialUnique = [];
const initialTroll = [];

/**
 * Initializes settings with initial values
 */
export const initSettings = () => {
  if (!localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS)) {
    localStorage.setItem(
      STORAGE_KEY_NAMES.WH_SETTINGS,
      JSON.stringify(initialSettings)
    );
  }
}

/**
 * Returns parsed object from localStorage, based on param provided.
 * @param {string} [name=marked] - provide either "marked", "unique" or "settings" to get corresponding objects from localStorage. Default is "marked"
 */
export const getLocalStorage = (name = "marked") => {
  switch (name) {
    case "settings":
      initSettings();
      return JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS));

    case "unique":
      if (!localStorage.getItem(STORAGE_KEY_NAMES.UNIQUE_USERS)) {
        localStorage.setItem(
          STORAGE_KEY_NAMES.UNIQUE_USERS,
          JSON.stringify(initialUnique)
        );
      }
      return JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.UNIQUE_USERS));

    case "marked":
      if (!localStorage.getItem(STORAGE_KEY_NAMES.MARKED_USERS)) {
        localStorage.setItem(
          STORAGE_KEY_NAMES.MARKED_USERS,
          JSON.stringify(initialTroll)
        );
      }
      return JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.MARKED_USERS));

    default:
      throw new Error(`Unknown storage type: ${name}. Pick either "unique", "marked" or "settings"`);
  }
};