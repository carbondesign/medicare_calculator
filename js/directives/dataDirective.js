'use strict';
angular.module('dataApp.directives.DataResults', [] )
.directive('ngSearch', [function($scope){
  return {
    restrict:'E',
    template:'<div id="credits_modal" class="reveal-modal"> <h5>Sources</h5> <ul class="credits"> <li>Health and Human Services</li> </ul> <h5>Credits</h5> <ul class="credits"> <li>Denny Gainer</li> <li>Chad Palmer</li> </ul> <a class="close-reveal-modal"></a> </div>'
  }
}])

