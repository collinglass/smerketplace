'use strict';


// Declare app level module which depends on filters, and services
angular.module('siebuApp', [
  'ngRoute',
  'siebuApp.filters',
  'siebuApp.services',
  'siebuApp.directives',
  'siebuApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'siebuCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'siebuCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
