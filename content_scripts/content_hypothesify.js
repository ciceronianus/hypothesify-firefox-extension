// content.script

async function getCurrentUrl(){
  var tabs = await browser.tabs.query({currentWindow: true, active: true});
  console.log("hello");
  
  browser.runtime.sendMessage({tabsToSend: tabs});
}

console.log("main script");

getCurrentUrl();