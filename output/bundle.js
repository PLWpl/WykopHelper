'use strict';

const styles = `
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

const handleBadges = () => {
  const parseToObject = string => JSON.parse(string);
  const stringifyObject = object => JSON.stringify(object);

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
    localStorage.setItem("uniqueNicks", stringifyObject(uniqueNicksSet));
  };

  // adds nick to trolls array of objects along with the link
  const addNickToTrollsArray = (nick, link) => {
    trolls.push({ nick: nick, link: link });
    localStorage.setItem("trolls", stringifyObject(trolls));
  };

  const addNickToArrays = (nick, link) => {
    if (!isTroll(nick)) {
      addNickToUniqueNicksArray(nick);
      addNickToTrollsArray(nick, link);
    }
  };

  // function returns a nodeList with all <div> elements containing line with nick, time since comment made, [+][-]
  const getAllNickElements = () => document.querySelectorAll("li div.author");

  
  //used on element - preferably one returned from getAllNickElements() - returns string with nick name.
  const getNick = el => el.querySelector(".showProfileSummary > b").innerText;

  const reloadPage = () => location.reload();

  // used on author element, returned from getAllNickElements(), checks if person has already been marked with a badge
  const isNotAwarded = element => !(element.querySelector('.badge'));

  // used on author element, returned from getAllNickElements(), checks if person has already been given a button
  const hasButtonAppended = element => !!(element.querySelector('.buttonWH'));

  // checks if any textarea on a page is empty, to prevent reloading of a page while user might be attempting to write some comment or similar

  const isTextareaEmpty = () => {
    const replyForm = document.querySelector('.replyForm textarea');
    const commentForm = document.querySelector('#commentFormContainer textarea');

    if ((replyForm && replyForm.value !== "") || (commentForm && commentForm.value !== "")) {
      return false;
    } else {
      return true;
    }
  };

  //inject styles. Parameter must be a string of CSS without any html tags
  const injectStyles = styles => {
    const styleMarkup = `<style> ${styles} </style>`;
    document.body.insertAdjacentHTML('afterbegin', styleMarkup);
  };

  // prepares localStorage. Checks if trolls and uniqueNicksSet are already present and saved to localStorage. If so, it parses it to arrays. If not, it initializes empty ones.
  const prepareLocalStorage = () => {
    if (localStorage.getItem("trolls")) {
      trolls = parseToObject(localStorage.getItem("trolls"));
    } else {
      trolls = [];
    }

    if (localStorage.getItem("uniqueNicks")) {
      uniqueNicksSet = parseToObject(localStorage.getItem("uniqueNicks"));
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
          && element.querySelector('buttonWH') 
          && !element.querySelector('buttonWH--clicked')) {
          element.querySelector('.buttonWH').remove();
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
    const nick = getNick(event.target.closest(".author"));
    const link = event.target.closest(".author").querySelector("a + a").href;

    event.target.classList.add("buttonWH--clicked");
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
        localStorage.setItem("trolls", stringifyObject(trolls));
      }
    }
    uniqueNicksSet = uniqueNicksSet.filter(el => el !== nick);
    localStorage.setItem("uniqueNicks", stringifyObject(uniqueNicksSet));
    
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
    if (document.querySelector('.badge')) {
      document.querySelectorAll('.badge').forEach(el => {
        const nick = el.dataset.whusername;
        setTimeout(showUserModal(`[data-whusername='${nick}']`), 1150);
      });
    }
  };

  /**
   * Above is setup. Actual job gets done below
   */

  injectStyles(styles);
  prepareLocalStorage();
  markUsers();
  initializeModal();

  // on button click, add new troll
  document
    .getElementById('itemsStream')
    .addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains('buttonWH')) {
        addNewTroll(event);
      }
      if (target.classList.contains('affect') && target.closest('.more')) {
        setTimeout(() =>{
          prepareLocalStorage();
          markUsers();
        }, 500);  
      }
      if (target.classList.contains('modalWH-button--remove')) {
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
        />
        <label class="inline" for="static_header"
          >Ukrywaj treści oznakowanych użytkowników (tak jak na czarnej liście)</label
        >
      </div>
      <div class="row">
        <input
          class="checkbox"
          type="checkbox"
          name="wh[warn_on_reload]"
          id="warnOnReload"
        />
        <label class="inline" for="static_header">Ostrzegaj przy próbie zamknięcia/przeładowania strony gdy wykryto pisanie komentarza</label>
      </div>
      <div class="row">
        <input
          class="checkbox"
          type="checkbox"
          name="wh[remove_all_marked]"
          id="removeAllMarked"
        />
        <label class="inline" for="static_header">Usuń wszystkich oznaczonych użytkowników [AKCJA NIEODWRACALNA]</label>
      </div>
    </div>
  </fieldset>

  <div class="mark-bg space">
    <fieldset class="row buttons">
      <p>
        <button class="submit trolls-settings-submit">
          <i class="fa fa-spinner fa-spin" style="display: none;"></i> Zapisz
          ustawienia
        </button>
      </p>
    </fieldset>
  </div>
`;

const settingsNav = `<li class="whSettingsLink"><a href="https://www.wykop.pl/ustawienia/wykophelper/"><span><strong>WykopHelper</strong> &#10024;</span></a></li>`;

const handleSettings = () => {
  document.querySelector('#site .nav > ul > li:last-child').insertAdjacentHTML('beforeend', settingsNav);
};

const handleWhSettings = () => {
  document.querySelector('#site .nav > ul .active').classList.remove('active');
  document.querySelector('.whSettingsLink').classList.add('active');
  
  const settingsFormElement = document.querySelector('#site .grid-main .settings');

  settingsFormElement.innerHTML = '';
  settingsFormElement.innerHTML = settingsMarkup;
  settingsFormElement.removeAttribute('method');
  settingsFormElement.removeAttribute('action');
};

const path = location.href;

const isPath = {};

isPath.main = () => {
  if (
    path.indexOf('wykop.pl/link/') > -1
    || path.indexOf('wykop.pl/mikroblog/') > -1
    || path.indexOf('wykop.pl/wpis/') > -1
    || path.indexOf('wykop.pl/moj/') > -1
    || path.indexOf('wykop.pl/tag/wpisy') > -1
  ) { 
    return true;
  }
  return false;
};

isPath.settings = () => !!(path.indexOf('wykop.pl/ustawienia/') > -1);

isPath.whSettings = () => !!(path.indexOf('wykop.pl/ustawienia/wykophelper') > -1);

/* eslint-disable no-undef, max-len */
const updateAlert = () => {
  const version = 0.21;

  if (localStorage.getItem('WHupdate') && localStorage.getItem('WHupdate') < version) {
    Swal.fire({
      title: 'WykopHelper zaktualizowany!',
      html: 'Dodatek WykopHelper zosta&#x0142; w&#x0142;a&#x015b;nie zaktualizowany. Wprowadzone zmiany to: <br><ul style="margin-top:1rem; list-style-type:square"><li style="text-align:left;margin-left:2rem">po najechaniu na odznakę usera pojawi się modal z linkiem do posta, przy którym został oznaczony</li><li style="text-align:left;margin-left:2rem">W modalu - button do usuwania oznaczenia</li><li style="text-align:left;margin-left:2rem">Nowy spos&oacute;b komunikowania o aktualizacjach</li><li style="text-align:left;margin-left:2rem">mniejsze i wi&#x0119;ksze poprawki poprawiaj&#x0105;ce stabilno&#x015b;&#x0107; i niezawodno&#x015b;&#x0107;</li></ul>',
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
