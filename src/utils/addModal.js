export const addModal = (element, content, delay) => {
  //eslint-disable-next-line no-undef
  tippy(element, {
    content: content,
    allowHTML: true,
    interactive: true,
    placement: 'bottom-start',
    followCursor: 'initial',
    delay: delay ? [delay, null] : 0
  })
}