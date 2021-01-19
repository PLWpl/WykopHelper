import { $ } from "../../utils/dom";
import { DOM } from "../../constants/domSelectors";
import { getLocalStorage } from "../../utils/handleLocalStorage";

const { BADGE: EL } = DOM;

let uniqueNicksSet = getLocalStorage("unique");

/**
 * Checks if user of provided nick is already in uniqueNicksSet array
 * @param {String} nick - nick to check
 * @returns {Boolean}
 */
export const isMarked = nick => !!uniqueNicksSet.includes(nick);

/**
 * used on author element, returned from getAllNickElements(), checks if person has already been marked with a badge
 * @param {HTMLElement} element - element to check
 */
export const isNotAwarded = element => !$(`.${EL.CLASSNAME.BADGE}`, element);

/**
 * used on author element, returned from getAllNickElements(), checks if person has already been given a button
 * @param {HTMLElement} element - element to check
 */
export const hasButtonAppended = element => !!$(`.${EL.CLASSNAME.MARK_BUTTON}`, element);