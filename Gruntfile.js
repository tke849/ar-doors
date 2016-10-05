// Generated on 2014-09-02 using generator-angular 0.9.5
'use strict';


module.exports = function (grunt) {

    /***********************************
     * required packages
     ************************************/

        // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);


    // Hash rewrite
    var modRewrite = require('connect-modrewrite');


    /***********************************
     * configurations
     ************************************/

    // Configurable paths for the application
    var appConfig = {
        src: 'src',
        app: 'app/www',
        dist: 'dist',
        hostName: 'localhost',
        port: 9999,
        reload: 35729

    };

    /***********************************
     * init grunt / register tasks
     ************************************/

    grunt.registerTask('useminPrepareDist', function () {
        var useminPrepareDistConfig = grunt.config('useminPrepareDist');
        grunt.config.set('useminPrepare', useminPrepareDistConfig);
        grunt.task.run('useminPrepare');
    });

    grunt.registerTask('useminDist', function () {
        var useminDistConfig = grunt.config('useminDist');
        grunt.config.set('usemin', useminDistConfig);
        grunt.task.run('usemin');
    });

    grunt.registerTask('preprocessDist', function () {
        var preprocessDistConfig = grunt.config('preprocessDist');
        grunt.config.set('preprocess', preprocessDistConfig);
        grunt.task.run('preprocess');
    });

    /***********************************
     * Define the configuration for all the tasks
     ************************************/
    grunt.initConfig({

        // Project settings
        appConfig: appConfig,




        /***********************************
         * Sass Compiler
         ************************************/

        sass: {
            app: {
                options: {
                    sourceMap: true
                },
                files: {
                    '<%= appConfig.src %>/styles/main.css': ['<%= appConfig.src %>/styles/less/main.scss']
                }
            },
            dist: {
                options: {
                    sourceMap: true
                },
                files: {
                    '<%= appConfig.src %>/styles/main.css': ['<%= appConfig.src %>/styles/less/main.scss']
                }
            }
        },

        /***********************************
         * Add vendor prefixed styles
         ************************************/
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            app: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        /***********************************
         * Make sure code styles are up to par and there are no obvious mistakes
         ************************************/
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= appConfig.src %>/modules/{,*/}*.js',
                    '<%= appConfig.src %>/services/{,*/}*.js',
                    '<%= appConfig.src %>/factories/{,*/}*.js',
                    '<%= appConfig.src %>/directives/{,*/}*.js'
                    //no catch all .js because we don't want to lint bower components
                ]
            }
        },

        /***********************************
         * Empties build location folders to start fresh
         ************************************/
        clean: {
            app: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= appConfig.app %>/{,*/}*',
                        '!<%= appConfig.app %>/.git*',
                        '<%= appConfig.app %>/index.html'
                    ]
                }]
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= appConfig.dist %>/{,*/}*',
                        '!<%= appConfig.dist %>/.git*',
                        '<%= appConfig.dist %>/index.html'
                    ]
                }]
            },
            server: '.tmp',

            indexApp: '<%= appConfig.src %>/index_app.html',
            indexDist: '<%= appConfig.src %>/index_dist.html'
        },

        /***********************************
         * Add modernizer if DIST (Web)
         ************************************/
        modernizr: {

            app: {
                dest : "<%= appConfig.dist %>/js/modernizr-custom.js",
                options : [
                    "html5shiv"
                ]
            },
            dist: {
                dest : "<%= appConfig.dist %>/js/modernizr-custom.js",
                options : [
                    "html5shiv"
                ]
            },

            tmp: {
                dest : ".tmp/js/modernizr-custom.js",
                options : [
                    "html5shiv"
                ]
            }
        },

        /***********************************
         * Copies/duplicates files to specified locations
         ************************************/
        copy: {

            /***********************************
             * Copies styles for livereload server
             ************************************/
            styles: {
                expand: true,
                cwd: '<%= appConfig.src %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },

            /***********************************
             * duplicate index for APP preprocess
             ************************************/
            renameForAppPreprocess: {
                expand: true,
                src: '<%= appConfig.src %>/index.html',
                dest: '<%= appConfig.src %>',
                rename: function() {
                    return '<%= appConfig.src %>/index_app.html';
                }
            },

            /***********************************
             * duplicate index for DIST preprocess
             ************************************/
            renameForDistPreprocess: {
                expand: true,
                src: '<%= appConfig.src %>/index.html',
                dest: '<%= appConfig.src %>',
                rename: function() {
                    return '<%= appConfig.src %>/index_dist.html';
                }
            },

            /***********************************
             * copy index_app into APP folder and rename back to index.html before running USEMIN
             ************************************/
            renameForAppUsemin: {
                expand: true,
                src: '<%= appConfig.src %>/index_app.html',
                dest: '<%= appConfig.app %>',
                rename: function() {
                    return '<%= appConfig.app %>/index.html';
                }
            },

            /***********************************
             * copy index_dist into DIST folder and rename back to index.html before running USEMIN
             ************************************/
            renameForDistUsemin: {
                expand: true,
                src: '<%= appConfig.src %>/index_dist.html',
                dest: '<%= appConfig.dist %>',
                rename: function() {
                    return '<%= appConfig.dist %>/index.html';
                }
            },


            /***********************************
             * Copy Remaining APP Files
             ************************************/
            app: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= appConfig.src %>',
                    dest: '<%= appConfig.app %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'data/**/*',
                        'plugins/cordova.js',
                        'modules/{,*/}*.html',
                        'modules/{,*/}*.json',
                        'images/**/*',
                        'styles/main.css',
                        'fonts/*',
                        'js/*',
                        'icons/{,*/}*',
                        'splashscreens/{,*/}*'

                    ]
                },

                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/components-font-awesome',
                        src: ['fonts/*.*'],
                        dest: '<%= appConfig.app %>'
                    }
                ]

            },

            /***********************************
             * Copy Remaining DIST Files
             ************************************/
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= appConfig.src %>',
                    dest: '<%= appConfig.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'data/**/*',
                        //'*.html',
                        'modules/{,*/}*.html',
                        'modules/{,*/}*.json',
                        'images/**/*',
                        'styles/main.css',
                        'fonts/*',
                        'js/*',
                        'icons/{,*/}*',
                        'splashscreens/{,*/}*'

                    ]
                },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/components-font-awesome',
                        src: ['fonts/*.*'],
                        dest: '<%= appConfig.dist %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '',
                        src: ['HDstatus/*.*'],
                        dest: '<%= appConfig.dist %>'
                    }
                ]

            },


        },


        /***********************************
         * preprocess APP index file
         * Keeps blocks wrapped in <!-- @if APP --> Bla Bla <!-- @endif -->
         * and removes blocks wrapped in <!-- @if DIST --> Bla Bla <!-- @endif -->
         * Saves Result in APP build location
         ************************************/
        preprocess : {

            inline : {
                src : [ '<%= appConfig.src %>/index_app.html' ],
                options: {
                    inline : true,
                    context : {
                        APP: true,
                        DIST: false
                    }
                }
            }

        },

        /***********************************
         * preprocess DIST index file
         * Keeps blocks wrapped in <!-- @if DIST --> Bla Bla <!-- @endif -->
         * and removes blocks wrapped in <!-- @if APP --> Bla Bla <!-- @endif -->
         * Saves Result in DIST build location
         ************************************/
        preprocessDist : {

            inline : {
                src : [ '<%= appConfig.src %>/index_dist.html' ],
                options: {
                    inline : true,
                    context : {
                        APP: false,
                        DIST: true
                    }
                }
            },

        },

        /***********************************
         * useminPrepare tells us what file to look at for the USEMIN library and what steps to use
         ************************************/
        useminPrepare: {
            html: ['<%= appConfig.src %>/index_app.html'],
            options: {
                dest: '<%= appConfig.app %>',

                flow: { steps: { 'js': ['concat'], 'css': ['concat']}, post: {}}
            }

        },

        /***********************************
         * useminPrepare tells us what file to look at for the USEMIN library and what steps to use
         ************************************/
        useminPrepareDist: {
            html: ['<%= appConfig.src %>/index_dist.html'],
            options: {
                dest: '<%= appConfig.dist %>',

                flow: { steps: { 'js': ['concat'], 'css': ['concat']}, post: {}}
            }

        },


        /***********************************
         * usemin concats specific files into a single file to reduce number of network requests and
         * allows for modularization of files in our src folder structure
         *
         * EX:
         * <!-- build:css css/bower.css -->
         * <link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.css" />
         * <link rel="stylesheet" href="../bower_components/components-font-awesome/css/font-awesome.min.css" />
         * <!-- endbuild -->
         *
         * builds a single css file called bower.css and places it in the /css folder,
         * also updates the index.html to reference the single file
         ************************************/

        usemin: {
            html: ['<%= appConfig.app %>/{,*/}*.html'],
            css: ['<%= appConfig.app %>/css/{,*/}*.css'],
            js: ['<%= appConfig.app %>/js/{,*/}*.js'],
            options: {
                assetsDirs: ['<%= appConfig.app %>'],
                patterns: {
                    // FIXME While usemin won't have full support for revved files we have to put all references manually here
                    js: [
                        [/(images\/.*?\.(?:gif|jpeg|jpg|dae|obj|mtl|png|mp3|ogg|fnt|webp|svg|mp4))/gm, 'Update the JS to reference our revved images']
                    ]
                },
                blockReplacements: {
                    app: function (block){
                        return '<script src="' + block.dest + '" ><\/script>';
                    }
                }
            }
        },

        /***********************************
         * Same as above but for DIST folder
         ************************************/
        useminDist: {
            html: ['<%= appConfig.dist %>/{,*/}*.html'],
            css: ['<%= appConfig.dist %>/css/{,*/}*.css'],
            js: ['<%= appConfig.dist %>/js/{,*/}*.js'],
            options: {
                assetsDirs: ['<%= appConfig.dist %>'],
                patterns: {
                    // FIXME While usemin won't have full support for revved files we have to put all references manually here
                    js: [
                        [/(images\/.*?\.(?:gif|jpeg|jpg|dae|obj|mtl|png|mp3|ogg|fnt|webp|svg|mp4))/gm, 'Update the JS to reference our revved images']
                    ]
                },
                blockReplacements: {
                    app: function (block){
                        return '';
                    }
                }
            }
        },

        /***********************************
         * Looking to use this to swap language if we need to build a seperate code base for Canada...
         ************************************/
        'string-replace': {
            app: {
                files: {
                    '<%= appConfig.app %>/js/app.js': '<%= appConfig.app %>/js/app.js'
                },
                options: {
                    replacements: [
                        {
                            pattern: '%GRUNT_VAR_LANG%',
                            replacement: 'enUS'
                        }
                    ]
                }
            },
            dist: {
                files: {
                    '<%= appConfig.dist %>/js/app.js': '<%= appConfig.dist %>/js/app.js'
                },
                options: {
                    replacements: [
                        {
                            pattern: '%GRUNT_VAR_LANG%',
                            replacement: 'enUS'
                        },
                        {
                            pattern: '%GRUNT_VAR_DOMAIN%',
                            replacement: 'http://hdjw_app.dev02.developmentcmd.com'
                        }
                    ]
                }
            }
        },

        /***********************************
         * Grunt Server settings for in-development process
         ************************************/
        connect: {
            options: {
                port: appConfig.port,
                hostname: appConfig.hostName,
                livereload: appConfig.reload,
                middleware: function(connect, options) {
                    return [
                        function(req, res, next) {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

                            // don't just call next() return it
                            return next();
                        }

                    ]
                }
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            function(req, res, next) {
                                res.setHeader('Access-Control-Allow-Origin', '*');
                                res.setHeader('Access-Control-Allow-Methods', '*');
                                return next();
                            },
                            modRewrite(['^/imagePaths$ "hello',
                                '!\\.html|\\.js|\\.svg|\\.css|\\.obj|\\.mtl' +
                                '|\\.png|\\.fnt|\\.jpg|\\.gif|\\.mp4|\\.mp3|\\.ogg|\\.webm|\\.dae|\\.ogv' +
                                '|\\.ttf|\\.woff|\\.woff2'+
                                '$ /index.html [L]'
                            ]),
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components'),
                                '/fonts',
                                connect.static('./fonts')
                            ),
                            connect.static(appConfig.src)
                        ];
                    }
                }
            }
        },

        /***********************************
         * Watches files for changes and runs tasks based on the changed files
         ************************************/
        watch: {

            //watch for less file updates
            sass: {
                files: [
                    '<%= appConfig.src %>/styles/**/*.scss',
                    '<%= appConfig.src %>/modules/{,*/}*.scss'
                ],

                //rebuild main.css
                tasks: ['sass']
            },

            //watch for js file updates
            js: {
                files: [
                    '<%= appConfig.src %>/modules/{,*/}*.js',
                    '<%= appConfig.src %>/services/{,*/}*.js',
                    '<%= appConfig.src %>/directives/{,*/}*.js',
                    '<%= appConfig.src %>/factories/{,*/}*.js',
                    '<%= appConfig.src %>/plugins/{,*/}*.js'
                ],

                //run jshint for cleaner code
                tasks: ['newer:jshint:all'],

                //reload the browser
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },

            html: {
                files: ['index.html','**/*.html'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },

            //watches for main.css update then copies folder and run prefixer
            styles: {
                files: ['<%= appConfig.src %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },

            //watch for any changes to this file
            gruntfile: {
                files: ['Gruntfile.js']
            },


            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= appConfig.src %>/{,*/}*.html',
                    '<%= appConfig.src %>/{,*/}*.js',
                    '<%= appConfig.src %>/images/{,*/}*.{png,jpg,dae,obj,mtl,fnt,jpeg,gif,webp,svg,mp4,mp3,ogg}',
                    '.tmp/styles/{,*/}*.css',
                ]
            }
        },

        /***********************************
         * Run some tasks in parallel to speed up the build process
         ************************************/
        concurrent: {
            server: [
                'copy:styles'
            ],
            app: [
                'copy:styles'
            ],
            dist: [
                'copy:styles'
            ]
        },

        /***********************************
         * Documentation Output
         ************************************/
        'jsdoc' : {
            dist : {
                src: ['src/{,*/}*.js' ],
                options: {
                    destination: 'docs',
                    configure: './docs.json',
                    template: './node_modules/jsdoc-oblivion/template'
                }
            }
        },
        jsdoc2md: {
            oneOutputFile: {
                src: "src/{,*/}*.js",
                dest: "README.md"
            }
            //,
            //separateOutputFilePerInput: {
            //    files: [
            //        { src: "src/jacket.js", dest: "api/jacket.md" },
            //        { src: "src/shirt.js", dest: "api/shirt.md" }
            //    ]
            //},
            //withOptions: {
            //    options: {
            //        "no-gfm": true
            //    },
            //    src: "src/wardrobe.js",
            //    dest: "api/with-index.md"
            //}
        }


    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function () {

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            //'modernizr:tmp',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('app', [
        //'jsdoc',
        'clean:app',
        'concurrent:app',
        'sass',
        'copy:renameForAppPreprocess',
        'preprocess',

        'useminPrepare',
        'autoprefixer',
        'concat',
        'copy:app',
        'copy:renameForAppUsemin',
        'clean:indexApp',
        'usemin'


    ]);

    grunt.registerTask('dist', [
        //'jsdoc',
        'clean:dist',
        'concurrent:dist',
        'sass',
        'copy:renameForDistPreprocess',
        'preprocessDist',
        'useminPrepareDist',
        'autoprefixer',
        'concat',
        //'modernizr:dist',
        'copy:dist',
        'copy:renameForDistUsemin',
        'clean:indexDist',
        'useminDist',
        'string-replace:dist'



    ]);


    grunt.registerTask('default', [
        'serve'
    ]);

    grunt.registerTask('doc', ['jsdoc','jsdoc2md']);

};
