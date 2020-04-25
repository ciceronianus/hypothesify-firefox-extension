// content.script

// content-script.js

function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function notifyBackgroundPage(e) {
  var sending = browser.runtime.sendMessage({
    greeting: "Greeting from the content script"
  });
  sending.then(handleResponse, handleError);  
}

/* the loading */
let url = window.location.href;
console.log(url);

window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
});

window.addEventListener("click", notifyBackgroundPage);