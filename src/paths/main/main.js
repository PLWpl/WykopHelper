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
  const markUsers = (type = 'Troll') => {
    try {
      const elements = getAllNickElements();
      elements.forEach(element =>{
        const nick = getNick(element);

        if (isTroll(nick) && isNotAwarded(element)) {
          element.insertAdjacentHTML('afterbegin', badge(type));
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
          element.insertAdjacentHTML('afterbegin', badge());
        }
        if (isTroll(nick) && isNotAwarded(element) && element.querySelector('buttonWH') && !element.querySelector('buttonWH--clicked')) {
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

  // const removeTroll = event => {
  //   prepareLocalStorage();
  //   //just a mockup from quokka, needs to be adjusted for the actual use
  //   for (let [index, item] of trolls.entries()) {
  //     if (item.nick === 'zofia') {
  //       delete trolls[index];
  //     }
  //   }
  // }

  // gets user data from objects inside trolls array. For now the only useful data returned is link to the offending post
  const getNickData = nick => {
    prepareLocalStorage();
    for (let item of trolls) {
      if (item.nick === nick) {
        return { link: item.link, nick: item.nick };
      }
    }
  }

  // shows modal with troll info/options
  // eslint-disable-next-line 
  const showUserModal = element => {
    const nick = getNick(element);
    const userData = getNickData(nick);
    addModal(element, modalMarkup(userData.link, userData.nick));
  }

  /**
   * Above is setup. Actual job gets done below
   */

  injectStyles(styles);
  prepareLocalStorage();
  markUsers();

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
      if (target.classList.contains('badge')) {
        let nickElement = getNickElement(event);
        showUserModal(nickElement);
      }
    });
}