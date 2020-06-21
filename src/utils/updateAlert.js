/* eslint-disable no-undef, max-len */
export const updateAlert = () => {
  const version = 0.21;

  if (localStorage.getItem('WHupdate') && localStorage.getItem('WHupdate') < version) {
    Swal.fire({
      title: 'WykopHelper zaktualizowany!',
      html: 'Dodatek WykopHelper zosta&#x0142; w&#x0142;a&#x015b;nie zaktualizowany. Wprowadzone zmiany to: <br><ul style="margin-top:1rem; list-style-type:square"><li style="text-align:left;margin-left:2rem">po najechaniu na odznakę usera pojawi się modal z linkiem do posta, przy którym został oznaczony</li><li style="text-align:left;margin-left:2rem">W modalu - button do usuwania oznaczenia</li><li style="text-align:left;margin-left:2rem">Nowy spos&oacute;b komunikowania o aktualizacjach</li><li style="text-align:left;margin-left:2rem">mniejsze i wi&#x0119;ksze poprawki poprawiaj&#x0105;ce stabilno&#x015b;&#x0107; i niezawodno&#x015b;&#x0107;</li></ul>',
      icon: 'info',
      confirmButtonText: 'Okej!'
    });
    localStorage.setItem('WHupdate',version);
  }
  else if (!localStorage.getItem('WHupdate')) {
    Swal.fire({
      title: 'WykopHelper zainstalowany!',
      html: 'Mi&#x0142;ego u&#x017c;ytkowania dodatku! Je&#x015b;li masz jakiekolwiek problemy, pytania lub sugestie, zg&#x0142;o&#x015b; je <a href="https://github.com/PLWpl/wykopoweTrole/issues" target="_blank">tutaj.</a>',
      icon: 'success',
      confirmButtonText: 'Super!'
    });
    localStorage.setItem('WHupdate',version);
  }
}