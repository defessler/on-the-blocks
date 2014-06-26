var OTB = (function(){

	var modules = {};

	// define() creates a module.
	//
	// Arguments:
	// name = name of module, deps = other modules this relies on, factory = function associated with module.
	var define = function(name, deps, factory) {
		// name will always be the first argument, remove first argument from array and assign to name.
		name = arguments[0];
		// factory will always be the last argument, remove last argument from array and assign to factory.
		factory = arguments[arguments.length - 1];
		// deps is optional. At this point it would be the only argument remaining. If it doesn't exist
		// create empty array.
		deps = arguments.length > 2 ? arguments[1] : [];

		// Save module in "modules" using "name" from above.
		// Send deps and function to require for processing.
		modules[name] = require(deps, factory) || {};

	};

	// require() loads a module.
	//
	// Arguments:
	// deps = modules to load, env = environment/factory function that gets called.
	var require = function(deps, env) {
		var base = {};

		// Loop through deps and add all dependent modules into base.
		for(var x = 0; x < deps.length; x++){
			base[deps[x]] = modules[deps[x]];
		}
		
		// invoking environment with base as both the context and as an argument
		return env.call(base, base);
	};

	return { // Expose specific properites
		define: define,
		require: require
	};

}).call();
