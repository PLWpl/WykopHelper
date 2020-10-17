import DOM from '../../constants/domSelectors';

export const buttonMarkup = `<span class="${DOM.BADGE.CLASSNAME.MARK_BUTTON}">Oznacz</span>`;
export const buttonBulkMarkup = `<li class="${DOM.BADGE.CLASSNAME.MARK_ALL_BUTTON_ELEMENT}" style="display:none"><span class="${DOM.BADGE.CLASSNAME.MARK_BUTTON} ${DOM.BADGE.CLASSNAME.MARK_ALL_BUTTON}">Oznacz wszystkich poniżej</span></li>`;

/**
 * 
 * @param {string} nick - nickname of user
 * @param {string} [label=debil] - what will be displayed as a badge
 */
export const badge = (nick, label = 'debil') => `<span class="${DOM.BADGE.CLASSNAME.BADGE} ${DOM.BADGE.CLASSNAME.BADGE}--${label.toLowerCase()}" data-whusername="${nick}">${label.toLowerCase().capitalize()}</span>`;

/**
 * 
 * @param {string} action - either "wykop" or "zakop". 
 */
export const markedInBulk = action => {
  // if (action === 'wykop' || action === 'zakop') { throw new Error('Invalid action. Must be "wykop" or "zakop"')}

  return `Użytkownik ${action}ał podlinkowane znalezisko.`;
}

/* ********************************/
const badgeModel = {
  buttonMarkup,
  badge
}

export default badgeModel;