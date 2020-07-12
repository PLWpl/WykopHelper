import DOM_SELECTORS from '../../constants/domSelectors.js';
import { highlightOpbuttonMarkup } from '../../markup/minor.js';

export const highlightOp = () => {
  document.querySelector(`${DOM_SELECTORS.HIGHLIGHT_OP.OP_THREAD} .${DOM_SELECTORS.BADGE.NICK_ELEMENT}`)
    .insertAdjacentHTML('afterbegin', highlightOpbuttonMarkup);

  document.querySelector(`.${DOM_SELECTORS.HIGHLIGHT_OP.HIGHLIGHT_BUTTON}`).addEventListener('click', () => {
    const color = document.querySelector('.night') ? 'rgb(7, 68, 91)' : '#ffeac1'; 

    document.querySelectorAll(`.${DOM_SELECTORS.HIGHLIGHT_OP.AUTHOR_COMMENTS}`).forEach(el => {
      el.style.backgroundColor = color;
    })
  })
}