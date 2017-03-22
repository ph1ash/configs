/**
 * Subscribe to changes on an attribute called 'download_url' and create the
 * open in Lucidchart button when it does.
 */
var $jq = jQuery.noConflict();

$jq(document).ready(function() {
    var target = document.querySelector('body');
    var config = { attributes: true, attributeFilter: ['download_url'], childList: false, characterData: false, subtree: true};
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach( function(mutation) {
            insertLink(mutation.target);
        });
    });
    observer.observe(document.body, config);
});

function insertLink(node) {
    var attachment = $jq(node);
    var downloadUrl = attachment.attr('download_url');

    var str = downloadUrl.toLowerCase();
    if (str.indexOf(".vsd") > -1 || str.indexOf(".vdx") > -1 || str.indexOf(".vsdx") > -1 || str.indexOf(".vsdm") > -1) {
        var attachmentButtonContainer = attachment.find('div.aQw');
        if (attachmentButtonContainer.find('div.view_in_lucidchart').length == 0) {

            var lucidHref = 'https://www.lucidchart.com/gmail/open?'+getAttrs(downloadUrl)+'&conversion_type=visio&source=free_viewer_extension';

            var lucidDiv = $jq("<div>").attr({
                "class" : "T-I J-J5-Ji aQv T-I-ax7 L3 view_in_lucidchart",
                "aria-label" : "Open in Lucidchart",
                "role" : "button",
                "data-tooltip" : "Open in Lucidchart"
            });

            var lucidLink = $jq("<a>").attr({
                "class" : "view_in_lucidchart",
                "target" : "_blank",
                "href" : lucidHref
            }).appendTo(lucidDiv);

            lucidLink.append($jq("<div>"));

            lucidDiv.hover(function() {
                $jq(this).addClass('T-I-JW');
            }, function () {
                $jq(this).removeClass('T-I-JW');
            });

            lucidDiv.click(function (e) {
                e.stopPropagation();
            });

            attachmentButtonContainer.append(lucidDiv);
        }
    }
}

function getAttrs(downLink) {
    downLink = decodeURIComponent(downLink);
    var vals = downLink.slice(downLink.indexOf('?') + 1).split('&'),
        attid,
        thid;

    for(var i = 0; i < vals.length; i++)
    {
        pair = vals[i].split('=');
        if (pair[0] == 'attid' && pair.length > 1)
            attid = pair[1];
        if (pair[0] == 'th' && pair.length > 1)
            thid = pair[1];
    }

    return 'attid=' + encodeURIComponent(attid) + '&uid=' + encodeURIComponent(thid);
}
