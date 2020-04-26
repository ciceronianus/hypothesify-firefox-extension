/*
IMPORTANT NOTE: I am beginner, so this code is far from perfect. 

This background code has following parts:
- The most important is getAnnotations() - this function gets number of PUBLIC annotations (!) from the api.hypothes.is for the givenUrl and updates the badge with the corresponding number.

The function getAnnotations() calls also the function removeHypothesisUrl on the givenUrl - this removes possible via.hypothes.is url from the query. 

- The function getAnnotations() is being invoked by two different actions (and corresponding functions)
1) by updating the tab (like inserting a new url)
2) by focusing the tab (like activating a tab)

Both seem to be necessary to me for the right function of the updating of the badge. 

*/


/* Important check whether the givenUrl can be processed and sent to api.hypothes.is.
At this moment, it only checks the settings "Check available public annotations", in future, it will also check the blacklist and whitelist of webpages.
*/
function allowedUrl(givenUrl){
  let url = givenUrl;
  
  function publicAnnotations(result){
    
    if (result.checked){
      /* Process further */
      getAnnotations(givenUrl);
   

    } else {
      /* Don't process */
      browser.browserAction.setBadgeText({
        text: "×"
      });
    }


  }


  
  
  /* getting the state of the checkbox "Check available public annotations" from storage api */
  let getting = browser.storage.sync.get("checked");
  getting.then(publicAnnotations, onError);

}

/* This is the same function as in "hypothesify.js" - it should be somehow merged in future */
function removeHypothesisUrl(url){
  let currentUrl = url;
  let hypothesisUrl = "https://via.hypothes.is/";
  let finalUrl = currentUrl.replace(hypothesisUrl,"");
  return finalUrl;

}

async function getAnnotations(givenUrl) {
  /* Firstly, I have to be sure, that the givenUrl does not contain "via.hypothes.is" url - therefore I call the function removeHypothesisUrl() */
  let url = removeHypothesisUrl(givenUrl); 
  
  /*Now I can create a query for api.hypothes.is and fetch it */
  let query = "https://api.hypothes.is/api/search?url=" + url;
  const fetchResult = fetch(query);
  const response = await fetchResult;
  const jsonData = await response.json();
  
  browser.browserAction.setBadgeText({
    text: jsonData.total.toString()
  });

  /* Currently unused: */
  /*The results contain ".total" - the total number of corresponding annotations on the webpage. If the number of annotations is higher than > 0 - display the number. If it is 0, display nothing. */

  // if (jsonData.total > 0) {
  // browser.browserAction.setBadgeText({
  //   text: jsonData.total.toString()
  // });
  // } else {
  //   browser.browserAction.setBadgeText({
  //     text: "0"
  //   });

  // }
}

/* if the tab is updated, it is quite easy to get its url with onUpdated function */

function tabUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.url) {
    console.log("Tab: " + tabId +
                " URL changed to " + changeInfo.url);
    allowedUrl(changeInfo.url);
  }
}

browser.tabs.onUpdated.addListener(tabUpdated);


/* It is more tricky to get the url of the tab, if it is just activate */
function tabActivatedUrl(tabs) {
  let tab = tabs[0]; // Safe to assume there will only be one result
  allowedUrl(tab.url);
}

function tabActivated(){
  
  browser.tabs.query({currentWindow: true, active: true}).then(tabActivatedUrl, console.error);

}

browser.tabs.onActivated.addListener(tabActivated);


function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " +
    request.checked);
  sendResponse({response: "Response from background script"});
  if (request.checked)
    {
     tabActivated(); 

    }
  else {
    browser.browserAction.setBadgeText({
      text: "×"
      });

  }


  
}

browser.runtime.onMessage.addListener(handleMessage);

/* handlichg of errors etc. */

function onError(error) {
  console.log(`Error: ${error}`);
}
