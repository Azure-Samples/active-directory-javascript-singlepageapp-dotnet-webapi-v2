using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security.ActiveDirectory;
using Microsoft.Owin.Security.Jwt;
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
        public void ConfigureAuth(IAppBuilder app)
        {
            var clientId = ConfigurationManager.AppSettings["ida:Audience"];
            var tvps = new TokenValidationParameters
            {
                // In this app, the TodoListClient and TodoListService
                // are represented using the same Application Id - we use
                // the Application Id to represent the audience, or the
                // intended recipient of tokens.

                ValidAudiences = new[] { clientId, $"api://{clientId}" },

                // In a real application, you might use issuer validation to
                // verify that the user's organization (if applicable) has
                // signed up for the app.  Here, we'll just turn it off.

                ValidateIssuer = false,
            };

            // Set up the OWIN pipeline to use OAuth 2.0 Bearer authentication.
            // The options provided here tell the middleware about the type of tokens
            // that will be received, which are JWTs for the Microsoft identity platform endpoint.

            // NOTE: The usual WindowsAzureActiveDirectoryBearerAuthenticationMiddleware uses a
            // metadata endpoint which is not supported by the identity platform endpoint.  Instead, this
            // OpenIdConnectCachingSecurityTokenProvider can be used to fetch & use the OpenIdConnect
            // metadata document.
            // See https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-devquickstarts-dotnet-api

            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions
            {
                AccessTokenFormat = new JwtFormat(tvps, new OpenIdConnectSecurityKeyProvider("https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration")),
            });
        }
    }
}
