'use strict';

/* Controllers */

var siebuApp = angular.module('siebuApp', []);

siebuApp.controller('SiebuCtrl', function($scope, $http) {
  $http.get('items/items.json').success(function(data) {
    $scope.items = data;
  });

  $scope.orderProp = 'age';
});