// This configure verbose login for MSAL for diagnostic purposes
function ConfigureMSALLogger() {
    // Set up a callback on the logger to log to the console
    var logger = new Msal.Logger(MSAL.Utils.CreateNewGuid());
    logger.level = MSAL.LogLevel.Verbose;
    logger.localCallback = console.log;
}

// ------------
// Initialize MSAL libraries by setting the Client Id and a callback
// @config - variable containing basic configuration, such as Client Id, interaction mode, and Redirect Url
// @authCallback - callback function to be called after sign-in completes.
function createApplication(config, authCallback) {
    var userAgentApplication = new Msal.UserAgentApplication(config.clientID, null, authCallback);
    userAgentApplication.redirectUri = config.redirectUri;
    userAgentApplication.interactionMode = config.interactionMode;

    // On page load, check if the token is present in the location hash and handle it
    var isCallback = userAgentApplication.isCallback(window.location.hash);
    if (isCallback) {
        userAgentApplication.handleAuthenticationResponse(window.location.hash);
    }
    return userAgentApplication;
}

var clientApplication;

// Get an access token for a given scope
// @scope: permissions (for instance Microsoft Graph scope)
// @callback: callback function to be called with the token, or otherwise, and error.
function getAccessToken(scope, callback) {
    clientApplication.acquireTokenSilent(scope, function callBackendApiCallback(errorDescription, token, error) {
        if (error) {
            clientApplication.acquireToken(scope, function (error, token) {
                if (token) {
                    callback(token, null);
                }
                if (error) {
                    callback(null, error);
                }
            });
        } else {
            callback(token, errorDescription);
        }
    });
}
var clientApplication;
