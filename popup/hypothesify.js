/*STRUCTURE: 
!!! Important note: Since I am beginner, its structure is far from great. 

There are, basically, 3 PARTS:
PART 1 - core functions fulfilling the following core actions:
- opening/closing the webpage in via.hypothes.is
- creating <iframe>  
- creating <a href> 
- creating Markdown code
- creating :hiccup code (for Roam)  

Each of the actions is divided into two functions (unfortunately):
- First one gets the url of the current tab
- The second does the action. 

I know that this is not great. I will, hopefully, simplify it in future. 

PART 2 consists of additional functions:
- removeHypothesisUrl()
- selectAllText() - if the user clicks on the URL field in the popup, it selects all the text


PART 3 - non-functions - adding corresponding elements 

*/

/*PART 1 - core functions */

/* Opening the webpage in via.hypothes.is */
/* dealing with updates and erros */
function onUpdated(tab) {
  console.log(`Updated tab: ${tab.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

/*the code itself*/
function openInHypothesisResults(tabs) {
  

  let tab = tabs[0];
  let currentUrl = tab.url;
  let hypothesisUrl = "https://via.hypothes.is/";
  let finalUrl;
  
  /* If the webpage is already opened in hypothes.is, then remove the corresponding URL */
  if (currentUrl.includes(hypothesisUrl) == true) {
     finalUrl = currentUrl.replace(hypothesisUrl,"");
     
    
   } else {
      finalUrl = hypothesisUrl + currentUrl;
      
    }


  var updating = browser.tabs.update({url: finalUrl});
  updating.then(onUpdated, onError);  

  }
  
function openInHypothesis (){

  browser.tabs.query({currentWindow: true, active: true}).then(openInHypothesisResults, console.error);
  
  // browser.tabs.query({currentWindow: true, active: true}).then(logTabs, console.error);
}


function createIframeResults(tabs) {
  let tab = tabs[0];
  let currentUrl = removeHypothesisUrl(tab.url);
  let urlAddresseValue = "<iframe width='100%' height='300' src='" + "https://via.hypothes.is/" + currentUrl + "'/>";

  document.getElementById("urlAddresse").value=  urlAddresseValue;
    

  }

function createIframe (){

  browser.tabs.query({currentWindow: true, active: true}).then(createIframeResults, console.error);
  
  // browser.tabs.query({currentWindow: true, active: true}).then(logTabs, console.error);
}

/* Generates hiccup code - useful for Roam */
  function createHiccupResults(tabs) {
    let tab = tabs[0];
    let currentUrl = removeHypothesisUrl(tab.url);
    let urlAddresseValue = ':hiccup[:iframe {:width "100%",  :height "500", :src "' + 'https://via.hypothes.is/' + currentUrl + '"}]';
  
    document.getElementById("urlAddresse").value=  urlAddresseValue;
      
  
  }


  function createHiccup(){

    browser.tabs.query({currentWindow: true, active: true}).then(createHiccupResults, console.error);
    
    // browser.tabs.query({currentWindow: true, active: true}).then(logTabs, console.error);
  }


/* generates <a href >*/
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

/*Generates markdown*/
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

/* PART 2 - OTHER FUNCTIONS */
/* 
If the webpage is already opened in via.hypothes.is - makes sure that that there is not twice the URL to hypothes.is

I always call this function for url obtained from the tab. If there is no "via.hypothes.is" present, the function does not do nothing. I find it, however, easier to do it in this way than always perform a check with "if condition". 

*/
function removeHypothesisUrl(url){
  let currentUrl = url;
  let hypothesisUrl = "https://via.hypothes.is/";
  let finalUrl = currentUrl.replace(hypothesisUrl,"");

  return finalUrl;

}

/* Select all the text when clicked on input=text URL */
function selectAllText(){
  var inputText = document.getElementById("urlAddresse");
   /* Select the text field */
   inputText.select();
   inputText.setSelectionRange(0, 99999); /*For mobile devices*/
  /* Copy the text inside the text field */
 

}


/* PART 3 - ASSIGNMENT OF LISTENERS */
document.getElementById("btn-opn").addEventListener("click", openInHypothesis);

document.getElementById("btn-href").addEventListener("click", createHref);
document.getElementById("btn-md").addEventListener("click", createMd);

document.getElementById("btn-iframe").addEventListener("click", createIframe);

document.getElementById("btn-hiccup").addEventListener("click", createHiccup);

document.getElementById("urlAddresse").addEventListener("click", selectAllText);

// document.getElementById("copyButton").addEventListener("click", selectAllText);


