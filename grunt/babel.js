'use strict';

module.exports = {
	options: {
		sourceMap: false,
		callback: (grunt, filename) => {
			// console.log('Changed file:', filename);
			grunt.eventChannel.emit('end', filename);
		}
	},

	js: {
		files: [{
			expand: true,
			cwd: '/scripts',
			dest: '/build',
			src: [
				'*.js',
			],
			ext: '.js'
		}]
	},

};
