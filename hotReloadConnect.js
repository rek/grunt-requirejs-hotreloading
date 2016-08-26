define([
	'socket.io',
	'underscore'
],

function(io, _) {
	let socketHotReload = null;

	let getConnection = () => {
		console.log('Starting HOT-RELOAD connection');

		if (socketHotReload === null) {

			socketHotReload = io.connect('http://127.0.0.1:3002');

			// you should implement io.on 'error', on 'connect' and on 'disconnect' etc

			socketHotReload.on('.js transform error', (data) => {
				// you need to implement window.onerror to prevent error from crashing front-end and to let yourself know why the transform failed
				throw new Error(data);
			});

			let invertedPaths = _.invert(requirejs.s.contexts._.config.paths)

			socketHotReload.on('hot-reload (.js)', (fileKey) => {
				// console.log('Caught socket event:', 'hot-reload (.js)');
				// console.log('FileKey:', fileKey);

				let moduleKey = invertedPaths[fileKey]
				// console.log('moduleKey', moduleKey);

				// delete cache representing module; this means the next require call to the same module
				// will then have to pull the module from filesystem
				require.undef(moduleKey);

				// load the file asynchronously, because the cache has been deleted
				// NOTE: this require is the slow part.
				require([moduleKey], (module) => {
					console.log('Newly updated module:', module);
					// callback(null, module);

					require(['app'], (App) => { // I have a module '#allViews' that contains all my front-end views
						// console.log('App', App);
						let splitKeys = fileKey.split('/')
						console.log('Keys', splitKeys);
						console.log(splitKeys.slice(1));

						let sanitizedKeys

						if (splitKeys[0] === 'modules') {
							sanitizedKeys = splitKeys.slice(1)
						}

						var moduleForm = sanitizedKeys.map((key) => _.capitalize(key))
						console.log('ModuleForm:', moduleForm);

						if (_.has(App, moduleForm.join('.'))) {
							console.log('Updating...');

							_.set(App, moduleForm.join('.'), module)

							// reload the current page
							Backbone.history.loadUrl(Backbone.history.fragment);
						}
					});

				});
			});
		}

		return socketHotReload;
	}

	return {
		getConnection,
	};
});
