import * as tingle from './vendor/tingle';

import isPath from './utils/checkPath';
import { handleBadges } from './modules/badges';
import { handleRemovalOfBlacklisted, handleBlacklistedProfile } from './modules/handleBlacklist';
import { displayBadgeInUserProfile } from './modules/badges/displayInUserProfile';
import { handleDomainCheck } from './modules/domainChecker'
import { hideMarkedUsers } from './modules/hideMarkedUsers'
import { createSettingsPage, handleSettings } from './modules/settings';
import { updateAlert } from './utils/updateAlert';
import { initSettings } from './utils/handleLocalStorage';
import { highlightOp } from './modules/highlightOp';
import { warnOnReload } from './modules/warnOnReload';
import { embedOnPaste } from './modules/embedOnPaste';
import { removeWoodle } from './modules/removeWoodle';
import { removeCommentsByTag } from './modules/removeCommentsByTag';
import { removeAllComments } from './modules/removeAllComments';
import { removePostedViaApp } from './modules/removePostedViaApp';
import { fixYoutubeLinks } from './modules/fixYoutubeLinks';

/**
* Capitalize first letter
*/
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

//shows alert if app has been updated
updateAlert();

//initializes settings if none found
initSettings();

if (isPath.sitewide()) {
  removeWoodle();
}
if (isPath.main()) {
  handleBadges();
  handleRemovalOfBlacklisted();
  warnOnReload();
  embedOnPaste();
  hideMarkedUsers();
  removePostedViaApp();
  fixYoutubeLinks();
}
if (isPath.userProfile()) {
  displayBadgeInUserProfile();
  handleBlacklistedProfile();
}
if (isPath.settings()) {
  createSettingsPage();
}
if (isPath.whSettings()) {
  handleSettings();
}
if (isPath.thread()) {
  handleDomainCheck();
  removeCommentsByTag();
  removeAllComments();
}
if (isPath.mirkoThread()) {
  highlightOp();
}