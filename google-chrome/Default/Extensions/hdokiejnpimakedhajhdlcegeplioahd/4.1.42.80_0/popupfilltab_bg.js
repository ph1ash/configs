function savesiteicon_real(e,p){void 0!==g_popup_tab_docnum[e]?sendCS(e,{cmd:"savesiteiframe"},g_popup_tab_docnum[e]):sendCS(e,{cmd:"savesiteiframe"}),g_popup_tabid_save=e}function toplevelpopupsetstate(e,p){var t=p?1:0;null!=e?sendCS(e,{cmd:"toplevelpopupsetstate",toplevel_exists:t},"all"):get_selected_tab(null,function(e){var p=gettabid(e);sendCS(p,{cmd:"toplevelpopupsetstate",toplevel_exists:t},"all")})}function closepopuptoplevel_handler(e,p){null!=e?(closeclickables(e,!1),toplevelpopupsetstate(e,!1),clear_popup_heartbeat(e),delete g_iframe_hack_src[e]):(get_selected_tab(null,function(e){var p=gettabid(e);closeclickables(p,!1),toplevelpopupsetstate(p,!1),clear_popup_heartbeat(p)}),g_iframe_hack_src=[])}function createpopuptoplevel_handler(e,p){var t=g_CS_tops[e];sendCS(e,{cmd:"createpopuptoplevel",from_iframe:p},t),toplevelpopupsetstate(e,!0),g_iframe_hack_src[e]=p.url,has_popup_heartbeat(e)||(do_popup_heartbeat(e),popup_heartbeat_fn(e))}function do_searchvault(e,p,t){switch(e&&(e=e.toLowerCase().trim()),p){case"sites":var _={},r={},o="",a=g_popup_url_by_tabid[t];a&&(o=lp_gettld_url(a));for(var i in g_sites)!check_ident_aid(g_sites[i].aid)||g_sites[i].tld!==o||e&&g_sites[i].name.toLowerCase().indexOf(e)===-1&&g_sites[i].unencryptedUsername.toLowerCase().indexOf(e)===-1||(_[i]=g_sites[i],g_sites[i].tld&&g_bigsquareicons[g_sites[i].tld]&&(r[i]="data:image/png;base64,"+g_bigsquareicons[g_sites[i].tld]));return JSON.stringify({sites:_,bigicons:r});case"formfills":for(var n=new Array,i=0;i<g_formfills.length;i++)check_ident_ffid(g_formfills[i].ffid)&&g_formfills[i].decprofilename.toLowerCase().indexOf(e)!==-1&&(n[n.length]=g_formfills[i]);return JSON.stringify({formfills:n})}}function do_getpopupfilldata(e){return e&&do_experimental_popupfill?(g_datacache[e].popuphtml,g_iframe_safe_to_close[e]=!0,cobble_popup_iframe_data(e)):{}}function do_getpopupfillsites(e,p){if(!e||!p||!do_experimental_popupfill)return!1;var t=p.tld,_=p.url,r=p.docnum;verbose_log("get ste & form fill data for tld="+t+" url="+_+" docnum="+r);var o="",a="",i="",n=assemble_popup_data_payload(_,t);return n&&n.sites&&(o=n.sites),n&&n.favicons&&(a=n.favicons),n&&n.formfills&&(i=n.formfills),sendCS(e,{cmd:"gotpopupfillsites",sites:o,formfills:i,favicons:a},"all"),!0}function do_setpopupfilllastactive(e,p){return!!(e&&p&&do_experimental_popupfill)&&(g_popupfill_last_active[e]=p.active,g_popupfill_last_active_fieldid[e]=p.activefieldid,g_popupfill_last_active_fieldtype[e]=p.activefieldtype,void 0!==p.ask_generate&&(g_popupfill_hint_generate[e]=p.ask_generate),void 0!==p.opentosave&&(g_popupfill_hint_save[e]=p.opentosave),void 0!==p.start_type&&(g_popupfill_hint_type[e]=p.start_type),!0)}function assemble_popup_data_payload(e,p){var t=[],_={},r={},o="",a="",i="",n="",l=new Array,s={};p||(p=lp_gettld_url(e)),t=getsites(p),t=reorderOnURL(t,e,!0);for(var f=0;f<t.length;f++)_[t[f].aid]=geticonurlfromrecord(t[f]),s[t[f].aid]=getbigsquareiconurlfromrecord(t[f]);for(var u=0;u<g_formfills.length;u++)if(check_ident_ffid(g_formfills[u].ffid)){l[l.length]=g_formfills[u];var g=lpmdec_acct(g_formfills[u].ccnum,!0,g_formfills[u],g_shares);if(_[g_formfills[u].ffid]=geticonCCnum(g),s[g_formfills[u].ffid]=geticonCCnum(g,!0),""!==g_formfills[u].ccnum){var c=lpmdec(g_formfills[u].ccnum);l[l.length-1].formattedCCNum=LPCC.getFormattedNumber(c),l[l.length-1].ccType=LPCC.getCCType(c)}}var d=LPJSON.stringify("");return l&&l.length>0&&(d=LPJSON.stringify(l)),n=cache_usernames(t),o=d,a=LPJSON.stringify(_),g_40fieldicon&&(i=LPJSON.stringify(s)),n&&(r.sites=n),o&&(r.formfills=o),a&&(r.favicons=a),i&&(r.bigicons=i),r}function cobble_popup_iframe_data(e){var p=LPJSON.stringify({}),t=LPJSON.stringify({}),_=LPJSON.stringify({}),r=LPJSON.stringify({}),o="",a=0,i=0,n="",l="";if(null!=e){null!=g_popupfill_hint[e]&&null!=g_popupfill_last_active[e]&&null!=g_popupfill_hint[e][g_popupfill_last_active[e]]&&(o=g_popupfill_hint[e][g_popupfill_last_active[e]]),g_popupfill_hint_generate[e]&&(a=g_popupfill_hint_generate[e]),g_popupfill_hint_save[e]&&(i=g_popupfill_hint_save[e]),g_popupfill_hint_type[e]&&(l=g_popupfill_hint_type[e]),void 0!==g_popupfill_last_active_fieldtype[e]&&(n=g_popupfill_last_active_fieldtype[e]);var s=g_popup_url_by_tabid[e],f=assemble_popup_data_payload(s);f&&f.sites&&(p=f.sites),f&&f.favicons&&(t=f.favicons),f&&f.formfills&&(r=f.formfills),f&&f.bigicons&&(_=f.bigicons)}a=a?1:0,i=i?1:0;var u=can_copy_to_clipboard()?1:0,g={ff_firstname_regexp:get_ff_translation("ff_firstname_regexp"),ff_middlename_regexp:get_ff_translation("ff_middlename_regexp"),ff_lastname_regexp:get_ff_translation("ff_lastname_regexp"),ff_username_regexp:get_ff_translation("ff_username_regexp"),ff_email_regexp:get_ff_translation("ff_email_regexp"),ff_zip_regexp:get_ff_translation("ff_zip_regexp"),ff_currpass_regexp:get_ff_translation("ff_currpass_regexp"),ff_search_regexp:get_ff_translation("ff_search_regexp"),ff_captcha_regexp:get_ff_translation("ff_captcha_regexp"),ff_bankacctnum_regexp:get_ff_translation("ff_bankacctnum_regexp"),ff_company_regexp:get_ff_translation("ff_company_regexp"),ff_password_regexp:get_ff_translation("ff_password_regexp"),ff_question_answer_regexp:get_ff_translation("ff_question_answer_regexp"),ff_address1_regexp:get_ff_translation("ff_address1_regexp"),ff_city_regexp:get_ff_translation("ff_city_regexp"),ff_forgot_regexp:get_ff_translation("ff_forgot_regexp"),ff_country_regexp:get_ff_translation("ff_country_regexp")},c=get_sitepwlen(lp_gettld_url(s));null!==c&&"string"!=typeof c||(c=0);var d=-1;return g_possiblemax_tuple!==[]&&g_possiblemax_tuple[0]==e&&(d=g_possiblemax_tuple[1],g_possiblemax_tuple=[]),{cmd:"gotpopupfilldata",sites:p,favicons:t,formfills:r,popuphtml:g_datacache[e].popuphtml,url:s,rowtype:o,ask_generate:a,can_copy_clipboard:u,username:g_username,inputtype:n,ask_save:i,maxpwlen:d,start_type:l,has_view_pw_challenge:g_prompts.view_pw_prompt?1:0,has_view_site_challenge:g_prompts.edit_site_prompt||g_prompts.company_copyview_site_prompt?1:0,has_view_ff_challenge:g_prompts.view_ff_prompt||g_prompts.company_copyview_site_prompt?1:0,site_pwlen:c,reg_obj:g,do_40fieldicon:g_40fieldicon,bigicons:_,ftd:frame_and_topdoc_has_same_domain(e),enable_exper:g_isadmin||"undefined"!=typeof verbose&&verbose}}function doPopupIconHint(e,p,t){return!!e&&(sendCS(e,{cmd:"popupfilliconnumber",sitenumber:p,formfillsnumber:t},"all"),!0)}function doPopupSaveOK(e){return!!e&&(sendCS(e,{cmd:"popupfillsaveok"},g_CS_tops[e]),!0)}function savesite_from_iframe(e,p){if(!lploggedin)return null;var t=punycode.URLToASCII(e.url);if(g_popup_url_by_tabid[p]&&(t=g_popup_url_by_tabid[p]),!check_for_frame_mismatch_ok(p,!0,gs("Are you sure you would like to save a new site to your LastPass vault?"),"savesite"))return null;var _=e.formdata2,r=e.name,o=e.group,a=e.username,i=e.password,n=e.orig_username,l=e.orig_password,s=null!=_&&_.length>0,f=issharedfolder(g_shares,o);if(!checkreadonly(f))return{error:gs("Sorry, this shared folder is read-only.")};var u=0==f?g_local_key:f.sharekey,g=createNewAcct(),c=lp_gettld_url(AES._utf8_encode(t));g.genpw=!1,g.name=r,g.group=o,g.url=AES._utf8_encode(t),g.tld=c,g.unencryptedUsername=a,g.username=lpmenc(a,!0,u),g.password=lpmenc(i,!0,u),g.extra="",g.fav=0,g.autologin=0,g.never_autofill=0,g.pwprotect=0,g.aid="0",0!=f&&(g.sharefolderid=f.id,0==f.give&&(g.sharedfromaid=1));var d=o;f&&(d=o.substr(f.decsharename.length+1)),g.fields=new Array,g.save_all=e.save_all?1:0;var m=[],v={save_all:0,username:n,password:l,new_username:a,new_password:i,fromiframe:1},h=updateAndEncryptData(_,g.fields,m,g,u,v),b="name="+en(lpenc(r,u))+"&grouping="+en(lpenc(d,u))+"&data="+en(bin2hex(h))+"&extra="+en(lpenc("",u));return b+="&extjs=1&localupdate=1",b+=0==f?"":"&sharedfolderid="+en(f.id),e.source&&(b+="&source="+e.source),g.newvalues=m,s?(b+="&ref="+en(AES.url2hex(t)),saveSiteFromSubmit(b,g)):(b+="&aid=0",b+="&url="+en(AES.url2hex(t)),b+="&openid_url=",b+="&username="+en(crypto_btoa(g.username)),b+="&password="+en(crypto_btoa(g.password)),saveSite(b,g)),"fidelity.com"==g.tld?refreshsites():fill({tabid:p,acct:g,desc:"fill_A4"}),{}}function savesite_dialog_changed_handler(e,p){void 0!==p.value&&(g_iframe_safe_to_close[e]=!p.value)}function iframe_close_request_handler(e,p){var t=p.initiate_timestamp,_=0;return _=g_iframe_safe_to_close&&g_iframe_safe_to_close[e]?4:g_iframe_safe_to_close&&g_iframe_safe_to_close[e]===!1&&lploggedin?1:7,sendCS(e,{cmd:"iframe_close_ack",value:_,initiate_timestamp:t,ack_timestamp:LPPerl.time()},"all"),_}function do_popupfillscreateack(e){return!!(e&&do_experimental_popupfill&&lploggedin)&&(void 0!==g_popup_tab_docnum[e]?sendCS(e,{cmd:"popupfillscreateack"},g_popup_tab_docnum[e]):sendCS(e,{cmd:"popupfillscreateack"},"all"),has_popup_heartbeat(e)||(do_popup_heartbeat(e),popup_heartbeat_fn(e)),sendLpImprove("infieldopen",{source:"form"}),!0)}function do_iframescrollenable(e){return!!e&&(sendCS(e,{cmd:"iframescrollenable",href:data.href},g_CS_tops[e]),verbose_log("set scrolling=auto for iframe on tabid "+e),sendCS(e,{cmd:"iframebodyscrollenable",href:data.href},"all"),!0)}function do_popupregister(e,p){return!!(e&&p&&do_experimental_popupfill)&&(g_popup_tab_docnum[e]=p.docnum,null!==e&&void 0!==g_iframe_hack_src[e]?g_popup_url_by_tabid[e]=g_iframe_hack_src[e]:g_popup_url_by_tabid[e]=p.url,!0)}function do_setpopupfillhint(e,p){return!!(e&&p&&do_experimental_popupfill)&&(null!=p.formid&&""!=p.formid||(p.formid="none"),null!=p.rowtype&&""!=p.rowtype||(p.rowtype="sites"),null==g_popupfill_hint[e]&&(g_popupfill_hint[e]={}),p.ask_generate?g_popupfill_hint_generate[e]=p.ask_generate:g_popupfill_hint_generate[e]=!1,g_popupfill_hint[e][p.formid]=p.rowtype,verbose_log("["+e+"] set hint on "+p.formid+" to "+p.rowtype),!0)}function do_popupfillinputsave(e,p){return!!(e&&p&&do_experimental_popupfill)&&(null==g_popupforminput&&(g_popupforminput={}),null==g_popupforminput[e]&&(g_popupforminput[e]={}),null==p.inputstr||0==p.inputstr.length?g_popupforminput[e].value="":g_popupforminput[e].value=p.inputstr,null==p.inputid||0==p.inputid.length?g_popupforminput[e].id="":g_popupforminput[e].id=p.inputid,null==p.issaveall||0==p.issaveall.length?g_popupforminput[e].issaveall="":g_popupforminput[e].issaveall=p.issaveall,null==p.inputtype||0==p.inputtype.length?g_popupforminput[e].inputtype="":g_popupforminput[e].inputtype=p.inputtype,!0)}function do_popup_heartbeat(e){return g_popup_heartbeat||(g_popup_heartbeat={}),!!e&&(g_popup_heartbeat[e.toString()]=!0,!0)}function has_popup_heartbeat(e){return g_popup_heartbeat?!!e&&g_popup_heartbeat[e.toString()]===!0:(g_popup_heartbeat={},!1)}function popup_heartbeat_fn(e,p){return!!e&&(p||(p=1),doPopupResize(e,-1,-1),!!has_popup_heartbeat(e)&&(setTimeout(function(){popup_heartbeat_fn(e,p+1)},1099),!0))}function clear_popup_heartbeat(e){return!!e&&(g_popup_heartbeat||(g_popup_heartbeat={}),g_popup_heartbeat[e.toString()]=!1,!0)}function closeclickables(e,p){var t=p?"true":"false";null!=e?sendCS(e,{cmd:"closeclickables",force:t,lploggedin:lploggedin},"all"):get_selected_tab(null,function(e){var p=gettabid(e);sendCS(p,{cmd:"closeclickables",force:t,lploggedin:lploggedin},"all")}),do_popupkbdnavreset(e)}function closeallclickables(e){var p=e?"true":"false";get_all_windows({populate:!0},function(e){for(var t=0;t<e.length;t++)for(var _=0;_<get_tabs_length(e[t]);_++)sendCS(gettabid(get_tabs(e[t])[_]),{cmd:"closeclickables",force:p,lploggedin:lploggedin},"all")}),clearpopupkbdcounters()}function doPopupResize(e,p,t){sendCS(e,{cmd:"popupfillresize",width:p,height:t},"all")}function do_popupfillinputfocusdecrement(e,p){if(p&&do_experimental_popupfill){var t=1;if(void 0===g_popupform_active[e]&&(g_popupform_active[e]=0),void 0!==p.count){var _=parseInt(p.count);isNaN(_)||(t=_)}g_popupform_active[e]-=t}}function do_popupfillinputfocusincrement(e,p){if(p&&do_experimental_popupfill){var t=1;if(void 0===g_popupform_active[e]&&(g_popupform_active[e]=0),void 0!==p.count){var _=parseInt(p.count);isNaN(_)||(t=_)}g_popupform_active[e]+=t}}function do_popupfillinputfocuschoose(e,p){p&&do_experimental_popupfill&&(g_popupform_active_choose[e]=1)}function do_popupfillinputmoreopen(e,p){p&&do_experimental_popupfill&&(g_popupform_more_open[e]=1)}function do_popupfillinputshownavbar(e,p){p&&do_experimental_popupfill&&(g_popupform_shownavbar[e]=1)}function do_popupkbdnavreset(e){return!!e&&(g_popupform_active[e]=0,g_popupform_active_choose[e]=0,g_popupform_more_open[e]=0,g_popupform_shownavbar[e]=0,!0)}function initpopupkbdcounters(e){return!!e&&(void 0===g_popupform_active[e]&&(g_popupform_active[e]=0),void 0===g_popupform_active_choose[e]&&(g_popupform_active_choose[e]=0),void 0===g_popupform_more_open[e]&&(g_popupform_more_open[e]=0),void 0===g_popupform_shownavbar[e]&&(g_popupform_shownavbar[e]=0),!0)}function do_popupfillinputget(e){if(!e||!do_experimental_popupfill||!lploggedin)return{};var p={};return initpopupkbdcounters(e),void 0===g_popupforminput[e]&&(g_popupforminput[e]={value:"",id:"",issaveall:0,inputtype:""}),void 0!==g_popupforminput[e]&&(p={cmd:"gotpopupfillinput",inputstr:g_popupforminput[e].value,inputid:g_popupforminput[e].id,active:g_popupform_active[e],choose:g_popupform_active_choose[e],moreopen:g_popupform_more_open[e],issaveall:g_popupforminput[e].issaveall,inputtype:g_popupforminput[e].inputtype,shownavbar:g_popupform_shownavbar[e]},do_popupkbdnavreset(e)),p}function clearpopupkbdcounters(){return g_popupform_active=[],g_popupform_active_choose=[],g_popupform_more_open=[],g_popupform_shownavbar=[],!0}function do_popupfillsetgenerateprefs(e,p){if(!e||!p||!do_experimental_popupfill)return!1;var t=LPJSON.parse(p.prefstr);if(lpPutUserPref("generate_advanced",parseInt(t.generate_advanced)),lpPutUserPref("generate_length",parseInt(t.generate_length)),lpPutUserPref("generate_upper",parseInt(t.generate_upper)),lpPutUserPref("generate_lower",parseInt(t.generate_lower)),lpPutUserPref("generate_digits",parseInt(t.generate_digits)),lpPutUserPref("generate_special",parseInt(t.generate_special)),lpPutUserPref("generate_mindigits",parseInt(t.generate_mindigits)),lpPutUserPref("generate_ambig",parseInt(t.generate_ambig)),lpPutUserPref("generate_reqevery",parseInt(t.generate_reqevery)),lpPutUserPref("generate_pronounceable",parseInt(t.generate_pronounceable)),void 0!==p.genpwstr){var _=LPJSON.parse(p.genpwstr);if(null!=_&&!isEmptyObject(_)){g_genpws=[];for(var r in _)_.hasOwnProperty(r)&&g_genpws.push(_[r])}}return lpWriteAllPrefs(),!0}function do_popupfillgetgenerateprefs(e,p){if(!e||!p||!do_experimental_popupfill)return{};var t=LPJSON.stringify({generate_advanced:parseInt(lpGetPref("generate_advanced",0)),generate_length:parseInt(lpGetPref("generate_length",12)),generate_upper:parseInt(lpGetPref("generate_upper",1)),generate_lower:parseInt(lpGetPref("generate_lower",1)),generate_digits:parseInt(lpGetPref("generate_digits",1)),generate_special:parseInt(lpGetPref("generate_special",0)),generate_mindigits:parseInt(lpGetPref("generate_mindigits",1)),generate_ambig:parseInt(lpGetPref("generate_ambig",0)),generate_reqevery:parseInt(lpGetPref("generate_reqevery",1)),generate_pronounceable:parseInt(lpGetPref("generate_pronounceable",0))}),_=LPJSON.stringify(g_genpws),r="";return g_generate_pw_pattern_hints&&((r=g_generate_pw_pattern_hints[e])||(r="")),{prefstr:t,genpwstr:_,genpwpattern:LPJSON.stringify(r)}}var LPIF={},g_popupfill_hint={},g_popupfill_hint_generate={},g_popupfill_hint_save={},g_popupfill_hint_type={},g_popupfill_last_active={},g_popupfill_last_active_fieldid={},g_popupfill_last_active_fieldtype={},g_popupfill_save_data={},g_popupfill_pw_challenge=null,g_popupforminput=[],g_popupform_active=[],g_popupform_active_choose=[],g_popupform_more_open=[],g_popupform_shownavbar=[],g_show_save_success_msg=!0,g_popup_tabid_save=null,g_popup_tab_docnum=[],g_popup_url_by_tabid=[],g_iframe_hack_src=[],g_iframe_safe_to_close={},g_popup_heartbeat={};