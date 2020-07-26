/* eslint max-len: 0 */

export const version = 0.46;

export const welcomeText = 'Miłego używania dodatku! Jeśli masz jakiekolwiek problemy, pytania lub sugestie, zgłoś je <a href="https://github.com/PLWpl/wykopoweTrole/issues" target="_blank">tutaj.</a>';

export const updateText = `
Dodatek WykopHelper został właśnie zaktualizowany. Wprowadzone zmiany to: <br>
<ul style="margin-top:1rem; list-style-type:square">
  <li style="text-align:left;margin-left:2rem;margin-bottom:.7rem">
    Funkcja ostrzegania przed opuszczeniem strony, gdy wykryte zostanie pisanie komentarza (na mikroblogu i w znaleziskach) została nieco zmodyfikowana: od teraz ostrzeżenie będzie wyświetlane tylko wtedy, jeśli w polu tekstowym komentarza/odpowiedzi wpisane będzie więcej niż 5 słów. Dzięki temu alert nie będzie się włączał za każdym razem przy wychodzeniu z widoku użytkownika lub tagu.
  </li>
  <li style="text-align:left;margin-left:2rem;margin-bottom:.7rem">
    Od teraz możliwe jest wgrywanie obrazków na wykop prosto ze schowka, z pominięciem dysku. Po kliknięciu przycisku dodawania zdjęcia/filmu, wystarczy w otworzonym okienku przycisnąć kombinację Ctrl + V, a skopiowany obrazek zostanie automatycznie wgrany, bez potrzeby zapisywania go najpierw na dysk.
  </li>
  <li style="text-align:left;margin-left:2rem;margin-bottom:.7rem">
    W ustawieniach, pod linkiem "Więcej", pojawił się popup z linkami do stron, na podstawie których została wyznaczona lista źródeł podejrzewanych o szerzenie rosyjskiej propagandy.
  </li>
</ul>
`;