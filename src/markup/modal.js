export const modalMarkup = (link, nick) => `
<div class="wh__modal">
  <h1 class="wh__modal-title">Info</h1>
  <p class="wh__modal-text">Powód oznaczenia: 
    <a href="${link}" target="_blank" data-whuser-remove="${nick}">LINK</a>
  </p>
  <span class="wh__modal-button">Usuń oznaczenie</span>
</div>
`;