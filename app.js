'use strict'

// df4aa9f4273411fa40e04118919f080f
// b7f24d8921b5ed31

angular.module('FlickrSearchrApp', [])
.controller('FlickrSearchrCtrl', function ($scope, $timeout, $http) {

	$scope.submit = function () {
		if ($scope.searchForm.$invalid) {
			return;
		}

		$scope.pix = [];

		var url = 'https://api.flickr.com/services/rest/';
		var params = {
			api_key: 'df4aa9f4273411fa40e04118919f080f',
			method: 'flickr.photos.search',
			format: 'json',
			jsoncallback: 'JSON_CALLBACK',
			tags: 'kittens, trees'
		}
		$http.jsonp(url, {params: params})
		.success(function (response) {
			if (response.stat === 'ok') {
				console.log(response.photos.photo.length);;;
				response.photos.photo.forEach(function (photo) {
					$scope.pix.push(makePhotoUrl(photo));
				});
			} else {
				// error: response.message
			}
		})
		.error(function (x, y) {
			console.log(x, y);;;
		});

		$scope.searchString = '';
		$scope.searchForm.$setPristine();
	}

	function makePhotoUrl(p) {
	//	https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
		return 'https://farm' + p.farm + '.staticflickr.com/' + p.server +
				'/' + p.id + '_' + p.secret + '_t.jpg';
	}
});

