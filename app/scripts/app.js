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
    $routeProvider
      .when('/', {
        templateUrl: 'views/' + params.getAttribute('data-template') + '.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
