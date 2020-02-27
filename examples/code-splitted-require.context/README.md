# example.js

``` javascript
function getTemplate(templateName, callback) {
	require.ensure([], function(require) {
		callback(require("../require.context/templates/"+templateName)());
	});
}
getTemplate("a", function(a) {
	console.log(a);
});
getTemplate("b", function(b) {
	console.log(b);
});
```

# dist/output.js

<details><summary><code>/******/ (function(modules) { /* webpackBootstrap */ })</code></summary>

``` javascript
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
/******/ 		0: 0
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
```

</details>

``` javascript
/******/ ([
/* 0 */
/*!********************!*\
  !*** ./example.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function getTemplate(templateName, callback) {
	__webpack_require__.e(/*! require.ensure */ 1).then((function(require) {
		callback(__webpack_require__(1)("./"+templateName)());
	}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}
getTemplate("a", function(a) {
	console.log(a);
});
getTemplate("b", function(b) {
	console.log(b);
});

/***/ })
/******/ ]);
```

# dist/1.output.js

``` javascript
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[
/* 0 */,
/* 1 */
/*!**************************************************!*\
  !*** ../require.context/templates sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./a": 2,
	"./a.js": 2,
	"./b": 3,
	"./b.js": 3,
	"./c": 4,
	"./c.js": 4
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1;

/***/ }),
/* 2 */
/*!*****************************************!*\
  !*** ../require.context/templates/a.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
	return "This text was generated by template A";
}

/***/ }),
/* 3 */
/*!*****************************************!*\
  !*** ../require.context/templates/b.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
	return "This text was generated by template B";
}

/***/ }),
/* 4 */
/*!*****************************************!*\
  !*** ../require.context/templates/c.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
	return "This text was generated by template C";
}

/***/ })
]]);
```

# Info

## Unoptimized

```
Hash: [1me8eb40167ab921faa926[39m[22m
Version: webpack [1m4.39.2[39m[22m
Time: [1m92[39m[22mms
      [1mAsset[39m[22m      [1mSize[39m[22m  [1mChunks[39m[22m  [1m[39m[22m           [1m[39m[22m[1mChunk Names[39m[22m
[1m[32m1.output.js[39m[22m  1.82 KiB       [1m1[39m[22m  [1m[32m[emitted][39m[22m  
  [1m[32moutput.js[39m[22m  8.58 KiB       [1m0[39m[22m  [1m[32m[emitted][39m[22m  main
Entrypoint [1mmain[39m[22m = [1m[32moutput.js[39m[22m
chunk    {[1m[33m0[39m[22m} [1m[32moutput.js[39m[22m (main) 276 bytes >{[1m[33m1[39m[22m}<[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./example.js main
 [0] [1m./example.js[39m[22m 276 bytes {[1m[33m0[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./example.js[39m[22m  main
chunk    {[1m[33m1[39m[22m} [1m[32m1.output.js[39m[22m 463 bytes <{[1m[33m0[39m[22m}>[1m[32m [rendered][39m[22m
    > [0] [1m./example.js[39m[22m 2:1-4:3
 [1] [1m../require.context/templates sync ^\.\/.*$[39m[22m 217 bytes {[1m[33m1[39m[22m}[1m[32m [built][39m[22m
     cjs require context [1m[36m../require.context/templates[39m[22m [0] [1m[35m./example.js[39m[22m 3:11-64
 [2] [1m../require.context/templates/a.js[39m[22m 82 bytes {[1m[33m1[39m[22m}[1m[33m [optional][39m[22m[1m[32m [built][39m[22m
     context element [1m[36m./a[39m[22m [1] [1m[35m../require.context/templates sync ^\.\/.*$[39m[22m ./a
     context element [1m[36m./a.js[39m[22m [1] [1m[35m../require.context/templates sync ^\.\/.*$[39m[22m ./a.js
 [3] [1m../require.context/templates/b.js[39m[22m 82 bytes {[1m[33m1[39m[22m}[1m[33m [optional][39m[22m[1m[32m [built][39m[22m
     context element [1m[36m./b[39m[22m [1] [1m[35m../require.context/templates sync ^\.\/.*$[39m[22m ./b
     context element [1m[36m./b.js[39m[22m [1] [1m[35m../require.context/templates sync ^\.\/.*$[39m[22m ./b.js
 [4] [1m../require.context/templates/c.js[39m[22m 82 bytes {[1m[33m1[39m[22m}[1m[33m [optional][39m[22m[1m[32m [built][39m[22m
     context element [1m[36m./c[39m[22m [1] [1m[35m../require.context/templates sync ^\.\/.*$[39m[22m ./c
     context element [1m[36m./c.js[39m[22m [1] [1m[35m../require.context/templates sync ^\.\/.*$[39m[22m ./c.js
```

## Production mode

```
Hash: [1md256ea1e033cd114728a[39m[22m
Version: webpack [1m4.39.2[39m[22m
Time: [1m123[39m[22mms
      [1mAsset[39m[22m       [1mSize[39m[22m  [1mChunks[39m[22m  [1m[39m[22m           [1m[39m[22m[1mChunk Names[39m[22m
[1m[32m1.output.js[39m[22m  621 bytes       [1m1[39m[22m  [1m[32m[emitted][39m[22m  
  [1m[32moutput.js[39m[22m   2.18 KiB       [1m0[39m[22m  [1m[32m[emitted][39m[22m  main
Entrypoint [1mmain[39m[22m = [1m[32moutput.js[39m[22m
chunk    {[1m[33m0[39m[22m} [1m[32moutput.js[39m[22m (main) 276 bytes >{[1m[33m1[39m[22m}<[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./example.js main
 [0] [1m./example.js[39m[22m 276 bytes {[1m[33m0[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./example.js[39m[22m  main
chunk    {[1m[33m1[39m[22m} [1m[32m1.output.js[39m[22m 463 bytes <{[1m[33m0[39m[22m}>[1m[32m [rendered][39m[22m
    > [0] [1m./example.js[39m[22m 2:1-4:3
 [1] [1m../require.context/templates sync ^\.\/.*$[39m[22m 217 bytes {[1m[33m1[39m[22m}[1m[32m [built][39m[22m
     cjs require context [1m[36m../require.context/templates[39m[22m [0] [1m[35m./example.js[39m[22m 3:11-64
 [2] [1m../require.context/templates/a.js[39m[22m 82 bytes {[1m[33m1[39m[22m}[1m[33m [optional][39m[22m[1m[32m [built][39m[22m
     context element [1m[36m./a[39m[22m [1] [1m[35m../require.context/templates sync ^\.\/.*$[39m[22m ./a
     context element [1m[36m./a.js[39m[22m [1] [1m[35m../require.context/templates sync ^\.\/.*$[39m[22m ./a.js
 [3] [1m../require.context/templates/b.js[39m[22m 82 bytes {[1m[33m1[39m[22m}[1m[33m [optional][39m[22m[1m[32m [built][39m[22m
     context element [1m[36m./b[39m[22m [1] [1m[35m../require.context/templates sync ^\.\/.*$[39m[22m ./b
     context element [1m[36m./b.js[39m[22m [1] [1m[35m../require.context/templates sync ^\.\/.*$[39m[22m ./b.js
 [4] [1m../require.context/templates/c.js[39m[22m 82 bytes {[1m[33m1[39m[22m}[1m[33m [optional][39m[22m[1m[32m [built][39m[22m
     context element [1m[36m./c[39m[22m [1] [1m[35m../require.context/templates sync ^\.\/.*$[39m[22m ./c
     context element [1m[36m./c.js[39m[22m [1] [1m[35m../require.context/templates sync ^\.\/.*$[39m[22m ./c.js
```
