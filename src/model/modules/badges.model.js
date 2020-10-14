import DOM from '../../constants/domSelectors';

export const buttonMarkup = `<span class="${DOM.BADGE.CLASSNAME.MARK_BUTTON}">Oznacz</span>`;

/**
 * 
 * @param {string} nick - nickname of user
 * @param {string} [label=debil] - what will be displayed as a badge
 */
export const badge = (nick, label = 'debil') => `<span class="${DOM.BADGE.CLASSNAME.BADGE} ${DOM.BADGE.CLASSNAME.BADGE}--${label.toLowerCase()}" data-whusername="${nick}">${label.toLowerCase().capitalize()}</span>`;

export const markedInBulk = 'Użytkownik wykopał lub zakopał podlinkowane znalezisko.';


/* ********************************/
const badgeModel = {
  buttonMarkup,
  badge
}

export default badgeModel;