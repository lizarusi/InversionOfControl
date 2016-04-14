// Wrapping function and interface example

var fs = require('fs'),
    vm = require('vm');
var statistic = {callbacks: 0, callFunction: 0, totalRead:0 }
// Create a hash for application sandbox
var context = {
  module: {},
  console: console,
  // Forward link to fs API into sandbox
  fs: cloneInterface(fs),
  setInterval: setInterval,
  setTimeout: setTimeout
};
//Added wrapper for function
function wrapFunction(fnName, isCallback, fn) {
  return function wrapper() {
    var args = [];
    Array.prototype.push.apply(args, arguments);
    Array.prototype.last = function(){
      return this[this.length - 1]
    }
    console.log('Call: ' + fnName);
    // console.dir(args);
    if (!isCallback ){
        statistic['callFunction'] += 1;
    }
    if(isCallback, fnName === 'readFile'){
      statistic.totalRead  += args[1].length;
    }
    if (typeof(args.last()) === 'function'){
        statistic['callbacks'] += 1;
        args[args.length - 1] = wrapFunction(fnName, true, args.last());
    }

    return fn.apply(undefined, args);
  }
}//Added clone interface function
function cloneInterface(anInterface) {
  var clone = {};
  for (var key in anInterface) {
    clone[key] = wrapFunction(key, false, anInterface[key]);
  }
  return clone;
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
  setInterval(function(){console.log(statistic)}, 1000);
});
