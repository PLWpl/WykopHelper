// add new domains. Always add them without protocol (http, https), www or path after domain.
export let rawDomains = [
  'alternews.pl',
  'alexjones.pl',
  'dziennik-polityczny.com',
  'koniec-swiata.org',
  'magnapolonia.org',
  'narodowcy.net',
  'nczas.com',
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
  'mysl-polska.plw'
];

rawDomains.forEach(domain => {
  rawDomains.push('https://' + domain);
  rawDomains.push('https://www.' + domain);
  rawDomains.push('http://' + domain);
  rawDomains.push('http://www.' + domain);
});

export const russianPropagandaDomains = rawDomains;