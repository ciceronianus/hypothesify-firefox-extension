/* Custom comparision function for the array */
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


/*place for exporting */
// let element = document.getElementById("exportDiv");
// console.log(element);

function USERidrestore (){
  console.log("loading USERid");
  browser.storage.sync.get("USERid").then((result) => 
    {document.getElementById("inpUSERid").value = result["USERid"] || ""; 
    console.log(result);
    })
  
  }

  function APIkeyRestore (){
    console.log("loading APIkey");
    browser.storage.sync.get("APIkey").then((result) => 
      {document.getElementById("inpAPIkey").value = result["APIkey"] || ""; 
      console.log(result);
      })
    
    }

  USERidrestore();
  APIkeyRestore();




/* Definition of constant */
/* to be changed - to be put into settings */
// const APIKEYhypo = "6879-7UnkOVwjyJTw7EnCky1LrdhdMa8wJGBfFhmwftbfzKM";
// const USERIDhypo = "Ciceronianus";
// const URLhypo = "http://teicat.huma-num.fr/"

const urlParams = new URLSearchParams(window.location.search);
const URLhypo = urlParams.get('url');
const URLtitle = urlParams.get('title');




const sorting = "place"; /* to be named in the same way as respective keys */

/*adding event listeners and default values */
document.getElementById("btn-export").addEventListener('click',exportHypothesis)
document.getElementById("inpUrl").value = URLhypo;
document.getElementById("inpTitle").value = URLtitle;

/*functions */

function exportHypothesis() {
  const USERIDhypo = document.getElementById("privateAnn").checked ? "&user=" + document.getElementById("inpUSERid").value : "";
  
  console.log(`UserId: ${USERIDhypo}`);
  
  const APIKEYhypo = document.getElementById("inpAPIkey").value;

  const url = document.getElementById("inpUrl").value;

  const title = document.getElementById("inpTitle").value;
  
  /*const query = `https://api.hypothes.is/api/search?url=${url}&user=${USERIDhypo}`;*/
  
  const query = `https://api.hypothes.is/api/search?url=${url}` + USERIDhypo;
  console.log(`Query: ${query}`);
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
        /*!!! causes problems */
        
        /*
        let array = data.rows[i].target[0].selector;
        let obj = array.find(o => o.type === "TextQuoteSelector");
        */
        console.log("check --");
        console.log(get(['rows', i, 'target', 0, 'selector', 2, 'exact'], data));

        
        let annotationBlock = {};
        annotationBlock.highlight = get(['rows', i, 'target', 0, 'selector', 2, 'exact'], data) || "";

        annotationBlock.annotation = data.rows[i].text || "";
        annotationBlock.tags = data.rows[i].tags || "";
        annotationBlock.place = get(['rows', i, 'target', 0, 'selector', 1, 'start'], data) || ""; 
        annotationBlock.link = get(['rows', i, 'links', 'incontext'], data) || "" ;


        // let annotationBlock = {
        //   highlight: data.rows[i].target[0].selector[2].exact,
        //   annotation: data.rows[i].text,
        //   tags: data.rows[i].tags,
        //   place: data.rows[i].target[0].selector[1].start,
        //   link: data.rows[i].links.incontext
        // };
        collectionOfAnnotations.push(annotationBlock);
       
      
      }
     
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


const get = (p, o) =>
  p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);