import DOM from '../constants/domSelectors';

export const badge = `
.${DOM.BADGE.CLASSNAME.MARK_BUTTON} {
  display: inline-block;
  padding: .2rem .2rem;
  border: 1px solid #9999996e;
  cursor: pointer;
  margin-left: .5rem;
  color: #808080ba;
  border-radius: .3rem;
  font-size: .7rem;
  line-height: .7rem;
  transition: .3s all;
}
.${DOM.BADGE.CLASSNAME.MARK_BUTTON}:hover {
  border-color: green;
}
.${DOM.BADGE.CLASSNAME.MARK_BUTTON_CLICKED} {
  border-color: green;
  opacity: 0;
}
.${DOM.BADGE.CLASSNAME.BADGE} {
  color: var(--badgeColor);
  font-weight: bold;
  margin-right: .3rem;
  border: 1px solid currentColor;
  padding: .1rem .2rem;
  position: relative;
  top: .1rem;
}
.${DOM.BADGE.CLASSNAME.BADGE_CLICKABLE} {
  cursor: pointer;
}
.${DOM.BADGE.CLASSNAME.BADGE_UNCLICKABLE} {
  cursor: default;
}
.${DOM.BADGE.CLASSNAME.MODAL_BUTTON} {
  display: block;
  padding: .4rem .8rem;
  border: 1px solid #9999996e;
  cursor: pointer;
  color: #808080ba;
  border-radius: .3rem;
  font-size: 1rem;
  line-height: 1rem;
  transition: .3s all;
}
.author .${DOM.BADGE.CLASSNAME.MODAL_TEXT} {
  position: relative;
  margin-bottom: .5rem;
  top: unset;
  right: unset;
  left: unset;
  bottom: unset;
}

.${DOM.BADGE.CLASSNAME.MARK_ALL_BUTTON} {
  top: 0.8rem;
  position: relative;
}

.${DOM.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON} {
  position: absolute;
  top: .1rem;
  left: 0;
}

@media screen and (min-width: 722px) {
  .${DOM.HIGHLIGHT_OP.CLASSNAME.HIGHLIGHT_BUTTON} {
    top: 6rem;
    left: 1rem;
  }
}

.${DOM.DOMAIN_CHECKER.CLASSNAME.MODAL_TEXT_LIST} {
  margin-top:1rem;list-style-type: circle;font-size:1rem;
}

.${DOM.DOMAIN_CHECKER.CLASSNAME.MODAL_TEXT_LIST_ITEM} {
  text-align:left;margin-left:2rem;margin-bottom:.7rem
}
`;

export const settings = `
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_CONTAINER} {
  padding: 1rem;
}
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_CONTAINER_HIDDEN} {
  display: none;
}
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE} {
  counter-reset: row-num;
}
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE} .${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_ROW} {
  counter-increment: row-num;
}
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE} .${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_ROW} td:first-child::before {
  content: counter(row-num) ". ";
}
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_HEAD} {
  font-weight: bold;
  border-bottom: 2px solid currentColor;
}
.${DOM.SETTINGS.CLASSNAME.WH_SETTINGS_CROSSED} {
  opacity: .4;
  text-decoration: line-through;
  cursor: not-allowed;
}
.${DOM.SETTINGS.CLASSNAME.WH_USER_TABLE_REMOVE_BUTTON} {
  cursor: pointer;
  color: #c0392b;
}
.${DOM.SETTINGS.CLASSNAME.SETTINGS_BOX} {
  border-bottom: 1px solid #d3d3d329;
  border-left: 1px solid #d3d3d329;
  border-right: 1px solid #d3d3d329;
}
.${DOM.MODAL.CLASSNAME.LINK} {
  color: #862828;
}
.${DOM.MODAL.CLASSNAME.LINK}:hover {
  color: #4a1313 !important;
}
`;

export const modal = `
.swal2-popup.swal2-modal.swal2-show {
  background-color: #1b1b1b !important;
  border: 1px solid #ff5917 !important;
}
.swal2-icon.swal2-info {
  border-color: #542621 !important;
  color: #c0392b !important;
}

.swal2-title {
  color: #a2a2a2 !important;
}

.swal2-content {
  color: #888;
  text-align: unset;
}

.swal2-styled.swal2-confirm {
  background-color: #e74c3c6b !important;
}
.${DOM.MODAL.CLASSNAME.LIST} {
  margin-top: 1rem;
  list-style-type: square;
}
.${DOM.MODAL.CLASSNAME.LIST_ITEM} {
  text-align: left;
  margin-left: 2rem;
  margin-bottom: .7rem
}

.${DOM.MODAL.CLASSNAME.INPUT_LABEL} {
  text-transform: none;
}

.${DOM.MODAL.CLASSNAME.INPUT_TEXT}, .${DOM.MODAL.CLASSNAME.INPUT_TEXT}:focus {
  color: #464646 !important;
}

.${DOM.MODAL.CLASSNAME.SCROLLABLE_TEXT} {
  margin-top:.5rem;
  border:1px solid gray;
  padding: 1rem;
  text-align:left;
  overflow-y: auto;
  max-height: 15rem;
}
`
const styles = {
  badge,
  settings,
  modal
};

export default styles;