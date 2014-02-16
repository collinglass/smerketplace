'use strict';

/* Controllers */

var angular = angular || {};
var siebuApp = angular.module('siebuApp', []);

siebuApp.controller('SiebuCtrl', function($scope, $http) {
	$http.get('api/items').success(function(data) {
		$scope.items = data;
	});

	$http.get('api/shops').success(function(data) {
		$scope.shops = data;
	

		$http.get('api/users').success(function(data) {
			$scope.user = data[0];
	
			$scope.isSubscribed = function(item) {
				if ( item.shopID == $scope.user.subscribedShops[0] ) {
					return true; // this will be listed in the results
				}
				return false; // otherwise it won't be within the results
			};

			$scope.recommended = function(item) {
				var shops = [];
				for (var i=0; i<$scope.user.subscribedShops.length; i++) {
					for (var j=0; j<$scope.shops.length; j++) {
						if ( $scope.shops[j].shopID == $scope.user.subscribedShops[i] ) {
							shops.push($scope.shops[j]);
						}
					}
				}
				for (var i=0; i<shops.length; i++) {
					for (var j=0; j<shops[i].related.length; j++) {
						if ( shops[i].related[j] == item.shopID ) {
							return true;
						}
					}
				}
				return false; // otherwise it won't be within the results
			};
		});
	});

	$scope.orderProp = 'timeStamp';

	$scope.newItem = function(item) {
		if( item.timeStamp < 7 ) {
			return true; // this will be listed in the results
		}
		return false; // otherwise it won't be within the results
	};
});