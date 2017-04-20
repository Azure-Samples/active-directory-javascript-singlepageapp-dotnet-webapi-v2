
(function () {
    // Enter Global Config Values & Instantiate MSAL Client application
    window.config = {
        clientID: '[Enter your client Id here, e.g.b g075edef-0efa-453b-997b-de1337c29185]',
        redirectUri: window.location.origin,
        interactionMode: "popUp"
    };

    if (!clientApplication)
    {
        clientApplication = createApplication(window.config, onSignin);
        // ConfigureMSALLogger();
    }

    // Get UI jQuery Objects
    var $panel = $(".panel-body");
    var $userDisplay = $(".app-user");
    var $signInButton = $(".app-login");
    var $signOutButton = $(".app-logout");
    var $errorMessage = $(".app-error");

    // Check For & Handle Redirect From AAD After Login
 //   var isCallback = clientApplication.isCallback(window.location.hash);
 //   clientApplication.handleWindowCallback();
 //   $errorMessage.html(clientApplication.getLoginError());

 //   if (isCallback && !clientApplication.getLoginError()) {
 //       window.location = clientApplication._getItem(clientApplication.CONSTANTS.STORAGE.LOGIN_REQUEST);
 //   }

 

    // Handle Navigation Directly to View
    window.onhashchange = function () {
        loadView(stripHash(window.location.hash));
    };
    window.onload = function () {
        $(window).trigger("hashchange");
    };

    // Register NavBar Click Handlers
    $signOutButton.click(function () {
        signOut();
    });
    $signInButton.click(function () {
        signIn();
    });

    function onSignin()
    {
        // Check Login Status, Update UI
        var user = clientApplication.getUser();
        if (user) {
            $userDisplay.html(user.profile.name);
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
            clientApplication.config.redirectUri = window.location.href;
            clientApplication.login();
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

        


