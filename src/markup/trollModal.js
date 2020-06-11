export const modal = nick => `
<div
  class="qtip qtip-default qtip-pos-bl qtip-fixed"
  style="width: 305px; z-index: 15001;"
  tracking="false"
  role="alert"
  aria-live="polite"
  aria-atomic="false"
  aria-hidden="true"
>
  <div class="qtip-content">
    <div class="summary user arrow-box-bubble">
      <div>
        <div class="row buttons folContainer">
          <span
            title="Usuń z listy trolli"
            class="ajax button submit buttonWH--remove"
            >${nick ? nick + ' to nie' : 'Nie'} troll</a
          >
        </div>
      </div>
    </div>
  </div>
</div>
`;