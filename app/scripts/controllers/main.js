'use strict';

/**
 * @ngdoc function
 * @name moonPhasesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moonPhasesApp
 */
angular.module('moonPhasesApp')
    .controller('MainCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

        var moon = window.moon;

        $scope.datetime = new Date();
        $scope.animate = false;
        
        $scope.moonCentreX = 281;
        $scope.moonCentreY = 220;
        $scope.moonRadius = 205;

        $scope.shadowPath = '';
        
        $scope.update = function() {
            $scope.shadowPath = moon.buildShadowPath($scope.moonCentreX,
                                                     $scope.moonCentreY,
                                                     $scope.moonRadius,
                                                     $scope.datetime);
        };

        $scope.toggleAnimate = function() {
            (function x() {
                if ($scope.animate) {
                    $scope.datetime = new Date($scope.datetime.getTime() + 3600 * 1000);
                    $scope.update();
                    $timeout(x, 50);
                }
            })();
        };
        
        $scope.update();
  }]);
