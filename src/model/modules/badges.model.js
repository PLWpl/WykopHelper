import DOM from '../../constants/domSelectors';
import { defaultColor } from '../utils/getBadgeColor';

export const buttonMarkup = `<span class="${DOM.BADGE.CLASSNAME.MARK_BUTTON}">Oznacz</span>`;
export const buttonBulkMarkup = `<li class="${DOM.BADGE.CLASSNAME.MARK_ALL_BUTTON_ELEMENT}" style="display:none"><span class="${DOM.BADGE.CLASSNAME.MARK_BUTTON} ${DOM.BADGE.CLASSNAME.MARK_ALL_BUTTON}">Oznacz wszystkich poniżej</span></li>`;

/**
 * 
 * @param {string} nick - nickname of user
 * @param {string} [label=debil] - what will be displayed as a badge
 * @param {boolean} [clickable=true] - if badge should be styled with cursor:pointer
 */
export const badge = (nick, label = 'debil', clickable = true, color = defaultColor) => `<span style="--badgeColor: ${color}" class="${DOM.BADGE.CLASSNAME.BADGE} ${clickable ? DOM.BADGE.CLASSNAME.BADGE_CLICKABLE : DOM.BADGE.CLASSNAME.BADGE_UNCLICKABLE}" data-whusername="${nick}">${label.toLowerCase().capitalize()}</span>`;

/**
 * 
 * @param {string} action - either "wykop" or "zakop". 
 */
export const markedInBulk = action => {
  return `Użytkownik ${action}ał podlinkowane znalezisko.`;
}

/* ********************************/
const badgeModel = {
  buttonMarkup,
  badge
}

export default badgeModel;