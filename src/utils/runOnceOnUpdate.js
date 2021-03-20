import STORAGE_KEY_NAMES from "../constants/localStorageKeyNames";

/**
 * Util function that is supposed to run only once, immediately after script update.
 */
export const runOnceOnUpdate = () => {
  if (!localStorage.getItem(STORAGE_KEY_NAMES.BLACKLIST)) {
    const initialBlacklist = [];
    localStorage.setItem(STORAGE_KEY_NAMES.BLACKLIST, JSON.stringify(initialBlacklist));
  }
}