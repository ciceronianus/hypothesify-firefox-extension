/*main script*/

/* remove surplus "via.hypothes.is" */
function removeHypothesisUrl(url){
  let currentUrl = url;
  let hypothesisUrl = "https://via.hypothes.is/";
  let finalUrl = currentUrl.replace(hypothesisUrl,"");

  return finalUrl;

}


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
  let hypothesisUrl = "https://via.hypothes.is/";
  let finalUrl;
  

  if (currentUrl.includes(hypothesisUrl) == true) {
     finalUrl = currentUrl.replace(hypothesisUrl,"");
     
    
   } else {
      finalUrl = hypothesisUrl + currentUrl;
      
    }


  var updating = browser.tabs.update({url: finalUrl});
  updating.then(onUpdated, onError);  

  }

function hypothesify (){

  browser.tabs.query({currentWindow: true, active: true}).then(openNewHypothesis, console.error);
  
  // browser.tabs.query({currentWindow: true, active: true}).then(logTabs, console.error);
}

function writeInUrlAddresseValue(AddresseValue){
  let textTobeInserted = AddresseValue;
  document.getElementById("urlAddresse").value= textTobeInserted;


}


function showIframeResults(tabs) {
  let tab = tabs[0];
  let currentUrl = removeHypothesisUrl(tab.url);
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
    let currentUrl = removeHypothesisUrl(tab.url);
    let urlAddresseValue = ':hiccup[:iframe {:width "100%",  :height "500", :src "' + 'https://via.hypothes.is/' + currentUrl + '"}]';
  
    document.getElementById("urlAddresse").value=  urlAddresseValue;
      
  
  }
  


  function showHiccup(){

    browser.tabs.query({currentWindow: true, active: true}).then(showHiccupResults, console.error);
    
    // browser.tabs.query({currentWindow: true, active: true}).then(logTabs, console.error);
  }

/*only selecting the text */
function copyTextUsingAPI(){
  var copyText = document.getElementById("urlAddresse");
   /* Select the text field */
   copyText.select();
   copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  /* Copy the text inside the text field */
 

}


function createHrefResults(tabs){
  let tab = tabs[0];
  let currentUrl = removeHypothesisUrl(tab.url);
  let currentTitle = tab.title;
  let urlAddresseValue = '<a href="' + 'https://via.hypothes.is/' + currentUrl + '">' + currentTitle + '</a>';

  document.getElementById("urlAddresse").value=  urlAddresseValue;

}

function createHref(){
  browser.tabs.query({currentWindow: true, active: true}).then(createHrefResults, console.error);


}

function createMdResults(tabs){
  let tab = tabs[0];
  let currentUrl = removeHypothesisUrl(tab.url);
 
  let currentTitle = tab.title;
  let urlAddresseValue = '[' + currentTitle + '](' + 'https://via.hypothes.is/' + currentUrl + ')';


  
  document.getElementById("urlAddresse").value=  urlAddresseValue;

}

function createMd(){
  browser.tabs.query({currentWindow: true, active: true}).then(createMdResults, console.error);


}

document.getElementById("btn-opn").addEventListener("click", hypothesify);

document.getElementById("btn-href").addEventListener("click", createHref);
document.getElementById("btn-md").addEventListener("click", createMd);

document.getElementById("btn-iframe").addEventListener("click", showIframe);

document.getElementById("btn-hiccup").addEventListener("click", showHiccup);

document.getElementById("urlAddresse").addEventListener("click", copyTextUsingAPI);

// document.getElementById("copyButton").addEventListener("click", copyTextUsingAPI);


