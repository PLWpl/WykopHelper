import { getLocalStorage } from "../../utils/handleLocalStorage";

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
 * @returns {String} default name for badge set in settings by user.
 */
export const getDefaultBadgeLabelFromSettings = () => settings.BADGE.DEFAULT_NAME;