/**
 * @param {Object} userData - object containing link, nick and label
 */
export const modalMarkup = userData => `
  <p class="modalWH-text">Powód  oznaczenia: 
    <a href="${userData.link}" target="_blank">link</a>
  </p>
  <span class="modalWH-button modalWH-button--remove" data-whuserremove="${userData.nick}">Usuń oznaczenie</span>
`;