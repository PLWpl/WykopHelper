import DOM from '../../constants/domSelectors';

/* eslint max-len: 0 */
export const russianPropagandaModal = `
  <p>Strony oznaczone jako potencjalnie szerzące rosyjską propagandę na wykopie zostały wyznaczone na podstawie następujących źródeł:
  <ul class="${DOM.MODAL.CLASSNAME.LIST}">
    <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}"><a class="${DOM.MODAL.CLASSNAME.LINK}" href="https://www.politicalcapital.hu/wp-content/uploads/PC_reactionary_values_CEE_20160727.pdf" target="_blank">Raport "The Weaponization of Culture: Kremlin's traditional agenda and the export of values to Central Europe" [PDF]</a></li>
    <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}"><a class="${DOM.MODAL.CLASSNAME.LINK}" href="https://jagiellonia.org/mysl-polska-kresy-pl-geopolityka-org-etc-sa-kanalami-szerzenia-rosyjskich-wplywow-w-polsce-opublikowano-korespondencje-kremlowskich-urzednikow-rappoport-leaks/" target="_blank">Artykuł z Jagiellonia.org</a></li>
    <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}"><a class="${DOM.MODAL.CLASSNAME.LINK}" href="https://euvsdisinfo.eu/reading-list/" target="_blank">EUvsDiSiNFO</a></li>
    <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}"><a class="${DOM.MODAL.CLASSNAME.LINK}" href="https://oko.press/rosyjska-propagande-szerza-polskie-portale-znalezlismy-23-takie-witryny/" target="_blank">Artykuł z OKO.Press</a></li>
  </ul>
  <p>Lista z czasem będzie uzupełniana, a jedna z aktualizacji już wkrótce przyniesie możliwość przejrzenia (najpierw) i edycji (późniejsza aktualizacja) listy witryn.
`

export const warnOnReloadModal = `
  <p>Ten ficzer jest eksperymentalny. Z nie do końca dla mnie zrozumiałych powodów (podejrzewam, że przeszkadza tu jakiś wykopowy skrypt reklamowy), na niektórych przeglądarkach (np. firefox z ublockiem) działa jak powinien, a na innych (czysty Chrome) nie działa w ogóle. Dlatego zanim zdecydujesz się mu zaufać, przeprowadź kilka testów. Ostrzeżenie powinno aktywować się, gdy w okienku pisania komentarza znajdować się będzie 6 słów i więcej.
  <p style="margin-top:.5rem">W najbliższej przyszłości poświęcę nieco więcej czasu na debugging i, mam nadzieję, odkryję przyczynę tej niestabilności. Sorry za utrudnienia, ale to wciąż wersja beta ;)
`

export const badgeUserModal = props => {
  const mediaText = link => `<p style="margin-top:5px;"><a href="${link}" target="_blank">Link do osadzonej treści multimedialnej (obrazek lub film)</a></p>`

  return {
    title: `${props.nick}`,
    content: `
    <p style="text-align:left">Przyczyna oznaczenia</strong>:</p>
    <div class="${DOM.MODAL.CLASSNAME.SCROLLABLE_TEXT}"><p>${props.content}</p>
    ${props.media ? mediaText(props.media) : ''}</div>
    <p style="margin-top:1rem;text-align:right"><a href="${props.link}">Link do komentarza lub znaleziska</a></p>
    <label class="${DOM.MODAL.CLASSNAME.INPUT_LABEL}">Treść odznaki: <input autocomplete="off" value="${props.label}" class="${DOM.MODAL.CLASSNAME.INPUT_TEXT}" id="${DOM.MODAL.ID.BADGE_TEXT}"></label>
    `,
    button: "Usuń oznaczenie",
    buttonClose: "Zapisz"
  };
};