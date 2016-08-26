'use strict';

module.exports = {
	options: {
		spawn: false,
		livereload: true
	},

	javascript: {
		files: [
			'scripts/*.js',
		],
		tasks: 'babel:js',
		options: {
			livereload: false,
		}
	},

};
