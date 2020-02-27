This example shows how to create an explicit vendor chunk as well as a common chunk for code shared among entry points. In this example, we have 3 entry points: `pageA`, `pageB`, and `pageC`. Those entry points share some of the same utility modules, but not others. This configuration will pull out any modules common to at least 2 bundles and place it in the `common` bundle instead, all while keeping the specified vendor libraries in their own bundle by themselves.

To better understand, here are the entry points and which utility modules they depend on:

- `pageA`
  - `utility1`
  - `utility2`
- `pageB`
  - `utility2`
  - `utility3`
- `pageC`
  - `utility2`
  - `utility3`

Given this configuration, webpack will produce the following bundles:

- `vendor`
  - webpack runtime
  - `vendor1`
  - `vendor2`
- `common`
  - `utility2`
  - `utility3`
- `pageA`
  - `pageA`
  - `utility1`
- `pageB`
  - `pageB`
- `pageC`
  - `pageC`

With this bundle configuration, you would load your third party libraries, then your common application code, then your page-specific application code.

# webpack.config.js

```javascript
var path = require("path");

module.exports = {
	// mode: "development" || "production",
	entry: {
		pageA: "./pageA",
		pageB: "./pageB",
		pageC: "./pageC"
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js"
	}
};
```

# dist/vendor.js

```javascript
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ 1:
/*!*********************************!*\
  !*** ./node_modules/vendor1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "vendor1";

/***/ }),

/***/ 5:
/*!*********************************!*\
  !*** ./node_modules/vendor2.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "vendor2";

/***/ })

}]);
```

# dist/commons~pageA~pageB~pageC.js

```javascript
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 3:
/*!*********************!*\
  !*** ./utility2.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "utility2";

/***/ })

}]);
```

# dist/commons~pageB~pageC.js

```javascript
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ 6:
/*!*********************!*\
  !*** ./utility3.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "utility3";

/***/ })

}]);
```

# dist/pageA.js

<details><summary><code>/******/ (function(modules) { /* webpackBootstrap */ })</code></summary>

```javascript
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
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
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
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
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,1,2]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
```

</details>

```javascript
/******/ ([
/* 0 */
/*!******************!*\
  !*** ./pageA.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var vendor1 = __webpack_require__(/*! vendor1 */ 1);
var utility1 = __webpack_require__(/*! ./utility1 */ 2);
var utility2 = __webpack_require__(/*! ./utility2 */ 3);

module.exports = "pageA";


/***/ }),
/* 1 */,
/* 2 */
/*!*********************!*\
  !*** ./utility1.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "utility1";

/***/ })
/******/ ]);
```

# dist/pageB.js

```javascript
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
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
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
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
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([4,1,2,4]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
/*!******************!*\
  !*** ./pageB.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var vendor2 = __webpack_require__(/*! vendor2 */ 5);
var utility2 = __webpack_require__(/*! ./utility2 */ 3);
var utility3 = __webpack_require__(/*! ./utility3 */ 6);

module.exports = "pageB";


/***/ })

/******/ });
```

# dist/pageC.js

```javascript
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
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
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		5: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([7,2,4]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 7:
/*!******************!*\
  !*** ./pageC.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var utility2 = __webpack_require__(/*! ./utility2 */ 3);
var utility3 = __webpack_require__(/*! ./utility3 */ 6);

module.exports = "pageC";

/***/ })

/******/ });
```

# Info

## Unoptimized

```
Hash: [1m90e1072adc384329215d[39m[22m
Version: webpack [1m4.39.2[39m[22m
Time: [1m338[39m[22mms
                       [1mAsset[39m[22m       [1mSize[39m[22m  [1mChunks[39m[22m  [1m[39m[22m           [1m[39m[22m[1mChunk Names[39m[22m
[1m[32mcommons~pageA~pageB~pageC.js[39m[22m  269 bytes       [1m2[39m[22m  [1m[32m[emitted][39m[22m  commons~pageA~pageB~pageC
      [1m[32mcommons~pageB~pageC.js[39m[22m  269 bytes       [1m4[39m[22m  [1m[32m[emitted][39m[22m  commons~pageB~pageC
                    [1m[32mpageA.js[39m[22m   6.78 KiB       [1m0[39m[22m  [1m[32m[emitted][39m[22m  pageA
                    [1m[32mpageB.js[39m[22m   6.58 KiB       [1m3[39m[22m  [1m[32m[emitted][39m[22m  pageB
                    [1m[32mpageC.js[39m[22m   6.53 KiB       [1m5[39m[22m  [1m[32m[emitted][39m[22m  pageC
                   [1m[32mvendor.js[39m[22m  536 bytes       [1m1[39m[22m  [1m[32m[emitted][39m[22m  vendor
Entrypoint [1mpageA[39m[22m = [1m[32mvendor.js[39m[22m [1m[32mcommons~pageA~pageB~pageC.js[39m[22m [1m[32mpageA.js[39m[22m
Entrypoint [1mpageB[39m[22m = [1m[32mvendor.js[39m[22m [1m[32mcommons~pageA~pageB~pageC.js[39m[22m [1m[32mcommons~pageB~pageC.js[39m[22m [1m[32mpageB.js[39m[22m
Entrypoint [1mpageC[39m[22m = [1m[32mcommons~pageA~pageB~pageC.js[39m[22m [1m[32mcommons~pageB~pageC.js[39m[22m [1m[32mpageC.js[39m[22m
chunk    {[1m[33m0[39m[22m} [1m[32mpageA.js[39m[22m (pageA) 170 bytes ={[1m[33m1[39m[22m}= ={[1m[33m2[39m[22m}=[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./pageA pageA
 [0] [1m./pageA.js[39m[22m 142 bytes {[1m[33m0[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./pageA[39m[22m  pageA
 [2] [1m./utility1.js[39m[22m 28 bytes {[1m[33m0[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./utility1[39m[22m [0] [1m[35m./pageA.js[39m[22m 2:15-36
chunk    {[1m[33m1[39m[22m} [1m[32mvendor.js[39m[22m (vendor) 54 bytes ={[1m[33m0[39m[22m}= ={[1m[33m2[39m[22m}= ={[1m[33m3[39m[22m}= ={[1m[33m4[39m[22m}=[1m[33m [initial][39m[22m[1m[32m [rendered][39m[22m[1m[33m split chunk (cache group: vendor) (name: vendor)[39m[22m
    > ./pageA pageA
    > ./pageB pageB
    2 modules
chunk    {[1m[33m2[39m[22m} [1m[32mcommons~pageA~pageB~pageC.js[39m[22m (commons~pageA~pageB~pageC) 28 bytes ={[1m[33m0[39m[22m}= ={[1m[33m1[39m[22m}= ={[1m[33m3[39m[22m}= ={[1m[33m4[39m[22m}= ={[1m[33m5[39m[22m}=[1m[33m [initial][39m[22m[1m[32m [rendered][39m[22m[1m[33m split chunk (cache group: commons) (name: commons~pageA~pageB~pageC)[39m[22m
    > ./pageA pageA
    > ./pageB pageB
    > ./pageC pageC
 [3] [1m./utility2.js[39m[22m 28 bytes {[1m[33m2[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./utility2[39m[22m [0] [1m[35m./pageA.js[39m[22m 3:15-36
     cjs require [1m[36m./utility2[39m[22m [4] [1m[35m./pageB.js[39m[22m 2:15-36
     cjs require [1m[36m./utility2[39m[22m [7] [1m[35m./pageC.js[39m[22m 1:15-36
chunk    {[1m[33m3[39m[22m} [1m[32mpageB.js[39m[22m (pageB) 142 bytes ={[1m[33m1[39m[22m}= ={[1m[33m2[39m[22m}= ={[1m[33m4[39m[22m}=[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./pageB pageB
 [4] [1m./pageB.js[39m[22m 142 bytes {[1m[33m3[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./pageB[39m[22m  pageB
chunk    {[1m[33m4[39m[22m} [1m[32mcommons~pageB~pageC.js[39m[22m (commons~pageB~pageC) 28 bytes ={[1m[33m1[39m[22m}= ={[1m[33m2[39m[22m}= ={[1m[33m3[39m[22m}= ={[1m[33m5[39m[22m}=[1m[33m [initial][39m[22m[1m[32m [rendered][39m[22m[1m[33m split chunk (cache group: commons) (name: commons~pageB~pageC)[39m[22m
    > ./pageB pageB
    > ./pageC pageC
 [6] [1m./utility3.js[39m[22m 28 bytes {[1m[33m4[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./utility3[39m[22m [4] [1m[35m./pageB.js[39m[22m 3:15-36
     cjs require [1m[36m./utility3[39m[22m [7] [1m[35m./pageC.js[39m[22m 2:15-36
chunk    {[1m[33m5[39m[22m} [1m[32mpageC.js[39m[22m (pageC) 105 bytes ={[1m[33m2[39m[22m}= ={[1m[33m4[39m[22m}=[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./pageC pageC
 [7] [1m./pageC.js[39m[22m 105 bytes {[1m[33m5[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./pageC[39m[22m  pageC
```

## Production mode

```
Hash: [1m38bd528cee63650d45c8[39m[22m
Version: webpack [1m4.39.2[39m[22m
Time: [1m1678[39m[22mms
                       [1mAsset[39m[22m       [1mSize[39m[22m  [1mChunks[39m[22m  [1m[39m[22m           [1m[39m[22m[1mChunk Names[39m[22m
[1m[32mcommons~pageA~pageB~pageC.js[39m[22m   96 bytes       [1m0[39m[22m  [1m[32m[emitted][39m[22m  commons~pageA~pageB~pageC
      [1m[32mcommons~pageB~pageC.js[39m[22m   97 bytes       [1m1[39m[22m  [1m[32m[emitted][39m[22m  commons~pageB~pageC
                    [1m[32mpageA.js[39m[22m   1.56 KiB       [1m3[39m[22m  [1m[32m[emitted][39m[22m  pageA
                    [1m[32mpageB.js[39m[22m   1.53 KiB       [1m4[39m[22m  [1m[32m[emitted][39m[22m  pageB
                    [1m[32mpageC.js[39m[22m   1.52 KiB       [1m5[39m[22m  [1m[32m[emitted][39m[22m  pageC
                   [1m[32mvendor.js[39m[22m  134 bytes       [1m2[39m[22m  [1m[32m[emitted][39m[22m  vendor
Entrypoint [1mpageA[39m[22m = [1m[32mvendor.js[39m[22m [1m[32mcommons~pageA~pageB~pageC.js[39m[22m [1m[32mpageA.js[39m[22m
Entrypoint [1mpageB[39m[22m = [1m[32mvendor.js[39m[22m [1m[32mcommons~pageA~pageB~pageC.js[39m[22m [1m[32mcommons~pageB~pageC.js[39m[22m [1m[32mpageB.js[39m[22m
Entrypoint [1mpageC[39m[22m = [1m[32mcommons~pageA~pageB~pageC.js[39m[22m [1m[32mcommons~pageB~pageC.js[39m[22m [1m[32mpageC.js[39m[22m
chunk    {[1m[33m0[39m[22m} [1m[32mcommons~pageA~pageB~pageC.js[39m[22m (commons~pageA~pageB~pageC) 28 bytes ={[1m[33m1[39m[22m}= ={[1m[33m2[39m[22m}= ={[1m[33m3[39m[22m}= ={[1m[33m4[39m[22m}= ={[1m[33m5[39m[22m}=[1m[33m [initial][39m[22m[1m[32m [rendered][39m[22m[1m[33m split chunk (cache group: commons) (name: commons~pageA~pageB~pageC)[39m[22m
    > ./pageA pageA
    > ./pageB pageB
    > ./pageC pageC
 [0] [1m./utility2.js[39m[22m 28 bytes {[1m[33m0[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./utility2[39m[22m [2] [1m[35m./pageA.js[39m[22m 3:15-36
     cjs require [1m[36m./utility2[39m[22m [5] [1m[35m./pageB.js[39m[22m 2:15-36
     cjs require [1m[36m./utility2[39m[22m [7] [1m[35m./pageC.js[39m[22m 1:15-36
chunk    {[1m[33m1[39m[22m} [1m[32mcommons~pageB~pageC.js[39m[22m (commons~pageB~pageC) 28 bytes ={[1m[33m0[39m[22m}= ={[1m[33m2[39m[22m}= ={[1m[33m4[39m[22m}= ={[1m[33m5[39m[22m}=[1m[33m [initial][39m[22m[1m[32m [rendered][39m[22m[1m[33m split chunk (cache group: commons) (name: commons~pageB~pageC)[39m[22m
    > ./pageB pageB
    > ./pageC pageC
 [1] [1m./utility3.js[39m[22m 28 bytes {[1m[33m1[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./utility3[39m[22m [5] [1m[35m./pageB.js[39m[22m 3:15-36
     cjs require [1m[36m./utility3[39m[22m [7] [1m[35m./pageC.js[39m[22m 2:15-36
chunk    {[1m[33m2[39m[22m} [1m[32mvendor.js[39m[22m (vendor) 54 bytes ={[1m[33m0[39m[22m}= ={[1m[33m1[39m[22m}= ={[1m[33m3[39m[22m}= ={[1m[33m4[39m[22m}=[1m[33m [initial][39m[22m[1m[32m [rendered][39m[22m[1m[33m split chunk (cache group: vendor) (name: vendor)[39m[22m
    > ./pageA pageA
    > ./pageB pageB
    2 modules
chunk    {[1m[33m3[39m[22m} [1m[32mpageA.js[39m[22m (pageA) 170 bytes ={[1m[33m0[39m[22m}= ={[1m[33m2[39m[22m}=[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./pageA pageA
 [2] [1m./pageA.js[39m[22m 142 bytes {[1m[33m3[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./pageA[39m[22m  pageA
 [4] [1m./utility1.js[39m[22m 28 bytes {[1m[33m3[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./utility1[39m[22m [2] [1m[35m./pageA.js[39m[22m 2:15-36
chunk    {[1m[33m4[39m[22m} [1m[32mpageB.js[39m[22m (pageB) 142 bytes ={[1m[33m0[39m[22m}= ={[1m[33m1[39m[22m}= ={[1m[33m2[39m[22m}=[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./pageB pageB
 [5] [1m./pageB.js[39m[22m 142 bytes {[1m[33m4[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./pageB[39m[22m  pageB
chunk    {[1m[33m5[39m[22m} [1m[32mpageC.js[39m[22m (pageC) 105 bytes ={[1m[33m0[39m[22m}= ={[1m[33m1[39m[22m}=[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./pageC pageC
 [7] [1m./pageC.js[39m[22m 105 bytes {[1m[33m5[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./pageC[39m[22m  pageC
```
