// This configure verbose login for MSAL for diagnostic purposes
function ConfigureMSALLogger() {
    // Set up a callback on the logger to log to the console
    var logger = new MSAL.Logger(MSAL.Utils.CreateNewGuid());
    logger.level = MSAL.LogLevel.Verbose;
    logger.localCallback = console.log;
}

// Initialize MSAL libraries by setting the Client Id and a callback
// @config - variable containing basic configuration, such as Client Id, interaction mode, and Redirect Url
// @authCallback - callback function to be called after sign-in completes
function createApplication(config, authCallback) {
    var userAgentApplication = new MSAL.UserAgentApplication(config.clientID, null, authCallback);
    userAgentApplication.redirectUri = config.redirectUri;
    userAgentApplication.interactionMode = config.interactionMode;

    // On page load, check if the token is present in the location hash and handle it
    var isCallback = userAgentApplication.isCallback(window.location.hash);
    if (isCallback) {
        userAgentApplication.handleAuthenticationResponse(window.location.hash);
    }
    return userAgentApplication;
}

//A simple cal to login method. 
//If user is not signed-in, MSAL will redirect user to sign-in
function signIn() {
    clientApplication.login();
}

//A simple cal to login method for UserAgentApplication
function signOut() {
    clientApplication.logout();
}

var clientApplication;
