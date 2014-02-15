'use strict';

/* jasmine specs for controllers go here */
describe('Siebu controllers', function() {
 
  describe('SiebuCtrl', function(){
    var scope, ctrl;
 
    beforeEach(module('siebuApp'));
    
    beforeEach(inject(function($controller) {
      scope = {};
      ctrl = $controller('SiebuCtrl', {$scope:scope});
    }));
 
    it('should create "items" model with 3 items', function() {
      expect(scope.items.length).toBe(3);
    });
 
 
    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });
  });
});