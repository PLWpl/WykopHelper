import DOM from "../../constants/domSelectors";
/* eslint max-len: 0 */

export const version = `0.6`;

export const welcomeText = {
  title: "WykopHelper zainstalowany!",
  content:
    'Miłego używania dodatku! Jeśli masz jakiekolwiek problemy, pytania lub sugestie, zgłoś je <a href="https://github.com/PLWpl/WykopHelper/issues" target="_blank">tutaj.</a>',
  button: "Super!",
};

export const updateText = {
  title: "WykopHelper zaktualizowany!",
  content: `
Dodatek WykopHelper został właśnie zaktualizowany do wersji ${version}. Wprowadzone zmiany to: <br>
<ul class="${DOM.MODAL.CLASSNAME.LIST}">
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Dodano możliwość zmiany tekstu na odznace każdego użytkownika z osobna. By zmienić tekst wystarczy kliknąć na odznace przy danym userze, odszukać nowe pole tekstowe i wpisać tam, co dusza zapragnie :)
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Pole tekstowe wyświetlające tekst komentarza w popupie odznaki uzyskało możliwość przewijania. To oznacza, że teraz bardzo długie komentarze nie będą rozciągać okna popupu nawet poza monitor.
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    W ustawieniach można teraz zadecydować o ukrywaniu woodle (czyli wykopowej wersji doodle - okolicznościowy obrazek umieszczany na belce menu).
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Chcesz widzieć znaleziska z określonych kategorii (np. #polityka), ale dla własnego komfortu psychicznego preferujesz nie widzieć komentarzy pod nim? Od teraz możesz zdefiniować w ustawieniach listę tagów, dla których komentarze pod znaleziskiem będą usuwane.
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Na stronie ustawień pojawiły się linki do historii zmian oraz do strony opisującej ficzery dodatku.
  </li>
  <li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">
    Kilka pomniejszych fixów i ulepszeń.
  </li>
</ul>
🎉🎉 <strong>Szczęśliwego Nowego Roku!</strong> 🎉🎉
`,
  button: "Okej!",
};
