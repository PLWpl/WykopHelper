/**
 * To add new setting option:
 *  - add it as a default in /utils/handleLocalStorage
 *  - add HTML for it in /model/modules/settings.model
 *  - add check in appropriate module. If you want it to be ON by default, you will need to make it so using /utils/runOnceOnUpdate
 */

import { $, $$ } from '../utils/dom';
import { DOM } from '../constants/domSelectors';
import STORAGE_KEY_NAMES from '../constants/localStorageKeyNames';
import { getLocalStorage } from '../utils/handleLocalStorage';
import settingsModel from '../model/modules/settings.model';
import styles from '../model/styles';
import { injectStyles } from '../utils/inject';
import { suspectDomainsSettingsModal, warnOnReloadModal } from '../model/utils/modals';

const { SETTINGS: EL } = DOM;

/**
 * Inserts navigation item on a /ustawienia/ page with link to WykopHelper settings
 */
export const createSettingsPage = () => {
  $(EL.SELECTOR.LAST_NAV_ELEMENT).insertAdjacentHTML('beforeend', settingsModel.settingsNav);
};

export const handleSettings = () => {
  let settings = getLocalStorage('settings');
  const markedUsers = getLocalStorage();
  const uniqueNicksSet = getLocalStorage('unique');

  const settingsFormElement = $(EL.SELECTOR.SETTINGS_FORM_ELEMENT);

  /**
   * clears localstorage. Doesn't remove items, but sets them to empty array
   */
  const wipeAllMarkedUsers = () => {
    localStorage.setItem(STORAGE_KEY_NAMES.UNIQUE_USERS, '[]');
    localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, '[]');
    location.reload();
  }

  /**
   * Creates table with marked users.
   */
  const generateUserTables = () => {
    const tableBody = $(`.${EL.CLASSNAME.WH_USER_TABLE_BODY}`);

    markedUsers.forEach(el => {
      tableBody.insertAdjacentHTML(
        'beforeend', 
        settingsModel.settingsUserTableRow(
          el.nick, el.label || settings.BADGE.DEFAULT_NAME, el.link, el.color || settings.BADGE.DEFAULT_COLOR
        )
      );
    });
  }

  const toggleUserTableVisibility = () => {
    $(`.${EL.CLASSNAME.WH_USER_TABLE_CONTAINER}`)
      .classList.toggle(`${EL.CLASSNAME.WH_USER_TABLE_CONTAINER}--hidden`);

    if ($(`.${EL.CLASSNAME.WH_USER_TABLE_CONTAINER}--hidden`)) {
      document.getElementById(EL.ID.SHOW_MARKED_TABLE).textContent = settingsModel.textContent.SHOW_ALL_MARKED;
    } else {
      document.getElementById(EL.ID.SHOW_MARKED_TABLE).textContent = settingsModel.textContent.HIDE_TABLE;
    }
  }

  const showModalWithPropagandaExplanation = () => {
    // eslint-disable-next-line
    Swal.fire({
      html: suspectDomainsSettingsModal,
      icon: 'info',
      // eslint-disable-next-line
      iconHtml: '<svg style="fill:currentColor;width:2rem;height: auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M14 0h4l1 6 1.707.707L26 3.293 28.707 6l-3.414 5.293L26 13l6 1v4l-6 1-.707 1.707L28.707 26 26 28.707l-5.293-3.414L19 26l-1 6h-4l-1-6-1.707-.707L6 28.707 3.293 26l3.414-5.293L6 19l-6-1v-4l6-1 .707-1.707L3.293 6 6 3.293l5.293 3.414L13 6l1-6zm2 10a6 6 0 000 12 6 6 0 000-12"/></svg>',
      iconColor: '#fff',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#0a8658',
      confirmButtonText: 'Zapisz',
      cancelButtonText: 'Anuluj',
      width: "80%",
      willOpen: modalElement => {
        $('#suspectDomainsLabel', modalElement).value = settings.GENERAL.SUSPECT_DOMAINS_LABEL;
        $('#suspectDomains', modalElement).value = settings.GENERAL.SUSPECT_DOMAINS.join('\n');
      }
    }).then(result => {
      if (result.isConfirmed) {
        let list = $(`#${EL.ID.SUSPECT_DOMAINS_SETTINGS_TEXTAREA}`).value;
        list.replace('https://', '').replace('http://', '').replace('www.', '').replace(' ', '');
        const arrayList = list.split('\n');
        settings.GENERAL.SUSPECT_DOMAINS = arrayList;

        const label = $('#suspectDomainsLabel').value;
        settings.GENERAL.SUSPECT_DOMAINS_LABEL = label;

        localStorage.setItem(STORAGE_KEY_NAMES.WH_SETTINGS, JSON.stringify(settings));
      }
    });
  };
  
  const showModalWithWarnOnReloadExplanation = () => {
    // eslint-disable-next-line
    Swal.fire({
      title: settingsModel.textContent.WARN_ON_RELOAD_MODAL_TITLE,
      html: warnOnReloadModal,
      icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
      width: "80%"
    });
  };

  /**
   * Assigns proper state to inputs in settings, based on saved settings object
   */
  const renderVisibleSettingsValues = () => {
    const inputs = $$('input');

    inputs.forEach(el => {
      const category = el.getAttribute('category');
      if (el.id !== EL.ID.ALLOW_WIPE_MARKED_LIST && el.type === 'checkbox') {
        el.checked = settings[category][el.name];
      } else if (el.type === 'text' && el.name !== 'nsQ') {
        el.value = settings[category][el.name] || '';
      } else if (el.type === 'color') {
        el.value = settings[category][el.name];
      }
    })    
  }

  const renderSettings = () => {
    $(EL.SELECTOR.ACTIVE_NAV_ELEMENT).classList.remove('active');
    $(`.${EL.CLASSNAME.WH_NAV_SETTINGS_LINK}`).classList.add('active');
  
    settingsFormElement.innerHTML = '';
    settingsFormElement.innerHTML = settingsModel.settingsMarkup;
    settingsFormElement.removeAttribute('method');
    settingsFormElement.removeAttribute('action');

    settingsFormElement.insertAdjacentHTML('afterend', settingsModel.settingsUserTable);

    generateUserTables();
    renderVisibleSettingsValues();
  };

  /**
   * Basically, sets up several event listeners and handles saving input to storage. onChange for checkboxes, onClick for buttons and onKeyUp for text inputs. For standard inputs, mentioned earlier, does not require any extra changes when adding new features.
   */
  const handleSettingsForm = () => {
    settingsFormElement.addEventListener('change', event => {
      const category = event.target.getAttribute('category');
      const name = event.target.name;

      if (event.target.type === 'checkbox' && event.target.id !==  EL.ID.ALLOW_WIPE_MARKED_LIST) {
        settings[category][name] = !settings[category][name];
        localStorage.setItem(STORAGE_KEY_NAMES.WH_SETTINGS, JSON.stringify(settings));
      }
      if (event.target.type === 'color') {
        settings[category][name] = event.target.value;
        localStorage.setItem(STORAGE_KEY_NAMES.WH_SETTINGS, JSON.stringify(settings));
      }
    }, {passive: true});

    settingsFormElement.addEventListener('click', event => {
      if (event.target.id === EL.ID.SHOW_MARKED_TABLE) {
        event.preventDefault();
        toggleUserTableVisibility();
      }
      if (event.target.id ===  EL.ID.ALLOW_WIPE_MARKED_LIST) {
        event.target.disabled = true;
        document.getElementById(EL.ID.REMOVE_ALL_MARKED).disabled = false;
        document.getElementById(EL.ID.REMOVE_ALL_MARKED).style.opacity = 1;
      }
      if (event.target.id === EL.ID.REMOVE_ALL_MARKED) {
        event.preventDefault();
        wipeAllMarkedUsers();
      }
      if (event.target.id === EL.ID.SUSPECT_DOMAINS_SETTINGS_LINK) {
        showModalWithPropagandaExplanation();
      }
      if (event.target.id === EL.ID.WARN_ON_RELOAD_INFO_LINK) {
        showModalWithWarnOnReloadExplanation();
      }
    }, {passive: false})

    settingsFormElement.addEventListener('keyup', event => {
      const category = event.target.getAttribute('category');
      const name = event.target.name;

      if (event.target.type === 'text') {
        settings[category][name] = event.target.value;
        localStorage.setItem(STORAGE_KEY_NAMES.WH_SETTINGS, JSON.stringify(settings));
      }
    }, {passive: true})
  }

  /**
   * Handling removing mark from users
   */
  const removeTroll = nick => {
    for (let [index, item] of markedUsers.entries()) {
      if (item.nick === nick) {
        delete markedUsers[index];
        const filteredUsers = markedUsers.filter(el => el != null);
        localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, JSON.stringify(filteredUsers));
      }
    }
    const filteredUniqueUsers = uniqueNicksSet.filter(el => el !== nick);
    localStorage.setItem(STORAGE_KEY_NAMES.UNIQUE_USERS, JSON.stringify(filteredUniqueUsers));
  }

  const init = () => {
    injectStyles(styles.settings);
    injectStyles(styles.modal);
    renderSettings();
    handleSettingsForm();

    $(`.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE}`).addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains(`${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_REMOVE_BUTTON}`)) {
        const nick = target.dataset.whuserremove;
        removeTroll(nick);
        target.closest('tr').remove();
      }
    })
  }
  
  init();
}; 
