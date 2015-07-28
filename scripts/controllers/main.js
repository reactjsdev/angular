'use strict';

		app.controller(
			'AppController',
			function( $scope, $rootScope, DataSource ) {

				var setData = function(result){

					var data = result.FPProductsResponse.Family;

					data.shift();
					
					$rootScope.data = data;

					var PASSES = [];
					
					jQuery.each(data, function( key, val ) {
						
						if(!val.Pass.hasOwnProperty('Desc')){

							var Desc = val;
							
							for(var prop in Desc){
								if(prop == '_id'){
									var obj1 = Desc.Pass;
									
									for(var key1 in obj1){

										if(PASSES.indexOf(obj1[key1]._id) == -1){
											PASSES.push(obj1[key1]._id);
										}
										
									}
								}
							}
						} else {
							
								var obj2 = val;
									
								for(var key3 in obj2){
									if(key3 == 'Pass'){
										var obj3 = obj2.Pass;
										
										for(var key4 in obj3) {
											if(PASSES.indexOf(obj3._id) == -1){
												
												PASSES.push(obj3._id);
											}
										}
									}
								}
							
						}
						
						$rootScope.PASSES = PASSES;
					})



					$rootScope.passes = build( $rootScope.PASSES );
					
					function build( passes ) {
						var object2 = [];
						for ( var i = 0 ; i < passes.length ; i++ ) {

							var object = {};
							object['pass'] = passes[i];
							object['uid'] = i;

							object2.push(object);



						}

						$scope.dataobj = object2;


						return( object2 );

					}



				}

				
				DataSource.get(setData);


				

			}
		).directive('selectOption', function(){
		    return {
		      restrict: 'E',
		     
		      replace: true,
		      transclude: false,
		      scope: { arrayobj:'=selectdata'},
		     
		      template: '<select><option ng-repeat="option in arrayobj">' +
		                '{{ option.pass }}' +
			            '</option></select>',
		      link: function(scope, element, attrs) {
		      
		       
		      }
		    }
		  });