import DOM from "../../constants/domSelectors";
/* eslint max-len: 0 */

export const version = 0.46;

export const welcomeText = {
  title: "",
  content:
    'Miłego używania dodatku! Jeśli masz jakiekolwiek problemy, pytania lub sugestie, zgłoś je <a href="https://github.com/PLWpl/wykopoweTrole/issues" target="_blank">tutaj.</a>',
  button: "Super!",
};

export const updateText = {
  title: "WykopHelper zaktualizowany!",
  content: `
Dodatek WykopHelper został właśnie zaktualizowany do wersji ${version}. Wprowadzone zmiany to: <br>
<ul class="${DOM.UPDATE_MODAL.CLASSNAME.LIST}">
  <li class="${DOM.UPDATE_MODAL.CLASSNAME.LIST_ITEM}">
    Funkcja ostrzegania przed opuszczeniem strony, gdy wykryte zostanie pisanie komentarza (na mikroblogu i w znaleziskach) została nieco zmodyfikowana: od teraz ostrzeżenie będzie wyświetlane tylko wtedy, jeśli w polu tekstowym komentarza/odpowiedzi wpisane będzie więcej niż 5 słów. Dzięki temu alert nie będzie się włączał za każdym razem przy wychodzeniu z widoku użytkownika lub tagu.
  </li>
  <li class="${DOM.UPDATE_MODAL.CLASSNAME.LIST_ITEM}">
    Od teraz możliwe jest wgrywanie obrazków na wykop prosto ze schowka, z pominięciem dysku. Po kliknięciu przycisku dodawania zdjęcia/filmu, wystarczy w otworzonym okienku przycisnąć kombinację Ctrl + V, a skopiowany obrazek zostanie automatycznie wgrany, bez potrzeby zapisywania go najpierw na dysk.
  </li>
  <li class="${DOM.UPDATE_MODAL.CLASSNAME.LIST_ITEM}">
    W ustawieniach, pod linkiem "Więcej", pojawił się popup z linkami do stron, na podstawie których została wyznaczona lista źródeł podejrzewanych o szerzenie rosyjskiej propagandy.
  </li>
</ul>
`,
  button: "Okej!",
};
