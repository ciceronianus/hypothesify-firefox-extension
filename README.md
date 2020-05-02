# Hypothesify
## 🧐 What is Hypothesify?
Hypothesify is a small Firefox extension for the annotation tool [Hypothes.is](https://hypothes.is) that allows private and public annotation of any website or PDF. 

You can download it from [Firefox ADD-ONS](https://addons.mozilla.org/en-US/firefox/addon/hypothesify/).

Currently *(26th April 2020)*, there is no Firefox extension for this great tool. So I decided to make one as part of my learning process of JavaScript. This explains why the code is not really nice and there will be definitely some 🐛. *Sorry for the inconvenience.*   


## 🗃 Functions of Hypothesify 
Hypothesify has the following functions: 
- It can show a number of **public annotations** for a selected website before you open it in [Hypothes.is](https://hypothes.is). *⚠ Please, note that if you choose this option,  every URL goes through the servers of [Hypothes.is](https://hypothes.is).* 
- It can open and close a selected webpage or a PDF document in [Hypothes.is](https://hypothes.is).
- It generates a `code` that you can send to your friends, include in your Note app or integrate into your webpage. To copy the code, click on the `generated code`  panel and press `CTRL+C` (Windows and Linux) or `CMD+C` (MacOS). 

## ⚗ Generated code 
  * a simple link 🔗
  * `<a>` HTML element with `@href` attribute  
  * Markdown code in the format `[]()`
  * `<iframe>` HTML element (for inclusion of the whole webpage as iframe)
  * `:hiccup [:iframe]` code for inclusion of the webpage into [Roam](roamresearch.com) 🧠
 

## ⚙ How does Hypothesify work? 
Hypothesify uses two key services of [Hypothes.is](https://hypothes.is): 
1. Its public [API](https://h.readthedocs.io/en/latest/api/) for obtaining the number of **public annotations** for any selected webpage. 
2. Its [via proxy](https://web.hypothes.is/help/what-is-the-via-proxy/) that opens any webpage or PDF document in [Hypothes.is](https://hypothes.is). 

## 🔎 Privacy 
The extension itself does not collect or store any private information. However, if you wish to "Check for available public annotations" in the popup menu, every URL will be sent to the [Hypothes.is](https://hypothes.is) server.  While the request to the server contains only the URL, I assume that the server gets also the IP address of the machine making the request. Note that sometimes the URL address may also contain sensitive information.  

Hopefully, I can implement a blacklist and whitelist of URLs in a future version since this is an issue that worries me. 

## 🎁 Support for Hypothesify  
If you wish to support this extension, you can make a [PayPal donation](
https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=6AMGMUDRX29XU&source=url). 🤸‍♂️


## 💾 Versions 
v.1.0, 26th April 2020 - first version

## 📌 To-do 
* Chrome/Edge/Opera versions
* Firefox Android version
* Implementaton of a blacklist and whitelist of URLs 

## 💡 Considered future features 
* Export of public comments from a single webpage? (or maybe to put it in a separate extension?)
* Notify when there are new public annotations on selected websites (or better a separated webpage?)

## 📜 Licence of Hypothesify 
[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)

## 🐱‍💻 Comments 
Please, leave a comment, e.g., through Hypothes.is :). 
