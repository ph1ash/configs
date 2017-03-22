/*
 * When the browser action for the extension is clicked open the free viewer
 * local file page.
 */
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create(
        {"url": "free_visio_viewer.html"}
    );
});

/*
 * Open the free viewer local file page on installation of the extension.
 */
chrome.runtime.onInstalled.addListener(function (details) {
	if(details.reason == "install") {
	    chrome.tabs.create(
	    	{url: "free_visio_viewer.html"}
		);
	}
});