import DOM_SELECTORS from '../../constants/domSelectors';

export const embedOnPaste = () => {
  document.addEventListener('paste', event => {
    if (document.querySelector(`.${DOM_SELECTORS.EMBED.EMBED_FILE}`) && event.clipboardData.files[0]) {
      const input = document.querySelector(`.${DOM_SELECTORS.EMBED.EMBED_FILE} input`);
      input.files = event.clipboardData.files;

      let UIevent = new Event('UIEvent');
      UIevent.initEvent('change', false, true);
      input.dispatchEvent(UIevent);
    }
  });
};