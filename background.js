/*
 * Window popup using page action
 *
 * @ref: https://developer.chrome.com/extensions/pageAction
 * @ref: https://developer.chrome.com/extensions/examples/api/pageAction/set_icon.zip
 * This is a workaround to make sure chrome.pageAction.onClicked works.
 *
 * The idea here to to force popup to show on GitHub and GitLab pages,
 * but as we don't assign popup, it fails and called onClicked.
 * If we don't do this, onClicked won't be triggered.
 */

const forcePopup = ({ id, url }) => {
  if (/https?:\/\/(github|gitlab).com\/*\/*/.test(url)) {
    chrome.pageAction.show(id);
  }
};

chrome.tabs.onSelectionChanged.addListener((tabId) => {
  chrome.tabs.get(tabId, forcePopup);
});

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  forcePopup(tabs[0]);
});

chrome.pageAction.onClicked.addListener((tab) => {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
    const { url } = tabs[0];
    chrome.windows.create({
      url: `https://.gitpod.io/#${url}`,
      type: 'popup',
    });
  });
});

/*
 * Shortcut handling
 *
 * @ref: https://developer.chrome.com/extensions/commands
 */

const handleCommand = (command) => {
  /*
   * Do nothing.
   */
};

const toggleCommandListener = ({ id, url }) => {
  if (/https?:\/\/*.*.gitpod.io\/*/.test(url)) {
    chrome.commands.onCommand.addListener(handleCommand);
    return;
  /*
   * Check and remove listener when user are not in a
   * gitpod workspace
   */
  } else if (chrome.commands.onCommand.hasListener(handleCommand)) {
    chrome.commands.onCommand.removeListener(handleCommand);
  }
};

chrome.tabs.onSelectionChanged.addListener((tabId) => {
  chrome.tabs.get(tabId, toggleCommandListener);
});

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  toggleCommandListener(tabs[0]);
});
