let windowId = 0;

const CONTEXT_MENU_ID = "contextMenu";
const CONTEXT_MENU_TITLE = "My menu context";
const chromeWindows = chrome.windows;

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener((_tab) => {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let activeTab = tabs[0];
    // chrome.tabs.sendMessage(activeTab.id, { message: "clicked_browser_action" });
    ensureSendMessage(activeTab.id, { click: true });
  });
});

// Create Menu context
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: CONTEXT_MENU_TITLE,
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  // ensureSendMessage(tab.id, { contextMenu: true, screen, chromeWindows });
  popWindow("open", screen, chromeWindows);
});

const ensureSendMessage = (tabId, message, callback) => {
  chrome.tabs.sendMessage(tabId, { ping: true }, (response) => {
    console.log(response);
    if (response && response.pong) {
      // Content script ready
      chrome.tabs.sendMessage(tabId, message, callback);
    } else {
      // No listener on the other end
      console.log("Injecting script programmatically");
    }
  });
};

// window
function closeWindowsIfExist(chromeWindows) {
  if (windowId > 0) {
    chromeWindows.remove(windowId);
    windowId = chromeWindows.WINDOW_ID_NONE;
  }
};

function popWindow(type, screen, chromeWindows) {
  closeWindowsIfExist(chromeWindows);
  let width = 1000;
  let height = 800;
  const options = {
    type: "popup",
    left: screen.width / 2 - width / 2,
    top: screen.height / 2 - height / 2,
    width,
    height,
  };
  if (type === "open") {
    options.url = "https://google.com";
    chromeWindows.create(options, (win) => {
      windowId = win.id;
    });
  }
};
