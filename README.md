---
services: active-directory
platforms: dotnet (backend), JavaScript (frontend)
author: jmprieur
---

# JavaScript Single Page Application with an ASP.NET backend, using msal.js

| [Getting Started](https://apps.dev.microsoft.com/portal/register-app)| [Library](https://github.com/AzureAD/microsoft-authentication-library-for-js) | [Docs](https://aka.ms/aaddev) | [Support](README.md#community-help-and-support)
| --- | --- | --- | --- |

## Table of contents

* [Introduction](#introduction)
* [Prerequisites](#prerequisites)
* [Register the application](#register-the-application)
* [Build and run the sample](#build-and-run-the-sample)
* [Community Help and Support](#Community-Help-and-Support)
* [Contributing](#contributing)

## Introduction

The MSAL preview library for JavaScript gives your app the ability to begin using the [Microsoft Cloud](https://cloud.microsoft.com) by supporting [Microsoft Azure Active Directory](https://azure.microsoft.com/en-us/services/active-directory/) and [Microsoft Accounts](https://account.microsoft.com) in a converged experience using industry standard OAuth2 and OpenID Connect. This sample us a JavaScript Single Page with an ASP.NET backend. It demonstrates all the normal lifecycles your application should experience, including:

* How to get a token
* How to refresh a token
* How to call a backend Web API
* How to sign a user out of your application

## Prerequisites

To use this sample, you will need :
* Visual Studio 2015 or later
* Either a [Microsoft account](https://www.outlook.com) or [Office 365 for business account](https://msdn.microsoft.com/en-us/office/office365/howto/setup-development-environment#bk_Office365Account)

## Register the application

1. Sign into the [App Registration Portal](https://apps.dev.microsoft.com/) using either your personal or work or school account.

2. Choose **Add an app**.

3. Enter a name for the app, and choose **Create application**. 
	
   The registration page displays, listing the properties of your app.

4. Copy the Application Id (also named ClientID). This is the unique identifier for your app. 

5. Under **Platforms**, choose **Add Platform**.

6. Choose **Web**.

7. Make sure the **Allow Implicit Flow** check box is selected, and enter *https://localhost:44302/* as the Redirect URI. 

8. Choose **Save**.


## Build and run the sample

1. Download or clone thes sample.

2. Using your favorite IDE, open **app.js** in *App/scripts*.

3. Replace the **clientId** placeholder value with the application ID of your registered Azure application.

4. open **Web.confg** in the root of the application.

5. Replace the value of the  **Ida::Audience** application setting  with the application ID of your registered Azure application.

6. Replace the value of the  **Ida::Tenant** application setting  with the name of the AAD tenant in which you have registered your application.
  
7. Run the application in Visual Studio

8. Navigate to `http://localhost:44302` in your web browser.

9. Choose the **Connect** button.

10. Sign in with your personal or work or school account and grant the requested permissions.

11. Click on User to see information about the Signed-in user, and TodoList to edit the todo list.


## Community Help and Support
We use [Stack Overflow](http://stackoverflow.com/questions/tagged/msal) with the community to provide support. We highly recommend you ask your questions on Stack Overflow first and browse existing issues to see if someone has asked your question before. Make sure that your questions or comments are tagged with [msal.js].

If you find and bug or have a feature request, please raise the issue on [GitHub Issues](../../issues). 

To provide a recommendation, visit our [User Voice page](https://feedback.azure.com/forums/169401-azure-active-directory).


## Contributing

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.


## Security Library
This library controls how users sign-in and access services. We recommend you always take the latest version of our library in your app when possible. 

## Security Reporting
If you find a security issue with our libraries or services please report it to [secure@microsoft.com](mailto:secure@microsoft.com) with as much detail as possible. Your submission may be eligible for a bounty through the [Microsoft Bounty](http://aka.ms/bugbounty) program. Please do not post security issues to GitHub Issues or any other public site. We will contact you shortly upon receiving the information. We encourage you to get notifications of when security incidents occur by visiting [this page](https://technet.microsoft.com/en-us/security/dd252948) and subscribing to Security Advisory Alerts.

Copyright (c) Microsoft Corporation.  All rights reserved. Licensed under the MIT License (the "License");