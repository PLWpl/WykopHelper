import isPath from './checks/path.js';
import { handleBadges } from './paths/main/badges.js';
import { handleDomainCheck } from './paths/main/domainChecker.js'
import { createSettingsPage, handleSettings } from './paths/settings.js';
import { updateAlert } from './utils/updateAlert.js';
import { initSettings } from './utils/handleLocalStorage';
import { highlightOp } from './paths/main/highlightOp.js';
import { warnOnReload } from './paths/main/warnOnReload.js';
import { embedOnPaste } from './paths/main/embedOnPaste.js';

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

if (isPath.main()) {
  handleBadges();
  warnOnReload();
  embedOnPaste();
}
if (isPath.settings()) {
  createSettingsPage();
}
if (isPath.whSettings()) {
  handleSettings();
}
if (isPath.thread()) {
  handleDomainCheck();
}
if (isPath.mirkoThread()) {
  highlightOp();
}