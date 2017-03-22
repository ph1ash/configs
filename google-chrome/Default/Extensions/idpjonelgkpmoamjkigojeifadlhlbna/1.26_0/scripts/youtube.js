// ==UserScript==
// @name YouTube Main Script
// @include http://*.youtube.com/*
// @include http://youtube.com/*
// @include https://*.youtube.com/*
// @include https://youtube.com/*
// @require scripts/jquery-1.11.0.min.js
// ==/UserScript==

(function(){
	
	// main yourepeat object
	var yr = {
		
		// debug mode
		debug:1,
		
		// log something
		log: function(){
			if(!this.debug) return;
			console.debug.apply(console,arguments);
		},
		
		// resets internal object variables
		vars: function(){
			var o = {
				storage: localStorage,
				ytVideoID: null,
				ytPageContainer: null,
				ytContentContainer: null,
				addonInjected: null,
				addonContainer: null,
				arrowContainer: null,
				textLink: null,
				logoLink: null,
			};
			for(var i in o)
				this[i] = o[i];
			
			this.log('[YR ADDON] vars');
		}, 
		
		// parse_url
		parse_url: function(str) {
			var query, key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port',
				'relative', 'path', 'directory', 'file', 'query', 'fragment'
			],
			regex =  /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/;
		
			var m = regex.exec(str),
			uri = {},
			i = 14;
			while (i--) 
				if (m[i]) 
					uri[key[i]] = m[i];
			
			delete uri.source;
			return uri;
		}, 
			
		// are we on the right page?
		isYouTube: function(){
			var u = this.parse_url(window.location.href);
			return  1
				&& $.inArray(u.host, ['youtube.com','www.youtube.com'])!==-1
				&& u.path=="/watch"
				&& u.query.substr(0,2)=='v=';
		}, 
		
		// injects the addon into the page
		injectAddon: function () {
			
			try {
				
				// not where we're supposed to be
				if(!this.isYouTube()){
					throw new Error('Not YouTube video watch page.');
					return;
				}
				
				// addon already injected
				if(this.addonInjected != null) 
					return;
					
				this.log('[YR ADDON] injectAddon');
				
				// we already have the addon container
				if (this.addonContainer != null || $('#yrAddon').length )
					return; 
				
				// set addon handler
				this.setAddonContainer();
				
				// hide/unhide
				this.arrowContainer.click(function() { yr.arrowClick(); });
				
				// click handlers need to be executed in page context
				var clickHandler = this.fntostr(this.linkClick, this.debug, this.ytVideoID);
				this.textLink.attr('onclick',clickHandler);
				this.logoLink.attr('onclick', clickHandler);
				
				// done
				this.addonInjected = true;
			
			} catch (e) {
				this.log('[YR ADDON] injectAddon, error message: '+e.message);
			}
		},
		
		// useful for ajax'd youtube 
		reInjectAddon: function (e) {
			this.log('[YR ADDON] reInjectAddon');
			this.vars(); 
			this.onLoad();
			this.injectAddon();
		},
		
		// self-explanatory
		onLoad: function () {
			try {	
				this.ytPageContainer = $('#content');
				this.ytContentContainer = $('#watch7-content');
				if(!this.ytVideoID) 
					this.setYtVideoId();
				
			} catch (e) {
				this.log('[YR ADDON] onLoad, error message: '+e.message);
			
			} 
		},
		
		// we need to check if we still have everything on that page.
		onDOMNodeInserted: function(){
			var target = document.getElementById('yrAddon');
			if(target!==null) return;
			if(this.addonContainer===null) return ;
			this.reInjectAddon();
		},
		
		// the gray container under videos
		setAddonContainer: function () {
			if (this.addonContainer) 
				return;
			
			// do we already have it?
			if ($('#yrAddon').length) {
				this.addonContainer = $('#yrAddon');
				return 
			}
			
			this.log('[YR ADDON] setAddonContainer');
			
			// active or inactive gets saved to localstorage
			if(
				typeof(this.storage['yr-display-addon']) == 'undefined' || 
				(typeof(this.storage['yr-display-addon']) != 'undefined' && this.storage['yr-display-addon'] == 'true')
			) {
				this.setActiveAddonContainer();
			} else if (this.storage['yr-display-addon'] == 'false') {
				this.setInactiveAddonContainer();
			}
			
			// internal
			this.addonContainer = $('#yrAddon');
			this.arrowContainer = $('#yrArrow');
			this.textLink = $('#textLink');
			this.logoLink = $('#logoLink');
		},
		
		
		// adds all the buttons and inserts it under the video
		setActiveAddonContainer: function( active ) {
			
			// active or inactive?
			if(typeof(active)=='undefined')
				active = true;
			active = !!active; // typecast to bool not really necessary
			
			this.log('[YR ADDON] setActiveAddonContainer');
			
			// the big orange button under the video
			var addonContainer = $('<div></div>')
				.attr('id','yrAddon')
				.addClass(active ? 'yr-container-active' : 'yr-container-inactive');
			
			var a1 = $('<a>Click here to create a gif or loop this video</a>')
				.attr('id', 'textLink')
				.attr('onclick', 'return false')
				.addClass('link yr-link')
				.appendTo(addonContainer)
				.hide();
			
			// small button on the right under the video
			var a2 = $('<a></a>')
				.attr('id', 'logoLink')
				.attr('onclick', 'return false')
				.addClass('logoLink yr-logo-link')
				.appendTo(addonContainer)
				.hide();
			
			var a2img = $('<span></span>')
				.addClass('yt-uix-tooltip yr-image-link')
				.attr('data-tooltip-text', 'Click here to create a gif or loop this video')
				.appendTo(a2);
			
			// a small hide/show arrow under addonContainer
			var closeArrow = $('<div></div>')
				.attr('id', 'yrArrow')
				.addClass('yrArrowUp yr-arrow')
				.appendTo(addonContainer);
			
			var closeArrowImg = $('<span></span>')
				.addClass('yt-uix-tooltip ' + (active ? 'yr-image-arrow-up' : 'yr-image-arrow-down'))
				.attr('data-tooltip-text', active ? 'Hide' : 'Show')
				.appendTo(closeArrow);
			
			// show the two links if this guy is active
			if(active){
				a1.show();
				a2.show();
			}
			
			// add under the video
			addonContainer.insertBefore( this.ytContentContainer.find('.yt-uix-button-panel').first() );
		},
		
		// we're compact which is cool
		setInactiveAddonContainer: function() {
			return this.setActiveAddonContainer(false);	
		}, 
		
		// sets yt video id internally
		setYtVideoId: function () {
			this.log('[YR ADDON] setYtVideoId');
			this.ytVideoID = this.parse_url(window.location.href).query.substr(2,11);
		},
		
		// when you click the hide/show arrow
		arrowClick: function () {
			this.log('[YR ADDON] arrowClick');
			
			var isActive = this.addonContainer.hasClass('yr-container-active');
			
			if(!isActive) {
				this.addonContainer.removeClass('yr-container-inactive').addClass('yr-container-active');
				this.textLink.show();
				this.logoLink.show();
				this.arrowContainer.find(' > span')
					.removeClass('yr-image-arrow-down')
					.addClass('yr-image-arrow-up')
					.attr('data-tooltip-text', 'Hide');
				
				this.storage['yr-display-addon'] = 'true';
				
			} else {
				this.addonContainer.removeClass('yr-container-active').addClass('yr-container-inactive');
				this.textLink.show();
				this.logoLink.show();
				this.arrowContainer.find(' > span')
					.removeClass('yr-image-arrow-up')
					.addClass('yr-image-arrow-down')
					.attr('data-tooltip-text', 'Show');
				
				this.storage['yr-display-addon'] = 'false';
			}
		},
		
		// converts a function into a string, with arguments
		// arguments can't be recursive objects nor other functions. 
		// use function.toString() and call it back on the receiving end
		fntostr: function(){
			var fn = arguments[0];
			if(typeof(fn)!='function') return '';
			
			// pass arguments
			var args = Array.prototype.slice.call(arguments,1);
			for(var i in args){
				args[i] = JSON.stringify(args[i]);
			}
			
			// compile the function 
			return ["(",fn.toString(),"(",args.join(","),"))"].join("");
		},
		
		// not very elegant but does the job
		linkClick: function (debug,ytVideoID) {
			
			// add the logging function
			var log = function(){
				if(!debug) return;
				console.debug.apply(console,arguments);
			}
			
			log('[YR ADDON] linkClick');
			
			var error = 'none';
			var start_at = ''; 
			var ytPlayer = document.getElementById("movie_player");
			
			// pre-requisites
			if(null === ytPlayer) error = log('[YR ADDON] there\'s no "#movie_player" element');
			if(typeof(ytPlayer.pauseVideo)!='function') error = log('[YR ADDON] no "pauseVideo" function on the element');
			if(typeof(ytVideoID)!='string') error = log('There is to ytVideoID string');
			
			if(error=='none'){
				
				log('[YR ADDON] player state: '+ytPlayer.getPlayerState());
				
				// video not loaded? or something.
				if(ytPlayer.getPlayerState() == -1) return;
				
				// pause the video
				ytPlayer.pauseVideo();
						
				// let's see where we're at
				var current_time = ytPlayer.getCurrentTime();
				var duration = ytPlayer.getDuration();
				
				if( typeof(current_time)!='undefined' && typeof(duration)!='undefined' ) {
					duration = ~~duration;
					current_time = ~~current_time;
					if(duration != current_time)
						start_at = '&start_at='+current_time;
				}
			}
			
			// and open
			var url = 'http://www.yourepeat.com/watch/?v='+ytVideoID+'&s=yt'+start_at;
			window.open(url,'_blank');
		}
	}
	
	// CSS
	kango.invokeAsync('kango.io.getExtensionFileContents', 'styles/youtube.css', function(content) {
		$('<style type="text/css">'+content+'</style>').appendTo('head');
	});
	
	// launch
	yr.vars();
	yr.onLoad();
	yr.injectAddon();
	
	// AJAX youtube
	$(document).bind('DOMNodeInserted', function(){
		yr.onDOMNodeInserted();
	});
	
}());