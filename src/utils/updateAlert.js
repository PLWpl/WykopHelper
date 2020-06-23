/* eslint-disable no-undef, max-len */
export const updateAlert = () => {
  const version = 0.22;

  if (localStorage.getItem('WHupdate') && localStorage.getItem('WHupdate') < version) {
    Swal.fire({
      title: 'WykopHelper zaktualizowany!',
      html: 'Dodatek WykopHelper zosta&#x0142; w&#x0142;a&#x015b;nie zaktualizowany. Wprowadzone zmiany to: <br><ul style="margin-top:1rem; list-style-type:square"><li style="text-align:left;margin-left:2rem">w ustawieniach (wykopu) pojawi&#x142;a si&#x119; zak&#x142;adka &#x22;WykopHelper&#x22; - tam docelowo znajd&#x105; si&#x119; wszystkie opcje konfiguracyjne dodatku. Aktualnie funkcjonuje jedynie podgl&#x105;d listy wszystkich oznaczonych u&#x17C;ytkownik&#xF3;w.</li></ul>',
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