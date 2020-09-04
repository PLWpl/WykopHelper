/**
 * 
 * @param {DOMElement} element - html element, like document.querySelector... or just $
 * @param {string} content - a string of HTML content.
 * @param {number} [delay=0] - how big of a delay to wait before displaying modal on firing it?
 */
export const addModal = (element, content, delay) => {
  tippy(element, {
    content: content,
    allowHTML: true,
    interactive: true,
    placement: 'bottom-start',
    followCursor: 'initial',
    delay: delay ? [delay, null] : 0
  })
}