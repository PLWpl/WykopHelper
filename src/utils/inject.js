//inject styles. Parameter must be a string of CSS without any html tags
export const injectStyles = styles => {
  const styleMarkup = `<style> ${styles} </style>`;
  document.body.insertAdjacentHTML('afterbegin', styleMarkup);
};