import { $ } from '../utils/dom';
import DOM from '../constants/domSelectors';

export const embedOnPaste = () => {
  document.addEventListener('paste', event => {
    if ($(`.${DOM.EMBED.CLASSNAME.EMBED_FILE}`) && event.clipboardData.files[0]) {
      const input = $(`.${DOM.EMBED.CLASSNAME.EMBED_FILE} input`);
      input.files = event.clipboardData.files;

      const UIevent = new Event('UIEvent');
      UIevent.initEvent('change', false, true);
      input.dispatchEvent(UIevent);
    }
  }, {passive: true});
};