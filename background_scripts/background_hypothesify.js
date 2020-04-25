
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

// getAnnotations();

async function getCurrentUrl(){
  var tabs = await browser.tabs.query({currentWindow: true, active: true});
  console.log("hello");
  getAnnotations(tabs);

}

function writeBadge(){

  browser.browserAction.setBadgeText({
    text: "1"
  });
}




