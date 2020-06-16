import { styles } from '../../markup/styles.js';
import { buttonMarkup, badge } from '../../markup/minor.js';
import { modalMarkup } from '../../markup/modal.js';
import { addModal } from '../../utils/addModal.js';

export const mainFunctionality = () => {
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
  }

  const addNickToArrays = (nick, link) => {
    if (!isTroll(nick)) {
      addNickToUniqueNicksArray(nick);
      addNickToTrollsArray(nick, link);
    }
  }

  // function returns a nodeList with all <div> elements containing line with nick, time since comment made, [+][-]
  const getAllNickElements = () => document.querySelectorAll("li div.author");

  
  //used on element - preferably one returned from getAllNickElements() - returns string with nick name.
  const getNick = el => el.querySelector(".showProfileSummary > b").innerText;
  
  const getNickElement = event => event.target.closest(".author");

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
  }

  //inject styles. Parameter must be a string of CSS without any html tags
  const injectStyles = styles => {
    const styleMarkup = `<style> ${styles} </style>`;
    document.body.insertAdjacentHTML('afterbegin', styleMarkup);
  }

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
  }

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
  }

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
  }

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
    }, 700)
    addNickToArrays(nick, link);

    updateView();
  }

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
        text: 'Wygląda na to, że jesteś w trakcie pisania komentarza. Kliknij "Anuluj", żeby dokończyć pisanie i ręcznie odświeżyć stronę później (to konieczne by zniknęła odznaka przy nicku użytkownika). Jeśli to pomyłka, i nie masz nic przeciw odświeżeniu strony, naciśnij "OK".',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Odśwież',
        cancelButtonText: 'Anuluj',
      }).then(result => {
        if (result.value) {
          reloadPage();
        }
      })
    }
  }

  // gets user data from objects inside trolls array. For now the only useful data returned is link to the offending post
  const getNickData = nick => {
    prepareLocalStorage();
    // for (let item of trolls) {
    //   if (item.nick === nick) {
    //     return { link: item.link, nick: item.nick };
    //   } else if (item == undefined || item == null || !item) {
    //     continue;
    //   }
    // }
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
  }

  const initializeModal = () => {
    if (document.querySelector('.badge')) {
      document.querySelectorAll('.badge').forEach(el => {
        const nick = el.dataset.whusername;
        setTimeout(showUserModal(`[data-whusername='${nick}']`), 1150);
      });
    }
  }

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
        }, 500)  
      }
      // if (target.classList.contains('badge')) {
      //   const nick = target.dataset.whusername;
      //   showUserModal(`[data-whusername='${nick}']`);
      // }
      if (target.classList.contains('modalWH-button--remove')) {
        //eslint-disable-next-line
        console.log(target);
        const nick = target.dataset.whuserremove;
        removeTroll(nick);
      }
    });
  // window.addEventListener('load', () => {
  //   if (document.querySelector('.badge')) {
  //     document.querySelectorAll('.badge').forEach(el => {
  //       const nick = el.dataset.whusername;
  //       showUserModal(`[data-whusername='${nick}']`);
  //     });
  //   }
  // })
  document
    .getElementById('itemsStream')
    .addEventListener('mouseover', event => {
      // handle modals on hover - shouldn't it happen on its own?
    });
}