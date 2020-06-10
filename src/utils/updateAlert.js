export const updateAlert = () => {
  if (localStorage.getItem('WHupdate') < 0.1) {
    // eslint-disable-next-line no-alert, max-len
    alert(`★★★WykopHelper właśnie został zaktualizowany.★★★ \n\n Nowe ficzery:\n\n ➥ Dodano alert powiadamiający o aktualizacji ( ͡° ͜ʖ ͡°)`);
    localStorage.setItem('WHupdate',0.1);
  }
  else if (!localStorage.getItem('WHupdate')) {
    localStorage.setItem('WHupdate',0.1);
  }
}