<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Bookmarks App</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="/bookmarks/libs/bootstrap.min.css">
		<link rel="stylesheet" href="/bookmarks/css/style.css">
	</head>
	<body>
		<!-- vendor libraries -->
		<script src="/bookmarks/libs/angular.min.js"></script>

		<!-- app -->
		<script src="/bookmarks/app/bookmarks.js"></script>
		<script src="/bookmarks/app/bookmarks.dataservice.js"></script>
		<script src="/bookmarks/app/bookmarks.controller.js"></script>

		<section id="favoritos"
			class="text-center container"
			ng-app="bookmarksApp"
			ng-controller="bookmarksCtrl as bookmarks">

			<form name="favoritos">
	            <div class="row create-bookmark">
	                <div class="row">
	                	Create up to six bookmarks.
	                </div>
	                <div class="row">
	                    <button class="btn"
	                    	type="button"
	                    	ng-click="createItem()"
	                    	ng-hide="bookmarksList.length >= 6"
	                    	ng-disabled="editing || creating">
	                    	Create
	                    </button>
	                </div>
	            </div>
	            <div class="row">
					<table class="bookmarks-table">
						<thead>
							<tr>
								<th>Title</th>
								<th>Url</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="bookmarkItem in bookmarksList"
								ng-class="{'editing-mode' : editing && currentItem === bookmarkItem.Id}">
								<td>
		                            <input class="form-control"
		                            	type="text"
		                            	name="title"
		                            	ng-show="editing && currentItem === bookmarkItem.Id"
		                            	ng-model="bookmarkItem.Title"
		                            	required>
		                            <span ng-hide="editing && currentItem === bookmarkItem.Id"
		                            	ng-bind="bookmarkItem.Title">
		                            </span>
		                        </td>
		                        <td>
		                        	<input class="form-control"
		                        		type="text"
		                        		name="url"
		                            	ng-show="editing && currentItem === bookmarkItem.Id"
		                            	ng-model="bookmarkItem.URL.Url"
		                            	required>
		                            <span ng-hide="editing && currentItem === bookmarkItem.Id"
		                            	ng-bind="bookmarkItem.URL.Url">
		                            </span>
		                        </td>
		                        <td>
		                            <button class="btn"
		                            	type="button"
		                            	ng-hide="editing && currentItem === bookmarkItem.Id"
		                            	ng-click="editItem(bookmarkItem.Id)"
		                            	ng-disabled="(editing && currentItem !== bookmarkItem.Id) || creating">
		                            	Edit
		                            </button>
		                            <button class="btn"
		                            	type="button"
		                            	ng-show="editing && currentItem === bookmarkItem.Id"
		                            	ng-click="cancelEditing()">
		                            	Cancel
		                            </button> 
		                        </td>
		                        <td>
		                            <button class="btn"
		                            	type="button"
		                            	ng-hide="editing && currentItem === bookmarkItem.Id"
		                            	ng-click="deleteItem(bookmarkItem.Id)"
		                            	ng-disabled="(editing && currentItem !== bookmarkItem.Id) || creating">
		                            	Delete
		                            </button>
		                            <button class="btn"
		                            	type="button"
		                            	ng-show="editing && currentItem === bookmarkItem.Id"
		                            	ng-click="saveEditing(bookmarkItem.Id, bookmarkItem.Title, bookmarkItem.URL.Url)">
		                            	Save
		                            </button> 
		                            <span ng-show="saving && currentItem === bookmarkItem.Id">
		                            	Saving
		                            </span>
		                        </td>
							</tr>

							<tr ng-show="creating">
								<td>
		                            <input class="form-control"
		                            	type="text"
		                            	name="newItemTitle"
		                            	ng-model="newItem.Title"
		                            	required>
		                        </td>
		                        <td>
		                        	<input class="form-control"
		                        		type="url"
		                        		name="newItemUrl"
		                            	ng-model="newItem.Url"
		                            	required>
		                        </td>
		                        <td>
		                            <button type="button"
		                            	ng-click="cancelCreating()"
		                            	class="btn"> 
		                            	Cancel
		                            </button>
		                        </td>
		                        <td>
		                            <button type="button"
		                            	ng-click="saveNewItem(newItem.Title, newItem.Url)"
		                            	class="btn">
		                            	Save
		                            </button>
	                            	<span ng-show="creating && saving">
		                            	Saving
		                            </span>
		                        </td>
							</tr>
						</tbody>
					</table>
				</div>
	        </form>
	        <div class="error-message row bg-warning"
	        	ng-class="{'bg-warning' : errorType === 'warning', 'bg-danger' : errorType === 'serverError'}"
				ng-show="errorMessages">
				<span ng-bind="errorMessages"></span>
				<button type="button"
					class="close"
					aria-label="Close"
					ng-click="errorMessages = null">
					<span aria-hidden="true">&times;</span>
				</button>
	        </div>
        </section>
	</body>
</html>