'use strict';

/**
 * @ngdoc function
 * @name moonPhasesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moonPhasesApp
 */
angular.module('moonPhasesApp')
    .controller('MainCtrl', ['$scope', function ($scope) {
        var moon = window.moon;
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

        $scope.rangeFinder = function(datetimeJulian) {
            var n = 0;
            var dN = moon.newMoonFinder(n);
            var dNPlusOne = moon.newMoonFinder(n + 1);
            
            while (dN > datetimeJulian || dNPlusOne < datetimeJulian) {
                n += 1;
                dN = moon.newMoonFinder(n);
                dNPlusOne = moon.newMoonFinder(n + 1);
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
  }]);
