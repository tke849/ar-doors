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
                        if (source.kind == "videoinput" && source.label.indexOf("back") >= 0) {
                            options.video.optional.push({'sourceId': source.deviceId});
                            navigator.getUserMedia(options, streamFound, streamError);
                        }
                    }

                });

            }

            function streamFound(stream) {

                video.src = URL.createObjectURL(stream);
                video.style.width = '100%';
                video.style.height = '100%';
                //video.play();

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

            var scene = new THREE.Scene();
            //var renderer = new THREE.WebGLRenderer({ alpha: true } );
            var renderer = new THREE.WebGLRenderer();
            var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
                ASPECT,
                NEAR,
                FAR  );


            // the camera starts at 0,0,0 so pull it back
            camera.position.z = 300;

            var controls = new THREE.TrackballControls( camera );
            controls.rotateSpeed = 1.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.noZoom = false;
            controls.noPan = false;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;
            controls.keys = [ 65, 83, 68 ];
            controls.addEventListener( 'change', render );

            // start the renderer
            renderer.setSize(WIDTH, HEIGHT);

            // and the camera
            scene.add(camera);
            scene.add( new THREE.GridHelper( 500, 10 ) );

            // attach the render-supplied DOM element
            wrapper.appendChild(renderer.domElement);


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

                    scene.add(plane);

                    render();

                });
            };

            function render() {
                controls.update();
                renderer.render( scene, camera );
            }

        };



        $scope.properScene = function(){


            var scene = new THREE.Scene();
            //scene.add( new THREE.GridHelper( 500, 10 ) );

            var renderer = new THREE.WebGLRenderer({alpha: true});
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
            camera.position.z = 5;

            var controls = new THREE.TrackballControls( camera );
            controls.rotateSpeed = 1.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.noZoom = false;
            controls.noPan = false;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;
            controls.keys = [ 65, 83, 68 ];
            controls.addEventListener( 'change', render );


            var image, textureLoader, imageW, imageH;

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
                    plane.position.z = -300;

                    scene.add(plane);

                    render();
                    animate();

                });
            };


            function render() {
                requestAnimationFrame( render );
                renderer.render( scene, camera );
            }

            function animate() {
                requestAnimationFrame( animate );
                controls.update();
            }



        };



        $scope.init = function(){

            //$scope.loadARVideo();



            $scope.properScene();

            //$scope.createScene();



        };

        $scope.init();

    }



})();
