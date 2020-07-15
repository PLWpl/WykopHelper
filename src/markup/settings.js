export const settingsMarkup = `
<fieldset>
  <h4>WykopHelper - Ustawienia</h4>
<!-- GENERAL -->
  <div class="space settings--general">
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="GENERAL"
        name="WARN_ON_RELOAD"
        id="warnOnReload"
      />
      <label class="inline" for="warnOnReload">Ostrzegaj przy próbie zamknięcia/przeładowania strony gdy wykryto pisanie komentarza</label>
    </div>
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="GENERAL"
        name="WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA"
        id="warnOnRussian"
      />
      <label class="inline" for="warnOnRussian">Oznaczaj znaleziska ze źródeł podejrzewanych o szerzenie Rosyjskiej propagandy [<a href="https://oko.press/rosyjska-propagande-szerza-polskie-portale-znalezlismy-23-takie-witryny/" target="_blank">Więcej -></a>]</label>
    </div>
  </div>
<!--  BADGE -->
  <div class="space settings--badge">
    <div class="row">
      <input
        class="checkbox"
        type="checkbox"
        category="BADGE"
        name="HIDE_MARKED_USERS"
        id="hideMarkedUser"
        disabled
      />
      <label title="Ficzer jeszcze nieaktywny" class="inline settings__crossed" for="hideMarkedUser">Ukrywaj treści oznakowanych użytkowników (tak jak na czarnej liście)</label>
    </div>
    <div class="row space">
      <input placeholder="Domyślny tekst odznaki" id="badgeDefaultValue" category="BADGE" value="" name="DEFAULT_NAME" type="text">
      <small>Domyślny tekst odznaki</small>
    </div>
  </div>
<!-- SPECIAL -->
  <div class="space settings--special">
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
<div class="tableWH__container tableWH__container--hidden">
  <h4 class="tableWH__heading">WykopHelper - Lista oznaczonych użytkowników</h4>
  <table class="tableWH">
    <thead class="tableWH__head">
      <tr>
        <td>no.</td>
        <td>Nick</td>
        <td>Typ</td>
        <td>Link</td>
      </tr>
    </thead>
    <tbody class="tableWH__body">
    </tbody>
  </table> 
</div>
`;

export const settingsNav = `<li class="whSettingsLink"><a href="https://www.wykop.pl/ustawienia/wykophelper/"><span><strong>WykopHelper</strong> &#10024;</span></a></li>`;