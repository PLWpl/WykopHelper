/**
 * Util function that is supposed to run only once, immediately after script update.
 */
export const runOnceOnUpdate = () => {
  let trolls;

  // preparation
  if (localStorage.getItem('trolls')) {
    trolls = JSON.parse(localStorage.getItem('trolls'));
  } else {
    trolls = [];
  }

  // actual desired action
  trolls.forEach(el => {
    if (!el.label) {
      el.label = '';
    }
  })

  localStorage.setItem('trolls', JSON.stringify(trolls));
}