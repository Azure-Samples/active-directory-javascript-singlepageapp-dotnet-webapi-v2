using Microsoft.Owin.Security.ActiveDirectory;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Web;

namespace TodoSPA
{
    public partial class Startup
    {
        // To be updated https://github.com/Azure-Samples/active-directory-dotnet-webapp-webapi-openidconnect-aspnetcore
        public void ConfigureAuth(IAppBuilder app)
        {
            var tvps = new TokenValidationParameters
            {
                // In this app, the TodoListClient and TodoListService
                // are represented using the same Application Id - we use
                // the Application Id to represent the audience, or the
                // intended recipient of tokens.

                ValidAudience = ConfigurationManager.AppSettings["ida:Audience"],

                // In a real applicaiton, you might use issuer validation to
                // verify that the user's organization (if applicable) has
                // signed up for the app.  Here, we'll just turn it off.

                ValidateIssuer = false,
            };

            // Set up the OWIN pipeline to use OAuth 2.0 Bearer authentication.
            // The options provided here tell the middleware about the type of tokens
            // that will be recieved, which are JWTs for the v2.0 endpoint.

            // NOTE: The usual WindowsAzureActiveDirectoryBearerAuthenticaitonMiddleware uses a
            // metadata endpoint which is not supported by the v2.0 endpoint.  Instead, this
            // OpenIdConenctCachingSecurityTokenProvider can be used to fetch & use the OpenIdConnect
            // metadata document.

            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions
            {
                AccessTokenFormat = new Microsoft.Owin.Security.Jwt.JwtFormat(tvps, new OpenIdConnectCachingSecurityTokenProvider("https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration")),
            });
        }
    }
}