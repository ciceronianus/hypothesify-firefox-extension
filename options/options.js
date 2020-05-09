
// Just for handling errors
function onError(error) {
  console.log(`Error: ${error}`);
}

/* Activating / deactivating functions */
/* restoring saved checkbox */
document.querySelectorAll('.checkbox').forEach(item => {
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

  USERidrestore();
  APIkeyRestore();

  document.getElementById("btn-save").addEventListener("click", (event) => {
    const USERid = document.getElementById("USERid").value;
    const APIkey = document.getElementById("APIkey").value;
  
    
    console.log(`USERid ${USERid} and APIkey ${APIkey}`);
    browser.storage.sync.set({
        "USERid" : USERid,
        "APIkey" : APIkey
        
          
      }).then(() => {console.log("Saved USERid and APIkey")});

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
    }
  );
