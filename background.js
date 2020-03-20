/*
 * @ref: https://developer.chrome.com/extensions/commands
 */

chrome.commands.onCommand.addListener(function(command) {});

/*
 * @ref: https://developer.chrome.com/extensions/pageAction
 * @ref: https://developer.chrome.com/extensions/examples/api/pageAction/set_icon.zip
 * This is a workaround to make sure chrome.pageAction.onClicked works.
 *
 * The idea here to to force popup to show on GitHub and GitLab pages,
 * but as we don't assign popup, it fails and called onClicked.
 * If we don't do this, onClicked won't be triggered.
 */
function forcePopup({ id, url }) {
  if (/https?:\/\/(github|gitlab).com\/*\/*/.test(url)) {
    chrome.pageAction.show(id);
  }
}

chrome.tabs.onSelectionChanged.addListener(function(tabId) {
  chrome.tabs.get(tabId, forcePopup);
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  forcePopup(tabs[0]);
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
    var url = tabs[0].url;
    chrome.windows.create({
      url: `https://.gitpod.io/#${url}`,
      type: 'popup',
    });
  });
});
