import { $ } from '../utils/dom';
import { getLocalStorage } from '../utils/handleLocalStorage';
import DOM from '../constants/domSelectors';

import { russianPropagandaDomains } from '../utils/checkDomainsForRussianPropaganda';
import { annotation } from '../model/utils/annotation';
import { warningAnnotation } from '../model/modules/domainChecker.model';

export const handleDomainCheck = () => {
  /**
   * Check if user settings allow for marking domains.
   * @return {boolean} True if yes, false otherwise
   */
  const isSettingActive = () => {
    const settings = getLocalStorage('settings');

    if (settings.GENERAL.WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA) {
      return true;
    }

    return false;
  }

  /**
   * if current's thread url is present on the list of russian propaganda domains, then insert annotation with warning
   */
  const handleCheck = () => {
    const threadLink = $(DOM.DOMAIN_CHECKER.SELECTOR.THREAD_LINK).href;
    const url = new URL(threadLink);
    const threadLinkHostname = url.protocol + '//' + url.hostname;
    const annotationMarkup = annotation(warningAnnotation);

    if (russianPropagandaDomains.includes(threadLinkHostname)) {
      $(`.${DOM.DOMAIN_CHECKER.CLASSNAME.WYKOP_ITEM_INTRO}`).insertAdjacentHTML('beforebegin', annotationMarkup)
    }
  };

  if (isSettingActive()) {
    handleCheck();
  }
}