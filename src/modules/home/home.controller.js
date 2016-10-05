(function () {
    'use strict';

    /**
     *
     * @module JWAR - Home Controller
     * @description
     * Layout Controller - Layout wrapper controller for shared view functionality
     *
     **/

    angular.module('JWAR')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', '$location'];

    function HomeController ($scope, $rootScope, $location) {


        $scope.initItems = function(){

            $scope.items = [];

            for(var i = 1; i < 16; i++){

                var newItem = {
                    src: 'images/'+i+'.png',
                    id: i
                };
                $scope.items.push(newItem)
            }

            console.log($scope.items);

        };

        $scope.goToPage = function(id){
            $rootScope.navigate('layout.ar', {id: id});
        };

        $scope.initItems();



    }



})();
