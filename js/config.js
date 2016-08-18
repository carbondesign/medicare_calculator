'use strict';

// Declare app level module which depends on filters, and services
angular.module('dataApp.config', [])

app.config(['$routeProvider', 
    function($routeProvider) {
      $routeProvider
      .when('/',        { templateUrl: 'views/default.html' })
    
      .otherwise(       { redirectTo: '/' });
    }])
  
  

