'use strict';
angular.module('fantasyApp.controllers.CMS', ['fantasyApp.services.CMS_service','fantasyApp.filters'] )
.controller('CMS_controller', ['$scope','$routeParams','$http','CMS_service',function($scope,CMS_service,$http){
	$scope.search= function(){
		
		var CMS_API = $http({method: 'GET', url: 'http://data.cms.gov/resource/jzd2-pt4g.json?nppes_provider_zip=' + $scope.searchTerm}).success(function(data)
			{
				
				var temp = [];
				//Store keys, so we do not need to check from temp if key allready exists
				var temp_keys = {};
				//console.log(data)

				//Loop trough data
				for (var i in data)
				{
					//console.log(parseInt(i)+1)
				    //Check if key is allready stored in object
				    if (!temp_keys[data[i]['npi']])
				    {
				        //Store new key, and save it''s position
				        temp_keys[data[i]['npi']] = temp.length;
				        //Create new array element as new object
				        temp.push(
				            {
				                'provider' : data[i]['npi'],
				                'info':[],
				                'values': [],
				                'total_cost':[]
				            }
				        );
				    }
				    var tot_cost = data[i]['bene_unique_cnt'] * data[i]['average_medicare_payment_amt'];
				    //Save values into correct position
				    temp[temp_keys[data[i]['npi']]]['info'].push([data[i]['npi'], data[i]['nppes_provider_first_name'], data[i]['nppes_provider_last_org_name']
				    	, data[i]['nppes_provider_street1'], data[i]['nppes_provider_street2'], data[i]['nppes_provider_city'], data[i]['nppes_provider_state'], data[i]['nppes_provider_zip'], data[i]['provider_type']]);

				    temp[temp_keys[data[i]['npi']]]['values'].push([data[i]['hcpcs_code'],data[i]['hcpcs_description'], data[i]['bene_unique_cnt'], data[i]['line_srvc_cnt'], data[i]['average_submitted_chrg_amt'], data[i]['average_medicare_payment_amt']]);
				    temp[temp_keys[data[i]['npi']]]['total_cost'].push(tot_cost);

				}
				
				$scope.data =temp;
				// console.log($scope.data[0].total_cost)
				$scope.sum = function(value_in) {
					 //console.log(value_in);
				        var total = 0;
				        angular.forEach(value_in, function(value, key) {
				            total += Math.round(parseInt(value));
				            
				        });
				        
				    return total;
				    }
				// console.log(temp[1].total_cost)
				$scope.select_compare = [];
				jQuery('#checkboxes input:checked').each(function() {
				    selected.push($(this).attr('name'));
				});
	
			
				
		  	});
	}
}]);