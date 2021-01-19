import { $, $$ } from "../../utils/dom";
import { getLocalStorage } from "../../utils/handleLocalStorage";
import { DOM } from "../../constants/domSelectors";

const { BADGE: EL } = DOM;

let markedUsers = getLocalStorage("marked");
let settings = getLocalStorage("settings");

/**
 * gets user data from objects inside marked users array.
 * @param {String} nick 
 */
export const getNickData = nick => {
  if (!nick) {
    throw new Error("getNickData requires nick to be provided.");
  }
  for (let i = 0; i < markedUsers.length; i++) {
    if (markedUsers[i].nick === nick) {
      return {
        link: markedUsers[i].link,
        nick: markedUsers[i].nick,
        label: markedUsers[i].label,
        content: markedUsers[i].content,
        media: markedUsers[i].media,
      };
    } else if (markedUsers[i] === undefined || markedUsers[i] === null) {
      continue;
    }
  }
};

/**
 * used on element - preferably one returned from getAllNickElements() - returns string with nick name.
 * @returns {String} with nickname
 */
export const getNick = el => {
  if (
    (!$(EL.SELECTOR.NICK, el) || $(EL.SELECTOR.NICK, el) === null) && 
    (!$(EL.SELECTOR.NICK_DELETED, el) || $(EL.SELECTOR.NICK_DELETED, el) === null)) {
    throw new Error(`getNick didn't work for ${el}`);
  }
  if ($(EL.SELECTOR.NICK, el) !== null) {
    return $(EL.SELECTOR.NICK, el).innerText;
  } else if ($(EL.SELECTOR.NICK_DELETED, el) !== null) {
    return $(EL.SELECTOR.NICK_DELETED, el).innerText;
  }
  // @TODO: add something to handle nicks on the right panel, apparently there is different DOM structure there which causes this above to throw error as nullish
};

/**
 * @returns {NodeList} with all <div> elements containing line with nick, time since comment made, [+][-]
 */
export const getAllNickElements = () => $$(EL.SELECTOR.NICK_ELEMENTS);

/**
 * @returns {String} default name for badge set in settings by user.
 */
export const getDefaultBadgeLabelFromSettings = () => settings.BADGE.DEFAULT_NAME;