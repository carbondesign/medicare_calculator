'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('fantasyApp',
  [ 'fantasyApp.config'
  , 'fantasyApp.controllers.CMS'
  , 'fantasyApp.directives.cmsdirective'
  , 'ui.bootstrap', 'ngRoute']
  )
