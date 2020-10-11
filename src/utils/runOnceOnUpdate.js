import STORAGE_KEY_NAMES from "../constants/localStorageKeyNames";
import { getLocalStorage } from "../utils/handleLocalStorage";

/**
 * Util function that is supposed to run only once, immediately after script update.
 */
export const runOnceOnUpdate = () => {
  let marked;

  // preparation
  if (localStorage.getItem(STORAGE_KEY_NAMES.MARKED_USERS)) {
    marked = getLocalStorage('marked')
  } else {
    marked = [];
  }

  // actual desired action
  marked.forEach(el => {
    if (!el.label) {
      el.label = '';
    }
    if (!el.content) {
      el.content = 'Niestety, użytkownik został oznaczony PRZED uaktywnieniem funkcji zapisywania treści komentarzy. Jeśli chcesz by pojawiła się tu jego treść, przejdź do podlinkowanego niżej komentarza, a następnie usuń oznaczenie i dodaj je ponownie.';
    }
  })

  localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, JSON.stringify(marked));
}