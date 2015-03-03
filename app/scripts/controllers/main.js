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

        $scope.now = function() {
        };

        $scope.now();
  }]);
