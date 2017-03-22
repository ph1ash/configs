function LP_field_set_backgroundPosition(e,i){if(e||(e=LP_derive_doc()),!e||!i)return!1;var t=!1;if(LP_get_text_dir(i)===!0){var n="98% 50%";if(document.location.href.indexOf("https://mint.intuit.com/login.event?task=S")>-1&&document.getElementById(i.id).nextElementSibling.offsetWidth>0&&(n="92% 50%"),null!=typeof i.style.backgroundPosition)i.style.backgroundPosition!=n&&(t=!0);else if(g_isie&&null!=typeof i.currentStyle&&null!=typeof i.currentStyle.backgroundPositionX&&null!=typeof i.currentStyle.backgroundPositionY){var o=i.currentStyle.backgroundPositionX,r=i.currentStyle.backgroundPositionY;"98%"==o&&lp_in_array(r,["center","50%"])||(t=!0)}}else{var n="center left";if(null!=typeof i.style.backgroundPosition)lp_in_array(i.style.backgroundPosition,["center left","left center","0% 50%","left"])||(t=!0);else if(g_isie&&null!=typeof i.currentStyle&&null!=typeof i.currentStyle.backgroundPositionX&&null!=typeof i.currentStyle.backgroundPositionY){var o=i.currentStyle.backgroundPositionX,r=i.currentStyle.backgroundPositionY;lp_in_array(o,["left","0%"])&&lp_in_array(r,["center","50%"])||(t=!0)}}return t&&(i.style.backgroundPosition=n),!0}function LP_get_text_dir(e){var i=!0;if(e){var t=LP_get_live_style(e);t&&"rtl"==t.direction?i=!1:"rtl"==e.getAttribute("dir")&&(i=!1)}return i}function LP_input_has_bg_style_override(e){if(!e)return!1;if(!g_stylesheet_grubbing)return!1;var i=!1;try{var t=formcacheget(e,"fakedoc","input-bg-style");if(null!=t)return t;var n=0,o=0,r=new RegExp("(background|background-color):[^:].*!important"),l=e.styleSheets;if(l&&r)for(n=0;n<l.length&&n<32;n++){var _=null;if(void 0!==l[n].rules?_=l[n].rules:void 0!==l[n].cssRules&&(_=l[n].cssRules),_){for(o=0;o<_.length;o++)if(_[o]&&_[o].selectorText&&_[o].cssText&&_[o].selectorText.indexOf("input:focus")!=-1){var a=_[o].cssText;if(a&&r.exec(a)){verbose_log("focus hack:"+a),i=!0;break}}if(i)break}}}catch(e){}return formcacheset(e,"fakedoc","input-bg-style",i),i}function ForceFillOrphanFieldClicked(e,i,t){if(!e&&!(e=elt.ownerDocument))return!1;var n=!0;if(n=ForceFillFieldClicked(e,i,!1,t)){var o=e.getElementsByTagName("INPUT"),r=0;for(r=0;r<o.length&&r<MAX_INPUTS_HARD;r++)if(o[r]==i&&o[r+1]&&r+1<o.length&&r+1<MAX_INPUTS_HARD){isInputFieldPassword(e,o[r+1])&&!lpIsFieldCurrentPWField(o[r+1])&&(n=ForceFillFieldClicked(e,o[r+1],!1,t));break}}return n}function revert_clickable_icon(e,i){if(verbose_log("entered revert_clickable_icon"),null!=e){var t=i,n=LP_getElementByIdOrName(e,t),o=getIconState(e,t),r=!1,l="sites";o&&void 0!==o.dofloater&&(r=o.dofloater),o&&void 0!==o.inframe&&o.inframe,o&&void 0!==o.fillhint&&(l=o.fillhint),verbose_log("entered BG image revert"),n?r?reset_floating_icon(e,n,l):set_input_icon_image(e,n,l):verbose_log("could not find field named "+field_id)}}function conditional_create_popup(e,i,t){return null!=e&&null!=i&&g_clickable_input,!1}function closeclickableicons(e){if(do_experimental_popupfill&&(e||(e=document),null!=e)){verbose_log("closeclickableicons called on "+e.location.href);var i,t,n=getAllIconStates();for(i=0;i<n.length;i++){var o=n[i],t=o.IHTMLElement;if(t||(t=LP_getElementByIdOrName(e,o.idorname)),o.dofloat||!o.inframe||t)!o.dofloater&&t&&inputHasLPBackground(t)?removeLPBackground(t):pass;else if(g_isfirefox)try{var r,l,_=e.getElementsByTagName("IFRAME");for(r=0;r<_.length;r++)l=_[r].contentDocument,(t=LP_getElementByIdOrName(l,o.idorname))&&"INPUT"==t.tagName&&removeLPBackground(t)}catch(e){verbose_log("Error frame traverse "+e.message),l=null}else!g_isie&&g_create_iframe_in_top&&pass;resetAllIconStates()}var r,a=LP_get_icon_divs(e);for(r in a)if(a.hasOwnProperty(r)){var c=e.getElementById(a[r]);null!=c&&(g_do_icon_number_hint&&LP_delete_floating_icon_hint(e,a[r]),LP_delete_floating_icon(e,a[r]))}LP_reset_icon_divs(e)}}function setup_input_icon(e,i,t,n,o){var r=!1;if(null==i)return verbose_log("setup_input_icon: ERROR passed null field"),r;if(i.form&&"sites"==t&&is_shopping_form(e,i.form)&&g_aspx_hack&&(isASPpage()&&e.getElementsByTagName("form").length>2||!isASPpage()))return r;g_isfirefox&&LP&&"undefined"!=typeof g_icon_number_in_toolbar&&g_icon_number_in_toolbar&&LP.lp_handle_buttons_all("refresh");var l=null;if(l="undefined"!=typeof LP&&"function"==typeof LP.lpGetCurrentWindow?void 0!==LP.lpGetCurrentWindow().getBrowser?LP.lpGetCurrentWindow().getBrowser().contentDocument:LP.getBrowser().contentDocument:g_isfirefox?top.document:document,!do_experimental_popupfill)return r;e||(e=l);var _=LP_pickFieldName(e,i);if(null==i||!l||!e)return r;if(LP_explicit_ignored(e,i))return r;var a=getIconState(e,_);if(a&&a.IHTMLElement==i){if(inputHasLPBackground(i))return!1;if(LP_floating_icon_exists(e,_))return!1}a=null,("generate"==t||!o&&shouldOfferGenerate(e,i))&&(t="generate");var c=gettldcached(e.location.href),f=shouldCreateFloatingIcon(e,i,c),g=LP_get_text_dir(i);if(g===!1&&pass,LP_fieldIsReadOnly(i)||LP_fieldIsDisabled(i))return!1;var s=e!=l;g_create_iframe_in_top&&!g_isie&&!g_isfirefox&&LP_inIframe(window)&&(s=!0);var d={fillhint:t,fillhintnumber:n[t],inframe:s,idorname:_,doctld:c,dofloater:f?1:0,no_check_generate:o?1:0,IHTMLElement:i,text_direction:g};if("function"==typeof is_edge&&is_edge()){if("undefined"==typeof g_created_edge_stylesheet){g_created_edge_stylesheet=!0;var u=e.createElement("style");u.type="text/css",u.appendChild(e.createTextNode(".lastpassClearHidden::-ms-clear { display:none; }")),document.head?document.head.appendChild(u):document.body&&document.body.appendChild(u)}i.className.indexOf("lastpassClearHidden")==-1&&(i.className+=" lastpassClearHidden")}if(f){if(g_isfirefox&&verbose_log("setup_input_icon step3b"),!lpIsVisible(i)||!(null==i.form||i.form&&lpIsVisible(i.form)))return!1;saveIconState(_,d,i),r=LP_create_floating_icon(e,i,t,n)}else{saveIconState(_,d,i);r=set_input_icon_image(e,i,t,!1)}return set_bg_highlight_effect_handlers(e,i,t),LP_didDocumentEscapeEvent(e)||(LP_setDocumentEscapeEvent(e),LP_addEventHandler(e,"keydown",function(e){LP_keypress_handler(e)},!1)),LP_didFieldKeyEvent(e,i)?verbose_log("skip KEYDOWN HANDLER ON "+LP_pickFieldName(e,i)):(verbose_log("SETTING KEYDOWN HANDLER ON "+LP_pickFieldName(e,i)),LP_setFieldKeyEvent(e,i),LP_addEventHandler(i,"keydown",function(n){LP_field_keypress_handler(n,i,t,e)},!1),g_isfirefox&&LP_addEventHandler(i,"keyup",function(t){handle_form_text_change(e,i,i.form,t)},!1)),r}function refresh_input_icon_bg(e,i,t){if(!e&&!(e=LP_derive_doc()))return null;if(i){set_input_icon_image(e,i,t,!1)}}function refresh_input_all_icon_bg(e){if(null==e&&(e=document),null!=e){try{if(e.location.href.indexOf(".xul")>0)return;verbose_log("refreshing input icons on "+e.location.href)}catch(e){return}var i,t=getAllIconStates();for(i=0;i<t.length;i++){var n=t[i].idorname,o=t[i].fillhint,r=t[i].dofloater,l=t[i].IHTMLElement;element_is_detached(e,l,0)&&(l=null),l||(l=LP_getElementByIdOrName(e,n)),l&&(r||refresh_input_icon_bg(e,l,o))}}}function set_input_icon_image(e,i,t,n){if(e||(e=LP_derive_doc()),!e)return!1;var o=e.defaultView;o||(o=window);var r,l=[];if(l[0]=g_sites_light_ico,l[1]=g_pw_light_ico,l[3]=g_close_light_ico,l[-1]="",l[2]=g_ff_light_ico,l[16]=g_sites_ico,l[17]=g_pw_ico,l[19]=g_close_ico,l[-17]="",l[18]=g_ff_ico,LP_has_highdef_display(o)&&(l[0]=g_40_icons["16x16_lite@2x"],l[16]=g_40_icons["16x16_dark@2x"],l[3]=g_40_icons["IF_Close@2x"],l[19]=g_40_icons["IF_Close@2x"],l[2]=g_40_icons["FormFill@2x"],l[18]=g_40_icons["FormFill_dark@2x"],l[1]=g_40_icons["Generate@2x"],l[17]=g_40_icons["Generate_dark@2x"]),null==i)return!1;if(i.tagName&&void 0!==i.tagName.toUpperCase&&"INPUT"!=i.tagName.toUpperCase())return!1;void 0===t||null==t?r=0:"formfills"==t?r=2:"sites"==t?r=0:"generate"==t?r=1:"cancel"==t&&(r=3),n&&(r|=16);var _=LP_fieldGetWidth(i),a=!1;if(("sites"==t||g_is_specialsite)&&(a=!0),!LP_iconFieldWidthOK(i,_,a))return!0;var c=i.style.border,f=i.style.backgroundImage;if(""==f){var g=LP_getComputedStyle(o,i);g&&(f=g.backgroundImage,c=g.border)}if("none"==f&&(f=""),r>=0){void 0===l[r]&&verbose_log("no icon defined for iconval="+r);var s;if(s=LP_getloggedin()&&(0==r||16==r)?getnumbericon(e,i,n):l[r],f!="url("+s+")"){if(i.style.backgroundImage="url("+s+")",g_issafari&&""!==c&&c.indexOf("inset")>0){c.replace("inset","")}"no-repeat"!=i.style.backgroundRepeat&&(i.style.backgroundRepeat="no-repeat"),"scroll"!=i.style.backgroundAttachment&&(i.style.backgroundAttachment="scroll");var d=LP_getAbsolutePos(e,i);d&&d.height<18&&d.height>0?"contain"!=i.style.backgroundSize&&(i.style.backgroundSize="contain"):"16px 18px"!=i.style.backgroundSize&&(i.style.backgroundSize="16px 18px"),LP_field_set_backgroundPosition(e,i)}}return!0}function set_bg_highlight_effect_handlers(e,i,t){if(i&&(LP_didFieldMouseEvent(e,i)||(LP_setFieldMouseEvent(e,i),LP_addEventHandler(i,"mouseover",function(n){bg_highlight_effect_mouseover(n,e,i,t)}),LP_addEventHandler(i,"focus",function(n){bg_highlight_effect_mouseover(n,e,i,t)}),LP_addEventHandler(i,"mouseout",function(n){bg_highlight_effect_mouseout(n,e,i,t)}),LP_addEventHandler(i,"blur",function(n){bg_highlight_effect_mouseout(n,e,i,t)}),LP_addEventHandler(i,"mousemove",function(n){bg_highlight_effect_mousemove(n,e,i,t)})),"sites"==t)){!LP_getloggedin()||g_isfirefox||g_isie||i.setAttribute("autocomplete","off")}}function bg_highlight_effect_mousemove(e,i,t,n){null==e&&(e=window.event);var o=LP_getMousePos(e);if(!(o.x<=0&&o.y<=0)){var r=LP_getAbsolutePos(i,t);if(!(r.width<=0&&r.height<=0)){var l=r.left+r.width-20;l<r.left&&(l=r.left),l<o.x&&r.left+r.width>o.x&&r.top<o.y&&r.top+r.height>o.y?t.style.cursor="pointer":t.style.cursor="auto"}}}function bg_highlight_effect_mouseover(e,i,t,n){if(null==e&&(e=window.event),(!is_your_popup_showing(i)||i.g_popupfill_parent!=t)&&LP_getEventTarget(e)==t){var o=n,r=!1,l=getIconState(i,LP_pickFieldName(i,t));o||l&&l.hint&&(o=l.hint),l&&l.dofloater&&(r=l.dofloater),o&&(r||set_input_icon_image(i,t,o,!0))}}function bg_highlight_effect_mouseout(e,i,t,n){if(null==e&&(e=window.event),!is_your_popup_showing(i)||i.g_popupfill_parent!=t){var o=n,r=!1,l=getIconState(i,LP_pickFieldName(i,t));o||l&&l.hint&&(o=l.hint),l&&l.dofloater&&(r=l.dofloater),o&&(r||set_input_icon_image(i,t,o,!1))}}function popuptoggle(e,i,t,n,o,r,l,_,a,c){var f;if(c)f=c;else if(i){if(i.location.href.indexOf(".xul")>0)return!0;f=LP_getElementByIdOrName(i,t)}else{if(e.location.href.indexOf(".xul")>0)return!0;f=LP_getElementByIdOrName(e,t)}"undefined"!=typeof reset_forcefill_without_fillbest&&reset_forcefill_without_fillbest();var g="sites";if(n?g="generate":r?g="save":l&&(g="formfills"),is_your_popup_showing(e))closepopupfills(e,"away"),g_isfirefox?i?(i.g_popupfill_parent_last=i.g_popupfill_parent,i.g_popupfill_parent=null):(e.g_popupfill_parent_last=e.g_popupfill_parent,e.g_popupfill_parent=null):(g_popupfill_parent_last=g_popupfill_parent,g_popupfill_parent=null);else{var s=LP_getloggedin();if(!s){if("undefined"!=typeof LP&&void 0!==LP.lpOpenLogin)return void LP.lpOpenLogin();if(!g_isie)return void sendBG({cmd:"dologinaction"})}g_isfirefox?i?i.g_popupfill_parent=f:e.g_popupfill_parent=f:g_popupfill_parent=f;var d=!!r;if(g_isie)"undefined"!=typeof init_LPfn&&init_LPfn()&&LPfn.ie_set_lpifmsg(e,f,n,d,g,_);else if(!g_isfirefox){var u=LP_pickFormName(f.ownerDocument,f.form);n=n?1:0,sendBG({cmd:"setpopupfilllastactive",active:u,activefieldid:LP_pickFieldName(document,f),ask_generate:n,opentosave:d,activefieldtype:f.type,start_type:g})}if(!g_isfirefox&&!g_isie){var p=document.location.href;"undefined"!=typeof punycode&&(p=punycode.URLToASCII(document.location.href)),sendBG({cmd:"popupregister",docnum:g_docnum,url:p})}var m="function"==typeof ff_calculate_iframe_pos?ff_calculate_iframe_pos:calculate_iframe_pos,h=m(e,f,"300px",should_ignore_body_relative(e)),v=0,b=0;h&&(v=h.posx,b=h.posy);var y=t;if(g_isfirefox)ff_popupfill_create_iframe(e,v,b,y,null,null,f,g);else{var P=chk_form_is_nonlogin_form(document,f.form),k=checkDocumentForLoginOrphans(document)||checkDocumentForLoginOrphansFirstStage(document),L=checkDocumentForLoginFirstStageForm(document),x=k||L||chk_form_has_password(document,f.form),I=g_popupfill_rows;P&&!x&&(I=g_popupfill_rows_FF);var w=g_popupfill_widest+40;if(w<120&&(w=120),w<g_popupfill_parent.offsetWidth&&(w=g_popupfill_parent.offsetWidth,w+=2*Math.abs(POPUP_FIELD_OFFSET)),w=Math.min(w,MAX_DIALOG_WIDTH),1==I&&!create_onerow_iframe){var O=null;if(g_fillaid&&(O=g_fillaid),isEmptyObject(g_autofillsites)||(O=g_autofillsites[0].aid),null!=O)return sendBG({cmd:"autofillaid",aid:O}),void verbose_log("filling only, not creating 1 row iframe");verbose_log("tried to fill form with invalid acct")}if(0==I&&o==NO_FORCE_NOHITS)verbose_log("not creating empty iframe");else{var s=LP_getloggedin();if(g_dologin_clickable&&!s&&(!g_isie||g_isie&&o==FORCE_SHOW_NOHITS_NOLOGIN)){if(verbose_log("login state: checking whether to issue Chrome login prompt"),o==FORCE_SHOW_NOHITS_NOLOGIN)return;if(!g_isie)return void sendBG({cmd:"dologinaction"})}}if(g_create_iframe_in_top&&!g_isie&&!g_isfirefox&&LP_inIframe(window)&&LP_do_toplevel_iframe_hack(window)){h=calculate_iframe_pos(e,f,"300px",!0),h?(v=parseInt(h.posx),b=parseInt(h.posy)):(v=0,b=0);var F="",S="";try{F=window.name,S=document.location.href}catch(e){}var p=e.location.href;"undefined"!=typeof punycode&&(p=punycode.URLToASCII(e.location.href));var E=null;f&&f.getBoundingClientRect&&(E=f.getBoundingClientRect()),sendBG({cmd:"createpopuptoplevelfromframe",posx:v,posy:b,id:y,rows:I,width:w,minheight:g_minheight_override,framename:F,framesrc:S,url:p,fillhint:_,fieldBox:{top:E.top,right:E.right,bottom:E.bottom,left:E.left,width:E.width}})}else popupfill_create_iframe(e,v,b,y,I,w,g_minheight_override,null,null,{posx:v,posy:b,id:y,width:w,fieldEl:f,fillhint:_});g_popupfill_iframe_width_save=w}if(g_isfirefox?i?relocate_popupfill_iframes(i):relocate_popupfill_iframes(e):g_create_iframe_in_top&&LP_inIframe(window)&&!g_isie&&!g_isfirefox||relocate_popupfill_iframes(e),!bg.get("LPContentScriptFeatures").is_infield_enabled){var N=i?i:e,C=!1,B=getIconState(N,t);if(B&&(C=B.dofloater),C){var H=LPMAGIC+t;change_clickable_icon_to_cancel(N,H,t)}else{set_input_icon_image(N,f,"cancel",!0)}}}}function inputHasLPBackground(e){if(null==e)return!1;var i=null;if(g_isie&&void 0!==e.currentStyle)void 0!==e.currentStyle&&(i=e.currentStyle);else try{i=e.ownerDocument.defaultView.getComputedStyle(e,"")}catch(t){void 0!==e.currentStyle&&(i=e.currentStyle)}if(i&&("INPUT"==e.tagName||"input"==e.tagName)&&""!=i.backgroundImage){if(i.backgroundImage.indexOf(g_sites_light_ico)!=-1||i.backgroundImage.indexOf(g_40_icons["16x16_lite@2x"])!=-1||i.backgroundImage.indexOf(g_pw_light_ico)!=-1||i.backgroundImage.indexOf(g_close_light_ico)!=-1||i.backgroundImage.indexOf(g_ff_light_ico)!=-1||i.backgroundImage.indexOf(g_sites_ico)!=-1||i.backgroundImage.indexOf(g_pw_ico)!=-1||i.backgroundImage.indexOf(g_close_ico)!=-1||i.backgroundImage.indexOf(g_ff_ico)!=-1||i.backgroundImage.indexOf(g_40_icons.IF_Close)!=-1||i.backgroundImage.indexOf(g_40_icons["IF_Close@2x"])!=-1||i.backgroundImage.indexOf(g_40_icons.FormFill)!=-1||i.backgroundImage.indexOf(g_40_icons["FormFill@2x"])!=-1||i.backgroundImage.indexOf(g_40_icons.FormFill_dark)!=-1||i.backgroundImage.indexOf(g_40_icons["FormFill_dark@2x"])!=-1||i.backgroundImage.indexOf(g_40_icons.Generate)!=-1||i.backgroundImage.indexOf(g_40_icons["Generate@2x"])!=-1||i.backgroundImage.indexOf(g_40_icons.Generate_dark)!=-1||i.backgroundImage.indexOf(g_40_icons["Generate_dark@2x"])!=-1)return verbose_log("icon "+LP_getname(e)+" has icon w/o number"),!0;if(i.backgroundImage.indexOf(getnumbericon(e.ownerDocument,e,!0))!=-1||i.backgroundImage.indexOf(getnumbericon(e.ownerDocument,e,!1))!=-1)return!0;var t;for(t=0;t<=9;t++)if(i.backgroundImage.indexOf(getnumbericon(e.ownerDocument,e,!0,t))!=-1||i.backgroundImage.indexOf(getnumbericon(e.ownerDocument,e,!1,t))!=-1)return verbose_log("icon "+LP_getname(e)+" has icon with number "+t),!0}return!1}function removeLPBackground(e){if(!e)return!1;try{e.style.backgroundImage="none",e.style.backgroundRepeat="initial",e.style.backgroundAttachment="initial",e.style.backgroundPosition="initial",e.style.backgroundSize="initial"}catch(e){return verbose_log("removeLPBackground error: "+e.message),!1}return!0}