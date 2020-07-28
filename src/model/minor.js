export const buttonMarkup = `<span class="wh-button buttonWH">Oznacz</span>`;

/**
 * 
 * @param {string} nick - nickname of user
 * @param {string} [name=debil] - what will be displayed as a badge
 */
export const badge = (nick, name = 'debil') => `<span class="badge badge--${name.toLowerCase()}" data-whusername="${nick}">${name.toLowerCase().capitalize()}</span>`;

/** Just a button markup for highlighting thread op */
export const highlightOpbuttonMarkup = `<span class="wh-button button--highlightOp">Pokaż OPa</span>`;