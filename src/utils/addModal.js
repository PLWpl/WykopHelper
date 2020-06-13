export const addModal = (element, content) => {
  //eslint-disable-next-line no-undef
  tippy(element, {
    content: content,
    allowHTML: true,
    interactive: true,
    placement: 'bottom-start',
    followCursor: 'initial',
  })
}