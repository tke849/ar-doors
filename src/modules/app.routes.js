(function () {
'use strict';



	/**
	 *
	 * @module Routes
	 * @description
	 * Loads Angular Routes
	 *
	 **/


	angular
 	.module('JWAR.routes', []).config(routeConfig);


 	function routeConfig($stateProvider) {

    	$stateProvider


			.state('layout', {
				abstract: true,
				url: '',
	        	templateUrl: 'modules/layout/layout.html',
	        	controller: 'LayoutController'
	    	})

			.state('layout.home', {
				url: '/',
				templateUrl: 'modules/home/home.html',
				controller: 'HomeController'
			})

			.state('layout.ar', {
				url: '/:id',
				templateUrl: 'modules/details/details.html',
				controller: 'DetailsController'
			})




        ;
	}


})();