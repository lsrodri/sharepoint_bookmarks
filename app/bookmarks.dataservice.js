/*
    SharePoint Data Service
    returns getRequestDigest, getDataObject, create, read, update, and delete
*/

bookmarksApp.factory('dataService', function ($http) {
    
    /*
        This method returns the results object, so that the controller
        does not have to know about how SharePoint returns data.
    */
    var extractSPData = function(data){
        var spData = angular.fromJson(data);
        return spData.data.d.results;
    }

    return {
        getRequestDigest: function(){
            var params = {
                method: 'POST',
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                url: "/_api/contextinfo"
            };
            return $http(params).then(function(data) {
                var spData = angular.fromJson(data);
                var __REQUESTDIGEST = spData.data.d.GetContextWebInformation.FormDigestValue;
                return __REQUESTDIGEST;
            });
        },
        getDataObject: function(dataFields){
            //Adding metadata that SharePoint requires to add or update a list item
            var dataObject = {
                '__metadata': {
                  'type': 'SP.ListItem'
                }
            };
            for(var propertyName in dataFields){
                //Using a switch statement as more exceptions are likely to be added in the future
                switch(propertyName) {
                    //URLs need a specific metadata object in order to be added or updated in SharePoint
                    case "URL":
                        dataObject.URL = {};
                        dataObject.URL.Url = dataFields[propertyName].Url;
                        dataObject.URL.Description = dataFields[propertyName].Title;
                        dataObject.URL.__metadata ={
                          'type': 'SP.FieldUrlValue'
                        };
                        break;
                    //The standard case is that a key/value pair is enough to add/update data in Sharepoint
                    default:
                        dataObject[propertyName] = dataFields[propertyName];
                } 
            }
            return dataObject;
        },
        create: function(listName, dataObject, __REQUESTDIGEST) {
            var params = {
                url: "/_api/web/lists/GetByTitle('" + listName + "')/Items",
                method: "POST",
                data: JSON.stringify(dataObject),
                type: "POST",
                headers: {
                    "ACCEPT": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-RequestDigest": __REQUESTDIGEST,
                }
            };
            return $http(params);
        },
        read: function(listName, odataQuery) {
            var params = {
                url: "/_api/web/lists/GetByTitle('" + listName + "')/Items?" + odataQuery,
                method: 'GET',
                isArray: false,
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                }
            };
            return $http(params).then(function(data){
                return extractSPData(data);
            });
        },
        update: function(listName, id, dataObject, __REQUESTDIGEST) {
            var params = {
                url: "/_api/web/lists/GetByTitle('" + listName + "')/Items(" + id + ")",
                method: "POST",
                data: JSON.stringify(dataObject),
                type: "POST",
                headers: {
                    "ACCEPT": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-RequestDigest": __REQUESTDIGEST,
                    "IF-MATCH": "*",
                    "X-HTTP-Method": "MERGE"
                }
            };
            return $http(params);
        },
        delete: function(listName, id, __REQUESTDIGEST) {
            var params = {
                url: "/_api/web/lists/GetByTitle('" + listName + "')/Items(" + id + ")",
                method: "POST",
                type: "POST",
                headers: {
                    "ACCEPT": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-RequestDigest": __REQUESTDIGEST,
                    "IF-MATCH": "*",
                    "X-HTTP-Method": "DELETE"
                }
            };
            return $http(params);
        }
    }
});