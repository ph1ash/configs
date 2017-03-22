/**
 * If we have a click from the 'Open in Lucidchart' context menu entry, deal
 * with it.
 */
function createTab(info, tab) {
    if (info.menuItemId == 'viewWebFile') {
        var url = info['linkUrl'];

        chrome.tabs.create(
            {"url": "loading.html"},
            function(createdTab){sendToLucid(url, createdTab);}
        );
    }
}

/** 
 * Try to convert the file by URI. If we can't access the file due to
 * permission restrictions (behind a login screen, local network, etc)
 * then we will fail fast and move to downloading and uploading the file
 * locally.
 */
function sendToLucid(url, tab) {
    var uriWorker = new Worker('js/uri-worker.js');
    uriWorker.addEventListener('message', function(e) {
        if (e.data.status == 'success') {

            // Update created tab
            chrome.tabs.update(
                tab.id,
                {"url": e.data.viewer}
            );
        }
        else {
            downloadAndUploadToLucid(url, tab);
        }
    }, false);
    uriWorker.postMessage(url);
}

/**
 * Given the url to a file. Download that file using an ajax request and
 * then send it to Lucid for conversion.
 */
function downloadAndUploadToLucid(url, tab) {
    // Download the file using the user's connection and upload it to lucid
    // for conversion.
    var fileWorker = new Worker('js/file-worker.js');
    fileWorker.addEventListener('message', function(e) {
        var url = "";

        if (e.data.status == 'success') {
            url = e.data.viewer;
        }
        else {
            url = "http://support.lucidchart.com/entries/22201888-Visio-File-VSD-VDX-VSDX-import-failed"
        }

        // Update created tab
        chrome.tabs.update(
            tab.id,
            {"url": url}
        );
    }, false);
    fileWorker.postMessage(url);
}


chrome.contextMenus.onClicked.addListener(createTab);

// Create context menu item for Visio file extensions. Chrome does not have a case
// insensitive option, so we have all possible cases enumerated.
chrome.contextMenus.create({
    "title": "Open in Lucidchart",
    "contexts":["link"],
    "targetUrlPatterns":[
        "*://*/*.vdx","*://*/*.Vdx","*://*/*.vDx","*://*/*.vdX",
        "*://*/*.VDx","*://*/*.VdX","*://*/*.vDX","*://*/*.VDX",

        "*://*/*.vsd","*://*/*.Vsd","*://*/*.vSd","*://*/*.vsD",
        "*://*/*.VSd","*://*/*.VsD","*://*/*.vSD","*://*/*.VSD",

        "*://*/*.vsdx","*://*/*.Vsdx","*://*/*.vSdx","*://*/*.vsDx",
        "*://*/*.vsdX","*://*/*.VSdx","*://*/*.VsDx","*://*/*.VsdX",
        "*://*/*.vSDx","*://*/*.vSdX","*://*/*.vsDX","*://*/*.VSDx",
        "*://*/*.VSdX","*://*/*.VsDX","*://*/*.vSDX","*://*/*.VSDX",

        "*://*/*.vsdm","*://*/*.Vsdm","*://*/*.vSdm","*://*/*.vsDm",
        "*://*/*.vsdM","*://*/*.VSdm","*://*/*.VsDm","*://*/*.VsdM",
        "*://*/*.vSDm","*://*/*.vSdM","*://*/*.vsDM","*://*/*.VSDm",
        "*://*/*.VSdM","*://*/*.VsDM","*://*/*.vSDM","*://*/*.VSDM"
    ],
    "id": "viewWebFile"
});

