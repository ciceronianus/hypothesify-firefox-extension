

function onError(error) {
  console.log(`Error: ${error}`);
}
// restores options 

// document.querySelectorAll('.checkbox').forEach(item => {
//   console.log("kk");
//   item.addEventListener("DOMContentLoaded", event => {
//     console.log("start");
    
    

//    });


// });

document.querySelectorAll('.checkbox').forEach(item => {
  browser.storage.sync.get(item.id).then((result) => {item.checked = result[item.id] || true; 
  console.log("Results" + result);
  });
  
  console.log(item.id);
  item.addEventListener("change", event => {
    console.log(item.checked);
    // let getting = browser.storage.sync.get(item);
    // getting.then(result => {item.checked = result.item || "blue";}, onError);
    /* See Computed property names in ES6, you could use */ 


    browser.storage.sync.set({
      [item.id]: item.checked
    }).then(() => {console.log("finished")});

  });


});
