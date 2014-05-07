'use strict';

var ngSails = angular.module('ngSails', [
    'ui.router',
    'ui.bootstrap'
]);

ngSails.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $stateProvider.state('main', {
        url: '/',
        views: {
            content: {
                templateUrl: '/templates/views/home.template.html',
                controller: 'HomeController'
            }
        }
    });

    $urlRouterProvider.otherwise('/');
});