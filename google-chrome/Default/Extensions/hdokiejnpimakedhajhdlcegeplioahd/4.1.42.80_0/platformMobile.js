LPPlatform=function(){var t="";window.lp_setmethod=function(n){t=n};var n=function(){return t},r=function(){var t=function(t){return host.translate(t)},n=function(t){return t};return function(r){return"undefined"!=typeof host&&"function"==typeof host.translate?(LPPlatform.translate=t,t(r)):(LPPlatform.translate=n,n(r))}}(),e=function(){var t=function(t,n,r){host.status(t,n,r?JSON.stringify(r):null)},n=function(t,n,r){console.log(t+" "+n)};return function(r,e,o){"undefined"!=typeof host&&"function"==typeof host.status?(LPPlatform.returnResult=t,t(r,e,o)):(LPPlatform.returnResult=n,n(r,e,o))}}(),o=function(t,n){e(!0,t,n)},u=function(t,n){e(!1,t,n)};return{translate:r,returnResult:e,returnSuccess:o,returnError:u,makeRequest:function(n,r,e,s,f){var i=o;"function"==typeof s?i=function(t,n){s(!0,t,n?JSON.stringify(n):null)}:void 0===f&&(f=s),f.requestArgs={token:r,wxsessid:e,method:t},f.success=f.success||i,f.error=f.error||u,n(f)},getMethod:n}}();