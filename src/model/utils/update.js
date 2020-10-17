import DOM from "../../constants/domSelectors";
/* eslint max-len: 0 */

export const version = `0.51`;

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
    <strong>Istotna zmiana</strong>: jeśli używałeś do tej pory oznaczania użytkowników, najprawdopodobniej po tej aktualizacji nie będą oni już dłużej oznaczani, ze względu na zmiany nazw niektórych kluczy. Jeśli zależy Ci na tym, by ich odzyskać, skontaktuj się z autorem dodatku ;) 
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Od teraz, najechanie myszką na odznakę nic nie da - należy w nią kliknąć. Po kliknięciu otworzy się okienko z informacjami. Aktualnie znajduje się tam informacja o przyczynie oznaczenia; treść komentarza, link do ew. treści multimedialnych w nim osadzonych oraz link do samego komentarza. Wkrótce pojawi się tutaj kilka innych opcji, w tym m.in. zmiana nazwy oznaczenia na customową, zmiana koloru oznaczenia czy całkowite usuwanie aktywności użytkownika z wykopu.
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Opcja dodania oznaczenia hurtem, dla wszystkich użytkowników któzy wykopali/zakopali dane znalezisko. Aby skorzystać, zjedź na sam dół i otwórz listę użytkowników, którzy wykonali interesującą Cię akcję, a następnie kliknij przycisk "Oznacz wszystkich poniżej".
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Ujednolicony styl graficzny modali, czyli takich informacji jak ta.
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Pojawiły się ikony informacji (ℹ) przy niektórych opcjach w ustawieniach dodatku. Po kliknięciu na nie, naturalnie, pojawią się informacje dodatkowe :)
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Naprawiono wiele bugów, w tym m.in. nieznikające odznaki po usunięciu oznaczenia, czerwona obwódka wokół wykopowych osiągnięć.
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Uporządkowano (trochę :D) kod dodatku, który umożliwi szybszy dalszy rozwój.
  </li>
</ul>
`,
  button: "Okej!",
};
