/*
========================================================================================
IMPORTANT NOTE: I am a beginner, so this code is far from perfect. You will probably find it quite messy. I apologize for the inconvenience. 

STRUCTURE OF THE CODE: 




========================================================================================
*/


// Just for handling errors
function onError(error) {
  console.log(`Error: ${error}`);
}

/* Activating / deactivating functions */
/* restoring saved checkbox - only in the table with #menuItems */
document.querySelectorAll('#menuItems .checkbox').forEach(item => {
  console.log(item);
  browser.storage.sync.get(item.id).then((result) => {item.checked = result[item.id] || true; 
  // console.log("Results" + result);
  });
  
  // console.log(item.id);
  item.addEventListener("change", event => {
    // console.log(item.checked);
    // let getting = browser.storage.sync.get(item);
    // getting.then(result => {item.checked = result.item || "blue";}, onError);
    /* See Computed property names in ES6, you could use */ 

    browser.storage.sync.set({
      [item.id]: item.checked
    }).then(() => {console.log("finished")});

  });


});


/*Hypothesis account */

function USERidrestore (){
  console.log("loading USERid");
  browser.storage.sync.get("USERid").then((result) => 
    {document.getElementById("USERid").value = result["USERid"] || ""; 
    console.log(result);
    })
  
  }

  function APIkeyRestore (){
    console.log("loading APIkey");
    browser.storage.sync.get("APIkey").then((result) => 
      {document.getElementById("APIkey").value = result["APIkey"] || ""; 
      console.log(result);
      })
    
    }

    function PrivacyRestore (){
      console.log("loading Privacy settins");
      browser.storage.sync.get("APIkey").then((result) => 
        {document.getElementById("APIkey").value = result["APIkey"] || ""; 
        console.log(result);
        })
      
      }

  USERidrestore();
  APIkeyRestore();




/*handling message - only for debugging - checking whether the communication between the background script and the popup script works*/
function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}
  /* This function forces the reload of the process in the background script that checks the availability of public annotations. */ 

function forceTheReload(checkedBox) {
  var sending = browser.runtime.sendMessage({
    checked: checkedBox
  });
  sending.then(handleResponse, onError);
}

function restoreOptions() {

  function setCurrentChoice(result) {
    console.log(result);
    if (result.checked) {
      let att = document.createAttribute("checked");
      att.value = "checked";
      document.getElementById("btn-annotations").setAttributeNode(att);
      forceTheReload(true);
    } else {
      console.log("nothing");

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
restoreOptions();


/* This function is being called when there is a change in the state of the checkbox. */
function checkedUrl() {
  if (document.getElementById("btn-annotations").checked) {
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

document.getElementById("btn-annotations").addEventListener("change", checkedUrl);



/* SAVE AND DELETE BUTTONS */

  document.getElementById("btn-save").addEventListener("click", (event) => {
    const USERid = document.getElementById("USERid").value;
    const APIkey = document.getElementById("APIkey").value;
  
    
    console.log(`USERid ${USERid} and APIkey ${APIkey}`);
    browser.storage.sync.set({
        "USERid" : USERid,
        "APIkey" : APIkey
        
          
      }).then(() => {
        console.log("Saved USERid and APIkey")
        document.getElementById('modalDataSave').style.display='block';
      });

    }
  );

  
  document.getElementById("btn-delete").addEventListener("click", (event) => {
    const USERid = "";
    const APIkey = "";
    console.log(`USERid ${USERid} and APIkey ${APIkey}`);
    browser.storage.sync.set({
        "USERid" : USERid,
        "APIkey" : APIkey
        
          
      }).then(() => {console.log("Deleted USERid and APIkey")});
    document.getElementById("USERid").value = "";
    document.getElementById("APIkey").value = "";  
    document.getElementById('modalDataDelete').style.display='block';
    }
  );


  
  document.querySelector('#modalDataDeleteClose').addEventListener("click", () =>{
    document.querySelector('#modalDataDelete').style.display = "none";
  
  
  })

  document.querySelector('#modalDataSaveClose').addEventListener("click", () =>{
    document.querySelector('#modalDataSave').style.display = "none";
  
  
  })