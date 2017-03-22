// Send a file URI to Lucid and have Lucid attempt to retrieve and convert the file.
// Note: In a Web worker, the global object is called "self" instead of "window"
self.onmessage = function(event) {
    var resourceUrl = event.data;
    var xhr = new XMLHttpRequest();

    var fd = new FormData();
    fd.append('server-method', 'upload');
    fd.append('uri', resourceUrl);
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
    xhr.send(fd);
};