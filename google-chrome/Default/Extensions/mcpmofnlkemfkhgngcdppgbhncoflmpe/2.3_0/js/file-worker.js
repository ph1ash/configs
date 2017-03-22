// Define the FormData object for the Web worker. This is necessary to
// send the file we retrieved via an ajax request because native FormData
// does not support arraybuffers.
importScripts('lib/xhr2-FormData.js')

// Retrieve the remote file
// Note: In a Web worker, the global object is called "self" instead of "window"
self.onmessage = function(event) {
    var resourceUrl = event.data;   // From the background page
    var xhr = new XMLHttpRequest();
    xhr.open('GET', resourceUrl, true);

    // Response type arraybuffer - XMLHttpRequest 2
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) {
        if (xhr.status == 200) {
            nextStep(xhr.response, resourceUrl);
        }
        else {
            postMessage({'status': 'failure'});
        }
    };
    xhr.send();
};

// Send the retrieved file to Lucid for conversion
function nextStep(arrayBuffer, url) {
    var xhr = new XMLHttpRequest();
    // Using FormData polyfill for Web workers!
    var fd = new FormData();
    fd.append('server-method', 'upload');

    // The native FormData.append method ONLY takes Blobs, Files or strings
    // The FormData for Web workers polyfill can also deal with array buffers
    var filename = url.substring(url.lastIndexOf('/') + 1);
    fd.append('file', arrayBuffer, filename);
    fd.append('conversion_type', 'visio');
    fd.append('source', 'free_viewer_extension');
    fd.append('extension_source', 'web_file');

    xhr.open('POST', 'https://www.lucidchart.com/visio/openConversions', true);

    xhr.onload = function(e) {
        if (xhr.status == 200) {
            var responseJson = JSON.parse(xhr.responseText);
            responseJson['status'] = 'success';
            postMessage(responseJson);
        }
        else {
            postMessage({'status': 'failure'});
        }
    };

    // Transmit the form to the server
    xhr.send(fd);
};