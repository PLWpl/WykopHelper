export const modalMarkup = (link, nick) => `
<div class="modalWH">
  <h1 class="modalWH-title">Info</h1>
  <p class="modalWH-text">Powód oznaczenia: 
    <a href="${link}" target="_blank">link</a>
  </p>
  <span class="modalWH-button modalWH-button--remove" data-whuserremove="${nick}">Usuń oznaczenie</span>
</div>
`;