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

/* Definition of constant */
/* to be changed - to be put into settings */
const APIKEYhypo = "6879-7UnkOVwjyJTw7EnCky1LrdhdMa8wJGBfFhmwftbfzKM";
const USERIDhypo = "Ciceronianus";
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
  const url = document.getElementById("inpUrl").value;
  const title = document.getElementById("inpTitle").value;
  const query = `https://api.hypothes.is/api/search?url=${url}&user=${USERIDhypo}`;
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


      /* Constructing the array of objects */
     

      let collectionOfAnnotations = [];
     
      for (i = 0, l = data.rows.length; i < l; i++) {
         console.log(data.rows[i].target[0].selector[1].start);
        let array = data.rows[i].target[0].selector;
        console.log(array);
        let obj = array.find(o => o.type === "TextQuoteSelector");
        console.log(obj);
        let annotationBlock = {
          highlight: data.rows[i].target[0].selector[2].exact,
          annotation: data.rows[i].text,
          tags: data.rows[i].tags,
          place: data.rows[i].target[0].selector[1].start,
          link: data.rows[i].links.incontext
        };
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
<ul><li>Annotation::${element.annotation}</li><li>Link:: [Link](${element.link})</li><li>Tags:: ${element.tags.map(elmt => `#${elmt}, `).join('')}</li></ul></li>`
          list.innerHTML = list.innerHTML + markup;
      });

      /*appending headline and starting the list */
      document.getElementById("exportDiv").appendChild(heading);
      document.getElementById("exportDiv").appendChild(list);
    
     
     
      // for (i = 0, l = data.rows.length; i < l; i++) {
      //   let annotation = document.createElement("li");
      //   annotation.id = "highlight-" + i;
      //   let contentList = document.createElement("ul");
      //   let comment = document.createElement("li");
      //   let tagsList = document.createElement("li");
      //   annotation.innerHTML = "Highlight:: " + data.rows[i].target[0].selector[2].exact;
      //   comment.innerHTML = "Annotation:: " + data.rows[i].text;
      //   let annotationBlock = {
      //     annotation: data.rows[i].target[0].selector[2].exact,
      //     comment: data.rows[i].text,
      //     tags: data.rows[i].tags,
      //     place: data.rows[i].target[0].selector[1].start,
      //     link: data.rows[i].links.incontext
      //   };
      //   collectionOfAnnotations.push(annotationBlock);
      //   console.log(annotationBlock);
      //   let tags = "Tags:: ";
      //   for (j = 0, m = data.rows[i].tags.length; j < m; j++) {
      //     tags = tags + "#" + data.rows[i].tags[j] + " ";
      //   }
      //   tagsList.innerHTML = tags;
      //   contentList.appendChild(comment);
      //   contentList.appendChild(tagsList);
      //   annotation.appendChild(contentList);
      //   document.getElementById("exportList").appendChild(annotation);
      // }
    
    });
}
// APIcall(query);


