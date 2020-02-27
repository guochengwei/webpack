# example.js

```javascript
console.log(require("./cup1"));
```

# cup1.coffee

```coffee-script
module.exports =
	cool: "stuff"
	answer: 42
	external: require "./cup2.coffee"
	again: require "./cup2"
```

# cup2.coffee

```coffee-script
console.log "yeah coffee-script"

module.exports = 42
```

# dist/output.js

<details><summary><code>/******/ (function(modules) { /* webpackBootstrap */ })</code></summary>

```javascript
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
```

</details>

```javascript
/******/ ([
/* 0 */
/*!********************!*\
  !*** ./example.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

console.log(__webpack_require__(/*! ./cup1 */ 1));

/***/ }),
/* 1 */
/*!*********************!*\
  !*** ./cup1.coffee ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  cool: "stuff",
  answer: 42,
  external: __webpack_require__(/*! ./cup2.coffee */ 2),
  again: __webpack_require__(/*! ./cup2 */ 2)
};


/***/ }),
/* 2 */
/*!*********************!*\
  !*** ./cup2.coffee ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

console.log("yeah coffee-script");

module.exports = 42;


/***/ })
/******/ ]);
```

# Info

## Unoptimized

```
Hash: [1me51711b99ce71779ff80[39m[22m
Version: webpack [1m4.39.2[39m[22m
Time: [1m419[39m[22mms
    [1mAsset[39m[22m      [1mSize[39m[22m  [1mChunks[39m[22m  [1m[39m[22m           [1m[39m[22m[1mChunk Names[39m[22m
[1m[32moutput.js[39m[22m  4.31 KiB       [1m0[39m[22m  [1m[32m[emitted][39m[22m  main
Entrypoint [1mmain[39m[22m = [1m[32moutput.js[39m[22m
chunk    {[1m[33m0[39m[22m} [1m[32moutput.js[39m[22m (main) 206 bytes[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./example.js main
 [0] [1m./example.js[39m[22m 31 bytes {[1m[33m0[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./example.js[39m[22m  main
 [1] [1m./cup1.coffee[39m[22m 118 bytes {[1m[33m0[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./cup1[39m[22m [0] [1m[35m./example.js[39m[22m 1:12-29
 [2] [1m./cup2.coffee[39m[22m 57 bytes {[1m[33m0[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./cup2.coffee[39m[22m [1] [1m[35m./cup1.coffee[39m[22m 4:12-36
     cjs require [1m[36m./cup2[39m[22m [1] [1m[35m./cup1.coffee[39m[22m 5:9-26
```

## Production mode

```
Hash: [1m5ebaad2596bd79be2c8d[39m[22m
Version: webpack [1m4.39.2[39m[22m
Time: [1m790[39m[22mms
    [1mAsset[39m[22m      [1mSize[39m[22m  [1mChunks[39m[22m  [1m[39m[22m           [1m[39m[22m[1mChunk Names[39m[22m
[1m[32moutput.js[39m[22m  1.07 KiB       [1m0[39m[22m  [1m[32m[emitted][39m[22m  main
Entrypoint [1mmain[39m[22m = [1m[32moutput.js[39m[22m
chunk    {[1m[33m0[39m[22m} [1m[32moutput.js[39m[22m (main) 206 bytes[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./example.js main
 [0] [1m./cup2.coffee[39m[22m 57 bytes {[1m[33m0[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./cup2.coffee[39m[22m [2] [1m[35m./cup1.coffee[39m[22m 4:12-36
     cjs require [1m[36m./cup2[39m[22m [2] [1m[35m./cup1.coffee[39m[22m 5:9-26
 [1] [1m./example.js[39m[22m 31 bytes {[1m[33m0[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./example.js[39m[22m  main
 [2] [1m./cup1.coffee[39m[22m 118 bytes {[1m[33m0[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./cup1[39m[22m [1] [1m[35m./example.js[39m[22m 1:12-29
```
