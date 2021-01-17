import STORAGE_KEY_NAMES from "../constants/localStorageKeyNames";
import { getLocalStorage } from "../utils/handleLocalStorage";
import { rawDomains } from '../model/modules/domainChecker.model';

/**
 * Util function that is supposed to run only once, immediately after script update.
 */
export const runOnceOnUpdate = () => {
  let settings;

  // preparation
  if (localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS)) {
    settings = getLocalStorage('settings')
    settings.GENERAL.SUSPECT_DOMAINS = rawDomains;
    settings.GENERAL.SUSPECT_DOMAINS_LABEL = 'Uważaj! Źródło tego znaleziska jest podejrzewane o szerzenie rosyjskiej propagandy.';
  }

  localStorage.setItem(STORAGE_KEY_NAMES.WH_SETTINGS, JSON.stringify(settings));
}