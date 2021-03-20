import { runOnceOnUpdate } from './runOnceOnUpdate.js';
import { welcomeText, updateText, version } from '../model/utils/update';
import { injectStyles } from '../utils/inject';
import  styles from '../model/styles';

/**
 * Fires modal on update, if a different (lower) version is indicated in local storage. Alternatively, if no version is specified, a modal with "thanks for installation" is fired
 */
export const updateAlert = () => {
  injectStyles(styles.modal, 'whInitModalStyle');
  if (localStorage.getItem('WHupdate') && localStorage.getItem('WHupdate') < version) {
    Swal.fire({
      title: updateText.title,
      html: updateText.content,
      showCloseButton: true,
      icon: 'info',
      iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><defs><path d="M0 0h48v48H0V0z" id="a"/></defs><clipPath id="b"><use overflow="visible" xlink:href="#a"/></clipPath><path clip-path="url(#b)" d="M40 8H8c-2.21 0-3.98 1.79-3.98 4L4 36c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM17 30h-2.4l-5.1-7v7H7V18h2.5l5 7v-7H17v12zm10-9.49h-5v2.24h5v2.51h-5v2.23h5V30h-8V18h8v2.51zM41 28c0 1.1-.9 2-2 2h-8c-1.1 0-2-.9-2-2V18h2.5v9.01h2.25v-7.02h2.5v7.02h2.25V18H41v10z"/></svg>',
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
      icon: 'warning',
      iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M0 0h48v48H0z" fill="none"/><path d="M2 42h8V18H2v24zm44-22c0-2.21-1.79-4-4-4H29.37l1.91-9.14c.04-.2.07-.41.07-.63 0-.83-.34-1.58-.88-2.12L28.34 2 15.17 15.17C14.45 15.9 14 16.9 14 18v20c0 2.21 1.79 4 4 4h18c1.66 0 3.08-1.01 3.68-2.44l6.03-14.1A4 4 0 0046 24v-3.83l-.02-.02L46 20z"/></svg>',
      width: '80%',
      confirmButtonText: welcomeText.button
    });
    localStorage.setItem('WHupdate',version);
  }
}