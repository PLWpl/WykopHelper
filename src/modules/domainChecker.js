import STORAGE_KEY_NAMES from '../constants/localStorageKeyNames';
import DOM from '../constants/domSelectors';

import { russianPropagandaDomains } from '../utils/checkDomainsForRussianPropaganda';
import { annotation } from '../model/utils/annotation';
import { warningAnnotation } from '../model/modules/domainChecker.model';

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
    const threadLink = document.querySelector(DOM.DOMAIN_CHECKER.SELECTOR.THREAD_LINK).href;
    const url = new URL(threadLink);
    const threadLinkHostname = url.protocol + '//' + url.hostname;
    //eslint-disable-next-line max-len
    const annotationMarkup = annotation(warningAnnotation);

    if (russianPropagandaDomains.includes(threadLinkHostname)) {
      document.querySelector(`.${DOM.DOMAIN_CHECKER.CLASSNAME.WYKOP_ITEM_INTRO}`).insertAdjacentHTML('beforebegin', annotationMarkup)
    }
  };

  if (isSettingActive()) {
    handleCheck();
  }
}