# Hypothesify
## What is Hypothesify?
Hypothesify is a small Firefox extension *(at this moment)* for online tool [Hypothesis](https://hypothes.is) that allows private and public annotation of any website or pdf. 

Currently *(25th April of 2020)*, there is no Firefox extension for this great tool (however, the official one is in development). So I decided to make one as part of my learning process of JavaScript. This explains why the code is not really nice and there will be definitely some 🐛. *I beg for understanding.*  



## Functions of Hypothesify
Hypothesify has following functions: 
- If checked, it shows number of **public annotations** for a selected website before you open it in [Hypothesis](https://hypothes.is). Please, note that this means that every URL goes through the servers of [Hypothesis](https://hypothes.is). 
- It opens a selected webpage or a pdf document in Hypothes.is and it closes it.
- It generates `code` that you can send your friends, include in your Note app or integrate it into your webpage. To copy the code, click on the url panel and press `CTRL+C` (Windows and Linux) or `CMD+C` (MacOS). 

## Generated code:
  * a simple link
  * `<a>` HTML element with `@href` attribute  
  * Markdown code in the format `[]()`
  * `<iframe>` HTML element (for inclusion of the whole webpage as iframe)
  * `:hiccup [:iframe]` code for inclusion of the webpage into [Roam](roamresearch.com) 
 

## Modus operandi of Hypothesify
Hypothesify uses two key services of [Hypothesis](https://hypothes.is): 
1. Its public API for obtaining the number of **public annotations** for any selected webpage. 
2. Its [via proxy](https://web.hypothes.is/help/what-is-the-via-proxy/) that opens any webpage or pdf document in [Hypothesis](https://hypothes.is). 

## Privacy
The extension itself does not collect or store any private information. However, if you with to "Check available public annotations" in the popup menu, every URL will be sent to [Hypothesis](https://hypothes.is) server. And while the request to the server contains only the URL, I assume that the server gets also the IP addresse of the machine making the request. Sometimes, the URL addresse may also contain sensitive information.  

Hopefully, I can implement blacklist and whitelist of URLs in a future version since this is an issue that worries me. 

## Support for Hypothesify: 
[PayPal](
https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=6AMGMUDRX29XU&source=url)

## Versions
v.1.0, 25th April 2020 - first version

## To-do
Implementaton of blacklist and whitelist of URLs. 

## Licence of Hypothesify
[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)

## Comments
Please, leave a comment through Hypothes.is :). 