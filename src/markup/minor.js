export const buttonMarkup = `<span class="wh-button buttonWH">Oznacz</span>`;

//returns SPAN element with badge element. If no parameter is provided, it will return default "Troll" badge.
// eslint-disable-next-line max-len 
export const badge = (nick, name = 'debil') => `<span class="badge badge--${name.toLowerCase()}" data-whusername="${nick}">${name.toLowerCase().capitalize()}</span>`;

export const highlightOpbuttonMarkup = `<span class="wh-button button--highlightOp">Pokaż OPa</span>`;