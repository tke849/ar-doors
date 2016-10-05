(function () {
    'use strict';

    /**
     *
     * @module Core Components
     * @description
     * Loads Angular Modules and Third Party Modules
     *
     **/

    angular


        .module('JWAR', [
            'ngAnimate',
            'ngTouch',
            'ui.router',
            'JWAR.routes'
        ])
        .config(function ($urlRouterProvider, $locationProvider, $sceDelegateProvider) {

            //$locationProvider.html5Mode(true);

            $sceDelegateProvider.resourceUrlWhitelist([
                'self']);



        }).run(function ($rootScope, $timeout, $state, $window) {


            //if (window.ezar) {
            //    ezar.initializeVideoOverlay(
            //        function() {
            //            if (ezar.hasBackCamera ()) {
            //                $("body").css ("background-color", "transparent");
            //                var camera = ezar.getBackCamera ();
            //                camera.start ();
            //            } else {
            //                //alert('no back camera access!');
            //            }
            //        },
            //        function(err) {
            //           // alert('unable to init ezar: ' + err);
            //        });
            //} else {
            //
            //    var errorCallback = function(e) {
            //        console.log('Reeeejected!', e);
            //    };
            //
            //
            //    // Not showing vendor prefixes.
            //    navigator.getUserMedia({video: true, audio: false, facingMode: "environment"}, function(localMediaStream) {
            //        var video = document.querySelector('video');
            //        video.src = window.URL.createObjectURL(localMediaStream);
            //
            //        // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
            //        // See crbug.com/110938.
            //        video.onloadedmetadata = function(e) {
            //            // Ready to go. Do some stuff.
            //        };
            //    }, errorCallback);
            //
            //}


            /**
             *
             * @function navigate()
             * @description
             * angular navigation hack
             *
             **/

            $rootScope.navigate = function (state, params) {
                $timeout(function () {
                    $state.go(state, params);
                }, 0);
            };



        }).filter('trusted', ['$sce', function ($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl(url);
            };
        }]);

})();
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
(function () {
    'use strict';

    /**
     *
     * @module SWVR - Layout Controller
     * @description
     * Layout Controller - Layout wrapper controller for shared view functionality
     *
     **/

    angular.module('JWAR')
        .controller('LayoutController', LayoutController);

    LayoutController.$inject = ['$scope', '$window'];

    function LayoutController ($scope, $window) {


        $scope.init = function(){




        };

        $scope.init();




    }





})();

(function () {
    'use strict';

    /**
     *
     * @module JWAR
     *
     **/

    angular.module('JWAR')
        .controller('DetailsController', DetailsController);

    DetailsController.$inject = ['$scope','$stateParams'];

    function DetailsController ($scope, $stateParams) {



        $scope.loadARVideo = function(){

            var video = document.querySelector('video');
            video.setAttribute('autoplay', true);

            var options = {
                video: {
                    optional: [{facingMode: "environment"}]
                }
            };

            navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if (typeof navigator.mediaDevices === 'undefined' && navigator.getUserMedia) {
                alert('This browser doesn\'t support this demo :(');
            } else {

                navigator.mediaDevices.enumerateDevices().then(function(sources) {
                    for (var i = 0; i !== sources.length; ++i) {
                        var source = sources[i];
                        if (source.kind === 'video') {
                            if (source.facing && source.facing == "environment") {
                                options.video.optional.push({'sourceId': source.id});
                                navigator.getUserMedia(options, streamFound, streamError);
                            }
                        }
                    }

                    //navigator.getUserMedia(options, streamFound, streamError);
                });

            }

            function streamFound(stream) {
                //var wrapper = document.querySelector('#videoWrapper');
                //wrapper.appendChild(video);
                video.src = URL.createObjectURL(stream);
                video.style.width = '100%';
                video.style.height = '100%';
                //video.play();

                //var canvas = document.createElement('canvas');
                //canvas.width = video.clientWidth;
                //canvas.height = video.clientHeight;
                //
                //wrapper.appendChild('canvas');
            }

            function streamError(error) {
                console.log('Stream error: ', error);
            }

        };



        $scope.createScene = function(){

            var video = document.querySelector('video');

            // set the scene size
            var WIDTH = window.innerWidth,
                HEIGHT = window.innerHeight;

            // set some camera attributes
            var VIEW_ANGLE = 45,
                ASPECT = WIDTH / HEIGHT,
                NEAR = 0.1,
                FAR = 10000;

            var wrapper = document.querySelector('#videoWrapper');

            $scope.scene = new THREE.Scene();
            $scope.renderer = new THREE.WebGLRenderer({ alpha: true } );
            $scope.camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
                ASPECT,
                NEAR,
                FAR  );


            // the camera starts at 0,0,0 so pull it back
            $scope.camera.position.z = 300;

            // start the renderer
            $scope.renderer.setSize(WIDTH, HEIGHT);

            // and the camera
            $scope.scene.add( $scope.camera);

            // attach the render-supplied DOM element
            wrapper.appendChild($scope.renderer.domElement);


            var image, textureLoader, texture, mesh, geometry, imageW, imageH;

            image = 'images/'+ $stateParams.id +'.png';


            var imageSpec = new Image();
            imageSpec.src = image;

            imageSpec.onload = function(){
                imageW = this.width / 2;
                imageH = this.height / 2;

                textureLoader = new THREE.TextureLoader();
                textureLoader.load(image, function ( texture ) {
                    // do something with the texture

                    var material = new THREE.MeshBasicMaterial( {
                        map: texture
                    } );

                    var geometry = new THREE.PlaneGeometry( imageW, imageH, 0 );
                    var plane = new THREE.Mesh( geometry, material );
                    //scene.add( plane );

                    $scope.scene.add(plane);

                    $scope.renderer.render($scope.scene,  $scope.camera);

                });
            };

        };



        $scope.init = function(){

            $scope.loadARVideo();

            $scope.createScene();



        };

        $scope.init();

    }



})();

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
