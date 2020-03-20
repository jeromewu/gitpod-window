/*
 * @ref: https://developer.chrome.com/extensions/commands
 * @ref: https://developer.chrome.com/extensions/browserAction
 */

chrome.commands.onCommand.addListener(function(command) {});
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.windows.create({
    url: 'https://www.gitpod.io/',
    type: 'popup',
  });
});
