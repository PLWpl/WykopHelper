import { injectScripts } from './utils/injectVendors.js';
import { mainFunctionality } from './paths/main/badges.js';
import { isPathForMain } from './pathCheck/index.js';
import { updateAlert } from './utils/updateAlert.js';

/**
   * Helper methods and functions, not directly related to the script's purpose
   */
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
//injects vendor scripts
setTimeout(injectScripts, 100)

setTimeout(()=>{
  //shows alert if app has been updated
  updateAlert();


  if (isPathForMain()) {
    mainFunctionality();
  }
}, 350);

