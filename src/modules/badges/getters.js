import { getLocalStorage } from "../../utils/handleLocalStorage";

let settings = getLocalStorage("settings");

/**
 * gets user data from objects inside marked users array.
 * @param {String} nick 
 */
export const getNickData = nick => {
  if (!nick) {
    throw new Error("getNickData requires nick to be provided.");
  }

  const markedUsers = getLocalStorage("marked");

  for (let i = 0; i < markedUsers.length; i++) {
    if (markedUsers[i].nick === nick) {
      return {
        link: markedUsers[i].link,
        nick: markedUsers[i].nick,
        label: markedUsers[i].label,
        color: markedUsers[i].color,
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
export const getDefaultBadgeColorFromSettings = () => settings.BADGE.DEFAULT_COLOR;