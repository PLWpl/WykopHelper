/** document.querySelector() */
export const $ = (selector, node = document) => node.querySelector(selector);

/** document.querySelectorAll() */
export const $$ = (selector, node = document) => node.querySelectorAll(selector);

/** returns an actual array of elements from querySelectorAll */
export const $$$ = (selector, node = document) => Array.from(node.querySelectorAll(selector));