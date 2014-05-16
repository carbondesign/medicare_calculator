'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('dataApp',
  [ 'dataApp.config'
  , 'dataApp.controllers.Data'
  , 'dataApp.controllers.Map'
  , 'dataApp.directives.BarGraph'
  , 'dataApp.directives.DataResults'
  , 'dataApp.directives.mapDirective'
  , 'ui.bootstrap', 'ngRoute'
  , 'leaflet-directive']
  )
