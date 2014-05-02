'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('fantasyApp',
  [ 'fantasyApp.config'
  , 'fantasyApp.controllers.header'
  , 'fantasyApp.controllers.signin'
  , 'fantasyApp.controllers.CMS'
  , 'fantasyApp.controllers.signup'
  , 'fantasyApp.filters'
  , 'firebase', 'ui.bootstrap', 'ngRoute']
  )
