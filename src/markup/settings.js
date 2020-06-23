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
          >Ukrywaj tre&#x15B;ci oznakowanych u&#x17C;ytkownik&#xF3;w (tak jak na czarnej li&#x15B;cie)</label
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
        <label class="settings__crossed inline" for="XwarnOnReload">Ostrzegaj przy pr&#xF3;bie zamkni&#x119;cia/prze&#x142;adowania strony gdy wykryto pisanie komentarza</label>
      </div>
      <div class="row">
        <input
          class="checkbox"
          type="checkbox"
          name="wh[remove_all_marked]"
          id="removeAllMarked"
          disabled
        />
        <label class="settings__crossed inline" for="XremoveAllMarked">Usu&#x144; wszystkich oznaczonych u&#x17C;ytkownik&#xF3;w [AKCJA NIEODWRACALNA]</label>
      </div>
      <div class="row">
        <input
          class="checkbox"
          type="checkbox"
          name="wh[show_marked_user_table]"
          id="showMarkedUserTable"
        />
        <label class="inline" for="showMarkedUserTable">Poka&#x17C; tabel&#x119; z oznaczonymi u&#x17C;ytkownikami</label>
      </div>
    </div>
  </fieldset>
`;

export const settingsUserTable = `
<div class="tableWH__container tableWH__container--hidden">
  <h4 class="tableWH__heading">WykopHelper - Lista oznaczonych u&#x17C;ytkownik&#xF3;w</h4>
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