import DOM from "../../constants/domSelectors";
/* eslint max-len: 0 */

const changesArray = [
  'W ustawieniach można również od teraz eksportować i importować swoje ustawienia i listy oznaczonych użytkowników. Na razie jest to proces raczej ręczny (wymaga kopiowania i przeklejania ciągów znaków między przeglądarkami); możliwe, że w przyszłości coś tutaj zostanie udoskonalone, chociaż nie ukrywam, że wynika to z mojej niechęci do używania zewnętrznych usług - bo wtedy wchodziłyby w grę kwestie prywatności, dostępów, śledzenia i tak dalej i tak dalej... a tego chcę za wszelką cenę uniknąć.',
  'Od teraz w ustawieniach można wybrać domyślny kolor odznaki. Wkrótce pojawi się możliwość ustawiania osobnego koloru dla każdego oznaczonego użytkownika.',
  'Zniknęło sporo pomniejszych bugów.',
  'Z pewnością pojawiło się sporo nowych bugów :)'
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
  ${changesArray.map(el => listItem(el)).join('')}
</ul>
`,
  button: "Okej!",
};
