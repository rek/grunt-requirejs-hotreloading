'use strict';

let socketio = require('socket.io');

let io = socketio.listen('3002', (err, msg) => {
	if (err) {
		console.error(err);
	}

	console.log('Message:', msg);
});

let EventEmitter = require('events').EventEmitter,
	eventChannel = new EventEmitter();

io.on('connection', (socket) => {
	// console.log('A client connected');
	socket.on('disconnect', () => {
		// console.log('A client disconnected');
	});
});

eventChannel.on('end', function(paths) {
	// console.log('SO EPIC - in gruntfile:', paths);

	// only process first file
	if (typeof paths === 'object') {
		paths = paths[0]
	}

	let temp = paths.split('/')

	if (temp.length > 3) {
		// console.log('Temp', temp);
		// console.log(temp.slice(2));

		// translate path here
		let reconciledPath = temp.slice(2).join('/').split('.')[0]
		// console.log('ReconciledPath:', reconciledPath);

		io.sockets.emit('hot-reload (.js)', reconciledPath, paths);
	} else {
		console.log('Bad file found:', temp);
	}
});

module.exports = (grunt) => {
	// console.log('Attaching eventChannel');
	grunt.eventChannel = eventChannel

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	require('load-grunt-config')(grunt, {
		pkg: grunt.file.readJSON('package.json'),
	});
};
