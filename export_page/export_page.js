/*
========================================================================================
IMPORTANT NOTE: I am a beginner, so this code is far from perfect. You will probably find it quite messy. I apologize for the inconvenience. 

STRUCTURE OF THE CODE: 




========================================================================================
*/

/* Definition of constant */
const urlParams = new URLSearchParams(window.location.search);
const URLhypo = urlParams.get('url');
const URLtitle = urlParams.get('title');


const sorting = "place"; /* to be named in the same way as respective keys */

/* Export appareance related constatans */
/* TO-DO - make it editable */ 
const prefixes = Object.freeze({
    highlight: "Highlight::",
    annotation: "Annotation::",
    link: "",
    tags: "Tags::"
      });


/*adding event listeners and default values */
document.getElementById("btn-export").addEventListener('click',exportHypothesis)
document.getElementById("inpUrl").value = URLhypo;
document.getElementById("inpTitle").value = URLtitle;


/* Restoring the options */
/* --- > Restore USER */
function USERidrestore (){
  console.log("loading USERid");
  browser.storage.sync.get("USERid").then((result) => 
    {document.getElementById("USERid").value = result["USERid"] || ""; 
    console.log(result);
    })
  
  }
/* --- > Restore APIkey */
  function APIkeyRestore (){
    console.log("loading APIkey");
    browser.storage.sync.get("APIkey").then((result) => 
      {document.getElementById("APIkey").value = result["APIkey"] || ""; 
      console.log(result);
      })
    
    }

  USERidrestore();
  APIkeyRestore();


/* opening Settings */
document.getElementById("btn-settings").addEventListener('click', () => {
  var opening = browser.runtime.openOptionsPage();
  opening.then(onOpened, onError);

});


// /* disable button if there is no user */
// document.getElementById("privateAnn").addEventListener('DOMContentLoaded', () => {
//   document.getElementById("privateAnn").disabled = document.getElementById("USERid") ? true : false;
//   console.log(document.getElementById("privateAnn"));

// });

// /* Saving options - does not work well now */
// document.getElementById("btn-save").addEventListener("click", (event) => {
//   const USERid = document.getElementById("USERid").value;
//   const APIkey = document.getElementById("APIkey").value;

  
//   console.log(`USERid ${USERid} and APIkey ${APIkey}`);
//   browser.storage.sync.set({
//       "USERid" : USERid,
//       "APIkey" : APIkey
      
        
//     }).then(() => {
//       console.log("Saved USERid and APIkey")
//       document.getElementById('modalDataSave').style.display='block';
//     });

//   }
// );




/* MAIN FUNCTION - exporting */

function exportHypothesis() {
  /* USERid > if privated annotations check, otherwise is USERid empty */
  const USERIDhypo = document.getElementById("USERid").value ? "&user=" + document.getElementById("USERid").value : "" ;
  
  
  console.log(`USERid: ${USERIDhypo}`);
  
  const APIKEYhypo = document.getElementById("APIkey").value;
  const url = document.getElementById("inpUrl").value;
  const title = document.getElementById("inpTitle").value;
  
  /*const query = `https://api.hypothes.is/api/search?url=${url}&user=${USERIDhypo}`;*/
  
  const query = `https://api.hypothes.is/api/search?url=${url}` + USERIDhypo;

  console.log(`Query: ${query}`);
  
  /*Getting the information */
  fetch(query, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer  ${APIKEYhypo}`
    }
  })
    .then(response => response.json())
    .then(data => {

      console.log("data");
      console.log(data);


      let collectionOfAnnotations = [];
      console.log("-------------------------------");
      for (i = 0, l = data.rows.length; i < l; i++) {
       
        
        let annotationBlock = {};
        annotationBlock.highlight = get(['rows', i, 'target', 0, 'selector', 2, 'exact'], data) || "";

        annotationBlock.annotation = data.rows[i].text || "";
        annotationBlock.tags = data.rows[i].tags || "";
        annotationBlock.place = get(['rows', i, 'target', 0, 'selector', 1, 'start'], data) || ""; 
        annotationBlock.link = get(['rows', i, 'links', 'incontext'], data) || "" ;

        collectionOfAnnotations.push(annotationBlock);
       
      
      }
      /* Sorting the annotation - using the function compare()*/
      collectionOfAnnotations.sort(compare);
      
      /* Creating basic elements */
      let heading = document.createElement("h1");
      let paragraph = document.createElement("p");
      let list = document.createElement("ul");
      
       /* heading - title */
      heading.innerHTML = `[${title}](${url})`;

      /*setting up elements */
      list.id = "exportList"; /*id of the list */
      
      

      console.log(data.rows.length);

      collectionOfAnnotations.forEach((element, index) => {
          const markup = `<li id="highlight-${index}">Highlight:: ${element.highlight}
<ul><li>Annotation::${element.annotation}</li><li>[Link](${element.link})</li><li>Tags:: ${element.tags.map(elmt => `#${elmt}, `).join('')}</li></ul></li>`
          list.innerHTML = list.innerHTML + markup;
      });

      /*appending headline and starting the list */
      document.getElementById("exportDiv").appendChild(heading);
      document.getElementById("exportDiv").appendChild(list);
    
    
    });
}



// APIcall(query);

/* ================= */
// ADDITIONAL FUNCTIONS 

// This allows for safe access of fields in the object 
const get = (p, o) =>
  p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);


  /* Custom comparision function for the array */
/* This function helps me to sort the output */
function compare(a, b) {
  const aItem = a.place;
  const bItem = b.place;

  let comparison = 0;
  if (aItem > bItem) {
      comparison = 1;
  } else if (aItem<bItem) {
    comparison = -1
  }
  return comparison;
}


/*Error control */
function onOpened() {
  console.log(`Options page opened`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}