'use strict';

module.exports = {
	options: {
		spawn: false,
		livereload: true
		// livereload: 8083
	},

	// i18n: {
	// 	files: [
	// 		'<%= settings.app %>/i18n/*.js',
	// 	],
	// 	tasks: 'newer:copy:i18n'
	// },

	// images: {
	// 	files: '<%= settings.app %>/images/*',
	// 	tasks: 'imagemin:dev'
	// },

	// svgstore: {
	//     files: '<%= settings.app %>/images/svg/*.svg',
	//     tasks: ['svgstore:dev', 'svgstore:doc']
	// },

	sass: {
		files: '<%= settings.app %>/styles/**/*.scss',
		tasks: ['sass:dev', 'postcss:dev'],
		options: {
			livereload: false
		},
	},

	dust: {
		files: [
			'<%= settings.dist %>/scripts/common/templates/*.dust',
			'<%= settings.dist %>/scripts/common/templates/**/*.dust',
			'<%= settings.dist %>/scripts/modules/**/templates/*.dust',
			'<%= settings.dist %>/scripts/modules/**/templates/**/*.dust',
			'<%= settings.dist %>/scripts/baseApp/**/templates/**/*.dust',
		],
		tasks: 'newer:dustjs:dev'
	},

	dustPure: {
		files: [
			'<%= settings.app %>/scripts/modules/**/templates/*.dust',
			'<%= settings.app %>/scripts/modules/**/templates/**/*.dust',
		],
		tasks: 'sync:dustPure'
	},

	info: {
		files: [
			'<%= settings.app %>/*.json',
		],
		tasks: 'sync:info'
	},

	coffeecup: {
		files: ['<%= settings.app %>/scripts/**/*.dust.coffee', '<%= settings.app %>/*.coffee'],
		tasks: 'newer:coffeecup:dist',
		options: {
			livereload: false
		},
	},

	index: {
		files: ['<%= settings.app %>/*.coffee'],
		tasks: 'newer:coffeecup:index',
	},

	javascript: {
		files: [
			'<%= settings.app %>/scripts/*.js',

			'<%= settings.app %>/scripts/baseApp/*.js',
			'<%= settings.app %>/scripts/baseApp/**/*.js',

			'<%= settings.app %>/scripts/modules/*.js',
			'<%= settings.app %>/scripts/modules/**/*.js',

			'<%= settings.app %>/scripts/common/*.js',
			'<%= settings.app %>/scripts/common/**/*.js',

			'<%= settings.app %>/scripts/baseApp/**/*.jsx',
			'<%= settings.app %>/scripts/modules/**/*.jsx',
			'<%= settings.app %>/scripts/common/**/*.jsx',

			// '!<%= settings.app %>/scripts/**/loaderTest.js',
			// '!<%= settings.app %>/scripts/test/**/*.js',
			// '!<%= settings.app %>/scripts/**/test/**/*.js',
		],
		tasks: 'newer:babel:js',
		options: {
			livereload: false,
		}
	},

	processor: {
		files: [
			'<%= settings.app %>/scripts/processor/*.js',
		],
		tasks: 'newer:processor:js',
	},

	// jsx: {
	// 	files: [
	// 		'<%= settings.app %>/scripts/**/*.jsx',
	// 		'<%= settings.app %>/scripts/*.jsx',
	// 		'!<%= settings.app %>/scripts/test/*.jsx'
	// 	],
	// 	tasks: 'newer:babel:jsx',
	// },

	// gruntfile: {
	// 	files: ['Gruntfile.js', 'grunt/*.js'],
	// 	// tasks: ['jshint:gruntfile'],
	// },

	// main: {
	// 	// livereload: 8083,
	// 	files: [
	// 		'Gruntfile.js',
	// 		'grunt/*.js',
	// 		'<%= settings.dist %>/*.html',
	// 		'<%= settings.dist %>/*.json',
	// 		'<%= settings.dist %>/styles/*.css',
	// 		'<%= settings.dist %>/scripts/*.js',
	// 		// // '<%= settings.dist %>/scripts/modules/{,*/}*.js',
	// 		'<%= settings.dist %>/{vendor,i18n}/*.js',
	// 		'<%= settings.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
	// 	],
	// 	// tasks: ['jshint'],
	// }
};
