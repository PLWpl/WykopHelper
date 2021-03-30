import DOM from "../../constants/domSelectors";
/* eslint max-len: 0 */

const changesArray = [
  'W ustawieniach można wybrać <strong>domyślny</strong> kolor odznaki, który będzie nadawany każdemu nowemu oznaczonemu.',
  '...Ale kolor ten można zmienić dla każdego z osobna -  w popupie aktywowanym kliknięciem w odznakę przy danym userze.',
  'Dodatkowo, w popupie usera można zadecydować o wrzuceniu usera na <strong>super</strong> czarną listę. Ale <strong>ostrożnie</strong> - po zczarnolistowaniu, posty danego użytkownika będą <em>całkowicie</em> usuwane, a nie tylko chowane jak w wykopowej czarnej liście. Później - aby użytkownikowi wybaczyć, i z czarnej listy go zdjąć - należy udać się do jego profilu (wykop.pl/ludzie/NICK) i kliknąć na ikonę kłódki przy jego nicku. O tym, że dany user jest zczarnolistowany, świadczy w jego profilu ta kłódka, oraz lekko przytumiony nick.',
  'Dodano funkcję, aktywowaną w ustawieniach, umożliwiającą usuwanie tekstu "via [nazwa aplikacji]" w komentarzach użytkowników. Przy dłuższych nickach, albo przy stosowaniu innych dodatków (np. pokazujących czy dany user wykopał czy zakopał znalezisko) ta mało użyteczna informacja o aplikacji jakiej ktoś używa potrafi spowodować nachodzenie na siebie różnych tekstów.',
  'W ustawieniach można również od teraz eksportować i importować swoje ustawienia i listy oznaczonych i czarnolistowanych użytkowników. Na razie jest to proces raczej ręczny (wymaga kopiowania i przeklejania ciągów znaków między przeglądarkami); możliwe, że w przyszłości coś tutaj zostanie udoskonalone, chociaż nie ukrywam, że wynika to z mojej niechęci do używania zewnętrznych usług - bo wtedy wchodziłyby w grę kwestie prywatności, dostępów, śledzenia i tak dalej i tak dalej... a tego chcę za wszelką cenę uniknąć.',
  'Od teraz odznaka będzie się wyświetlać dokładnie tak, jak to ustawisz w ustawieniach bądź konkretnemu userowi. Do tej pory wymuszana była konwencja rozpoczynania tekstu wielką literą, a reszta małymi - ale już nie jest. Jeśli chcesz, możesz nawet pisać po pOkEmOnOwEmU :)',
  'Parę wizualnych zmian (ikony itp.; nic przełomowego). Redesign całości, a zwłaszcza popupu odznaki, wkrótce - bo powoli robi się mało estetyczny bałagan.',
  'Zniknęło sporo pomniejszych bugów.',
  'Z pewnością pojawiło się sporo nowych bugów :)'
];

const listItem = text => `<li class="${DOM.MODAL.CLASSNAME.LIST_ITEM}">${text}</li>`;

export const version = `0.70`;

export const welcomeText = {
  title: "WykopHelper zainstalowany!",
  content:
    'Miłego używania dodatku! Jeśli masz jakiekolwiek problemy, pytania lub sugestie, zgłoś je <a href="https://github.com/PLWpl/WykopHelper/issues" target="_blank">tutaj.</a>',
  button: "Super!",
};

export const updateText = {
  title: "WykopHelper zaktualizowany!",
  content: `
Dodatek WykopHelper został właśnie zaktualizowany do wersji <strong>${version}</strong>. Wprowadzone zmiany to: <br>
<ul class="${DOM.MODAL.CLASSNAME.LIST}">
  ${changesArray.map(el => listItem(el)).join('')}
</ul>
`,
  button: "Okej!",
};
