/** 
* @author:
* card view Directive
*/
(function () {	
	angular.module("custom_directive",[]);
	angular.module("custom_directive").directive("listView",function(){
		return {
			retrict: 'ECA',
			templateUrl: 'app/template/listView.html',
			scope: {
				id: '=' ,
				name: '=',
				des: '=',
				rating: '=', 
				cuisine: '='    
			}
		};
	});


})();