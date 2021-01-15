import DOM from "../../constants/domSelectors";
/* eslint max-len: 0 */

export const version = `0.61`;

export const welcomeText = {
  title: "WykopHelper zainstalowany!",
  content:
    'Miłego używania dodatku! Jeśli masz jakiekolwiek problemy, pytania lub sugestie, zgłoś je <a href="https://github.com/PLWpl/WykopHelper/issues" target="_blank">tutaj.</a>',
  button: "Super!",
};

export const updateText = {
  title: "WykopHelper zaktualizowany!",
  content: `
Dodatek WykopHelper został właśnie zaktualizowany do wersji ${version}. Wprowadzone zmiany to: <br>
<ul class="${DOM.MODAL.CLASSNAME.LIST}">
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Funkcja ostrzegająca przed zamknięciem strony gdy wykryte zostanie pisanie komentarza <em>powinna</em> już działać poprawnie.
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Od teraz odznaka widoczna będzie również w profilu użytkownika, między avatarem a nickiem.
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Drobne poprawki stylistyczne tu i ówdzie (np. nowy kolor przycisku "zapisz" w popupie odznaki; redesign całego popupu wkrótce)
  </li>
</ul>
`,
  button: "Okej!",
};
