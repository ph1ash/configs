// ==UserScript==
// @name Identifies active extension when visiting YouRepeat
// @include http://*.yourepeat.com/*
// @include http://yourepeat.com/*
// @include https://*.yourepeat.com/*
// @include https://yourepeat.com/*
// ==/UserScript==

var div_checker = document.createElement("div");
div_checker.setAttribute('id', 'YouRepeatExtension');
document.body.appendChild(div_checker);