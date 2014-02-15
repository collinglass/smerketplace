'use strict';


describe('Siebu App', function() {

  describe('Smerketplace view', function() {

    beforeEach(function() {
      browser().navigateTo('app/index.html');
    });


    it('should be possible to control item order via the drop down select box', function() {

      expect(repeater('.items li', 'item List').column('item.name')).
          toEqual(["Motorola XOOM\u2122 with Wi-Fi",
                   "MOTOROLA XOOM\u2122"]);
  });
});
