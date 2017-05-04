
(function () {

    // Enter Global Config Values & Instantiate MSAL Client application
    window.config = {
        clientID: '2730fe41-5ed4-446e-86cd-e58871ca001e',
        redirectUri: window.location.origin,
        interactionMode: "popUp"
    };

    

    if (!clientApplication)
    {
        clientApplication = createApplication(window.config);
        // ConfigureMSALLogger();
    }

    // Get UI jQuery Objects
    var $panel = $(".panel-body");
    var $userDisplay = $(".app-user");
    var $signInButton = $(".app-login");
    var $signOutButton = $(".app-logout");
    var $errorMessage = $(".app-error");
    onSignin(null);

 
    // Handle Navigation Directly to View
    window.onhashchange = function () {
        loadView(stripHash(window.location.hash));
    };
    window.onload = function () {
        $(window).trigger("hashchange");
    };

    // Register NavBar Click Handlers
    $signOutButton.click(function () {
        clientApplication.logout();
    });

    $signInButton.click(function () {
        clientApplication.loginPopup().then(onSignin);
    });

    function onSignin(idToken)
    {
        // Check Login Status, Update UI
        var user = clientApplication.getUser();
        if (user) {
            $userDisplay.html(user.name);
            $userDisplay.show();
            $signInButton.hide();
            $signOutButton.show();
        } else {
            $userDisplay.empty();
            $userDisplay.hide();
            $signInButton.show();
            $signOutButton.hide();
        }

    }


    // Route View Requests To Appropriate Controller
    function loadCtrl(view) {
        switch (view.toLowerCase()) {
            case 'home':
                return homeCtrl;
            case 'todolist':
                return todoListCtrl;
            case 'userdata':
                return userDataCtrl;
        }
    }

    // Show a View
    function loadView(view) {

        $errorMessage.empty();
        var ctrl = loadCtrl(view);

        if (!ctrl)
            return;

        // Check if View Requires Authentication
        if (ctrl.requireADLogin && !clientApplication.getUser()) {
            clientApplication.loginPopup().then(onSignin);
            return;
        }

        // Load View HTML
        $.ajax({
            type: "GET",
            url: "App/Views/" + view + '.html',
            dataType: "html",
        }).done(function (html) {

            // Show HTML Skeleton (Without Data)
            var $html = $(html);
            $html.find(".data-container").empty();
            $panel.html($html.html());
            ctrl.postProcess(html);

        }).fail(function () {
            $errorMessage.html('Error loading page.');
        }).always(function () {

        });
    };

    function stripHash(view) {
        return view.substr(view.indexOf('#') + 1);
    }

}());

        


