import DOM_SELECTORS from '../constants/domSelectors';
import STORAGE_KEY_NAMES from '../constants/localStorageKeyNames';
import { settingsMarkup, settingsNav, settingsUserTable } from '../markup/settings';
import { stylesSettings } from '../markup/styles.js';
import { injectStyles } from '../utils/inject.js';
import { initSettings } from '../init/storage.js';

const { SETTINGS: DOM } = DOM_SELECTORS;

export const handleSettings = () => {
  document.querySelector(DOM.LAST_NAV_ELEMENT).insertAdjacentHTML('beforeend', settingsNav);
};

export const handleWhSettings = () => {
  let settings, trolls, uniqueNicksSet;
  const settingsFormElement = document.querySelector(DOM.SETTINGS_FORM_ELEMENT);

  const prepareLocalStorage = (...types) => {
    if ([...types].length < 1 || [...types].includes('settings')) {
      if (localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS)) {
        settings = JSON.parse(localStorage.getItem(STORAGE_KEY_NAMES.WH_SETTINGS));
      } else {
        initSettings();
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

  const wipeAllMarkedUsers = () => {
    uniqueNicksSet = [];
    trolls = [];
    localStorage.setItem(STORAGE_KEY_NAMES.UNIQUE_USERS, JSON.stringify(uniqueNicksSet));
    localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, JSON.stringify(trolls));
  }

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
    document.querySelector(`.${DOM.WH_USER_TABLE_CONTAINER}`)
      .classList.toggle(`${DOM.WH_USER_TABLE_CONTAINER}--hidden`);

    if (document.querySelector(`.${DOM.WH_USER_TABLE_CONTAINER}--hidden`)) {
      document.getElementById('showAllMarked').textContent = 'Pokaż wszystkich oznaczonych użytkowników';
    } else {
      document.getElementById('showAllMarked').textContent = 'Schowaj tabelę';
    }
  }

  const renderSettings = () => {
    prepareLocalStorage();

    document.querySelector(DOM.ACTIVE_NAV_ELEMENT).classList.remove('active');
    document.querySelector(`.${DOM.WH_NAV_SETTINGS_LINK}`).classList.add('active');
  
    settingsFormElement.innerHTML = '';
    settingsFormElement.innerHTML = settingsMarkup;
    settingsFormElement.removeAttribute('method');
    settingsFormElement.removeAttribute('action');

    settingsFormElement.insertAdjacentHTML('afterend', settingsUserTable);
    generateUserTables();

    // TODO: this needs refactoring, to make it work on its own without explicitly listing all settings
    document.getElementById('badgeDefaultValue').value = settings.BADGE.DEFAULT_NAME;
    document.getElementById('warnOnRussian').checked = settings.GENERAL.WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA;
  };

  const handleSettingsForm = () => {
    settingsFormElement.addEventListener('change', event => {
      const category = event.target.getAttribute('category');
      const name = event.target.name;

      if (event.target.type === 'checkbox' && event.target.id !== 'allowWipeAllMarked') {
        settings[category][name] = !settings[category][name];
        localStorage.setItem(STORAGE_KEY_NAMES.WH_SETTINGS, JSON.stringify(settings));
      }
    });

    settingsFormElement.addEventListener('click', event => {
      if (event.target.id === 'showAllMarked') {
        event.preventDefault();
        toggleUserTableVisibility();
      }
      if (event.target.id === 'allowWipeAllMarked') {
        event.target.disabled = true;
        document.getElementById('whsettings__remove-all-marked').disabled = false;
        document.getElementById('whsettings__remove-all-marked').style.opacity = 1;
      }
      if (event.target.id === 'whsettings__remove-all-marked') {
        event.preventDefault();
        wipeAllMarkedUsers();
      }
    })

    settingsFormElement.addEventListener('keyup', event => {
      const category = event.target.getAttribute('category');
      const name = event.target.name;

      if (event.target.type === 'text') {
        settings[category][name] = event.target.value.toLowerCase();
        localStorage.setItem(STORAGE_KEY_NAMES.WH_SETTINGS, JSON.stringify(settings));
      }
    })
  }

  const init = () => {
    injectStyles(stylesSettings);
    renderSettings();
    prepareLocalStorage();
    handleSettingsForm();
  }

  init();
}; 
