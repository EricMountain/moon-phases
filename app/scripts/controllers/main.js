'use strict';

/**
 * @ngdoc function
 * @name moonPhasesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moonPhasesApp
 */
angular.module('moonPhasesApp')
    .controller('MainCtrl', function ($scope) {
        $scope.datetime = new Date();
        $scope.datetimeJulian = 0;
        $scope.moonPhaseModulo = 29.5305888610;
        $scope.moonPhaseBaseJulian = 0;
        $scope.moonPhase = 0;
        $scope.moonPhaseRatio = 0;
        $scope.smallArcRadius = 170;

        Date.prototype.getJulian = function() {
            return this.getTime() / 86400000 + 2440587.5;
        };

        // http://en.wikipedia.org/wiki/New_moon#Determining_new_moons:_an_approximate_formula
        $scope.newMoonFinder = function(n) {
            var julian20000101 = new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0)).getJulian();
            return 5.597661 + 29.5305888610 * n + (102.026 * Math.pow(10, -12)) * n * n - 0.000739 - (235 * Math.pow(10, -12)) * n * n + julian20000101;
        };

        $scope.rangeFinder = function(datetimeJulian) {
            var n = 0;
            var dN = $scope.newMoonFinder(n);
            var dNPlusOne = $scope.newMoonFinder(n + 1);
            
            while (dN > datetimeJulian || dNPlusOne < datetimeJulian) {
                n += 1;
                dN = $scope.newMoonFinder(n);
                dNPlusOne = $scope.newMoonFinder(n + 1);
            }

            return dN;
        };

        $scope.update = function() {
            $scope.datetimeJulian = $scope.datetime.getJulian();
            $scope.moonPhaseBaseJulian = $scope.rangeFinder($scope.datetimeJulian);
            $scope.moonPhase = ($scope.datetimeJulian - $scope.moonPhaseBaseJulian) % $scope.moonPhaseModulo;
            $scope.moonPhaseRatio = $scope.moonPhase / $scope.moonPhaseModulo;
            $scope.smallArcRadius = (1 - (0.5 - $scope.moonPhaseRatio)) * 206;
        };

        $scope.update();
  });
