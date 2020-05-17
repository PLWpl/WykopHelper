/**
 * Add button next to nick - WORKS
 */
const profileNameElements = document.querySelectorAll("li div.author");
const buttonMarkup = `<span class="buttonPISList" style="display:inline-block;padding:.1rem .5rem; border:1px solid #999;cursor:pointer;margin-left: 1.5rem;color: gray;border-radius: .3rem;box-shadow: 1px 1px #575757;">Add Troll</span>`;

profileNameElements.forEach((element) =>
  element.insertAdjacentHTML("beforeend", buttonMarkup)
);

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

    if (checkUniqness(nick)) {
      trolls.push({ nick: nick, link: link });
    }
  }

  const stringTrolls = JSON.stringify(trolls);

  localStorage.setItem("trolls", stringTrolls);
});

// get array of trolls, check website for them and make it visible on wykop

const trollsArrayUnique = JSON.parse(localStorage.getItem("unique"));

const markTrolls = () => {
  const badgeOfShame = '<span class="">'

  try {
    profileNameElements.forEach((element) => {
      const nick = element.querySelector(".showProfileSummary > b").innerText;

      if (trollsArrayUnique.includes(nick)) {
        element.insertAdjacentHTML("afterbegin", "<b>TROL</b>");
      }
    });
  } catch {}

};

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
