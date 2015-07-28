'use strict';

/* Services */

app.factory('DataSource', ['$http',function($http){
       return {
           get: function(callback){
                $http.get(
                    'http://angulardeveloper.bitbucket.org/FPProductsResponse.xml',
                    {transformResponse:function(result) {
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json( result );
                        return json;
                        }
                    }
                ).
                success(function(result, status) {
                    callback(result);
                })
           }
       }
    }]);