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
  color: red;
  font-weight: bold;
  margin-right: .3rem;
  border: 1px solid currentColor;
  padding: .1rem .2rem;
  cursor: pointer;
  position: relative;
  top: .1rem;
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
.tippy-box {
  width: 20rem;
}
.tippy-content {
  display: flex;
  flex-direction: column;
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
.${DOM.MODAL.CLASSNAME.LINK} {
  color: #862828;
}
.${DOM.MODAL.CLASSNAME.LINK}:hover {
  color: #4a1313 !important;
}`;

const styles = {
  badge,
  settings
};

export default styles;