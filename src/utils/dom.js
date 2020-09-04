/** document.querySelector() */
export const $ = (selector, node = document) => node.querySelector(selector);

/** document.querySelectorAll() */
export const $$ = (selector, node = document) => node.querySelectorAll(selector);