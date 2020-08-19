export const buttonMarkup = `<span class="wh-button buttonWH">Oznacz</span>`;

/**
 * 
 * @param {string} nick - nickname of user
 * @param {string} [label=debil] - what will be displayed as a badge
 */
export const badge = (nick, label = 'debil') => `<span class="badge badge--${label.toLowerCase()}" data-whusername="${nick}">${label.toLowerCase().capitalize()}</span>`;


/* ********************************/
const badgeModel = {
  buttonMarkup,
  badge
}

export default badgeModel;