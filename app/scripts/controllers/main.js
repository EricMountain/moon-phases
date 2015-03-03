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

        $scope.update();
  }]);
