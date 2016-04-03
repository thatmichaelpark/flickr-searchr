'use strict'

// df4aa9f4273411fa40e04118919f080f
// b7f24d8921b5ed31

angular.module('FlickrSearchrApp', ['ngAnimate'])
.constant('NOTIFICATIONTIME', 2000)
.controller('FlickrSearchrCtrl', function ($scope, $timeout, $http, NOTIFICATIONTIME) {

	$scope.submit = function () {
		if ($scope.searchForm.$invalid) {
			return;
		}

		notify('Searching...');

		$scope.photos = [];
		$scope.search = $scope.searchString;	// Make a copy for the 
												// 'n pictures found for '<search>'"

		var url = 'https://api.flickr.com/services/rest/';
		var params = {
			api_key: 'df4aa9f4273411fa40e04118919f080f',
			method: 'flickr.photos.search',
			format: 'json',
			jsoncallback: 'JSON_CALLBACK',
			tags: $scope.searchString
		}
		$http.jsonp(url, {params: params})
		.success(function (response) {
			if (response.stat === 'ok') {
				notify('Success!');
				$scope.photos = response.photos.photo;
			} else {
				// error: response.message
			}
		})
		.error(function (x, y) {
			notify('Failure!');
			console.log(x, y);;;
		});

		$scope.searchString = '';
		$scope.searchForm.$setPristine();
	}

	$scope.thumbnailUrl = function (p) {
	//	https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
		return 'https://farm' + p.farm + '.staticflickr.com/' + p.server +
				'/' + p.id + '_' + p.secret + '_t.jpg';
	}

	$scope.thumbnailClick = function (p) {
		console.log(p);;;
	}

	function notify(s) {
		$scope.notification = s;
		$scope.notificationVisible = true;
		$timeout(function () {
			$scope.notificationVisible = false;
		}, NOTIFICATIONTIME);
	}
});

