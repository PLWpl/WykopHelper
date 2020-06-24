export const modalMarkup = (link, nick) => `
  <p class="modalWH-text">Powód  oznaczenia: 
    <a href="${link}" target="_blank">link</a>
  </p>
  <span class="modalWH-button modalWH-button--remove" data-whuserremove="${nick}">Usuń oznaczenie</span>
`;