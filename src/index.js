import isPath from './checks/path.js';
import { handleBadges } from './paths/main/badges.js';
import { handleDomainCheck } from './paths/main/domainChecker.js'
import { handleSettings, handleWhSettings } from './paths/settings.js';
import { updateAlert } from './utils/updateAlert.js';
import { initSettings } from './init/storage.js';
import { highlightOp } from './paths/main/highlightOp.js';

/**
   * Helper methods and functions, not directly related to the script's purpose
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
}
if (isPath.settings()) {
  handleSettings();
}
if (isPath.whSettings()) {
  handleWhSettings();
}
if (isPath.thread()) {
  handleDomainCheck();
}
if (isPath.mirkoThread()) {
  highlightOp();
}