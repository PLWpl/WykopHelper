// add new domains. Always add them without protocol (http, https), www or path after domain.
let domains = [
  'lifesitenews.com',
  'sputnik.com'
];

domains.forEach(domain => {
  domains.push('https://' + domain);
  domains.push('https://www.' + domain);
  domains.push('http://' + domain);
  domains.push('http://www.' + domain);
});

export const russianPropagandaDomains = domains;