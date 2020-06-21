import { settingsMarkup, settingsNav } from '../markup/settings';

export const handleSettings = () => {
  document.querySelector('#site .nav > ul > li:last-child').insertAdjacentHTML('beforeend', settingsNav);
};

export const handleWhSettings = () => {
  document.querySelector('#site .nav > ul .active').classList.remove('active');
  document.querySelector('.whSettingsLink').classList.add('active');
  
  const settingsFormElement = document.querySelector('#site .grid-main .settings');

  settingsFormElement.innerHTML = '';
  settingsFormElement.innerHTML = settingsMarkup;
  settingsFormElement.removeAttribute('method');
  settingsFormElement.removeAttribute('action');
};

