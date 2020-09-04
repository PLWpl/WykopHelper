import { $, $$ } from '../utils/dom';
import DOM from '../constants/domSelectors';
import { highlightOpbuttonMarkup } from '../model/modules/highlightOp.model';

export const highlightOp = () => {
  $(`${DOM.HIGHLIGHT_OP.SELECTOR.OP_THREAD} .${DOM.BADGE.CLASSNAME.NICK_ELEMENT}`)
    .insertAdjacentHTML('afterbegin', highlightOpbuttonMarkup);

  $(`.${DOM.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON}`).addEventListener('click', () => {
    const color = $('.night') ? 'rgb(7, 68, 91)' : '#ffeac1'; 

    $$(`.${DOM.HIGHLIGHT_OP.CLASSNAME.AUTHOR_COMMENTS}`).forEach(el => {
      el.style.backgroundColor = color;
    })

    $(`.${DOM.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON}`).remove();
  })
}