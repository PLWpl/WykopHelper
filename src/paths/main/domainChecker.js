import STORAGE_KEY_NAMES from '../../constants/localStorageKeyNames';

import { russianPropagandaDomains } from '../../checks/domain.js';
import { annotation } from '../../markup/annotation.js';

export const handleDomainCheck = () => {
  const isSettingActive = () => {
    let settings;
    if (localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS)) {
      settings = JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS));
    }

    if (settings.GENERAL.WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA) {
      return true;
    }

    return false;
  }

  const handleCheck = () => {
    const threadLink = document.querySelector('.article h2 a').href;
    const url = new URL(threadLink);
    const threadLinkHostname = url.protocol + '//' + url.hostname;
    //eslint-disable-next-line max-len
    const annotationMarkup = annotation('Uważaj! Źródło tego znaleziska jest podejrzewane o szerzenie rosyjskiej propagandy.');

    if (russianPropagandaDomains.includes(threadLinkHostname)) {
      document.querySelector('.bspace').insertAdjacentHTML('beforebegin', annotationMarkup)
    }
  };

  if (isSettingActive()) {
    handleCheck();
  }
}