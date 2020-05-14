/*
========================================================================================
IMPORTANT NOTE: I am a beginner, so this code is far from perfect. You will probably find it quite messy. I apologize for the inconvenience. 

STRUCTURE OF THE CODE: 

The background script has the following parts:
- The most important is getAnnotations() - this function gets a number of PUBLIC annotations (!) from the "api.hypothes.is" for the givenUrl and updates the badge with the corresponding number.

The function getAnnotations() calls also the function removeHypothesisUrl() on the givenUrl - this removes "via.hypothes.is" url from the query. 

- The function getAnnotations() is being indirectly invoked by two different actions (and corresponding functions)
1) by updating the tab (like inserting a new url)
2) by focusing/activating the tab 


Inbetween, there is the function allowedUrl(givenUrl). At this moment, it only checks whether the user has checked the checkbox "Check for available public annotations". If not, the url is not sent to "api.hypothes.is" and the badge recieves a "x" mark. If yes, the function getAnnotations() is called and the url is then sent to "api.hypothes.is".

========================================================================================
*/



/* This function performs an important check whether the givenUrl can be processed and sent to "api.hypothes.is". 

At this moment, it only checks the settings "Check for available public annotations". In the future, it will also check the blacklist and whitelist of webpages.
*/
function allowedUrl(givenUrl){
  let url = givenUrl;
  function publicAnnotations(result){
    
    if (result.checked){
      /* Process the url */
      getAnnotations(givenUrl);
   
    } else {
      /* Don't process the url and change the badge*/
      browser.browserAction.setBadgeText({
        text: "×"
      });
    }
  }
  /* Getting the state of the checkbox "Check for available public annotations" from storage api */
  let getting = browser.storage.sync.get("checked");
  getting.then(publicAnnotations, onError);

}

/* This function removes "via.hypothes.is" from the url. It is the same function as in "hypothesify.js". It should be somehow merged in the future. */
function removeHypothesisUrl(url){
  let currentUrl = url;
  let hypothesisUrl = "https://via.hypothes.is/";
  let finalUrl = currentUrl.replace(hypothesisUrl,"");
  return finalUrl;

}


/* The most important function. It sends the url as part of the query to "api.hypothes.is".*/
async function getAnnotations(givenUrl) {
  /* Firstly, I have to be sure, that the givenUrl does not contain "via.hypothes.is" url - therefore I call the function removeHypothesisUrl(). */
  let url = removeHypothesisUrl(givenUrl); 
  
  /*Now I can create a query for "api.hypothes.is" and fetch it. */
  
  let APIkey = await browser.storage.sync.get("APIkey").then((result) => {return result["APIkey"]});
  let USERid = await browser.storage.sync.get("USERid").then((result) => {return result["USERid"]});;

  console.log(APIkey);
  console.log(USERid);
  

  let query = "https://api.hypothes.is/api/search?url=" + url;
  
  
  
  
  const fetchResult = fetch(query,  {
    method: "GET",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer  ${APIkey}` }
    });
  const response = await fetchResult;
  const jsonData = await response.json();
  
  /*The results contain ".total" - the total number of corresponding annotations on the webpage. */
  browser.browserAction.setBadgeText({
    text: jsonData.total.toString()
  });

  /* Currently unused: */
  /*If the number of annotations is higher than > 0 - display the number. If it is 0, display nothing. */

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


/* Here, I get the url if the tab is updated. It is quite straightforward. */
function tabUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.url) {
    console.log("Tab: " + tabId +
                " URL changed to " + changeInfo.url);
    allowedUrl(changeInfo.url);
  }
}

browser.tabs.onUpdated.addListener(tabUpdated);


/* It is more tricky to get the url of the tab, if it is just activated. */
function tabActivatedUrl(tabs) {
  let tab = tabs[0]; // Safe to assume there will only be one result
  allowedUrl(tab.url);
}

function tabActivated(){
  
  browser.tabs.query({currentWindow: true, active: true}).then(tabActivatedUrl, console.error);

}

browser.tabs.onActivated.addListener(tabActivated);


/* This function is invoked by the forceTheReload() function from the popup script Hypothesify.js . Basically, this function is called when the user changes the checkbox "Check for available annotations" or when the popup window is opened. If the user wishes to check for available annotations, this function calls the fuction "tabActivated". If not, it changes the badge to "x" and does notghing more.  */

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
