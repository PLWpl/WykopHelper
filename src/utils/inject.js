/**
 * Injects styles in <style> tags at the beginning of a page
 * @param {string} styles - parameter must be a string of CSS without any html tags
 */
export const injectStyles = (styles, id = '') => {
  const styleMarkup = `<style ${id ? 'id="' + id + '"': ''}> ${styles} </style>`;
  document.body.insertAdjacentHTML('afterbegin', styleMarkup);
};