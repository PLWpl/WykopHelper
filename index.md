# WykopHelper

WykopHelper to UserScript dodający kilka nowych funkcjonalności umilających/ułatwiających funkcjonowanie na wykopie.

**Spis treści**:
1. [Ficzery](#1-ficzery)
2. [Instalacja](#2-instalacja)
3. [Plany](#3-plany)
4. [Support](#4-support)
5. [FAQ](#5-faq)
6. [Changelog](#6-changelog)

## 1. Ficzery
Ficzery, które są w części lub całkowicie konfigurowalne w ustawieniach są oznaczone ikoną klucza (🔧). Opis ustawień znajduje się na końcu listy ficzerów.

==========

### Oznaczanie użytkowników 🔧
Po zainstalowaniu WykopHelpera, w każdym znalezisku i mikroblogowym wątku, przy każdym użytkowniku znajdzie się nowy przycisk "oznacz".

![oznacz](/before-marking.png)

Po kliknięciu nań, użytkownik zostanie udekorowany piękną odznaką:

![odznaka](/marked.png)

Odznaka będzie widoczna przy nicku użytkownika w każdym jego komentarzu w dowolnym znalezisku lub wątku mikroblogowym. Po kliknięciu na odznakę otworzy się okienko z informacją, co delikwent zrobił, że zasłużył sobie na taki zaszczyt:

![modal](/modal.png)

W widocznej na screenie ramce znajdzie się treść komentarza (na wypadek, gdyby user zdecydował się go usunąć, lub gdyby moderator zrobił to za niego), a pod ramką - link do miejsca, gdzie został zamieszczony. Jeśli w treści komentarza znajduje się osadzony obrazek lub film, link do niego znajdzie się również tutaj.

Odznaka będzie wyświetlana również w profilu użytkownika, między avatarem a nickiem.

Niżej znajduje się opcja zmiany tekstu i koloru odznaki. Domyślnie nadawane są takie wartości, jakie zdefiniowano w ustawieniach. Jednak każdego użytkownika z osobna możemy edytować właśnie tutaj. Zmiana następuje po potwierdzeniu przyciskiem "Zapisz".

Ostatnia opcja to czarna lista. Ostrożnie z tym ficzerem! Jest znacznie potężniejszy niż wykopowa opcja o tej samej nazwie. W odróżnieniu od tej z wykopu, po zczarnolistowaniu użytkownika w dodatku, jego treści są usuwane całkowicie; nie zobaczysz już opcji rozwinięcia takiego komentarza!

Może też się tak zdarzyć, że po pewnym czasie uznasz, że user już nie zasługuje na dalsze wyróżnianie. Wtedy wystarczy kliknąć ten duży przycisk "Usuń oznaczenie".

> ** Jak odznaczyć użytkownika, który trafił na czarną listę?
> Musisz znać jego nick; wejdź na jego profil (https://wykop.pl/ludzie/nazwa_uzytkownika), i kliknij w ikonę kłódki, która będzie wyświetlona przy jego nicku.

![usun-oznaczenie](/removed-marking.png)

**Domyślnie, tekst jaki jest na odznace to "debil" - uznałem, że najpewniej to jest komunikat, jaki będzie cieszyć się największą popularnością ;) Tym niemniej, domyślny tekst może zostać zmieniony w ustawieniach - o nich nieco niżej.**

### Hurtowe oznaczanie użytkowników

Czasem może być tak, że sam fakt wykopania/zakopania jakiegoś znaleziska predystynuje do otrzymania odznaki. W takim wypadku wystarczy zjechać na sam dół, tam, gdzie znajduje się opcja wyświetlenia głosujących:

![voters](/before-bulk-mark.png)

Po rozwinięciu listy zakopujących lub wykopujących, pojawi się nowy przycisk pozwalający na hurtowe oznaczenie:

![bulk](/bulk-mark.png)

Po kliknięciu, wszyscy wyświetleni poniżej użytkownicy zostaną obdarowani odznaką.

### Pokaż OPa

Czasem jest tak, że jakiś wątek na mikroblogu rozwinie się w setki komentarzy. Mimo, że wykop domyślnie oznacza komentarze OPa (czyli twórcy wątku), jeśli ten jest naprawdę długi, przy szybkim przewijaniu to delikatne domyślne oznaczenie może łatwo zaginąć. Przycisk "Pokaż OPa", który znajduje się w każdym mikroblogowym wątku przy początkowym wpisie, pozwala wyróżnić komentarze OPa w znacznie większym stopniu.

![pokaz-opa](/highlight-op.png)

![highlighted](/op-highlighted.png)

### Ostrzeżenie przed podejrzanym źródłem znaleziska 🔧 

Aktywność "ruskich trolli" to od dość dawna nie legenda, a fakt. Uaktywniają się szczególnie w czasie pewnych wydarzeń międzynarodowych, by głosić propagandę swoich mocodawców, jednak propaganda nie przestaje się sączyć właściwie nigdy, czasem tylko jej natężenie jest nieco niższe. Kilka portali podjęło swego czasu próbę skomponowania listy stron, które najczęściej posługują się informacjami przygotowanymi wprost na Kremlu. WykopHelper może pomóc w rozpoznawaniu znalezisk z takich podejrzanych źródeł:

![propaganda](/warning-propaganda.png)

Ten ficzer możesz wyłączyć (domyślnie jest włączony) w ustawieniach. 
Lista źródeł, na podstawie których została stworzona lista _podejrzanych_ znalezisk znajduje się [tutaj](./propaganda.md).

Możesz tam również - jeśli chcesz - zrezygnować z domyślnego zachowania tego ficzera, i zmienić zarówno tekst ostrzeżenia jak i podejrzeć/edytować listę stron, przy których ostrzeżenie ma się pojawiać.
 
![propaganda](/warning-propaganda-settings.png)


### Upload obrazka prosto ze schowka, zamiast z dysku

Korzystając z funkcji "Dodaj zdjęcie lub film", jeśli masz w schowku skopiowany obrazek, możesz go "wkleić" bezpośrednio na wykop, bez konieczności zapisywania go najpierw na dysku.

![embed](/embed.png)

Ficzer inspirowany, żeby nie rzec zerżnięty, od [https://www.wykop.pl/dodatki/pokaz/1107/](https://www.wykop.pl/dodatki/pokaz/1107/)

### Usuwanie komentarzy w znaleziskach z tagami zdefiniowanymi w ustawieniach 🔧

Czasem może być tak, że chcesz widzieć znaleziska z jakiejś kategorii (np. #polityka), ale dla własnego komfortu psychicznego preferujesz nie czytać tam komentarzy. Od teraz masz możliwość zdefiniowania w ustawieniach listy tagów; jeśli w znalezisku pojawi się którykolwiek z nich, komentarze będą automatycznie usuwane.

![comments-removed](/comments-removed.png)


### Usuwanie informacji o tym, z jakiej aplikacji został dodany komentarz 🔧

Gdy użytkownik używa jakiejś aplikacji mobilnej do komentowania, informacja o tym znajduje się przy treściach przez niego stworzonych:

![posted-via](/posted-via.png)

Czasem może to być uciążliwe, na przykład gdy ktoś ma długi nick, zwłaszcza na mniejszych ekranach lub przy włączonym powiększeniu. W ustawieniach pojawiła się opcja pozwalająca na usuwanie tego komunikatu.

### Ostrzeganie przed wyjściem ze strony, gdy zostanie wykryte pisanie komentarza 🔧

Gdy zostanie wykryte pisanie komentarza (w polu tekstowym znajdzie się co najmniej 6 słów), przed przeładowaniem/zamknięciem strony zostanie wyświetlony monit z pytaniem, czy użytkownik jest pewien swoich działań.

**Uwaga - ficzer przez dłuższy czas miał jakieś kłopoty z działaniem na niektórych przeglądarkach; wydaje mi się, że aktualnie problem jest już rozwiązany, zalecam jednak mimo wszystko przeprowadzić własne testy :)**

### Ustawienia 🔧🔧🔧

Po wejściu do ustawień, na belce z kategoriami można odnaleźć nową - "WykopHelper ✨". Po kliknięciu otworzy się strona ustawień dodatku (można tam też wejść bezpośrednio, przez url https://www.wykop.pl/ustawienia/wykophelper/).

![embed](/settings.png)

Można tu wybrać, jakie opcje mają być aktywowane, a jakie nie. Po kliknięciu ikony informacji otworzy się okno z dodatkowymi, przydatnymi informacjami (w przypadku ostrzeżeń przed propagandą choćby, będzie to lista źródeł, które posłużyły do skomponowania listy podejrzanych i oznaczanych stron).

W pierwszym polu tekstowym można zdefiniować, po przecinku, listę tagów po wystąpieniu których ze znaleziska będą usuwane komentarze.

W drugim zaś polu tekstowym można ustawić, jaki będzie domyślny tekst na odznace nadawanej użytkownikowi po kliknięciu przycisku "Oznacz" (lub masowym oznaczaniu). 

Pomiędzy nimi pojawia się opcja wyboru domyślnego koloru odznaki.

W najnowszej aktualizacji dodana została opcja importu i eksportu danych dodatku tak, by można było relatywnie łatwo migrować między przeglądarkami. Aby wyeksportować dane, wystarczy kliknąć w oznaczony tak przycisk, a następnie - w oknie które się otworzy - wybrać, jaki rodzaj danych chcemy ściągnąć. Po wyborze, dane zostaną załadowane do okienka tekstowego. Należy je samodzielnie skopiować i zapisać w pliku tekstowym w celach późniejszego importu.

![export](/export-settings.png)

Importowanie ustawień polega na dokładnie odwrotnym procesie - w otworzonym oknie należy wkleić wcześniej wyeksportowaną treść, wybrać typ importowanych danych i zapisać je.

![import](/import-settings.png)

Na samym dole znajduje się opcja usunięcia wszystkich odznaczeń lub przejrzenia tabeli z wyróżnionymi userami. Z poziomu tabeli można również daną osobę usunąć, jak również przejść do komentarza lub znaleziska będącego powodem oznaczenia.

## 2. Instalacja 
Do skorzystania z WykopHelpera konieczne będzie pobranie rozszerzenia do przeglądarki obsługującego UserScripty: [Tampermonkey](https://www.tampermonkey.net/), [Greasemonkey](https://www.greasespot.net/) albo jeden z miliona innych menadżerów skryptów (dostępne dla każdej sensownej przeglądarki, acz lojalnie uprzedzam, że sam używam tampermonkey i tylko tam testowałem WH; ale powinien działać wszędzie tak samo). Po zainstalowaniu, wystarczy wejść pod ten adres: [https://cdn.jsdelivr.net/gh/plwpl/WykopHelper@master/dist/whhelper.user.js](https://cdn.jsdelivr.net/gh/plwpl/WykopHelper@master/dist/whhelper.user.js), a następnie zainstalować skrypt.

> **Hur dur nie chcem zminifikowanego kodu**
> 
> Spoko. W takim razie wbijaj na [https://cdn.jsdelivr.net/gh/plwpl/WykopHelper@develop/dist/whhelper-dev.user.js](https://cdn.jsdelivr.net/gh/plwpl/WykopHelper@master/dist/whhelper-dev.user.js) albo zerknij po prostu na repo tego projektu (link na samej górze strony). **Miej tylko na uwadze, że wersja `-dev` to wersja mniej stabilna, przeznaczona do testów. Używając jej szybciej dostaniesz nowe ficzery, ale i szybciej dostaniesz nowe bugi :)**

## 3. Plany
Po zainstalowaniu dodatek będzie aktualizował się automatycznie. Po każdej istotnej aktualizacji, po wejściu na wykop wyświetli się popup z informacjami o nowych ficzerach czy zmianach.

Czego można się spodziewać? (🐾 - oznacza, że nad tym aktualnie pracuję, i zapewne znajdzie się to w najbliższej aktualizacji)

 * Zintegrowanie funkcjonalności podobnych do tych, jakie można odnaleźć w tych dodatkach: https://www.wykop.pl/dodatki/pokaz/1021/ , https://www.wykop.pl/dodatki/pokaz/1013/ , https://www.wykop.pl/dodatki/pokaz/231/
 * Opcja ograniczania dostępu do wypoku - przy walce z uzależnieniem ;) 🐾
 * możliwość włączenia podglądu na żywo, jak wyglądać będzie post po opublikowaniu 🐾
 * ostrzeżenie "paywall" przy znaleziskach ze źródłem z paywallem; wyświetlane analogicznie do ostrzeżenia 18+. 🐾
 * Redesign całości
   - ujednolicenie wyglądu poszczególnych elementów
   - wsparcie dla trybu dziennego
 * rating wiarygodności źródła - wymaga prac koncepcyjnych, ale ficzer chyba byłby fajny? :)

...i co tam jeszcze się nasunie, lista jest niepełna :)

 Docelowo dodatek będzie zwykłym rozszerzeniem do przeglądarki, co wyeliminuje konieczność instalacji menadżera skryptów, jednak to dopiero w okolicach wersji 1.0.
 
## 4. Support
> WykopHelper jest w wersji 0.65 co oznacza, że nie jest to jeszcze wersja całkiem stabilna. Do 1.0 jeszcze trochę brakuje :) W konsekwencji, niektóre ficzery mogą nie działać całkiem poprawnie, zmieniać swoje zachowanie wraz z kolejnymi aktualizacjami lub nawet całkiem znikać. Dlatego zachęcam do korzystania z linku niżej, by zgłaszać wszystkie niedogodności.

Jeśli masz jakiekolwiek skargi (coś nie działa lub Ci się nie podoba), sugestie, pytania czy spostrzeżenia, możesz się nimi podzielić tutaj: [https://github.com/PLWpl/WykopHelper/discussions](https://github.com/PLWpl/WykopHelper/discussions), obiecuję, że (o ile będą poważne) nie pozostaną bez odpowiedzi.

## 5. FAQ

**Ile to kosztuje?**

Nic.

**Ile to będzie kosztować?**

Nic.

**Podejrzane.**

No. ( ͡° ͜ʖ ͡°)

**Czy gwarantujesz, że...**

Nie.

**Czy to bezpieczne?**

Dodatek nie wysyła żadnych zapytań do serwerów trzecich (poza zaciągnięciem biblioteki do wyświetlania modali - https://sweetalert2.github.io/). Całość dzieje się w Twojej przeglądarce i działa na zasadzie wstrzykiwania dodatkowego kodu na wykopie. Dodatek **nie** korzysta z wykopowego API (przynajmniej na razie), więc nie ma ryzyka, że przejmie konto, zmieni jakieś ustawienia czy cokolwiek podobnego. Ustawienia dodatku (domyślny tekst odznaki, w(y)łączanie ficzerów) są zapisywane w `localStorage` przeglądarki.

**Czy testowałeś to na każdą możliwość?**

Oczywiście. Że nie. Do tej pory pracowałem nad tym sam, a używało tego dosłownie kilka osób, z czego większość sporadycznie ;) Więc z pewnością jest sporo bugów.

**Zrób, żeby...**

To zrób na to ticket na githubie.

**Mojego pytania tu nie ma.**

To napisz je w tickecie lub forum na githubie.

**Ja bym to zrobił lepiej.**

Ok, to zrób. I otwórz PRa. Nie obrażę się, a nawet ucieszę ;)

**Czemu nazwałeś tę sekcję FAQ, skoro nikt tego dodatku dotąd nie znał i nie mógł zadawać pytań?**

Bez komentarza.


## 6. Changelog

**0.70** - _30.03.2021_

  * W ustawieniach można wybrać **domyślny** kolor odznaki, który będzie nadawany każdemu nowemu oznaczonemu...
  * ...Ale kolor ten można zmienić dla każdego z osobna -  w popupie aktywowanym kliknięciem w odznakę przy danym userze.
  * Dodatkowo, w popupie usera można zadecydować o wrzuceniu usera na **super** czarną listę. Ale **ostrożnie** - po zczarnolistowaniu, posty danego użytkownika będą _całkowicie_ usuwane, a nie tylko chowane jak w wykopowej czarnej liście. Później - aby użytkownikowi wybaczyć, i z czarnej listy go zdjąć - należy udać się do jego profilu (wykop.pl/ludzie/NICK) i kliknąć na ikonę kłódki przy jego nicku. O tym, że dany user jest zczarnolistowany, świadczy w jego profilu ta kłódka, oraz lekko przytumiony nick.
  * Dodano funkcję, aktywowaną w ustawieniach, umożliwiającą usuwanie tekstu "via [nazwa aplikacji]" w komentarzach użytkowników. Przy dłuższych nickach, albo przy stosowaniu innych dodatków (np. pokazujących czy dany user wykopał czy zakopał znalezisko) ta mało użyteczna informacja o aplikacji jakiej ktoś używa potrafi spowodować nachodzenie na siebie różnych tekstów.
  * W ustawieniach można również od teraz eksportować i importować swoje ustawienia i listy oznaczonych i czarnolistowanych użytkowników. Na razie jest to proces raczej ręczny (wymaga kopiowania i przeklejania ciągów znaków między przeglądarkami); możliwe, że w przyszłości coś tutaj zostanie udoskonalone, chociaż nie ukrywam, że wynika to z mojej niechęci do używania zewnętrznych usług - bo wtedy wchodziłyby w grę kwestie prywatności, dostępów, śledzenia i tak dalej i tak dalej... a tego chcę za wszelką cenę uniknąć.
  * Od teraz odznaka będzie się wyświetlać dokładnie tak, jak to ustawisz w ustawieniach bądź konkretnemu userowi. Do tej pory wymuszana była konwencja rozpoczynania tekstu wielką literą, a reszta małymi - ale już nie jest. Jeśli chcesz, możesz nawet pisać po pOkEmOnOwEmU :)
  * Parę wizualnych zmian (ikony itp.; nic przełomowego). Redesign całości, a zwłaszcza popupu odznaki, wkrótce - bo powoli robi się mało estetyczny bałagan.
  * Zniknęło sporo pomniejszych bugów.
  * Z pewnością pojawiło się sporo nowych bugów :)

**0.65**
* Funkcja ostrzegania przed znaleziskami podejrzanymi o szerzenie propagandy rosyjskiej została zmodyfikowana. Od teraz możesz samodzielnie ustalić, czy takie ostrzeżenie ma w ogóle być pokazywane, a także jaka ma być jego treść i dla jakich domen ma się aktywować. Zdecydować o tym możesz oczywiście w ustawieniach (ikona zębatki przy odpowiednim checkboxie).
* Funkcja ostrzegająca przed zamknięciem strony gdy wykryte zostanie pisanie komentarza powinna już działać poprawnie.
* Pojawiła się opcja wyłączenia komentarzy we wszystkich znaleziskach. Teraz możesz zdecydować, czy komentarze wyłączasz globalnie, tylko w wybranych (poprzez tagi) znaleziskach, czy nigdzie. Domyślnie opcja oczywiście nie jest włączona.
* Od teraz odznaka widoczna będzie również w profilu użytkownika, między avatarem a nickiem.
* Drobne poprawki stylistyczne tu i ówdzie (np. nowy kolor przycisku "zapisz" w popupie odznaki; redesign całego popupu wkrótce)

**0.60** 
* Dodano możliwość zmiany tekstu na odznace każdego użytkownika z osobna. By zmienić tekst wystarczy kliknąć na odznace przy danym userze, odszukać nowe pole tekstowe i wpisać tam, co dusza zapragnie :)
* pole tekstowe wyświetlające tekst komentarza w popupie odznaki uzyskało możliwość przewijania. To oznacza, że teraz bardzo długie komentarze nie będą rozciągać okna popupu nawet poza monitor.
* możliwość zdecydowania w ustawieniach, czy "woodle" - czyli ten okolicznościowy obrazek na belce menu - będzie ukrywany. Domyślnie nie jest. :)
* Chcesz widzieć znaleziska z określonych kategorii (np. #polityka), ale dla własnego komfortu psychicznego preferujesz nie widzieć komentarzy pod nim? Od teraz możesz zdefiniować w ustawieniach listę tagów, dla których komentarze pod znaleziskiem będą usuwane.
* Na stronie ustawień pojawiły się linki do historii zmian oraz do strony opisującej ficzery dodatku.

**0.52**
* fix linka ze źródłem do aktualizacji skryptu

**0.51**
* Uporządkowano kilka nazw używanych wewnątrz src

**0.50**
* Od teraz, najechanie myszką na odznakę nic nie da - należy w nią kliknąć. Po kliknięciu otworzy się okienko z informacjami. Aktualnie znajduje się tam informacja o przyczynie oznaczenia; treść komentarza, link do ew. treści multimedialnych w nim osadzonych oraz link do samego komentarza. Wkrótce pojawi się tutaj kilka innych opcji, w tym m.in. zmiana nazwy oznaczenia na customową, zmiana koloru oznaczenia czy całkowite usuwanie aktywności użytkownika z wykopu.
* Opcja dodania oznaczenia hurtem, dla wszystkich użytkowników któzy wykopali/zakopali dane znalezisko. Aby skorzystać, zjedź na sam dół i otwórz listę użytkowników, którzy wykonali interesującą Cię akcję, a następnie kliknij przycisk "Oznacz wszystkich poniżej".
* Ujednolicony styl graficzny modali, czyli takich informacji jak ta.
* Pojawiły się ikony informacji (ℹ) przy niektórych opcjach w ustawieniach dodatku. Po kliknięciu na nie, naturalnie, pojawią się informacje dodatkowe :)
* Naprawiono wiele bugów, w tym m.in. nieznikające odznaki po usunięciu oznaczenia, czerwona obwódka wokół wykopowych osiągnięć.
* Uporządkowano (trochę :D) kod dodatku, który umożliwi szybszy dalszy rozwój.
* Dodano changelog.md
* changed url for userscript update
