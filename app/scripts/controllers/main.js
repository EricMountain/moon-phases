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

        $scope.arcSweep = 0;
        $scope.smallArcRadius = 0;
        $scope.smallArcSweep = 0;
        
        $scope.moonCentreX = 281;
        $scope.moonCentreY = 220;
        $scope.moonRadius = 205;
        $scope.moonDiametre = $scope.moonRadius * 2;

        $scope.update = function() {
            var ratio = moon.calculatePhaseRatio($scope.datetime);

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
