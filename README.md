# sharepoint_bookmarks
This is a simple Angular.js bookmarks app using SharePoint's REST API

Background
This app was initially created to integrate an Intranet portal for Caixa Econômica Federal. Their homepage was using SharePoint's cache, but as an employee's bookmarks could not be cached, the need to create a JavaScript solution arised. Although this webpart this would not become a single-page application per se, I decided to use Angular.js to speed up the development as we had a tight deadline. 

I have created some services that should be reusable on any applications that must retrieve SharePoint's Request Digest tokens and to perform CRUD operations agains SharePoint's REST APIs. The parametrization of these services is still a work in progress as the specific requirements for this project were not critical.
