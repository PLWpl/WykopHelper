/* eslint max-len: 0 */

export const version = 0.45;

export const welcomeText = 'Miłego używania dodatku! Jeśli masz jakiekolwiek problemy, pytania lub sugestie, zgłoś je <a href="https://github.com/PLWpl/wykopoweTrole/issues" target="_blank">tutaj.</a>';

export const updateText = `
Dodatek WykopHelper został właśnie zaktualizowany. Wprowadzone zmiany to: <br>
<ul style="margin-top:1rem; list-style-type:square">
  <li style="text-align:left;margin-left:2rem;margin-bottom:.7rem">
    Czytając wpisy na mikroblogu, w pełnym widoku pojedynczego wątku, pod awatarem twócy wątku znajduje się teraz dodatkowy przycisk "Pokaż OPa". Po kliknięciu nań, komentarze twórcy wpisu zostaną pokolorowane na niebiesko (tryb nocny) lub pomarańczowo (dzienny). Pomoże to łatwo znaleźć wypowiedzi OPa w dłuuugich wątkach.
  </li>
  <li style="text-align:left;margin-left:2rem;margin-bottom:.7rem">
    Funkcja ostrzegania przed opuszczeniem strony, gdy wykryte zostanie pisanie komentarza (na mikroblogu i w znaleziskach) została aktywowana i domyślnie jest włączona, ale można ją oczywiście deaktywować w ustawieniach.
  </li>
  <li style="text-align:left;margin-left:2rem;margin-bottom:.7rem">
    Dodatkowo, do tej pory po kliknięciu przycisku usunięcia odznaki użytkownika, następowało natychmiastowe odświeżenie strony (konieczne by usunąć przycisk - przynajmniej na razie, prace nad zmianą tego trwają). Obecnie, jeśli wykryte zostanie pisanie komentarza, wyświetlony zostanie zamiast tego popup z wyjaśnieniem i prośbą o podjęcie decyzji.
  </li>
  <li style="text-align:left;margin-left:2rem;margin-bottom:.7rem">
    Kilka pomniejszych poprawek i usprawnień. Zapewne udało się dodatkowo wprowadzić kilka nowych bugów :)
  </li>
</ul>
`;