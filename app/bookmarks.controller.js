/*
    Bookmarks Controller
    Controls CRUD operations using a data service targetting a list in SharePoint
*/
bookmarksApp.controller('bookmarksCtrl', function ($scope, dataService) {
    
    /*
        Retrieves bookmark data using the dataService's read method 
    */
    $scope.getBookmarks = function(){
        /*
            The read method takes in SharePoint's list name and an ODATA query
            read: function(listName, odataQuery)
        */
        dataService.read("Favoritos", "$select=ID,Title,URL").then(function(data){
            $scope.bookmarksList = data;
        });
    }
    
    /*
        Displays the bookmark creation's form inputs and controls
        Disables the editing controls
    */
    $scope.createItem = function(){
        $scope.creating = true;
        //Clearing eventual error messages unrelated to this action
        $scope.errorMessages = "";
    }

    $scope.editItem = function(id){
        $scope.editing = true;
        $scope.currentItem = id;
        //Clearing eventual error messages unrelated to this action
        $scope.errorMessages = "";
    }

    $scope.saveNewItem = function(title, url){

        //Initializing an array that may contain validation messages
        var validationMessages = [];

        //Checking whether the my form data is valid
        if ($scope.favoritos.$valid){

            //Passing data to a service that merges it with SharePoint's required metadata
            var dataObject = dataService.getDataObject({
                'Title': title,
                'URL': {
                    'Url': url,
                    'Title': title
                }
            });

            //This variable allows users to know that saving is in progress
            $scope.saving = true;
        
            //Getting the request digest before cakkung the create service
            dataService.getRequestDigest()
                .then(function(__REQUESTDIGEST){
                    //Calling the create Service 
                    dataService.create("Favoritos", dataObject, __REQUESTDIGEST)
                        .then(
                            //Success function
                            function(){
                                //Updating the current data
                                $scope.getBookmarks();
                                //Hiding the saving progress element
                                $scope.saving = false;
                                //Hiding the creating form items
                                $scope.creating = false;
                                //Clearing the inputs' models
                                $scope.newItem.Title = null;
                                $scope.newItem.Url = null;
                                $scope.favoritos.$setPristine();
                            },
                            //Error handling function
                            function(){
                                //Hiding the saving status 
                                $scope.saving = false;
                                //Creating an error message. Setting the error message as a server error and passing in the error message.
                                $scope.setErrorMessages("serverError", ['Error saving a new item.']);
                            }
                        );
                });

        } else {
            
            //Adding custom messages for invalid inputs
            if ($scope.favoritos.newItemTitle.$invalid) { validationMessages.push("Invalid Title.") };
            if ($scope.favoritos.newItemUrl.$invalid) { validationMessages.push("Invalid URL.") };
            //Creating an error message. Setting the error message as a warning and passing in an array.
            $scope.setErrorMessages("warning", validationMessages);

        }

    }

    $scope.saveEditing = function(id, title, url){

        //Passing data to a service that merges it with SharePoint's metadata
        var dataObject = dataService.getDataObject({
            'Title': title,
            'URL': {
                'Url': url,
                'Title': title
            }
        });

        //Setting a message to inform the user that there is a transaction happening
        $scope.saving = true;
        $scope.currentItem = id;
        
        //Getting the request digest before calling the editing service
        dataService.getRequestDigest()
            .then(function(__REQUESTDIGEST){
                dataService.update("Favoritos", id, dataObject, __REQUESTDIGEST)
                    .then(
                        //Success function
                        function(){
                            $scope.getBookmarks();
                            $scope.saving = false;
                            $scope.editing = false;
                        },
                        //Error handling function
                        function(){
                            //Hiding the saving status 
                            $scope.saving = false;
                            //Creating an error message. Setting the error message as a server error and passing in the error message.
                            $scope.setErrorMessages("serverError", ['Error editing an item.']);
                    })
            });
    }

    $scope.deleteItem = function(id) {
        //Getting the request digest before calling the delete service
        dataService.getRequestDigest()
            .then(function(__REQUESTDIGEST){
                dataService.delete("Favoritos", id, __REQUESTDIGEST)
                    .then(
                        //Success function
                        function(){
                            $scope.getBookmarks();
                        },
                        //Error handling function
                        function(){
                            //Creating an error message. Setting the error message as a server error and passing in the error message.
                            $scope.setErrorMessages("serverError", ['Error deleting an item.']);
                    });
            });
    }

    $scope.cancelEditing = function(){

        $scope.editing = false;
        $scope.currentItem = null;
        $scope.errorMessages = "";

        /*
            Since the user might have changed the input, and consequently the model,
            this is the quickest way to restore the model to mirror unchanged information.
        */
        $scope.getBookmarks();
    }

    $scope.cancelCreating = function(){

        $scope.creating = false;
        $scope.errorMessages = "";
        
        //Clearing the inputs' models
        $scope.newItem.Title = null;
        $scope.newItem.Url = null;

        //Clearing eventual traces of previous attempts to add an item
        $scope.favoritos.$setPristine();
    }

    /*
        Initializing the application to view mode
        Presenting the bookmark data
    */
    $scope.init = (function(){
        $scope.creating = false;
        $scope.editing = false;
        $scope.saving = false;
        $scope.currentItem = null;
        $scope.newItem = {
            Title: null,
            Url: null
        };
        $scope.errorMessage = "";
        $scope.getBookmarks();
    })();

    /*
        Empties the error message element, set the error type, and adds the error messages passed in as an array
    */
    $scope.setErrorMessages = function(errorType, errorsArray){
        $scope.errorType = errorType;
        $scope.errorMessages = "";
        for(var i = 0, arrayLength = errorsArray.length; i < arrayLength; i++) {
            $scope.errorMessages += errorsArray[i] + " ";
        }
    };

});