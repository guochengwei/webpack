This is the vendor build part.

It's built separately from the app part. The vendors dll is only built when the array of vendors has changed and not during the normal development cycle.

The DllPlugin in combination with the `output.library` option exposes the internal require function as global variable in the target environment.

A manifest is created which includes mappings from module names to internal ids.

### webpack.config.js

```javascript
var path = require("path");
var webpack = require("../../../");
module.exports = {
	// mode: "development || "production",
	context: __dirname,
	entry: {
		vendor: ["example-vendor", "example-vendor2"],
		// vendor: ["example-vendor2"]
	},
	output: {
		filename: "[name].js", // best use [hash] here too
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		// new webpack.HashedModuleIdsPlugin(),
		new webpack.DllPlugin({
			name: "[name]_[hash]",
			path: path.resolve(__dirname, "./dist/[name]-manifest.json"),
			asyncChunks: ["vendor"]
		})
	]
};
```

# example-vendor

```javascript
export function square(n) {
	return n * n;
}
```

# dist/vendor.js

```javascript
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor_350b0c06610fb1884d69"],[
/* 0 */,
/* 1 */
/*!*****************************************!*\
  !*** ../node_modules/example-vendor.js ***!
  \*****************************************/
/*! exports provided: square */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "square", function() { return square; });
function square(n) {
	return n * n;
}


/***/ }),
/* 2 */
/*!******************************************!*\
  !*** ../node_modules/example-vendor2.js ***!
  \******************************************/
/*! exports provided: square2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "square2", function() { return square2; });
function square2 (n) {
	return n * n;
}


/***/ })
]]);
```

# dist/vendor-manifest.json

```javascript
{"name":"vendor_350b0c06610fb1884d69","asyncChunk":true,"content":{"../node_modules/example-vendor.js":{"id":1,"buildMeta":{"exportsType":"namespace","providedExports":["square"]}},"../node_modules/example-vendor2.js":{"id":2,"buildMeta":{"exportsType":"namespace","providedExports":["square2"]}}}}
```

# Info

## Unoptimized

```
Hash: [1m350b0c06610fb1884d69[39m[22m
Version: webpack [1m4.39.2[39m[22m
Time: [1m87[39m[22mms
    [1mAsset[39m[22m      [1mSize[39m[22m                       [1mChunks[39m[22m  [1m[39m[22m           [1m[39m[22m[1mChunk Names[39m[22m
[1m[32mvendor.js[39m[22m  1.04 KiB  [1mvendor_350b0c06610fb1884d69[39m[22m  [1m[32m[emitted][39m[22m  vendor
Entrypoint [1mvendor[39m[22m =
chunk {[1m[33mvendor_350b0c06610fb1884d69[39m[22m} [1m[32mvendor.js[39m[22m (vendor) 95 bytes <{[1m[33m[39m[22m}>[1m[32m [rendered][39m[22m
    > (webpack)\examples\dll-app-and-vendor\node_modules\example-vendor.js [0] vendor[0]
    > (webpack)\examples\dll-app-and-vendor\node_modules\example-vendor2.js [0] vendor[1]
    2 modules
```

## Production mode

```
Hash: [1m9bf4fa80b8bf1b792134[39m[22m
Version: webpack [1m4.39.2[39m[22m
Time: [1m100[39m[22mms
    [1mAsset[39m[22m       [1mSize[39m[22m                       [1mChunks[39m[22m  [1m[39m[22m           [1m[39m[22m[1mChunk Names[39m[22m
[1m[32mvendor.js[39m[22m  288 bytes  [1mvendor_9bf4fa80b8bf1b792134[39m[22m  [1m[32m[emitted][39m[22m  vendor
Entrypoint [1mvendor[39m[22m =
chunk {[1m[33mvendor_9bf4fa80b8bf1b792134[39m[22m} [1m[32mvendor.js[39m[22m (vendor) 95 bytes <{[1m[33m[39m[22m}>[1m[32m [rendered][39m[22m
    > (webpack)\examples\dll-app-and-vendor\node_modules\example-vendor.js [0] vendor[0]
    > (webpack)\examples\dll-app-and-vendor\node_modules\example-vendor2.js [0] vendor[1]
    2 modules
```
