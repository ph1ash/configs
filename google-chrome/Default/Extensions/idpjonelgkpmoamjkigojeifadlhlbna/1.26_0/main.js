(function(k){
	
	// define YR
	function YR() {
		this.init();
	}
	
	// methods
	YR.prototype = {
		
		iconEnabled:true,
		changeIconTask:0,
		
		// init
		init:function(){
			var t = this;
			
			// attach handler to extension's button
			k.ui.browserButton.addEventListener(k.ui.browserButton.event.COMMAND, function() {
				t.onButtonClick();
			});
			
			// set a task to update the check if necessary to update the button every second or so
			this.changeIconTask = setInterval(function(){
				t.changeIconIfNeeded();
			}, 700);
		}, 
		
		// when you click a browser button
		onButtonClick: function() {
			
			var t = this;
			k.browser.tabs.getCurrent(function(tab) {
				var id = t.getVideoId(tab.getUrl());
				if(id===false){
					tab.navigate('http://www.yourepeat.com/?s=yt');
				}else{
					tab.navigate('http://www.yourepeat.com/watch/?v=' + id + '&s=yt');
				}
			});
			
		}, 
		
		// opens any url in a new tab (unused ?)
		openURL: function(url){
			k.browser.tabs.create({url: url});
		},
		
		// is that url a valid youtube url ?
		isYouTubePage: function(url){
			var p = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
			return (url.match(p)) ? RegExp.$1 : false;
		}, 
		
		// gets the ?v=xxxxxxxx video id;
		getVideoId: function(url){
			if(!this.isYouTubePage(url))
				return false;
			var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
			var match = url.match(regExp);
			if (match&&match[2].length==11){
				return match[2];
			}
			return false;
		},
		
		// changes the browser button icon accordingly
		changingIcon: false,
		changeIconIfNeeded: function(){ 
			
			// don't do it twice;
			if(this.changingIcon) 
				return;
			
			this.changingIcon = true;
			
			
			var t = this;
			k.browser.tabs.getCurrent(function(tab){
				var url = tab.getUrl();
				var e = t.getVideoId(url)!==false;
				if(e==t.iconEnabled) 
					return t.changingIcon = false;
				
				var browserbutton = k.browser.getName() == 'safari' ? (
					e ? 'icons/yourepeat_16x16bw-enabled.png' : 'icons/yourepeat_16x16bw-disabled.png'
				) : (
					e ? 'icons/yourepeat_16x16.png' : 'icons/yourepeat_16x16g.png'
				);  
					
				k.ui.browserButton.setIcon( browserbutton );
				k.ui.browserButton.setTooltipText( e ? 'Repeat this video or create a gif' : 'This is not a YouTube video');
				
				t.iconEnabled = e;
				t.changingIcon = false;
			});
		}
		
	};
	
	// and let's have a new one
	var yr = new YR();
	
}(kango));



