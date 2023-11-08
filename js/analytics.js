const ANALYTICS_PATH = "https://www.google-analytics.com/collect";
const GA_ACCOUNT_ID = "UA-115475017-1";

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: data
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // I believe these buttons only exist for the OLDER update pages, not the current one. SO this will never trigger.
  var buttons = document.querySelectorAll('.tpro-analytics');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e){
        var gaParams = new URLSearchParams();
        gaParams.append("v", 1);
        gaParams.append("tid", GA_ACCOUNT_ID);
        gaParams.append("cid", 123); // anonymous client id
        gaParams.append("t", "event");
        gaParams.append("ec", "clicked");
        gaParams.append("ea", e.target.id);
        // post the data to google analytics
        postData(ANALYTICS_PATH, gaParams)
    });
  }
});

// Original code using google analytics javascript which appears to violate minimum CSP security levels for manifest v3.
// What is CSP? https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
//var _gaq = _gaq || [];
//_gaq.push(['_setAccount', 'UA-115475017-1']);
//_gaq.push(['_trackPageview']);
//
//(function() {
//  var ga = document.createElement('script');
//  ga.type = 'text/javascript';
//  ga.async = true;
//  ga.src = 'https://ssl.google-analytics.com/ga.js';
//  var s = document.getElementsByTagName('script')[0];
//  s.parentNode.insertBefore(ga, s);
//})();
//
//document.addEventListener('DOMContentLoaded', function () {
//  var buttons = document.querySelectorAll('.tpro-analytics');
//  for (var i = 0; i < buttons.length; i++) {
//    buttons[i].addEventListener('click', function(e){
//      _gaq.push(['_trackEvent', e.target.id, 'clicked'])
//    });
//  }
//});
