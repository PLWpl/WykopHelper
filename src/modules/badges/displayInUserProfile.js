import { $ } from "../../utils/dom";
import { DOM } from "../../constants/domSelectors";

import { badge } from "../../model/modules/badges.model";

import { isMarked, isNotAwarded } from "./check";
import { getNickData, getDefaultBadgeLabelFromSettings } from "./getters";

const { BADGE: EL } = DOM;

/**
 * This is responsible for displaying mark badge next to user's nickname in user's profile (wykop.pl/ludzie/XXXX).
 */
export const displayBadgeInUserProfile = () => {
  const nickElement = $(EL.SELECTOR.USER_PROFILE_NICK_ELEMENT);
  const nick = $(EL.SELECTOR.USER_PROFILE_NICK).textContent;
  const userData = getNickData(nick) ? getNickData(nick) : null;
  const label = userData ? userData.label : getDefaultBadgeLabelFromSettings();

  if (isMarked(nick) && isNotAwarded(nickElement)) {
    nickElement.insertAdjacentHTML("afterbegin", badge(nick, label, false));
  }
}