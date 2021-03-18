import DOM_SELECTORS from '../../constants/domSelectors';

const { SETTINGS: {CLASSNAME, ID} } = DOM_SELECTORS;

export const settingsMarkup = `
<fieldset>
  <small>
    <a target="_blank" href="https://plwpl.github.io/WykopHelper">ᴅᴏᴄs</a> ‖ <a target="_blank" href="https://plwpl.github.io/WykopHelper/#6-changelog">ᴄʜᴀɴɢᴇʟᴏɢ</a>
  <small>
  <h4>WykopHelper - Ustawienia</h4>
<!-- GENERAL -->
  <div class="space ${CLASSNAME.SETTINGS_BOX} ${CLASSNAME.SETTINGS_GENERAL}">
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="GENERAL"
        name="WARN_ON_RELOAD"
        id="${ID.WARN_ON_RELOAD_SETTING}"
      />
      <label class="inline" for="${ID.WARN_ON_RELOAD_SETTING}">Ostrzegaj przy próbie zamknięcia/przeładowania strony gdy wykryto pisanie komentarza </label><svg  style="width: 1.5rem; stroke: currentColor; cursor: pointer;border: 1px solid currentColor;border-radius: 5px;padding: .1rem;" id="${ID.WARN_ON_RELOAD_INFO_LINK}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><path stroke-width="16" d="M60 67c0-13 1-19 8-26 7-9 18-10 28-8s22 12 22 26-11 19-15 22c-7 2-10 6-11 11v20m0 12v16"/></svg>
    </div>
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="GENERAL"
        name="WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA"
        id="${ID.SUSPECT_DOMAINS_SETTING}"
      />
      <label class="inline" for="${ID.SUSPECT_DOMAINS_SETTING}">Oznaczaj znaleziska z podejrzanych źródeł </label><svg id="${ID.SUSPECT_DOMAINS_SETTINGS_LINK}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style="width: 1.5rem;fill: currentColor;cursor: pointer;border: 1px solid currentColor;border-radius: 5px;padding: .25rem;"><path d="M14 0h4l1 6 1.707.707L26 3.293 28.707 6l-3.414 5.293L26 13l6 1v4l-6 1-.707 1.707L28.707 26 26 28.707l-5.293-3.414L19 26l-1 6h-4l-1-6-1.707-.707L6 28.707 3.293 26l3.414-5.293L6 19l-6-1v-4l6-1 .707-1.707L3.293 6 6 3.293l5.293 3.414L13 6l1-6zm2 10a6 6 0 000 12 6 6 0 000-12"></path></svg>
    </div>
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="GENERAL"
        name="REMOVE_WOODLE"
        id="removeWoodle"
      />
      <label class="inline" for="removeWoodle">Usuwaj woodle (okolicznościowy obrazek na belce)</label>
    </div>
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="GENERAL"
        name="REMOVE_POSTED_VIA_APP"
        id="removePostedViaApp"
      />
      <label class="inline" for="removePostedViaApp">Usuwaj info o tym, że dany komentarz został wysłany przez aplikację (np. "via Android")</label>
    </div>
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="GENERAL"
        name="REMOVE_ALL_COMMENTS"
        id="removeAllComments"
      />
      <label class="inline" for="removeAllComments">Usuń komentarze we <strong>wszystkich</strong> znaleziskach</label>
    </div>
    <div class="row space">
      <label class="inline" for="removeByTag" style="margin-left:0;display:block;">Usuń komentarze tylko w znaleziskach z następującymi tagami:</label>
      <input 
        value="" 
        type="text" 
        placeholder="Tagi oddzielaj przecinkiem, nie używaj hasha #" 
        category="GENERAL" 
        name="REMOVE_BY_TAG" 
        id="removeByTag"
      />
    </div>
  </div>
<!--  BADGE -->
  <div class="space ${CLASSNAME.SETTINGS_BOX} ${CLASSNAME.SETTINGS_BADGE}">
    <div class="row" style="display:flex;align-items:center;">
      <input 
        type="color" 
        id="badgeDefaultColor" 
        name="DEFAULT_COLOR" 
        category="BADGE" 
        style="margin-left:.5rem" 
        value="#ff0000"
      />
      <label class="inline" for="badgeDefaultColor">Domyślny kolor odznaki</label> 
    </div>
    <div class="row space">
      <label class="inline" for="badgeDefaultValue" style="margin-left:0;display:block;">Domyślny tekst odznaki:</label>
      <input 
        placeholder="Domyślny tekst odznaki" 
        id="badgeDefaultValue" 
        category="BADGE" 
        value=""
        name="DEFAULT_NAME" 
        type="text"
      />
    </div>
  </div>
<!-- SPECIAL -->
  <div class="space ${CLASSNAME.SETTINGS_BOX} ${CLASSNAME.SETTINGS_SPECIAL}">
    <div class="row">
      <small>Jeśli chcesz wyczyścić listę oznaczonych wcześniej użytkowników, możesz to zrobić poniżej. W związku z tym, że jest to akcja nieodwracalna, musisz najpierw potwierdzić, że na pewno taki jest Twój cel. Uwaga - po kliknięciu przycisku akcja wykonywana jest natychmiast, bez dodatkowych potwierdzeń!</small>
    </div>
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="SPECIAL"
        name="ALLOW_WIPE_MARKED_LIST"
        id="allowWipeAllMarked"
      />
      <label class="inline" for="allowWipeAllMarked">Zaznacz by odblokować możliwość wyczyszczenia listy</label>
    </div>
    <div class="row space">
      <button style="opacity:0.4" id="whsettings__remove-all-marked" disabled>Wyczyść</button>
    </div>
    <div class="row space">
      <button class="button" id="showAllMarked">Pokaż wszystkich oznaczonych użytkowników</button>
    </div>
  </div>
</fieldset>
`;

export const settingsUserTable = `
<div class="${CLASSNAME.WH_USER_TABLE_CONTAINER} ${CLASSNAME.WH_USER_TABLE_CONTAINER_HIDDEN}">
  <h4 class="${CLASSNAME.WH_USER_TABLE_HEADING}">WykopHelper - Lista oznaczonych użytkowników</h4>
  <table class="${CLASSNAME.WH_USER_TABLE}">
    <thead class="${CLASSNAME.WH_USER_TABLE_HEAD}">
      <tr>
        <td>no.</td>
        <td>Nick</td>
        <td>Nazwa</td>
        <td>Kolor</td>
        <td>Link</td>
        <td>Usuń</td>
      </tr>
    </thead>
    <tbody class="${CLASSNAME.WH_USER_TABLE_BODY}">
    </tbody>
  </table> 
</div>
`;

export const settingsUserTableRow = (nick, badgeLabel, link, color) => `
<tr class="${CLASSNAME.WH_USER_TABLE_ROW}">
  <td></td>
  <td><a href="https://www.wykop.pl/ludzie/${nick}" target="_blank">${nick}</a></td>
  <td>${badgeLabel}</td>
  <td style="text-align: center"><span style="--settingsBadgeColor: ${color}" class="${CLASSNAME.WH_USER_TABLE_BADGE_COLOR}"></span></td>
  <td><a href="${link}" target="_blank">&#128279</a></td>
  <td><span class="${CLASSNAME.WH_USER_TABLE_REMOVE_BUTTON}" data-whuserremove="${nick}">&#x02717;</a></td>
</tr>
`;

export const settingsNav = `<li class="${CLASSNAME.SETTINGS_NAV}"><a href="https://www.wykop.pl/ustawienia/wykophelper/"><span><strong>WykopHelper</strong> &#10024;</span></a></li>`;

export const textContent = {
  SHOW_ALL_MARKED: 'Pokaż wszystkich oznaczonych użytkowników',
  HIDE_TABLE: 'Schowaj tabelę',
  RUSSIAN_PROPAGANDA_MODAL_TITLE: 'Skąd lista stron z propagandą?',
  WARN_ON_RELOAD_MODAL_TITLE: 'Ostrożnie z tym ficzerem... :(',
}

/* ********************************/
const settingsModel = {
  settingsMarkup,
  settingsUserTable,
  settingsNav,
  settingsUserTableRow,
  textContent
}

export default settingsModel;