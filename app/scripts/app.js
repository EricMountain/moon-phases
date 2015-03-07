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
      var params = document.getElementById('app-script');
      var template = 'main';
      if (typeof params !== 'undefined' && params !== null) {
          template = params.getAttribute('data-template');
      }
    $routeProvider
      .when('/', {
        templateUrl: 'views/' + template + '.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
