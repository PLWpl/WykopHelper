import DOM from '../../constants/domSelectors';

/**
 * @param {Object} userData - object containing link, nick and label
 */
export const modalMarkup = userData => `
  <p class="${DOM.BADGE.CLASSNAME.MODAL_TEXT}">Powód  oznaczenia: 
    <a href="${userData.link}" target="_blank">link</a>
  </p>
  <span class="${DOM.BADGE.CLASSNAME.MODAL_BUTTON} ${DOM.BADGE.CLASSNAME.MODAL_BUTTON_REMOVE}" data-whuserremove="${userData.nick}">Usuń oznaczenie</span>
`;