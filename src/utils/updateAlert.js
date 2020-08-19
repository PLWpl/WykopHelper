import { runOnceOnUpdate } from './runOnceOnUpdate.js';
import { welcomeText, updateText, version } from '../model/utils/update';

/**
 * Fires modal on update, if a different (lower) version is indicated in local storage. Alternatively, if no version is specified, a modal with "thanks for installation" is fired
 */
export const updateAlert = () => {
  if (localStorage.getItem('WHupdate') && localStorage.getItem('WHupdate') < version) {
    Swal.fire({
      title: updateText.title,
      html: updateText.content,
      icon: 'info',
      width: '80%',
      confirmButtonText: updateText.button
    });
    localStorage.setItem('WHupdate',version);
    runOnceOnUpdate();
  }
  else if (!localStorage.getItem('WHupdate')) {
    Swal.fire({
      title: welcomeText.title,
      html: welcomeText.content,
      icon: 'success',
      width: '80%',
      confirmButtonText: welcomeText.button
    });
    localStorage.setItem('WHupdate',version);
  }
}