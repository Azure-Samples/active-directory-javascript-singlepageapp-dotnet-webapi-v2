(function () {

    // The HTML for this View
    var viewHTML;

    function refreshViewData() {

        // Empty Old View Contents
        var $dataContainer = $(".data-container");
        $dataContainer.empty();
        var $loading = $(".view-loading");
        var scope = [window.config.clientID];

        var user = clientApplication.getUser();
        var $html = $(viewHTML);
        var $template = $html.find(".data-container");
        var output = '';

        for (var property in user) {
            if (user.hasOwnProperty(property)) {
                var $entry = $template;
                $entry.find(".view-data-claim").html(property);
                $entry.find(".view-data-value").html(user[property]);
                output += $entry.html();
            }
        }

        // Update the UI
        $loading.hide();
        $dataContainer.html(output);
    }

    // Module
    window.userDataCtrl = {
        requireADLogin: true,
        preProcess: function (html) {

        },
        postProcess: function (html) {
            viewHTML = html;
            refreshViewData();
        },
    };

}());

