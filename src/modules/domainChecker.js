import { $ } from '../utils/dom';
import { getLocalStorage } from '../utils/handleLocalStorage';
import DOM from '../constants/domSelectors';

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

  const processDomains = () => {
    const settings = getLocalStorage('settings');
    const domains = settings.GENERAL.SUSPECT_DOMAINS;

    const processedDomains = domains.map(domain => {
      const https = 'https://' + domain;
      const www = 'https://www.' + domain;
      const http = 'http://' + domain;
      const hwww = 'http://www.' + domain;
    
      return [https, www, http, hwww];
    });

    return processedDomains.flat();
  }

  /**
   * if current's thread url is present on the list of russian propaganda domains, then insert annotation with warning
   */
  const handleCheck = () => {
    if (!$(DOM.DOMAIN_CHECKER.SELECTOR.THREAD_LINK).href) {
      return;
    }

    const suspectDomains = processDomains();
    const threadLink = $(DOM.DOMAIN_CHECKER.SELECTOR.THREAD_LINK).href;
    const url = new URL(threadLink);
    const threadLinkHostname = url.protocol + '//' + url.hostname;
    const annotationMarkup = annotation(warningAnnotation);

    if (suspectDomains.includes(threadLinkHostname)) {
      $(`.${DOM.DOMAIN_CHECKER.CLASSNAME.WYKOP_ITEM_INTRO}`).insertAdjacentHTML('beforebegin', annotationMarkup)
    }
  };

  if (isSettingActive()) {
    handleCheck();
  }
}