import DOM_SELECTORS from '../constants/domSelectors';
import STORAGE_KEY_NAMES from '../constants/localStorageKeyNames';
import { getLocalStorage } from '../utils/handleLocalStorage';
import settingsModel from '../model/modules/settings.model';
import styles from '../model/styles';
import { injectStyles } from '../utils/inject';
import { russianPropagandaModal } from '../model/utils/modals';

const { SETTINGS: DOM } = DOM_SELECTORS;

/**
 * Inserts navigation item on a /ustawienia/ page with link to WykopHelper settings
 */
export const createSettingsPage = () => {
  document.querySelector(DOM.LAST_NAV_ELEMENT).insertAdjacentHTML('beforeend', settingsModel.settingsNav);
};

export const handleSettings = () => {
  const settings = getLocalStorage('settings');
  const markedUsers = getLocalStorage();
  const uniqueNicksSet = getLocalStorage('unique');

  const settingsFormElement = document.querySelector(DOM.SELECTOR.SETTINGS_FORM_ELEMENT);

  /**
   * clears localstorage. Doesn't remove items, but sets them to empty array
   */
  const wipeAllMarkedUsers = () => {
    localStorage.setItem(STORAGE_KEY_NAMES.UNIQUE_USERS, '[]');
    localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, '[]');
    location.reload();
  }

  const generateUserTables = () => {
    const tableBody = document.querySelector(`.${DOM.CLASSNAME.WH_USER_TABLE_BODY}`);

    markedUsers.forEach(el => {
      tableBody.insertAdjacentHTML('beforeend', settingsModel.settingsUserTableRow(el.nick, el.label || settings.BADGE.DEFAULT_NAME, el.link ));
    });
  }

  const toggleUserTableVisibility = () => {
    document.querySelector(`.${DOM.CLASSNAME.WH_USER_TABLE_CONTAINER}`)
      .classList.toggle(`${DOM.CLASSNAME.WH_USER_TABLE_CONTAINER}--hidden`);

    if (document.querySelector(`.${DOM.CLASSNAME.WH_USER_TABLE_CONTAINER}--hidden`)) {
      document.getElementById(DOM.ID.SHOW_MARKED_TABLE).textContent = settingsModel.textContent.SHOW_ALL_MARKED;
    } else {
      document.getElementById(DOM.ID.SHOW_MARKED_TABLE).textContent = settingsModel.textContent.HIDE_TABLE;
    }
  }

  const showModalWithPropagandaExplanation = () => {
    // eslint-disable-next-line
    Swal.fire({
      title: settingsModel.textContent.RUSSIAN_PROPAGANDA_MODAL_TITLE,
      html: russianPropagandaModal,
      icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
      width: "80%"
    });
  };

  const renderSettings = () => {
    document.querySelector(DOM.SELECTOR.ACTIVE_NAV_ELEMENT).classList.remove('active');
    document.querySelector(`.${DOM.CLASSNAME.WH_NAV_SETTINGS_LINK}`).classList.add('active');
  
    settingsFormElement.innerHTML = '';
    settingsFormElement.innerHTML = settingsModel.settingsMarkup;
    settingsFormElement.removeAttribute('method');
    settingsFormElement.removeAttribute('action');

    settingsFormElement.insertAdjacentHTML('afterend', settingsModel.settingsUserTable);
    generateUserTables();

    // TODO: this needs refactoring, to make it work on its own without explicitly listing all settings
    document.getElementById('badgeDefaultValue').value = settings.BADGE.DEFAULT_NAME;
    document.getElementById('warnOnRussian').checked = settings.GENERAL.WARN_ON_SUSPECTED_RUSSIAN_PROPAGANDA;
    document.getElementById('warnOnReload').checked = settings.GENERAL.WARN_ON_RELOAD;
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
      if (event.target.id === 'russianPropagandaInfo') {
        showModalWithPropagandaExplanation();
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

  /**
   * Handling removing mark from users
   */
  const removeTroll = nick => {
    for (let [index, item] of markedUsers.entries()) {
      if (item.nick === nick) {
        delete markedUsers[index];
        markedUsers = markedUsers.filter(el => el != null);
        localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, JSON.stringify(markedUsers));
      }
    }
    uniqueNicksSet = uniqueNicksSet.filter(el => el !== nick);
    localStorage.setItem(STORAGE_KEY_NAMES.UNIQUE_USERS, JSON.stringify(uniqueNicksSet));
  }

  const init = () => {
    injectStyles(styles.settings);
    renderSettings();
    handleSettingsForm();

    document.querySelector(`.${DOM_SELECTORS.SETTINGS.WH_USER_TABLE}`).addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains(`${DOM_SELECTORS.SETTINGS.WH_USER_TABLE_REMOVE_BUTTON}`)) {
        const nick = target.dataset.whuserremove;
        removeTroll(nick);
        target.closest('tr').remove();
      }
    })
  }

  init();
}; 
