import DOM from "../../constants/domSelectors";
/* eslint max-len: 0 */

const changesArray = [
  'Dodana opcja "naprawiania" linków do YT; po jej włączeniu w ustawieniach, osadzone filmy z YT nie będą już linkować do jakiejś francuskiej strony z wyrażaniem zgody na kto-wie-co, tylko bezpośrednio do filmu.',
  'Poprawki w funkcjonalności usuwania informacji o postowaniu przez aplikację;',
  'Usunięty błąd uniemożliwiający korzystanie z funkcjonalności oznaczania autora wątku na mikroblogu;',
  'Usunięty błąd który powodował, że jeśli X został dodany na czarną listę, a potem zostało usunięte odznaczenie, to zostawał na czarnej liście na zawsze.'
];

const listItem = text => `<li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">${text}</li>`;

export const version = `0.72`;

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
  ${changesArray.map(el => listItem(el)).join('')}
</ul>
`,
  button: "Okej!",
};
