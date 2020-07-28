/**
 * Util function that is supposed to run only once, immediately after script update.
 */
export const runOnceOnUpdate = () => {
  let trolls;

  if (localStorage.getItem('trolls')) {
    trolls = JSON.parse(localStorage.getItem('trolls'));
  } else {
    trolls = [];
  }

  trolls.forEach(el => {
    if (!el.label) {
      el.label = '';
    }
  })

  localStorage.setItem('trolls', JSON.stringify(trolls));
}