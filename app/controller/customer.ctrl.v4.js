/**
* @author:
*version :1.0
*Customer controllers module
*/
(function () {
	 var ng= angular.module("restaurant_module", ["service_module","custom_directive"]);  // restaurant module dependency on service module, directive module


	angular.module("restaurant_module").controller("DeliveryInfoController", function($rootScope,$scope){ //$rootScope is global scope object; entire controller objects; small 
		//things like user name (welcome "smith"),locally specific things, don't put business data in rootscope since it is very huge.
		
		$scope.username;
		$scope.del_address;
		$scope.hasInfo=0;
		$scope.editMode=false;
		$scope.myModal;
		$scope.print= function(){

			console.log($scope.username);
			console.log($scope.del_address);
		}
    	$scope.getInfo = function() {
	      if(localStorage.getItem('username')!="undefined" && localStorage.getItem('delivery_address')!="undefined" ){
	    	$scope.username=localStorage.getItem('username');
		$scope.del_address =  localStorage.getItem('delivery_address');
		return 1;
		}	
		return 0;
	    }

	    $scope.setInfo = function() {
	    localStorage.setItem('username',$scope.username);
		localStorage.setItem('delivery_address',$scope.del_address);
		console.log($scope.username);
		console.log($scope.del_address);
		$scope.editMode=false;
	    }
	   
	    $scope.redirectUrl = function(){
	    	window.location="/#/";
	    }

	  

 		$scope.openEditModal= function(){
 			
 			$scope.editMode= true;
 			


 		};
console.log($scope.username);
         
		

});
     
	ng.controller("RestaurantController", function($rootScope,$scope){ //$rootScope is global scope object; entire controller objects; small 
		//things like user name (welcome "smith"),locally specific things, don't put business data in rootscope since it is very huge.
		
		$scope.cuisines=['chinese','indian','thai','vegetarian'];
		$scope.cuisineIncludes = [];
    
	    $scope.includeCuisine = function(cuisine) {
	        var i = $.inArray(cuisine, $scope.cuisineIncludes);
	        if (i > -1) {
	            $scope.cuisineIncludes.splice(i, 1);
	        } else {
	            $scope.cuisineIncludes.push(cuisine);
	        }
	        
		}

		$scope.filterRestaurants= function(){
			 $rootScope.$broadcast("filter_event",$scope.cuisineIncludes);
			
		
	}

});
     

	ng.controller("RestaurantListController",function($scope,RestaurantService){  //creating a controller, controller function is next arguement
 																//customerservice is injected, not using quote cz its name of object
 		$scope.restaurants= restaurantsData = []; 

 		(function(){
 			RestaurantService.getRestaurants().then(function(result){
 				$scope.restaurants=restaurantsData=result.data;
 			});
 		})();                      //$scope-services to access heap area for every controller
 		
 		 $scope.sortType     = 'name'; // set the default sort type
  		$scope.sortReverse  = false; 
 		$scope.orderByMe = function(x) {
 			//console.log(x);
    		$scope.sortType = x;
  		}
       
 		$scope.$on("filter_event",function(evt,cuisineIncludes){  //on method handles the event txt has search text
 			var result= [];
 			console.log(cuisineIncludes);
 			restaurantsData.forEach(function(restaurant){

 			console.log(restaurant.cuisine);
 				if (cuisineIncludes.length > 0) {
	            	if ($.inArray(restaurant.cuisine, cuisineIncludes) >=0)
					{
						result.push(restaurant);
					} 

        		}
        		else{
        			result.push(restaurant);
        		}
       			
       		
    		});
 				$scope.restaurants= result;
 			});

	

	
});
})();

