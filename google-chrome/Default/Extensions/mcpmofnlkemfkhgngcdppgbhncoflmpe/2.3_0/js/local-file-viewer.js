/**
 * =======================================================================
 * Drop zone component
 * =======================================================================
 */
var lucid = lucid || {};

/**
 * @constructor
 * Create a VisioDropZone object
 * @param {HTMLElement} elem the element to turn into a Visio drag and drop area
 */
lucid.VisioDropZone = function(elem) {
    // create a container for the dropzone
    var component = $('<div>').get(0);
    $(elem).append(component);
    this.component = this.toDropZone(component);

    this.fileName = '';

    this.createDom();
    this.createCallbacks();
    this.showNoUpload();
}

/**
 * Create the DOM to go within the div provided for the drop zone
 */
lucid.VisioDropZone.prototype.createDom = function() {
    // initialize the mask
    var mask = $('<div>').addClass('vs-upload-mask').get(0);
    $(this.component).append(mask);
    this.mask = this.toDropZone(mask);

    // create the header area
    var header = $('<h1>').addClass('vs-header').get(0);
    $(this.component).append(header);
    this.header = $(header);

    // create the image
    var image = $('<img>').addClass('vs-img').get(0);
    $(this.component).append(image);
    this.image = $(image);

    // create the footer area
    var footer = $('<div>').addClass('vs-footer').get(0);
    $(this.component).append(footer);
    this.footer = $(footer);

    // create the footer area for the no upload view
    this.noUploadFooter = $(
        '<div>' +
            '<div class="vs-upload-btn-container">' +
                '<div class="vs-or-container">' +
                    '<span class="vs-or small-body-text">or</span>' +
                '</div>' +
                '<input type="button" class="btn btn-secondary vs-upper choose-file-text blue-button" id="choose-file-button" value="choose file" />' +
            '</div>' +
            '<p class="vs-supports small-body-text italic">(support for .vdx, .vsd, .vsdx, and .vsdm version 2007 and later)</p>' +
        '</div>'
    ).get(0);

    // create the footer area for the dragging view
    this.dragOverFooter = $(
        '<div>' +
            '<p class="header-text white-text">Incoming!</p>' +
            '<p class="vs-instructions small-text">Drop your file to instantly view it in Lucidchart for Free!</p>' +
        '</div>'
    ).get(0);

    // create a hidden file input for users who want to choose their file manually
    var wrapper = $('<div>').css({
        'height': 0,
        'width': 0,
        'overflow': 'hidden'
    });
    var fileInput = $('<input type="file">').get(0);
    $(this.component).append(fileInput);
    this.fileInput = $(fileInput);
    this.fileInput.wrap(wrapper);
    this.fileInput.change(function() {
        var file = this.fileInput.get(0).files[0];
        this.unescapedFileName = file.name;
        this.fileName = escape(file.name);
        this.uploadFile(file);
    }.bind(this));

    // create an error dialog
    var errorDialog = $(
        '<div class="vs-error">' +
            '<div class="vs-error-container">' +
                '<h2 class="error-header-text">UPLOAD ERROR</h2>' +
                '<p class="error-text">Failed to upload Visio File.</p>' +
                '<p class="error-text">Please check the file format or internet connection. ' +
                    '<a href="http://support.lucidchart.com/entries/22201888-VSD-VDX-or-VSDX-import-failed" class="external-link" rel="nofollow">Learn more</a>' +
                '</p>' +
                '<div class="vs-error-footer">' +
                    '<input id="error-ok-button" type="button" class="btn btn-secondary blue-button error-text white-text" value="OK" />' +
                '</div>' +
            '</div>' +
        '</div>'
    ).get(0);
    $(this.component).append(errorDialog);
    this.errorDialog = $(errorDialog)
    this.errorDialog.find('.btn').click(function() {
        this.errorDialog.hide();
        this.showNoUpload();
    }.bind(this));
    this.errorDialog.hide();
}

/**
 * Switch the view state to the no upload view
 */
lucid.VisioDropZone.prototype.showNoUpload = function() {
    $(this.component).attr('class', 'vs-no-upload');
    this.header.html('<span class="header-text">Drop Visio File Here</span><span class="subheader-text"> to Upload</span>');
    this.header.css({"height": ""});
    this.image.attr('src', 'img/vs-no-upload.png');
    this.image.addClass('vs-start-img');
    this.footer.empty().append(this.noUploadFooter);

    // make the upload button affect the hidden file input
    $(this.noUploadFooter).find('.btn').click(function() {
        this.fileInput.click();
    }.bind(this));
}

/**
 * Switch the view state to the dragging view
 */
lucid.VisioDropZone.prototype.showDragOver = function() {
    $(this.component).attr('class', 'vs-drag-over');
    this.header.empty();
    this.image.attr('src', 'img/vs-drag-over.png');
    this.header.css({"height": "0"});
    this.image.removeClass('vs-start-img');

    this.footer.empty().append(this.dragOverFooter);
}

/**
 * Switch the view state to the uploading view
 */
lucid.VisioDropZone.prototype.showLoading = function() {
    $(this.component).attr('class', 'vs-loading');
    this.header.empty();
    this.header.css({"height": "0"});
    this.image.attr('src', 'img/vs-drag-over.png');
    this.image.removeClass('vs-start-img');
    this.footer.empty().append(
        '<div>' +
            '<p class="vs-file-name small-body-text">' + this.unescapedFileName + '</p>' +
            '<div class="vs-progress">' +
                '<div class="progress-bar-indeterminate"></div>' +
            '</div>' +
        '</div>'
    );
}

/**
 * Upload a visio file to the visio service
 * @param {File} file the file to upload to the visio service
 */
lucid.VisioDropZone.prototype.uploadFile = function(file) {
    var me = this;

    // clear the file input for future use
    this.fileInput.wrap('<form>').closest('form').get(0).reset();
    this.fileInput.unwrap();

    // switch to the uploading view
    this.showLoading();

    var form = new FormData();
    form.append('file', file);
    form.append('name', file.name);
    form.append('conversion_type', 'visio');
    form.append('source', 'free_viewer_extension');
    form.append('extension_source', 'local_file');

    $.ajax({
        'url': 'https://www.lucidchart.com/visio/openConversions',
        'type': 'POST',
        'data': form,
        'error': function() {
            me.errorDialog.show();
        },
        'success': function(data) {
            me.showDone();
            setTimeout(function() {
                var location = data['viewer'];
                chrome.tabs.create(
                    {"url": location}
                );
                me.showNoUpload();
            }, 1000);
        },
        'processData': false,
        'contentType': false,
        'cache': false
    });
}

/**
 * Switch the view state to the done uploading view
 */
lucid.VisioDropZone.prototype.showDone = function() {
    $(this.component).attr('class', 'vs-done');
    this.header.empty();
    this.header.css({"height": "0"});
    this.image.attr('src', 'img/vs-done.png');
    this.footer.empty().append(
        '<div>' +
            '<p class="vs-file-name small-body-text">' + this.unescapedFileName + '</p>' +
            '<p class="vs-open header-text blue-text">Opening File...</p>' +
        '</div>'
    )
}

/**
 * Create the callbacks for drag events
 */
lucid.VisioDropZone.prototype.createCallbacks = function() {
    var me = this;
    // set the dragenter callback on the component passed in, and show the invisible mask.
    // We then define the remaining callbacks on the mask, because events will fire on the original
    // component whenever we enter a child element. Defining the dragleave event on an invisible
    // mask that overlays the component keeps this from happening.
    this.component.dragCallback('dragenter', function(event) {
        // don't go into drag mode if the error dialog is shown
        if (me.errorDialog.is(':visible')) {
            return;
        }
        me.showDragOver()
        $(me.mask).show();
    });

    this.mask.dragCallback('dragleave', function(event) {
        me.showNoUpload();
        $(me.mask).hide();
    });

    this.mask.dragCallback('drop', function(event) {
        // don't upload if the error dialog is shown
        if (me.errorDialog.is(':visible')) {
            return;
        }

        // There needs to be a file to upload. Otherwise we might have dragged
        // some text from the page onto the dropzone.
        if (typeof event.dataTransfer.files[0] == 'undefined') {
            me.showNoUpload();
            $(me.mask).hide();
        }
        var file = event.dataTransfer.files[0];
        me.unescapedFileName = file.name;
        me.fileName = escape(file.name);
        $(me.mask).hide();
        me.uploadFile(file);
    });

    // do nothing on the drag over event
    // we have to specify this because if this event gets propagated, the browser
    // will still carry out its default action
    this.mask.dragCallback('dragover', function(event) {});
};

/**
 * Create a function on the element that will make it easy to add drag event
 * callbacks that keep the browser from doing its default behavior (opening the file).
 * In the callback, 'this' refers to the element.
 */
lucid.VisioDropZone.prototype.toDropZone = function(elem) {
    elem.dragCallback = function(eventName, callback) {
        this.addEventListener(eventName, function(event) {
            event.preventDefault();
            event.stopPropagation();
            callback.call(this, event);
        });
    }.bind(elem);

    return elem;
};

$(document).ready(function() {
    $('.visio-dropzone').each(function() {
        new lucid.VisioDropZone(this);
    });
    $('img').on('dragstart', function(event) { event.preventDefault(); });
    $('#bottom-sign-up-button').on('dragstart', function(event) { event.preventDefault(); });

});
