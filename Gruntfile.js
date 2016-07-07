module.exports = function (grunt) {
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['public/js/ngCart/src/ngCart.js', 'public/js/ngCart/src/ngCart.directives.js', 'public/js/ngCart/src/ngCart.fulfilment.js'],
				dest: "public/js/ngCart/dist/ngCart.js"
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> */\n <%= pkg.url %>'
			},
			dist: {
				src: 'public/js/ngCart/dist/ngCart.js',
				dest: "public/js/ngCart/dist/ngCart.min.js"
			}
		},

		watch: {
			options: {
				dateFormat: function (time) {
					grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
					grunt.log.writeln('Waiting for more changes...');
				},
			},
			scripts: {
				files: ['public/js/*.js', 'public/js/**/*.js'],
				tasks: ['jshint'],
				options: {
					spawn: false,
				},
			},
		},

		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: [],
					env: {
						"NODE_ENV": "development"
					},
					callback: function (nodemon) {
						nodemon.on('log', function (event) {
							console.log(event.colour);
						});
					}
				}
			}
		}


	});

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['concat', 'uglify']);
	grunt.registerTask('default', ['test', 'build']);
	grunt.registerTask('run', ['nodemon']);

};
