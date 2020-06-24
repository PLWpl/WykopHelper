import DOM_SELECTORS from '../constants/domSelectors';
import STORAGE_KEY_NAMES from '../constants/localStorageKeyNames';
import { settingsMarkup, settingsNav, settingsUserTable } from '../markup/settings';
import { stylesSettings } from '../markup/styles.js';
import { injectStyles } from '../utils/inject.js';

const { SETTINGS: DOM } = DOM_SELECTORS;

export const handleSettings = () => {
  document.querySelector(DOM.LAST_NAV_ELEMENT).insertAdjacentHTML('beforeend', settingsNav);
};

export const handleWhSettings = () => {
  let settings, trolls, uniqueNicksSet;
  const initialSettings = {
    BADGE: {
      HIDE_MARKED_USERS: false,
      DEFAULT_NAME: 'Debil',
      DEFAULT_COLOR: 'red'
    },
    GENERAL: {
      WARN_ON_RELOAD: false,
    }
  };
  const settingsFormElement = document.querySelector(DOM.SETTINGS_FORM_ELEMENT);

  const prepareLocalStorage = (...types) => {
    if ([...types].length < 1 || [...types].includes('settings')) {
      if (localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS)) {
        settings = JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS));
      } else {
        settings = initialSettings;
      }
    } else if ([...types].includes('markedUsers')) {
      if (localStorage.getItem(STORAGE_KEY_NAMES.MARKED_USERS)) {
        trolls = JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.MARKED_USERS));
      } else {
        trolls = [];
      }
  
      if (localStorage.getItem(STORAGE_KEY_NAMES.UNIQUE_USERS)) {
        uniqueNicksSet = JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.UNIQUE_USERS));
      } else {
        uniqueNicksSet = [];
      }
    }
  };

  const generateUserTables = () => {
    prepareLocalStorage('markedUsers');

    const rowItemMarkup = (index, nick, type, link) => `
    <tr>
      <td>${index}</td>
      <td><a href="https://www.wykop.pl/ludzie/${nick}" target="_blank">${nick}</a></td>
      <td>${type}</td>
      <td><a href="${link}" target="_blank">&#128279</a></td>
    </tr>
    `;

    const tableBody = document.querySelector(`.${DOM.WH_USER_TABLE_BODY}`);

    for (let i = 0; i < trolls.length; i++) {
      const el = trolls[i];
      tableBody.insertAdjacentHTML('beforeend', rowItemMarkup(i+1, el.nick, el.type || 'Debil', el.link ));
    }
  }

  const toggleUserTableVisibility = () => {
    document.querySelector(`.${DOM.WH_USER_TABLE_CONTAINER}`).classList.toggle(`.${DOM.WH_USER_TABLE_CONTAINER}--hidden`);
  }

  const renderSettings = () => {
    document.querySelector(DOM.ACTIVE_NAV_ELEMENT).classList.remove('active');
    document.querySelector(`.${DOM.WH_NAV_SETTINGS_LINK}`).classList.add('active');
  
    settingsFormElement.innerHTML = '';
    settingsFormElement.innerHTML = settingsMarkup;
    settingsFormElement.removeAttribute('method');
    settingsFormElement.removeAttribute('action');

    settingsFormElement.insertAdjacentHTML('afterend', settingsUserTable);
    generateUserTables();
  };

  //temporary, until proper event handler & propagation is implemented
  const handleForm = event => {
    if ((event.target.nodeName === 'input' || event.target.nodeName === 'label') && (event.target.id !== 'showMarkedUserTable' || event.target.getAttribute('for') !== 'showMarkedUserTable')) {
      settings[event.target.id || event.target.getAttribute('for')] = !settings[event.target.id || event.target.getAttribute('for')];
      console.log(settings)
    }
    if (event.target.id !== 'showMarkedUserTable' || event.target.getAttribute('for') !== 'showMarkedUserTable') {
      toggleUserTableVisibility();
    }
  }

  const listenForSettingsChange = () => {
    settingsFormElement.addEventListener('change', handleForm(event));
  }

  const init = () => {
    injectStyles(stylesSettings);
    renderSettings();
    prepareLocalStorage();
    listenForSettingsChange();
  }

  init();
}; 
