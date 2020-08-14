export const buttonMarkup = `<span class="wh-button buttonWH">Oznacz</span>`;

/**
 * 
 * @param {string} nick - nickname of user
 * @param {string} [name=debil] - what will be displayed as a badge
 */
export const badge = (nick, name = 'debil') => `<span class="badge badge--${name.toLowerCase()}" data-whusername="${nick}">${name.toLowerCase().capitalize()}</span>`;


/* ********************************/
const badgeModel = {
  buttonMarkup,
  badge
}

export default badgeModel;