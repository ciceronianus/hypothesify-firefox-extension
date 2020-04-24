
function onUpdated(tab) {
  console.log(`Updated tab: ${tab.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}


function CurrentTabUrl(tabs) {
  let tab = tabs[0];
  let currentUrl = tab.url;
  return currentUrl;  
}


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

/*show Hiccup */
function showIframe (){

  browser.tabs.query({currentWindow: true, active: true}).then(showIframeResults, console.error);
  
  // browser.tabs.query({currentWindow: true, active: true}).then(logTabs, console.error);
}


  function showHiccupResults(tabs) {
    let tab = tabs[0];
    let currentUrl = tab.url;
    let urlAddresseValue = ':hiccup[:iframe {:width "100%",  :height "500", :src "' + 'https://via.hypothes.is/' + currentUrl + '"}]';
  
    document.getElementById("urlAddresse").value=  urlAddresseValue;
      
  
  }
  


  function showHiccup(){

    browser.tabs.query({currentWindow: true, active: true}).then(showHiccupResults, console.error);
    
    // browser.tabs.query({currentWindow: true, active: true}).then(logTabs, console.error);
  }


function copyTextUsingAPI(){
  var copyText = document.getElementById("urlAddresse");
   /* Select the text field */
   copyText.select();
   copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  /* Copy the text inside the text field */
  
  navigator.clipboard.write("bla").then(function() {
    /* clipboard successfully set */
  }, function() {
    /* clipboard write failed */
  });

}


document.getElementById("btn-opn").addEventListener("click", hypothesify);

document.getElementById("btn-iframe").addEventListener("click", showIframe);

document.getElementById("btn-hiccup").addEventListener("click", showHiccup);

// document.getElementById("urlAddresse").addEventListener("click", copyTextUsingAPI);
// document.getElementById("copyButton").addEventListener("click", copyTextUsingAPI);
