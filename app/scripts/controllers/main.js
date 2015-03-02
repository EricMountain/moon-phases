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
        $scope.arcSweep = 0;
        $scope.smallArcSweep = 0;
        
        $scope.moonCentreX = 281;
        $scope.moonCentreY = 220;
        $scope.moonRadius = 205;
        $scope.moonDiametre = $scope.moonRadius * 2;

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
            var ratio = $scope.moonPhase / $scope.moonPhaseModulo;
            $scope.moonPhaseRatio = ratio;

            if (ratio < 0.5) {
                // Shadow on left side
                $scope.arcSweep = 1;
                if (ratio < 0.25) {
                    // Big shadow
                    $scope.smallArcSweep = 1;
                    $scope.smallArcRadius = 1 - (ratio * 4);
                } else {
                    // Small shadow
                    $scope.smallArcSweep = 0;
                    $scope.smallArcRadius = (ratio * 4 - 1);
                }
            } else {
                // Shadow on right side
                $scope.arcSweep = 0;
                if (ratio < 0.75) {
                    // Small shadow
                    $scope.smallArcSweep = 1;
                    $scope.smallArcRadius = 1 - (ratio * 4 - 2);
                } else {
                    // Big shadow
                    $scope.smallArcSweep = 0;
                    $scope.smallArcRadius = (ratio * 4 - 3);
                }
            }
            
            $scope.smallArcRadius *= $scope.moonRadius;
        };

        $scope.update();
  });
