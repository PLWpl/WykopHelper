import isPath from './pathCheck/index.js';
import { handleBadges } from './paths/main/badges.js';
import { handleSettings, handleWhSettings } from './paths/settings.js';
import { updateAlert } from './utils/updateAlert.js';
import { initSettings } from './init/storage.js';

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