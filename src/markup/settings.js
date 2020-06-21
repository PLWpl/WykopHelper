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
        />
        <label class="inline" for="static_header"
          >Ukrywaj treści oznakowanych użytkowników (tak jak na czarnej liście)</label
        >
      </div>
      <div class="row">
        <input
          class="checkbox"
          type="checkbox"
          name="wh[warn_on_reload]"
          id="warnOnReload"
        />
        <label class="inline" for="static_header">Ostrzegaj przy próbie zamknięcia/przeładowania strony gdy wykryto pisanie komentarza</label>
      </div>
      <div class="row">
        <input
          class="checkbox"
          type="checkbox"
          name="wh[remove_all_marked]"
          id="removeAllMarked"
        />
        <label class="inline" for="static_header">Usuń wszystkich oznaczonych użytkowników [AKCJA NIEODWRACALNA]</label>
      </div>
    </div>
  </fieldset>

  <div class="mark-bg space">
    <fieldset class="row buttons">
      <p>
        <button class="submit trolls-settings-submit">
          <i class="fa fa-spinner fa-spin" style="display: none;"></i> Zapisz
          ustawienia
        </button>
      </p>
    </fieldset>
  </div>
`;

export const settingsNav = `<li class="whSettingsLink"><a href="https://www.wykop.pl/ustawienia/wykophelper/"><span><strong>WykopHelper</strong> &#10024;</span></a></li>`;