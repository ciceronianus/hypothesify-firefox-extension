
async function getAnnotations(tabs) {
  let tab = tabs[0];
  let url = tab.url;
  
  
  let query = "https://api.hypothes.is/api/search?url=" + url;
  
  const fetchResult = fetch(query);
  const response = await fetchResult;
  const jsonData = await response.json();
  // console.log(jsonData);
  browser.browserAction.setBadgeText({
    text: jsonData.total.toString()
  });
}



function writeBadge(){

  browser.browserAction.setBadgeText({
    text: "1"
  });
}

function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " +
    request.greeting);
  sendResponse({response: "Response from background script"});
}

// background-script.js

function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " +
    request.greeting);
  sendResponse({response: "Response from background script"});
}

browser.runtime.onMessage.addListener(handleMessage);


