# SharePoint Bookmarks
This is a simple Angular.js bookmarks app using SharePoint's REST API.

This app was initially created as a webpart for Caixa Econômica Federal's Intranet portal. Its homepage was using SharePoint's cache, but as an employee's bookmarks could not be cached, the need to create a JavaScript solution arised. Although this webpart this would not become an entire single-page application, I decided to use Angular.js to speed up the development process. 

I have created some services that should be reusable on any applications that must retrieve SharePoint's Request Digest tokens and perform CRUD operations against SharePoint's REST APIs. The parametrization of these services is still a work in progress as the specific requirements for this project were not critical.

This app has been tested on SharePoint Server 2013, and it can be seen up and running at https://sharepointsaga-public.sharepoint.com/bookmarks/bookmarks.aspx . Nevertheless, without proper authentication, this app will only perform read operations.
