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
                            }
                        }
                    }

                    navigator.getUserMedia(options, streamFound, streamError);
                });

            }

            function streamFound(stream) {
                //var wrapper = document.querySelector('#videoWrapper');
                //wrapper.appendChild(video);
                video.src = URL.createObjectURL(stream);
                video.style.width = '100%';
                video.style.height = '100%';
                video.play();

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
