'use strict';
angular.module('fantasyApp.services.CMS_service', ['ngResource'])
.factory('CMS_service', function($resource) {
  return $resource('http://data.cms.gov/resource/jzd2-pt4g.json',{ }, {
    getData: {method:'GET', isArray: false}
  });
});