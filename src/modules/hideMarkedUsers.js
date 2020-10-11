import { $$ } from '../utils/dom';
import { getLocalStorage } from '../utils/handleLocalStorage';
import DOM from '../constants/domSelectors';

export const hideMarkedUsers = () => {
  /**
   * Check if user settings allow for hiding marked users' comments.
   * @return {boolean} True if yes, false otherwise
   */
  const isSettingActive = () => {
    const settings = getLocalStorage('settings');

    if (settings.BADGE.HIDE_MARKED_USERS) {
      return true;
    }

    return false;
  }

  const handleHide = () => {
    const markedUsers = $$(`.${DOM.BADGE.CLASSNAME.BADGE}`);

    markedUsers.forEach(el => {
      const commentContainer = el.closest('.wblock');
      
      //eslint-disable-next-line
      commentContainer.innerHTML = `<p style="opacity:0.3">Tu był komentarz użytkownika, którego oznaczyłeś z pomocą WykopHelpera. Jeśli chcesz widzieć takie komentarze, edytuj swoje ustawienia w localStorage (bo zapewne tam aktywowałeś to ustawienie, czyż nie? :) ).</p>`
    })
  };

  if (isSettingActive()) {
    handleHide();
  }
}