'use strict'

// df4aa9f4273411fa40e04118919f080f
// b7f24d8921b5ed31

angular.module('FlickrSearchrApp', [])
.controller('FlickrSearchrCtrl', function ($scope, $timeout, $http) {

	$scope.submit = function () {
		if ($scope.searchForm.$invalid) {
			return;
		}

		var url = 'https://api.flickr.com/services/rest/';
		var params = {
			api_key: 'df4aa9f4273411fa40e04118919f080f',
			method: 'flickr.photos.search',
			format: 'json',
			jsoncallback: 'JSON_CALLBACK',
			tags: 'kittens'
		}
		$http.jsonp(url, {params: params})
		.success(function (response) {
			console.log(response);;;
		})
		.error(function (x, y) {
			console.log(x, y);;;
		});

		$scope.searchString = '';
		$scope.searchForm.$setPristine();
	}

});

