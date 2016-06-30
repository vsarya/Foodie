/**
* Main Configuration file for Routing and handling cookies
*
*/

(function () {
	angular.module("main_module",["ngRoute","ngCookies","restaurant_module","service_module","custom_directive"]);

	angular.module("main_module").config(function($routeProvider,$locationProvider){
		$routeProvider  
		.when("/",{    
			templateUrl: 'app/page/restaurants.html'
		})
		.when("/customer",{
			templateUrl: 'app/page/customer.html',
			
		})
		.when("/checkout",{
			templateUrl: 'app/page/creditcard.html',
			
		})
		.when("/menu/:id",{  
			templateUrl: 'app/page/menuOfRestaurant.html',
			controller: function($scope,RestaurantService,$routeParams){ 
				RestaurantService.getRestaurantMenu($routeParams.id).then(function(result){
					$scope.menuDetail=result.data;

				});

			}
		})
		/*.otherwise({
			templateUrl:'app/page/customer.html'
		})*/;
	}).run(check);
	function check($rootScope,$location){
		
		/*$rootScope.$on("$locationChangeStart",function(){
			
		if(localStorage.username && localStorage.address)
		{
  			$location.path("/restaurants");
		}
		else
		{

				$location.path("/customer");
		}

		}); */
	}

})();