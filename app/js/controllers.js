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
				$scope.shops.forEach(function(shop) {
					$scope.user.subscribedShops.forEach(function(subscribed) {
						if( shop.shopID == subscribed ) {
							if ( item.shopID == shop.shopID ) {
								window.console.log(subscribed + "==" + shop.shopID + "==" + item.shopID);
								return true; // this will be listed in the results
							}
						}
					});
				});
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

	$scope.recommended = function(item) {
		if( item.timeStamp > 6 ) {
			return true; // this will be listed in the results
		}
		return false; // otherwise it won't be within the results
	};

});