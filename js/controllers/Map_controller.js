'use strict';
angular.module('dataApp.controllers.Map', [] )
	.controller('Map_controller', ['$scope','$routeParams','$http','CMS_service',function($scope,CMS_service,$http){
		angular.extend($scope, {
		    defaults: {
		        maxZoom: 14,
		        path: {
		            weight: 10,
		            color: '#800000',
		            opacity: 1
		        }
		    }
		});
	}])