/**
* @author:
* @version: 1.0
* Service code to interact with RESt endpoints
*/
(function(){  
	angular.module("service_module",[]); //creating a module

	angular.module("service_module").service("RestaurantService",function($http,$q){ 
		this.getRestaurantMenu= function(id){
			var deferred= $q.defer();
			
			$http.get("http://localhost:9000/restaurants/"+id+"/").then( 
				function(data){  
				 //if everything goes smooth , promised is resolved first function executes (no server-side errors)
					deferred.resolve(data);
				},
				function(data){   //else promised is rejected , second function is called
					deferred.reject(data);
				}
			);
			return deferred.promise; // return promise to client
		};

		

		this.getRestaurants = function(){  //singleton object -- no prototype method required
			var deferred= $q.defer();
			$http.get("http://localhost:9000/restaurants").then( 
				function(data){   //if everything goes smooth , promised is resolved first function executes (no server-side errors)
					deferred.resolve(data);
				},
				function(data){   //else promised is rejected , second function is called
					deferred.reject(data);
				}
			);
			return deferred.promise; // return promise to client
		};

		
	});

})();