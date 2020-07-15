import { runOnceOnUpdate } from './runOnceOnUpdate.js';
import { welcomeText, updateText, version } from './../model/update.js';

/* eslint-disable no-undef, max-len */
export const updateAlert = () => {
  if (localStorage.getItem('WHupdate') && localStorage.getItem('WHupdate') < version) {
    Swal.fire({
      title: 'WykopHelper zaktualizowany!',
      html: updateText,
      icon: 'info',
      width: '80%',
      confirmButtonText: 'Okej!'
    });
    localStorage.setItem('WHupdate',version);
    runOnceOnUpdate();
  }
  else if (!localStorage.getItem('WHupdate')) {
    Swal.fire({
      title: 'WykopHelper zainstalowany!',
      html: welcomeText,
      icon: 'success',
      width: '80%',
      confirmButtonText: 'Super!'
    });
    localStorage.setItem('WHupdate',version);
  }
}