# example.js

This example illustrates how to specify chunk name in `require.ensure()` and `import()` to separated modules into separate chunks manually.

```javascript
import("./templates/foo" /* webpackChunkName: "chunk-foo" */ ).then(function(foo) {
	console.log('foo:', foo);
})

require.ensure([], function(require) {
	var foo = require("./templates/foo");
	console.log('foo:', foo);
}, "chunk-foo1");

var createContextVar = "r";
import("./templates/ba" + createContextVar /* webpackChunkName: "chunk-bar-baz" */ ).then(function(bar) {
	console.log('bar:', bar);
})
```

# templates/

- foo.js
- baz.js
- bar.js

All templates are of this pattern:

```javascript
var foo = "foo";

export default foo;
```

# dist/output.js

<details><summary><code>/******/ (function(modules) { /* webpackBootstrap */ })</code></summary>

```javascript
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		3: 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".output.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
```

</details>

```javascript
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/*!********************!*\
  !*** ./example.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__.e(/*! import() | chunk-foo */ 2).then(__webpack_require__.bind(null, /*! ./templates/foo */ 0)).then(function(foo) {
	console.log('foo:', foo);
})

__webpack_require__.e(/*! require.ensure | chunk-foo1 */ 2).then((function(require) {
	var foo = __webpack_require__(/*! ./templates/foo */ 0);
	console.log('foo:', foo);
}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);

var createContextVar = "r";
__webpack_require__(4)("./ba" + createContextVar).then(function(bar) {
	console.log('bar:', bar);
})




/***/ }),
/* 4 */
/*!****************************************************!*\
  !*** ./templates lazy ^\.\/ba.*$ namespace object ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./bar": [
		1,
		0
	],
	"./bar.js": [
		1,
		0
	],
	"./baz": [
		2,
		1
	],
	"./baz.js": [
		2,
		1
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 4;
module.exports = webpackAsyncContext;

/***/ })
/******/ ]);
```

# Info

## Unoptimized

```
Hash: [1md87b72e4f45293176f38[39m[22m
Version: webpack [1m4.39.2[39m[22m
Time: [1m303[39m[22mms
      [1mAsset[39m[22m       [1mSize[39m[22m  [1mChunks[39m[22m  [1m[39m[22m           [1m[39m[22m[1mChunk Names[39m[22m
[1m[32m0.output.js[39m[22m  445 bytes       [1m0[39m[22m  [1m[32m[emitted][39m[22m  chunk-bar-baz0
[1m[32m1.output.js[39m[22m  439 bytes       [1m1[39m[22m  [1m[32m[emitted][39m[22m  chunk-bar-baz2
[1m[32m2.output.js[39m[22m  436 bytes       [1m2[39m[22m  [1m[32m[emitted][39m[22m  chunk-foo
  [1m[32moutput.js[39m[22m   9.69 KiB       [1m3[39m[22m  [1m[32m[emitted][39m[22m  main
Entrypoint [1mmain[39m[22m = [1m[32moutput.js[39m[22m
chunk    {[1m[33m0[39m[22m} [1m[32m0.output.js[39m[22m (chunk-bar-baz0) 41 bytes <{[1m[33m3[39m[22m}>[1m[32m [rendered][39m[22m
    > ./bar [4] [1m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./bar
    > ./bar.js [4] [1m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./bar.js
 [1] [1m./templates/bar.js[39m[22m 41 bytes {[1m[33m0[39m[22m}[1m[33m [optional][39m[22m[1m[32m [built][39m[22m
     [1m[36m[exports: default][39m[22m
     context element [1m[36m./bar[39m[22m [4] [1m[35m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./bar
     context element [1m[36m./bar.js[39m[22m [4] [1m[35m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./bar.js
chunk    {[1m[33m1[39m[22m} [1m[32m1.output.js[39m[22m (chunk-bar-baz2) 41 bytes <{[1m[33m3[39m[22m}>[1m[32m [rendered][39m[22m
    > ./baz [4] [1m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./baz
    > ./baz.js [4] [1m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./baz.js
 [2] [1m./templates/baz.js[39m[22m 41 bytes {[1m[33m1[39m[22m}[1m[33m [optional][39m[22m[1m[32m [built][39m[22m
     [1m[36m[exports: default][39m[22m
     context element [1m[36m./baz[39m[22m [4] [1m[35m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./baz
     context element [1m[36m./baz.js[39m[22m [4] [1m[35m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./baz.js
chunk    {[1m[33m2[39m[22m} [1m[32m2.output.js[39m[22m (chunk-foo) 41 bytes <{[1m[33m3[39m[22m}>[1m[32m [rendered][39m[22m
    > ./templates/foo [3] [1m./example.js[39m[22m 1:0-62
    > [3] [1m./example.js[39m[22m 5:0-8:16
 [0] [1m./templates/foo.js[39m[22m 41 bytes {[1m[33m2[39m[22m}[1m[32m [built][39m[22m
     [1m[36m[exports: default][39m[22m
     import() [1m[36m./templates/foo[39m[22m [3] [1m[35m./example.js[39m[22m 1:0-62
     cjs require [1m[36m./templates/foo[39m[22m [3] [1m[35m./example.js[39m[22m 6:11-37
chunk    {[1m[33m3[39m[22m} [1m[32moutput.js[39m[22m (main) 580 bytes >{[1m[33m0[39m[22m}< >{[1m[33m1[39m[22m}< >{[1m[33m2[39m[22m}<[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./example.js main
 [3] [1m./example.js[39m[22m 420 bytes {[1m[33m3[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./example.js[39m[22m  main
 [4] [1m./templates lazy ^\.\/ba.*$ namespace object[39m[22m 160 bytes {[1m[33m3[39m[22m}[1m[32m [built][39m[22m
     import() context lazy [1m[36m./templates[39m[22m [3] [1m[35m./example.js[39m[22m 11:0-84
```

## Production mode

```
Hash: [1m40e0452927b16a5b84f6[39m[22m
Version: webpack [1m4.39.2[39m[22m
Time: [1m1283[39m[22mms
      [1mAsset[39m[22m       [1mSize[39m[22m  [1mChunks[39m[22m  [1m[39m[22m           [1m[39m[22m[1mChunk Names[39m[22m
[1m[32m0.output.js[39m[22m  114 bytes       [1m0[39m[22m  [1m[32m[emitted][39m[22m  chunk-bar-baz0
[1m[32m1.output.js[39m[22m  115 bytes       [1m1[39m[22m  [1m[32m[emitted][39m[22m  chunk-bar-baz2
[1m[32m2.output.js[39m[22m  113 bytes       [1m2[39m[22m  [1m[32m[emitted][39m[22m  chunk-foo
  [1m[32moutput.js[39m[22m   2.59 KiB       [1m3[39m[22m  [1m[32m[emitted][39m[22m  main
Entrypoint [1mmain[39m[22m = [1m[32moutput.js[39m[22m
chunk    {[1m[33m0[39m[22m} [1m[32m0.output.js[39m[22m (chunk-bar-baz0) 41 bytes <{[1m[33m3[39m[22m}>[1m[32m [rendered][39m[22m
    > ./bar [4] [1m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./bar
    > ./bar.js [4] [1m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./bar.js
 [1] [1m./templates/bar.js[39m[22m 41 bytes {[1m[33m0[39m[22m}[1m[33m [optional][39m[22m[1m[32m [built][39m[22m
     [1m[36m[exports: default][39m[22m
     context element [1m[36m./bar[39m[22m [4] [1m[35m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./bar
     context element [1m[36m./bar.js[39m[22m [4] [1m[35m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./bar.js
chunk    {[1m[33m1[39m[22m} [1m[32m1.output.js[39m[22m (chunk-bar-baz2) 41 bytes <{[1m[33m3[39m[22m}>[1m[32m [rendered][39m[22m
    > ./baz [4] [1m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./baz
    > ./baz.js [4] [1m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./baz.js
 [2] [1m./templates/baz.js[39m[22m 41 bytes {[1m[33m1[39m[22m}[1m[33m [optional][39m[22m[1m[32m [built][39m[22m
     [1m[36m[exports: default][39m[22m
     context element [1m[36m./baz[39m[22m [4] [1m[35m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./baz
     context element [1m[36m./baz.js[39m[22m [4] [1m[35m./templates lazy ^\.\/ba.*$ namespace object[39m[22m ./baz.js
chunk    {[1m[33m2[39m[22m} [1m[32m2.output.js[39m[22m (chunk-foo) 41 bytes <{[1m[33m3[39m[22m}>[1m[32m [rendered][39m[22m
    > ./templates/foo [3] [1m./example.js[39m[22m 1:0-62
    > [3] [1m./example.js[39m[22m 5:0-8:16
 [0] [1m./templates/foo.js[39m[22m 41 bytes {[1m[33m2[39m[22m}[1m[32m [built][39m[22m
     [1m[36m[exports: default][39m[22m
     import() [1m[36m./templates/foo[39m[22m [3] [1m[35m./example.js[39m[22m 1:0-62
     cjs require [1m[36m./templates/foo[39m[22m [3] [1m[35m./example.js[39m[22m 6:11-37
chunk    {[1m[33m3[39m[22m} [1m[32moutput.js[39m[22m (main) 580 bytes >{[1m[33m0[39m[22m}< >{[1m[33m1[39m[22m}< >{[1m[33m2[39m[22m}<[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./example.js main
 [3] [1m./example.js[39m[22m 420 bytes {[1m[33m3[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./example.js[39m[22m  main
 [4] [1m./templates lazy ^\.\/ba.*$ namespace object[39m[22m 160 bytes {[1m[33m3[39m[22m}[1m[32m [built][39m[22m
     import() context lazy [1m[36m./templates[39m[22m [3] [1m[35m./example.js[39m[22m 11:0-84
```
