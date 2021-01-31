import DOM from "../../constants/domSelectors";
/* eslint max-len: 0 */

const changesArray = [
  'Od teraz w ustawieniach można wybrać domyślny kolor odznaki. Wkrótce pojawi się możliwość ustawiania osobnego koloru dla każdego oznaczonego użytkownika.',
];

const listItem = text => `<li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">${text}</li>`;

export const version = `0.65`;

export const welcomeText = {
  title: "WykopHelper zainstalowany!",
  content:
    'Miłego używania dodatku! Jeśli masz jakiekolwiek problemy, pytania lub sugestie, zgłoś je <a href="https://github.com/PLWpl/WykopHelper/issues" target="_blank">tutaj.</a>',
  button: "Super!",
};

export const updateText = {
  title: "WykopHelper zaktualizowany!",
  content: `
Dodatek WykopHelper został właśnie zaktualizowany do wersji <strong>${version}</strong>. Wprowadzone zmiany to: <br>
<ul class="${DOM.MODAL.CLASSNAME.LIST}">
  ${changesArray.map(el => listItem(el))}
</ul>
`,
  button: "Okej!",
};
