export const stylesBadge = `
.wh-button {
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
.buttonWH:hover {
  border-color: green;
}
.buttonWH--clicked {
  border-color: green;
  opacity: 0;
}
.badge {
  color: red;
  font-weight: bold;
  margin-right: .3rem;
  border: 1px solid currentColor;
  padding: .1rem .2rem;
  cursor: pointer;
}
.modalWH-button {
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
.author .modalWH-text {
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

.button--highlightOp {
  position: absolute;
  top: .1rem;
  left: 0;
}

@media screen and (min-width: 722px) {
  .button--highlightOp {
    top: 6rem;
    left: 1rem;
  }
}
`;

export const stylesSettings = `
.tableWH__container {
  padding: 1rem;
}
.tableWH__container--hidden {
  display: none;
}
.tableWH {
  counter-reset: row-num;
}
.tableWH .tableWH__row {
  counter-increment: row-num;
}
.tableWH .tableWH__row td:first-child::before {
  content: counter(row-num) ". ";
}
.tableWH__head {
  font-weight: bold;
  border-bottom: 2px solid currentColor;
}
.settings__crossed {
  opacity: .4;
  text-decoration: line-through;
  cursor: not-allowed;
}
.tableWH__nick-remove {
  cursor: pointer;
  color: #c0392b;
}
.whModalLink {
  color: #862828;
}
.whModalLink:hover {
  color: #4a1313 !important;
}`;