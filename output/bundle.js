'use strict';

const path = location.href;

const isPath = {
  main: () => {
    if (
      path.indexOf("wykop.pl/link/") > -1 ||
      path.indexOf("wykop.pl/mikroblog/") > -1 ||
      path.indexOf("wykop.pl/wpis/") > -1 ||
      path.indexOf("wykop.pl/moj/") > -1 ||
      path.indexOf("wykop.pl/tag/wpisy") > -1
    ) {
      return true;
    }
    return false;
  },

  settings: () => !!(path.indexOf("wykop.pl/ustawienia/") > -1),
  
  whSettings: () => !!(path.indexOf("wykop.pl/ustawienia/wykophelper") > -1),
};

const STORAGE_KEY_NAMES = {
  MARKED_USERS: 'trolls',
  UNIQUE_USERS: 'uniqueNicks',
  WH_SETTINGS: 'whsettings',
};

const DOM_SELECTORS = {
  BADGE: {
    NICK_ELEMENTS: 'li div.author',
    NICK_ELEMENT: 'author',
    NICK: '.showProfileSummary > b',
    BADGE: 'badge',
    MARK_BUTTON: 'buttonWH',
    MARK_BUTTON_CLICKED: 'buttonWH--clicked',
    REPLY_FORM: '.replyForm textarea',
    COMMENT_FORM: '#commentFormContainer textarea',
    DATASET: {
      USERNAME: nick => `[data-whusername='${nick}`,
    },
    MODAL_BUTTON_REMOVE: 'modalWH-button--remove',
  },
  SETTINGS: {
    LAST_NAV_ELEMENT: '#site .nav > ul > li:last-child',
    ACTIVE_NAV_ELEMENT: '#site .nav > ul .active',
    SETTINGS_FORM_ELEMENT: '#site .grid-main .settings',
    WH_NAV_SETTINGS_LINK: 'whSettingsLink',
    WH_USER_TABLE: 'tableWH',
    WH_USER_TABLE_CONTAINER: 'tableWH__container',
    WH_USER_TABLE_BODY: 'tableWH__body'
  }
};

const stylesBadge = `
.buttonWH {
  display: inline-block;
  padding: .2rem .2rem;
  border: 1px solid #9999996e;
  cursor: pointer;
  margin-left: .5rem;
  color: #808080ba;
  border-radius: .3rem;
  font-size: .7rem;
  line-height: .7rem;
  transition: .3s all;
}
.buttonWH:hover {
  border-color: green;
}
.buttonWH--clicked {
  border-color: green;
  opacity: 0;
}
.badge {
  color: red;
  font-weight: bold;
  margin-right: .3rem;
  border: 1px solid currentColor;
  padding: .1rem .2rem;
}
.modalWH-button {
  display: block;
  padding: .4rem .8rem;
  border: 1px solid #9999996e;
  cursor: pointer;
  color: #808080ba;
  border-radius: .3rem;
  font-size: 1rem;
  line-height: 1rem;
  transition: .3s all;
}
.author .modalWH-text {
  position: relative;
  margin-bottom: .5rem;
  top: unset;
  right: unset;
  left: unset;
  bottom: unset;
}
.tippy-box {
  width: 20rem;
}
.tippy-content {
  display: flex;
  flex-direction: column;
}
`;

const stylesSettings = `
.tableWH__container {
  padding: 1rem;
}
.tableWH__container--hidden {
  display: none;
}
.tableWH__head {
  font-weight: bold;
  border-bottom: 2px solid currentColor;
}
.settings__crossed {
  opacity: .4;
  text-decoration: line-through;
  cursor: not-allowed;
}`;

const buttonMarkup = `<span class="buttonWH">Oznacz</span>`;

//returns SPAN element with badge element. If no parameter is provided, it will return default "Troll" badge.
// eslint-disable-next-line max-len 
const badge = (nick, name = 'debil') => `<span class="badge badge--${name.toLowerCase()}" data-whusername="${nick}">${name.toLowerCase().capitalize()}</span>`;

const modalMarkup = (link, nick) => `
  <p class="modalWH-text">Pow&oacute;d oznaczenia: 
    <a href="${link}" target="_blank">link</a>
  </p>
  <span class="modalWH-button modalWH-button--remove" data-whuserremove="${nick}">Usu&#x0144; oznaczenie</span>
`;

const addModal = (element, content) => {
  //eslint-disable-next-line no-undef
  tippy(element, {
    content: content,
    allowHTML: true,
    interactive: true,
    placement: 'bottom-start',
    followCursor: 'initial',
  });
};

//inject styles. Parameter must be a string of CSS without any html tags
const injectStyles = styles => {
  const styleMarkup = `<style> ${styles} </style>`;
  document.body.insertAdjacentHTML('afterbegin', styleMarkup);
};

const { BADGE: DOM } = DOM_SELECTORS;

const handleBadges = () => {
  /**
   * uniqueNicksSet - an array keeping nicks of all users added to the troll list. It exists so that before adding any user on a list we can easily check if they haven't already been added, using simple includes() method.
   * trolls - an object with user nicks and links to an offending posts.
   */
  let uniqueNicksSet = [];
  let trolls;

  /**
   * Functions. No explanation when easy-to-read, self-explanatory one-liner
   */
    
  //checks if user of provided nick is already in uniqueNicksSet array
  const isTroll = nick => !!(uniqueNicksSet.includes(nick));

  // checks if provided nick has already been entered into the list. If it hasn't, it pushes it to the uniqueNicksSet array.
  const addNickToUniqueNicksArray = nick => {
    uniqueNicksSet.push(nick);
    localStorage.setItem(STORAGE_KEY_NAMES.UNIQUE_USERS, JSON.stringify(uniqueNicksSet));
  };

  // adds nick to trolls array of objects along with the link
  const addNickToTrollsArray = (nick, link) => {
    trolls.push({ nick: nick, link: link });
    localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, JSON.stringify(trolls));
  };

  const addNickToArrays = (nick, link) => {
    if (!isTroll(nick)) {
      addNickToUniqueNicksArray(nick);
      addNickToTrollsArray(nick, link);
    }
  };

  // function returns a nodeList with all <div> elements containing line with nick, time since comment made, [+][-]
  const getAllNickElements = () => document.querySelectorAll(`.${DOM.NICK_ELEMENTS}`);

  
  //used on element - preferably one returned from getAllNickElements() - returns string with nick name.
  const getNick = el => el.querySelector(`.${DOM.NICK}`).innerText;

  const reloadPage = () => location.reload();

  // used on author element, returned from getAllNickElements(), checks if person has already been marked with a badge
  const isNotAwarded = element => !(element.querySelector(`.${DOM.BADGE}`));

  // used on author element, returned from getAllNickElements(), checks if person has already been given a button
  const hasButtonAppended = element => !!(element.querySelector(`.${DOM.MARK_BUTTON}`));

  // checks if any textarea on a page is empty, to prevent reloading of a page while user might be attempting to write some comment or similar

  const isTextareaEmpty = () => {
    const replyForm = document.querySelector(`.${DOM.REPLY_FORM}`);
    const commentForm = document.querySelector(`.${DOM.COMMENT_FORM}`);

    if ((replyForm && replyForm.value !== "") || (commentForm && commentForm.value !== "")) {
      return false;
    } else {
      return true;
    }
  };

  // prepares localStorage. Checks if trolls and uniqueNicksSet are already present and saved to localStorage. If so, it parses it to arrays. If not, it initializes empty ones.
  const prepareLocalStorage = () => {
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
  };

  // goes through all user elements on a page and checks, if user nicks are present in uniqueNicksSet array. If they are, AND they haven't yet been awarded a badge, it injects the badge.
  // takes optional parameter of type, possibly for future expansions of this script.
  const markUsers = (type = 'Debil') => {
    try {
      const elements = getAllNickElements();
      elements.forEach(element =>{
        const nick = getNick(element);

        if (isTroll(nick) && isNotAwarded(element)) {
          element.insertAdjacentHTML('afterbegin', badge(nick, type));
        }
        else if (!hasButtonAppended(element)) {
          element.insertAdjacentHTML("beforeend", buttonMarkup);
        }
      });
    }
    catch (e) {
      //supress the error
    }
  };

  // checks if user is writing any new comment. If not, reloads the page. If yes, prompts the user for decision.
  const updateView = () => {
    try {
      const elements = getAllNickElements();
      elements.forEach(element =>{
        const nick = getNick(element);

        if (isTroll(nick) && isNotAwarded(element)) {
          element.insertAdjacentHTML('afterbegin', badge(nick));
        }
        if (isTroll(nick) 
          && isNotAwarded(element) 
          && element.querySelector(`.${DOM.MARK_BUTTON}`) 
          && !element.querySelector(`.${DOM.MARK_BUTTON_CLICKED}`)) {
          element.querySelector(`.${DOM.MARK_BUTTON}`).remove();
        }
      });
    }
    catch (e) {
      //supress the error
    }
  };

  // fired on clicking a button "Add troll". 
  // First, get nick of the author. Then, get link of the offending comment. 
  const addNewTroll = event => {
    prepareLocalStorage();
    const nick = getNick(event.target.closest(`.${DOM.NICK_ELEMENT}`));
    const link = event.target.closest(`.${DOM.NICK_ELEMENT}`).querySelector("a + a").href;

    event.target.classList.add(DOM.MARK_BUTTON_CLICKED);
    event.target.innerText = "✔";
    setTimeout(() => {
      event.target.remove();
    }, 700);
    addNickToArrays(nick, link);

    updateView();
  };

  const removeTroll = nick => {
    prepareLocalStorage();
    for (let [index, item] of trolls.entries()) {
      if (item.nick === nick) {
        delete trolls[index];
        trolls = trolls.filter(el => el != null);
        localStorage.setItem(STORAGE_KEY_NAMES.MARKED_USERS, JSON.stringify(trolls));
      }
    }
    uniqueNicksSet = uniqueNicksSet.filter(el => el !== nick);
    localStorage.setItem(STORAGE_KEY_NAMES.UNIQUE_USERS, JSON.stringify(uniqueNicksSet));
    
    if (isTextareaEmpty) {
      reloadPage();
    } else {
      // eslint-disable-next-line
      Swal.fire({
        title: 'Hej!',
        // eslint-disable-next-line
        text: 'Wygl&#x0105;da na to, &#x017c;e jeste&#x015b; w trakcie pisania komentarza. Kliknij &quot;Anuluj&quot;, &#x017c;eby doko&#x0144;czy&#x0107; pisanie i r&#x0119;cznie od&#x015b;wie&#x017c;y&#x0107; stron&#x0119; p&oacute;&#x017a;niej (to konieczne by znikn&#x0119;&#x0142;a odznaka przy nicku u&#x017c;ytkownika). Je&#x015b;li to pomy&#x0142;ka, i nie masz nic przeciw od&#x015b;wie&#x017c;eniu strony, naci&#x015b;nij &quot;OK&quot;.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Od&#x015b;wie&#x017c;',
        cancelButtonText: 'Anuluj',
      }).then(result => {
        if (result.value) {
          reloadPage();
        }
      });
    }
  };

  // gets user data from objects inside trolls array. For now the only useful data returned is link to the offending post
  const getNickData = nick => {
    prepareLocalStorage();
    for (let i = 0; i < trolls.length; i++) {
      if (trolls[i].nick === nick) {
        return { link: trolls[i].link, nick: trolls[i].nick };
      } else if (trolls[i] === undefined || trolls[i] === null) {
        continue;
      }
    }
  };

  // shows modal with troll info/options
  // eslint-disable-next-line 
  const showUserModal = element => {
    const nick = document.querySelector(element).dataset.whusername;
    const userData = getNickData(nick);
    addModal(element, modalMarkup(userData.link, userData.nick));
  };

  const initializeModal = () => {
    if (document.querySelector(`.${DOM.BADGE}`)) {
      document.querySelectorAll(`.${DOM.BADGE}`).forEach(el => {
        const nick = el.dataset.whusername;
        setTimeout(showUserModal(DOM.DATASET.USERNAME(nick)), 1150);
      });
    }
  };

  /**
   * Above is setup. Actual job gets done below
   */

  injectStyles(stylesBadge);
  prepareLocalStorage();
  markUsers();
  initializeModal();

  // on button click, add new troll
  document
    .getElementById('itemsStream')
    .addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains(DOM.MARK_BUTTON)) {
        addNewTroll(event);
      }
      if (target.classList.contains('affect') && target.closest('.more')) {
        setTimeout(() =>{
          prepareLocalStorage();
          markUsers();
        }, 500);  
      }
      if (target.classList.contains(DOM.MODAL_BUTTON_REMOVE)) {
        //eslint-disable-next-line
        console.log(target);
        const nick = target.dataset.whuserremove;
        removeTroll(nick);
      }
    });
};

const settingsMarkup = `
  <fieldset>
    <h4>WykopHelper - Ustawienia</h4>
    <div class="space">
      <div class="row">
        <input
          class="checkbox"
          type="checkbox"
          name="wh[hide_marked_user]"
          id="hideMarkedUser"
          disabled
        />
        <label class="settings__crossed inline" for="XhideMarkedUser"
          >Ukrywaj tre&#x15B;ci oznakowanych u&#x17C;ytkownik&#xF3;w (tak jak na czarnej li&#x15B;cie)</label
        >
      </div>
      <div class="row">
        <input
          class="checkbox"
          type="checkbox"
          name="wh[warn_on_reload]"
          id="warnOnReload"
          disabled
        />
        <label class="settings__crossed inline" for="XwarnOnReload">Ostrzegaj przy pr&#xF3;bie zamkni&#x119;cia/prze&#x142;adowania strony gdy wykryto pisanie komentarza</label>
      </div>
      <div class="row">
        <input
          class="checkbox"
          type="checkbox"
          name="wh[remove_all_marked]"
          id="removeAllMarked"
          disabled
        />
        <label class="settings__crossed inline" for="XremoveAllMarked">Usu&#x144; wszystkich oznaczonych u&#x17C;ytkownik&#xF3;w [AKCJA NIEODWRACALNA]</label>
      </div>
      <div class="row">
        <input
          class="checkbox"
          type="checkbox"
          name="wh[show_marked_user_table]"
          id="showMarkedUserTable"
        />
        <label class="inline" for="showMarkedUserTable">Poka&#x17C; tabel&#x119; z oznaczonymi u&#x17C;ytkownikami</label>
      </div>
    </div>
  </fieldset>
`;

const settingsUserTable = `
<div class="tableWH__container tableWH__container--hidden">
  <h4 class="tableWH__heading">WykopHelper - Lista oznaczonych u&#x17C;ytkownik&#xF3;w</h4>
  <table class="tableWH">
    <thead class="tableWH__head">
      <tr>
        <td>no.</td>
        <td>Nick</td>
        <td>Typ</td>
        <td>Link</td>
      </tr>
    </thead>
    <tbody class="tableWH__body">
    </tbody>
  </table> 
</div>
`;

const settingsNav = `<li class="whSettingsLink"><a href="https://www.wykop.pl/ustawienia/wykophelper/"><span><strong>WykopHelper</strong> &#10024;</span></a></li>`;

const { SETTINGS: DOM$1 } = DOM_SELECTORS;

const handleSettings = () => {
  document.querySelector(DOM$1.LAST_NAV_ELEMENT).insertAdjacentHTML('beforeend', settingsNav);
};

const handleWhSettings = () => {
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

    const tableBody = document.querySelector(`.${DOM$1.WH_USER_TABLE_BODY}`);

    for (let i = 0; i < trolls.length; i++) {
      const el = trolls[i];
      tableBody.insertAdjacentHTML('beforeend', rowItemMarkup(i+1, el.nick, el.type || 'Debil', el.link ));
    }
  };

  const toggleUserTableVisibility = () => {
    document.querySelector(`.${DOM$1.WH_USER_TABLE_CONTAINER}`).classList.toggle('tableWH__container--hidden');
  };

  const renderSettings = () => {
    document.querySelector(DOM$1.ACTIVE_NAV_ELEMENT).classList.remove('active');
    document.querySelector(`.${DOM$1.WH_NAV_SETTINGS_LINK}`).classList.add('active');
    
    const settingsFormElement = document.querySelector(DOM$1.SETTINGS_FORM_ELEMENT);
  
    settingsFormElement.innerHTML = '';
    settingsFormElement.innerHTML = settingsMarkup;
    settingsFormElement.removeAttribute('method');
    settingsFormElement.removeAttribute('action');

    settingsFormElement.insertAdjacentHTML('afterend', settingsUserTable);
    generateUserTables();
  };

  //temporaru, until proper event handler & propagation is implemented
  const handleForm = () => {
    document.getElementById('showMarkedUserTable').addEventListener('change', toggleUserTableVisibility);
  };

  const init = () => {
    injectStyles(stylesSettings);
    renderSettings();
    prepareLocalStorage();
    handleForm();
  };

  init();
};

/* eslint-disable no-undef, max-len */
const updateAlert = () => {
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
};

/**
   * Helper methods and functions, not directly related to the script's purpose
   */
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

//shows alert if app has been updated
updateAlert();

if (isPath.main()) {
  handleBadges();
}
if (isPath.settings()) {
  handleSettings();
}
if (isPath.whSettings()) {
  handleWhSettings();
}
