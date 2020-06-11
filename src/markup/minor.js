export const buttonMarkup = `<span class="buttonWH">Troll</span>`;

//returns SPAN element with badge element. If no parameter is provided, it will return default "Troll" badge.
// eslint-disable-next-line max-len 
export const badge = (name = 'troll') => `<span class="badge badge--${name.toLowerCase()}">${name.toLowerCase().capitalize()}</span>`;