import DOM from '../../constants/domSelectors';
import { getLocalStorage } from '../../utils/handleLocalStorage';

const settings = getLocalStorage('settings');

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
`;

export const suspectDomainsSettingsModal = `
  <label>
    Treść komunikatu ostrzegającego, gdy znalezisko pochodzi z podejrzanego źródła:
    <input id="suspectDomainsLabel" value="${settings.GENERAL.SUSPECT_DOMAINS_LABEL || ''}" style="display: block;width: 100%;padding: .3rem 1rem;margin: .5rem 0 1rem;background: #2c2c2c;border: 1px solid #444;" class="">
  </label>
  <label>
    Lista domen uznawanych za podejrzane:
    <textarea class="" id="suspectDomains" style="display: block; width: 100%; padding: 0.3rem 1rem; margin: 0.5rem 0px 0; height: 150px; max-height: 15rem; overflow: auto; resize: none;">${settings.GENERAL.SUSPECT_DOMAINS ? settings.GENERAL.SUSPECT_DOMAINS.join('\n') : ''}</textarea>
  </label>
  <small>
    Same domeny, bez "https://" czy "www."; każda domena w osobnej linijce.
  </small>
`;

export const warnOnReloadModal = `
  <p>Ten ficzer jest eksperymentalny. Obecnie prawdopodobnie udało mi się wyeliminować błędy, które sprawiały, że w przeszłości (nie)działał jak chciał, ale mimo wszystko - proponuję najpierw przetestować, czy działa jak trzeba również u Ciebie, zanim zaczniesz na nim polegać dla ochrony przed utratą treści :) 
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
    <label class="${DOM.MODAL.CLASSNAME.INPUT_LABEL}">Treść odznaki: <input autocomplete="off" data-label="${props.label}" value="${props.label}" class="${DOM.MODAL.CLASSNAME.INPUT_TEXT}" id="${DOM.MODAL.ID.BADGE_TEXT}"></label>
    <label class="${DOM.MODAL.CLASSNAME.INPUT_LABEL}">Kolor odznaki: <input type="color" data-color="${props.color ? props.color : settings.BADGE.DEFAULT_COLOR}" id="${DOM.MODAL.ID.BADGE_COLOR}" value="${props.color ? props.color : settings.BADGE.DEFAULT_COLOR}" style="margin-left: 1rem;"></label>
    `,
    button: "Usuń oznaczenie",
    buttonClose: "Zapisz"
  };
};