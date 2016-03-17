// Wrapping function and interface example

var fs = require('fs'),
    vm = require('vm');

// Create a hash for application sandbox
var context = {
  module: {},
  console: console,
  // Forward link to fs API into sandbox
  fs: cloneInterface(fs);
};
//Added clone interface function
function cloneInterface(anInterface) {
  var clone = {};
  for (var key in anInterface) {
    clone[key] = wrappFunction(key, anInterface[key]);
  }
  return clone;
}
//Added wrapper for function
function wrapFunction(fnName, fn) {
  return function wrapper() {
    var args = [];
    Array.prototype.push.apply(args, arguments);
    console.log('Call: ' + fnName);
    console.dir(args);
    return fn.apply(undefined, args);
  }
}
// Turn hash into context
context.global = context;
var sandbox = vm.createContext(context);

// Read an application source code from the file
var fileName = './application.js';
fs.readFile(fileName, function(err, src) {
  // Run an application in sandboxed context
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
});
