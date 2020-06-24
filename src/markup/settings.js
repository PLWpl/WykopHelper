export const settingsMarkup = `
  <fieldset>
    <h4>WykopHelper - Ustawienia</h4>
    <div class="space">
      <div class="row">
        <input
          class="checkbox"
          type="checkbox"
          name="wh[hide_marked_user]"
          id="hideMarkedUser"
          disabled
        />
        <label class="settings__crossed inline" for="XhideMarkedUser"
          >Ukrywaj treści oznakowanych użytkowników (tak jak na czarnej liście)</label
        >
      </div>
      <div class="row">
        <input
          class="checkbox"
          type="checkbox"
          name="wh[warn_on_reload]"
          id="warnOnReload"
          disabled
        />
        <label class="settings__crossed inline" for="XwarnOnReload">Ostrzegaj przy próbie zamknięcia/przeładowania strony gdy wykryto pisanie komentarza</label>
      </div>
      <div class="row">
        <input
          class="checkbox"
          type="checkbox"
          name="wh[remove_all_marked]"
          id="removeAllMarked"
          disabled
        />
        <label class="settings__crossed inline" for="XremoveAllMarked">Usuń wszystkich oznaczonych użytkowników [AKCJA NIEODWRACALNA]</label>
      </div>
      <div class="row">
        <input
          class="checkbox"
          type="checkbox"
          name="wh[show_marked_user_table]"
          id="showMarkedUserTable"
        />
        <label class="inline" for="showMarkedUserTable">Pokaż tabelę z oznaczonymi użytkownikami</label>
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