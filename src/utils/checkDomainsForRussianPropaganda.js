/** An array of all domains suspected of spreading russian propaganda.
 * When adding new domains, remember to add them without http(s) or www. Just name.domain.
 */
export const rawDomains = [
  'alternews.pl',
  'alexjones.pl',
  'dziennik-polityczny.com',
  'koniec-swiata.org',
  'magnapolonia.org',
  'narodowcy.net',
  'nczas.com',
  'mysl.pl',
  'ndie.pl',
  'neon24.pl',
  'newsweb.pl',
  'parezja.pl',
  'prostozmostu24.pl',
  'prawdaobiektywna.pl',
  'reporters.pl',
  'sioe.pl',
  'wmeritum.pl',
  'wolnosc24.pl',
  'wolna-polska.pl',
  'wprawo.pl',
  'wsensie.pl',
  'zmianynaziemi.pl',
  'sputniknews.com',
  'rt.com',
  'ruptly.tv',
  'prawica.net',
  'xportal.pl',
  'kresy.pl',
  'bdp.xportal.pl',
  'geopolityka.org',
  'pravda.ru',
  'voiceofrussia.com',
  'ria.ru',
  'ligakobietpolskich.pl',
  'ronik.org.pl',
  'obserwatorpolityczny.pl',
  'mysl-polska.pl'
];

const processedDomains = rawDomains.map(domain => {
  const https = 'https://' + domain;
  const www = 'https://www.' + domain;
  const http = 'http://' + domain;
  const hwww = 'http://www.' + domain;

  return [https, www, http, hwww];
});

/** @returns array of strings (domains) */
export const russianPropagandaDomains = processedDomains.flat();