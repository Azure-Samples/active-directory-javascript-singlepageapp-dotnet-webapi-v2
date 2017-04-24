using Microsoft.Owin.Security.ActiveDirectory;
using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace TodoSPA
{
    public partial class Startup
    {
        // To be updated https://github.com/Azure-Samples/active-directory-dotnet-webapp-webapi-openidconnect-aspnetcore
        public void ConfigureAuth(IAppBuilder app) {

            app.UseWindowsAzureActiveDirectoryBearerAuthentication(
                new WindowsAzureActiveDirectoryBearerAuthenticationOptions
                {
                    Audience = ConfigurationManager.AppSettings["ida:Audience"],
                    Tenant = ConfigurationManager.AppSettings["ida:Tenant"],
                });
        }
    }
}