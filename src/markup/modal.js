export const modalMarkup = (link, nick) => `
  <p class="modalWH-text">Pow&oacute;d oznaczenia: 
    <a href="${link}" target="_blank">link</a>
  </p>
  <span class="modalWH-button modalWH-button--remove" data-whuserremove="${nick}">Usu&#x0144; oznaczenie</span>
`;