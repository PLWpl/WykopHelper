/**
 * Add styles
 */
const trollsArrayUnique = JSON.parse(localStorage.getItem("unique"));
const styleMarkup = `
<style>
  .buttonPISList {
    display: inline-block;
    padding: .1rem .5rem;
    border: 1px solid #999;
    cursor: pointer;
    margin-left: 1.5rem;
    color: gray;
    border-radius: .3rem;
    box-shadow: 1px 1px #575757;
  }
  .buttonPISList:hover {
    border-color: green;
  }
  .buttonPISList-clicked {
    border-color: green;
  }
  .pis-badge {
    color: red;
    font-weight: bold;
    margin-right: .5rem;
  }
</style>
`;
const profileNameElements = document.querySelectorAll("li div.author");
const buttonMarkup = `<span class="buttonPISList">Add Troll</span>`;

const markTrolls = () => {
  const badgeOfShame = '<span class="pis-badge">PiSior</span>'

  try {
    profileNameElements.forEach((element) => {
      const nick = element.querySelector(".showProfileSummary > b").innerText;

      if (trollsArrayUnique.includes(nick)) {
        element.insertAdjacentHTML("afterbegin", badgeOfShame);
      }
    });
  } catch {}

};

document.querySelector('body').insertAdjacentHTML('afterbegin', styleMarkup);
markTrolls();

/**
 * Add button next to nick - WORKS
 */


profileNameElements.forEach((element) => {
  if (!element.querySelector('.pis-badge')) {
    element.insertAdjacentHTML("beforeend", buttonMarkup)
  }
});

document.getElementById("itemsStream").addEventListener("click", (event) => {
  let uniqueSet;
  let trolls;

  if (localStorage.getItem("trolls")) {
    trolls = JSON.parse(localStorage.getItem("trolls"));
  } else {
    trolls = [];
  }

  if (localStorage.getItem("unique")) {
    uniqueSet = JSON.parse(localStorage.getItem("unique"));
  } else {
    uniqueSet = [];
  }

  const checkUniqness = (item) => {
    if (!uniqueSet.includes(item)) {
      uniqueSet.push(item);
      localStorage.setItem("unique", JSON.stringify(uniqueSet));
      return true;
    } else {
      console.log("Item already exists in set");
      return false;
    }
  };

  if (event.target.classList.contains("buttonPISList")) {
    const nick = event.target
      .closest(".author")
      .querySelector(".showProfileSummary > b").innerText;
    const link = event.target.closest(".author").querySelector("a + a").href;

    event.target.classList.add('buttonPISList-clicked');
    event.target.innerText = 'OK';

    if (checkUniqness(nick)) {
      trolls.push({ nick: nick, link: link });
    }
  }

  const stringTrolls = JSON.stringify(trolls);

  localStorage.setItem("trolls", stringTrolls);

  markTrolls();
});

// get array of trolls, check website for them and make it visible on wykop





// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCvJsqe9k7ZQs_0C1dUeitpsSkReISMNKk",
  authDomain: "pistrole.firebaseapp.com",
  databaseURL: "https://pistrole.firebaseio.com",
  projectId: "pistrole",
  storageBucket: "pistrole.appspot.com",
  messagingSenderId: "907188042981",
  appId: "1:907188042981:web:6d97f0df996256092d680c",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
