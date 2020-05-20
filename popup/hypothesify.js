/*
=======================================================================================
IMPORTANT NOTE: I am a beginner, so this code is far from perfect. You will probably find it quite messy. I apologize for the inconvenience. 

STRUCTURE OF THE CODE: 

PART 1 - core functions fulfilling the following actions:
- opening/closing the webpage in via.hypothes.is
- creating a link 
- creating <iframe>  
- creating <a href> 
- creating Markdown code
- creating code for Roam   

When the user clicks on a button, the intermediate function "getCurrenUrlCrosroad" is called. This function serves as a crossroad: 1) it obtains the current url of the active tab, 2) it gets the id of the button that was pressed and calls the appropriate function (creating <iframe>, creating <a href> etc.). 

PART 2 - additional functions:
- removeHypothesisUrl() - removes "via.hypothes.is" url from the current URL. This ensures that "via.hypothes.is" url does not appear twice in the generated code if the user clicks on the button when "via.hypothes.is" is already activated. 
- selectAllText() - if the user clicks on the "generatedCodeField" in the popup, it selects all the text
- functions handling updates and errors

PART 3 - non-functions - adding corresponding listeners to elements in the popup. 

PART 4 - related to the checkbox "Check for available annotations".  
This part serves the sole purpose to allow the user to activate/deactivate the automatic searching for available public annotations for hypothes.is. 

=======================================================================================

/*PART 1 - CORE FUNCTIONS */

/* Opening the webpage in "via.hypothes.is" */
function openInHypothesisResults(tabs) {

  let tab = tabs[0];
  let currentUrl = tab.url;
  let hypothesisUrl = "https://via.hypothes.is/";
  let finalUrl;

  /* If the webpage is already opened in "via.hypothes.is", then remove the corresponding URL */
  if (currentUrl.includes(hypothesisUrl) == true) {
    finalUrl = currentUrl.replace(hypothesisUrl, "");
  } else {
    finalUrl = hypothesisUrl + currentUrl;
  }


  var updating = browser.tabs.update({ url: finalUrl });
  updating.then(onUpdated, onError);

}


/* Generates a link */
function createLinkResults(tabs) {
  let tab = tabs[0];
  let currentUrl = removeHypothesisUrl(tab.url);

  let generatedCode = 'https://via.hypothes.is/' + currentUrl;

  document.getElementById("generatedCodeField").value = generatedCode;

}

/* Generates <a href> code */
function createHrefResults(tabs) {
  let tab = tabs[0];
  let currentUrl = removeHypothesisUrl(tab.url);
  let currentTitle = tab.title;
  let generatedCode = '<a href="' + 'https://via.hypothes.is/' + currentUrl + '">' + currentTitle + '</a>';

  document.getElementById("generatedCodeField").value = generatedCode;

}


/*Generates markdown*/
function createMdResults(tabs) {
  let tab = tabs[0];
  let currentUrl = removeHypothesisUrl(tab.url);

  let currentTitle = tab.title;
  let generatedCode = '[' + currentTitle + '](' + 'https://via.hypothes.is/' + currentUrl + ')';



  document.getElementById("generatedCodeField").value = generatedCode;

}


/* Generates <iframe> code */
function createIframeResults(tabs) {
  let tab = tabs[0];
  let currentUrl = removeHypothesisUrl(tab.url);
  let generatedCode = "<iframe width='100%' height='300' src='" + "https://via.hypothes.is/" + currentUrl + "'/>";

  document.getElementById("generatedCodeField").value = generatedCode;


}


/* Generates :hiccup [:iframe] code - useful for Roam :) */
function createHiccupResults(tabs) {
  let tab = tabs[0];
  let currentUrl = removeHypothesisUrl(tab.url);
  let generatedCode;
  if (currentUrl.endsWith(".pdf")) {

    generatedCode = `{{pdf: https://via.hypothes.is/${currentUrl}}}`
    }
    else {
      generatedCode = `{{iframe: https://via.hypothes.is/${currentUrl}}}`

    }
  // let generatedCode = ':hiccup[:iframe {:width "100%",  :height "500", :src "' + 'https://via.hypothes.is/' + currentUrl + '"}]';

  document.getElementById("generatedCodeField").value = generatedCode;


}

// function createRoamResults(tabs) {
//   let tab = tabs[0];
//   let currentUrl = removeHypothesisUrl(tab.url);
//   let generatedCode = '{{:hiccup[:iframe {:width "100%",  :height "500", :src "' + 'https://via.hypothes.is/}}' + currentUrl + '"}]';

//   document.getElementById("generatedCodeField").value = generatedCode;


// }



// function createPdfResults(tabs) {
//   let tab = tabs[0];
//   let currentUrl = removeHypothesisUrl(tab.url);
//   let generatedCode = '{{pdf: https://via.hypothes.is/' + currentUrl + '}}';

//   document.getElementById("generatedCodeField").value = generatedCode;


// }

/* Gets the url and redirects to other functions */
async function getCurrentUrlCrossroad(){
  let tabs = await  browser.tabs.query({ currentWindow: true, active: true });
  
  /* redirection */
  let redirect  = this.getAttribute("id");
  switch(redirect) {
    case "btn-opn":
      openInHypothesisResults(tabs);
      break;

    
    case "btn-link":
      createLinkResults(tabs);
      break;
    
    
    case "btn-href":
      createHrefResults(tabs);
      break;

      case "btn-md":
        createMdResults(tabs);
        break;
  
    
      case "btn-iframe":
        createIframeResults(tabs);
        break;
    case "btn-hiccup":
          createHiccupResults(tabs);
          break;
    // case "btn-pdf":
    //   createPdfResults(tabs);
    //   break;
    default:
      // code block
  } 
  

}



/* PART 2 - OTHER FUNCTIONS */

/* removeHypothesisUrl (url)
If the webpage is already opened in "via.hypothes.is", it makes sure that that the url "via.hypothes.is" does not appear twice in the generated code.

I always call this function for any url obtained from a tab. If there is no "via.hypothes.is" present in url, the function does nothing. 
*/

function removeHypothesisUrl(url) {
  let currentUrl = url;
  let hypothesisUrl = "https://via.hypothes.is/";
  let finalUrl = currentUrl.replace(hypothesisUrl, "");
  return finalUrl;
}

/* Selects all the text when clicked on <input type="text"> Code */
function selectAllText() {
  var inputText = document.getElementById("generatedCodeField");
  inputText.select();    /* Selects the text field */
  inputText.setSelectionRange(0, 99999); /*For mobile devices*/
}



/* deals with updates and erros */
function onOpened() {
  console.log(`Options page opened`);
}

function onUpdated(tab) {
  console.log(`Updated tab: ${tab.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}



/* PART 3 - ASSIGNMENT OF LISTENERS */

/* This script decides whether an element should be shown or not */
document.querySelectorAll('li.btn').forEach(item => {
  // console.log(item.id);
  
  browser.storage.sync.get(item.id).then((result) => {
    if (result[item.id] == false) {
      item.style.display = "none";
      

    } else {
      item.style.display = "";
      

    } 
 
  
  });
  
  


});




document.getElementById("btn-opn").addEventListener("click", getCurrentUrlCrossroad);

document.getElementById("btn-link").addEventListener("click", getCurrentUrlCrossroad);

document.getElementById("btn-href").addEventListener("click", getCurrentUrlCrossroad);

document.getElementById("btn-md").addEventListener("click", getCurrentUrlCrossroad);

document.getElementById("btn-iframe").addEventListener("click", getCurrentUrlCrossroad);

document.getElementById("btn-hiccup").addEventListener("click", getCurrentUrlCrossroad);

// document.getElementById("btn-pdf").addEventListener("click", getCurrentUrlCrossroad);


document.getElementById("generatedCodeField").addEventListener("click", selectAllText);

/*for the export button */
document.getElementById("btn-export").addEventListener("click",() => {
  browser.tabs.query({ currentWindow: true, active: true }).then(tabs => {
    let tab = tabs[0];
    const title = tab.title;
    
    let currentUrl = removeHypothesisUrl(tab.url);
    // console.log(currentUrl.substr(-1));

    /* removes last "/" if present */
    if (currentUrl.substr(-1) == "/") {
      currentUrl = currentUrl.substring(0, currentUrl.length - 1);

    }
    
    let finalUrl = encodeURI("../export_page/export_page.html?url=" + currentUrl + "&title=" + title + "");
    
    console.log(`Final url: ${finalUrl}`);

    var creating = browser.tabs.create({
      url:`${finalUrl}`
    });
    creating.then(()=> {console.log("export");}, (error) => {console.log("error")});


        })

 

  


});


/* For future - LINK TO OPTIONS*/
// document.getElementById("btn-options").addEventListener("click", openOptions);



/* PART 4 - THE CHECKBOX */
/*handling message - only for debugging - checking whether the communication between the background script and the popup script works*/
function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}


/* This function forces the reload of the process in the background script that checks the availability of public annotations. It is called when the popup windows is opened or when the state of the checkbox is changed. */ 
function forceTheReload(checkedBox) {
  var sending = browser.runtime.sendMessage({
    checked: checkedBox
  });
  sending.then(handleResponse, onError);
}

/* Restores the last saved option. This function is called on every opening of the popup because the popup script hypothesify.js restarts with every opening of this window (unlike the background script that runs all the time).*/ 
function restoreOptions() {

  function setCurrentChoice(result) {
    if (result.checked) {
      let att = document.createAttribute("checked");
      att.value = "checked";
      document.getElementById("checkUrl").setAttributeNode(att);
      forceTheReload(true);
    } else {
      forceTheReload(false);
    }
  }
  // function onError(error) {
  //   console.log(`Error: ${error}`);
  // }

/* loads the last checked value */
let getting = browser.storage.sync.get("checked");
getting.then(setCurrentChoice, onError);
}

/* restoreOptions() is called every time the popup window is opened. */
document.addEventListener("DOMContentLoaded", restoreOptions);


/* This function is being called when there is a change in the state of the checkbox. */
function checkedUrl() {
  if (document.getElementById("checkUrl").checked) {
    // Checkbox is checked
    browser.storage.sync.set({
      checked: true
    });
    forceTheReload(true);
  } else {
    // Checkbox is not checked
    browser.storage.sync.set({
      checked: false
    });
    forceTheReload(false);
  }

}

document.getElementById("checkUrl").addEventListener("change", checkedUrl);

