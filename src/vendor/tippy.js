import tippy from 'tippy.js';

export const addModal = (element, content) => {
  tippy(element, {
    content: content,
    allowHTML: true,
    interactive: true,
    placement: 'bottom'
  })
}