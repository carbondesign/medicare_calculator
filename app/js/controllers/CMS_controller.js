'use strict';
angular.module('fantasyApp.controllers.CMS', ['fantasyApp.services.CMS_service'] )
.controller('CMS_controller', ['$scope','$routeParams','$http','CMS_service',function($scope,CMS_service,$http){
	$scope.search= function(){
		
		var CMS_API = $http({method: 'GET', url: 'http://data.cms.gov/resource/jzd2-pt4g.json?nppes_provider_zip=' + $scope.searchTerm}).success(function(data)
			{
				
				var temp = [];
				//Store keys, so we do not need to check from temp if key allready exists
				var temp_keys = {};
				
				//Loop trough data
				for (var i in data)
				{
				    //Check if key is allready stored in object
				    if (!temp_keys[data[i]['npi']])
				    {
				        //Store new key, and save it''s position
				        temp_keys[data[i]['npi']] = temp.length;
				        //Create new array element as new object
				        temp.push(
				            {
				                'provider' : [],
				                'values': []
				            }
				        );
				    }
				    //Save values into correct position
				    temp[temp_keys[data[i]['npi']]]['provider'].push([data[i]['npi'], data[i]['nppes_provider_first_name'], data[i]['nppes_provider_last_org_name']
				    	, data[i]['nppes_provider_street1'], data[i]['nppes_provider_street2'], data[i]['nppes_provider_city'], data[i]['nppes_provider_state'], data[i]['nppes_provider_zip'], data[i]['provider_type']]);
				    temp[temp_keys[data[i]['npi']]]['values'].push(data[i]['hcpcs_description'],data[i]['bene_unique_cnt'], data[i]['average_submitted_chrg_amt'], data[i]['average_medicare_payment_amt'],data[i]['line_srvc_cnt']);
				}
				
				$scope.data =temp;
	
				//data[0].nppes_provider_last_org_name ="bob"
				
		  	});
	}
}]);