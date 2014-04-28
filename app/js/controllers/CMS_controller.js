'use strict';
angular.module('fantasyApp.controllers.CMS', ['fantasyApp.services.CMS_service'] )
.controller('CMS_controller', ['$scope','$routeParams','$http','CMS_service',function($scope,CMS_service,$http){
	$scope.zipcode= function(){
		var current_zip = document.getElementById("zip_code").value;
		console.log (current_zip);
		$http({method: 'GET', url: 'http://data.cms.gov/resource/jzd2-pt4g.json?nppes_provider_zip='+current_zip}).success(function(data)
			{
				$scope.data = data; // response data 
				
				
		  	});
	}
}]);