'use strict';

/* Controllers */

var angular = angular || {};
var siebuApp = angular.module('siebuApp', []);

siebuApp.controller('SiebuCtrl', function($scope, $http) {
  	$http.get('api/items/').success(function(data) {
   		$scope.items = data;
  	});

  	$scope.orderProp = 'age';

  	$scope.newItem = function(item) {
    	if( item.age < 7 ) {
			return true; // this will be listed in the results
    	}
    	return false; // otherwise it won't be within the results
		};

	$scope.recommended = function(item) {
    	if( item.age > 6 ) {
        	return true; // this will be listed in the results
    	}
    	return false; // otherwise it won't be within the results
	};

});