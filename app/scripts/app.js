'use strict';

/**
 * @ngdoc overview
 * @name moonPhasesApp
 * @description
 * # moonPhasesApp
 *
 * Main module of the application.
 */
angular
  .module('moonPhasesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/moon-only', {
        templateUrl: 'views/moon-only.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
