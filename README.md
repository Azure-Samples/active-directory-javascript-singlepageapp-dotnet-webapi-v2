---
services: active-directory
platforms: dotnet (backend), JavaScript (frontend)
author: jmprieur
---

# JavaScript Single Page Application with an ASP.NET backend, using msal.js

## Table of contents

* [Introduction](#introduction)
* [Prerequisites](#prerequisites)
* [Register the application](#register-the-application)
* [Build and run the sample](#build-and-run-the-sample)
* [Code of note](#code-of-note)
* [Questions and comments](#questions-and-comments)
* [Contributing](#contributing)

## Introduction

This sample shows how to authenticate to a JavaScript Single Page Application with a Microsoft work or school (Azure Active Directory) or personal (Microsoft). This is a TodoList application which backend is an ASP.NET application, and front end some JavaScript

## Prerequisites

To use this sample, you will need :
* Visual Studio 2015 or later
* Either a [Microsoft account](https://www.outlook.com) or [Office 365 for business account](https://msdn.microsoft.com/en-us/office/office365/howto/setup-development-environment#bk_Office365Account)

## Register the application

1. Sign into the [App Registration Portal](https://apps.dev.microsoft.com/) using either your personal or work or school account.

2. Choose **Add an app**.

3. Enter a name for the app, and choose **Create application**. 
	
   The registration page displays, listing the properties of your app.

4. Copy the Application Id. This is the unique identifier for your app. 

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

## Contributing

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Questions and comments

We'd love to get your feedback about this sample. You can send your questions and suggestions in the [Issues](https://github.com/Azure-Samples/active-directory-javascript-singlepageapp-dotnet-webapi-v2/issues) section of this repository.

Questions about Microsoft Graph development in general should be posted to [Stack Overflow](https://stackoverflow.com/questions/tagged/msal). Make sure that your questions or comments are tagged with [msal.js].
