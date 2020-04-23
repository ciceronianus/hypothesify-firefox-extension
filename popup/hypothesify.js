
function onUpdated(tab) {
  console.log(`Updated tab: ${tab.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}



// verbose variant
function CurrentTabUrl(tabs) {
  let tab = tabs[0];
  let currentUrl = tab.url;
  return currentUrl;
  // let tab = tabs[0]; // Safe to assume there will only be one result
  // let activeUrl = tab.url;
  // let hypothesisUrl = "https://via.hypothes.is/";
  // let newUrl = hypothesisUrl + activeUrl;
  
  // console.log(tabs[0].id);

  // var updating = browser.tabs.update({url: "https://via.hypothes.is/" +  tab.url});
  // updating.then(onUpdated, onError);

  // var creating = browser.tabs.create({
  //   url: newUrl
  // });
  // console.log(tab.url);
}

// function CurrentTabUrl(){
//   let currentUrlOfTab = browser.tabs.query({currentWindow: true, active: true}).then(tabs[0].url, console.error);
//   return currentUrlOfTab;
// }

/**
* Listen for clicks on the buttons, and send the appropriate message to
* the content script in the page.
*/



function openNewHypothesis(tabs) {
  let tab = tabs[0];
  let currentUrl = tab.url;
  
  var updating = browser.tabs.update({url: "https://via.hypothes.is/" +  currentUrl});
  updating.then(onUpdated, onError);  

  }

function hypothesify (){

  browser.tabs.query({currentWindow: true, active: true}).then(openNewHypothesis, console.error);
  
  // browser.tabs.query({currentWindow: true, active: true}).then(logTabs, console.error);
}

function showIframeResults(tabs) {
  let tab = tabs[0];
  let currentUrl = tab.url;
  let urlAddresseValue = "<iframe width='100%' height='300' src='" + "https://via.hypothes.is/" + currentUrl + "'/>";

  document.getElementById("urlAddresse").value=  urlAddresseValue;
    

  }

  function showHiccupResults(tabs) {
    let tab = tabs[0];
    let currentUrl = tab.url;
    let urlAddresseValue = ':hiccup[:iframe {:width "100%",  :height "500", :src "' + 'https://via.hypothes.is/' + currentUrl + '"}]';
  
    document.getElementById("urlAddresse").value=  urlAddresseValue;
      
  
    }
  

  function showIframe (){

    browser.tabs.query({currentWindow: true, active: true}).then(showIframeResults, console.error);
    
    // browser.tabs.query({currentWindow: true, active: true}).then(logTabs, console.error);
  }

  function showHiccup(){

    browser.tabs.query({currentWindow: true, active: true}).then(showHiccupResults, console.error);
    
    // browser.tabs.query({currentWindow: true, active: true}).then(logTabs, console.error);
  }

document.getElementById("btn-opn").addEventListener("click", hypothesify);

document.getElementById("btn-iframe").addEventListener("click", showIframe);

document.getElementById("btn-hiccup").addEventListener("click", showHiccup);

