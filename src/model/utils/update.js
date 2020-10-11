import DOM from "../../constants/domSelectors";
/* eslint max-len: 0 */

export const version = 0.5;

export const welcomeText = {
  title: "",
  content:
    'Miłego używania dodatku! Jeśli masz jakiekolwiek problemy, pytania lub sugestie, zgłoś je <a href="https://github.com/PLWpl/wykopoweTrole/issues" target="_blank">tutaj.</a>',
  button: "Super!",
};

export const updateText = {
  title: "WykopHelper zaktualizowany!",
  content: `
Dodatek WykopHelper został właśnie zaktualizowany do wersji ${version}. Wprowadzone zmiany to: <br>
<ul class="${DOM.UPDATE_MODAL.CLASSNAME.LIST}">
  <li class="${DOM.UPDATE_MODAL.CLASSNAME.LIST_ITEM}">
    Od teraz, najechanie myszką na odznakę nic nie da - należy w nią kliknąć. Po kliknięciu otworzy się okienko z informacjami. Aktualnie znajduje się tam 
  </li>
</ul>
`,
  button: "Okej!",
};
