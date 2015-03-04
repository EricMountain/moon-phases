'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('moonPhasesApp'));

    var MainCtrl,
    scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it('should attach moon centre coords and radius to the scope', function () {
        expect(scope.moonCentreX).toBeDefined();
        expect(scope.moonCentreY).toBeDefined();
        expect(scope.moonRadius).toBeDefined();
    });

    it('should attach an empty shadow path to the scope', function () {
        var diametre = 2 * scope.moonRadius;
        expect(scope.shadowPath).toMatch('M' + scope.moonCentreX + ',' + scope.moonCentreY +
                                         ' m0,' + scope.moonRadius +
                                         ' a' + scope.moonRadius + ',' + scope.moonRadius + ' 0 \\d,\\d 0,-' + diametre +
                                         ' a\\d+.\\d+,' + scope.moonRadius + ' 0 \\d,\\d 0,' + diametre);
    });

    it('should attach animate flag to scope', function () {
        expect(scope.animate).toBe(false);
    });
});
