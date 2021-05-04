import { $$ } from '../utils/dom';
import { getLocalStorage } from '../utils/handleLocalStorage';
import { DOM } from '../constants/domSelectors';

export const fixYoutubeLinks = () => {
  /**
   * Check if user settings allow for marking domains.
   * @return {boolean} True if yes, false otherwise
   */
  const isSettingActive = () => {
    const settings = getLocalStorage('settings');

    if (settings.GENERAL.FIX_YOUTUBE) {
      return true;
    }

    return false;
  }

  /**
   * Parses any and all `href`s of embeded youtube elements, removing useless "consent" part and further accompanying parameters, leaving only clean youtube address.
   */
  const fixYoutube = () => {
    if (isSettingActive()) {
      const ytPosts = $$(`.${DOM.COMMON.CLASSNAME.YT_EMBED} a.ajax`);

      ytPosts?.forEach(el => {
        let ytUrl = el.href;

        if (ytUrl.startsWith('https://consent.youtube.com/m?continue=')) {
          const decodedYtUrl = decodeURIComponent(ytUrl);
          const replacedUrl = decodedYtUrl.replace('https://consent.youtube.com/m?continue=', '');
          const newYtUrl = replacedUrl.split('&gl=')[0];
  
          el.href = newYtUrl;
          el.innerText = '[zobacz film z youtube.com]';
        }
      });
    }
  }

  if (isSettingActive()) {
    fixYoutube();
  }
}