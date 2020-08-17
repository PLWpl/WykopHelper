import DOM from '../constants/domSelectors';
import { highlightOpbuttonMarkup } from '../model/modules/highlightOp.model';

export const highlightOp = () => {
  document.querySelector(`${DOM.HIGHLIGHT_OP.SELECTOR.OP_THREAD} .${DOM.BADGE.CLASSNAME.NICK_ELEMENT}`)
    .insertAdjacentHTML('afterbegin', highlightOpbuttonMarkup);

  document.querySelector(`.${DOM.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON}`).addEventListener('click', () => {
    const color = document.querySelector('.night') ? 'rgb(7, 68, 91)' : '#ffeac1'; 

    document.querySelectorAll(`.${DOM.HIGHLIGHT_OP.CLASSNAME.AUTHOR_COMMENTS}`).forEach(el => {
      el.style.backgroundColor = color;
    })

    document.querySelector(`.${DOM.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON}`).remove();
  })
}