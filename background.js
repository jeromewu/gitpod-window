/*
 * @ref: https://developer.chrome.com/extensions/commands
 * @ref: https://developer.chrome.com/extensions/browserAction
 */

chrome.commands.onCommand.addListener(function(command) {});
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    chrome.windows.create({
      url: `https://.gitpod.io/#${url}`,
      type: 'popup',
    });
  });
});
