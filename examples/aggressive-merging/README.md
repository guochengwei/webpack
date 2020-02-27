# pageA.js

```javascript
require(["./common"], function(common) {
	common(require("./a"));
});
```

# pageB.js

```javascript
require(["./common"], function(common) {
	common(require("./b"));
});
```

# pageC.js

```javascript
require(["./a"], function(a) {
	console.log(a + require("./b"));
});
```

# common.js

a big file...

# webpack.config.js

```javascript
var path = require("path");
var AggressiveMergingPlugin = require("../../lib/optimize/AggressiveMergingPlugin");
module.exports = {
	// mode: "development" || "production",
	entry: {
		pageA: "./pageA",
		pageB: "./pageB",
		pageC: "./pageC"
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].bundle.js",
		chunkFilename: "[id].chunk.js"
	},
	plugins: [
		new AggressiveMergingPlugin({
			minSizeReduce: 1.5
		})
	],
	optimization: {
		occurrenceOrder: true // To keep filename consistent between different modes (for example building only)
	}
};
```

# Info

## Unoptimized

```
Hash: [1m7ece53f9a3ea7cbd67b3[39m[22m
Version: webpack [1m4.39.2[39m[22m
Time: [1m249[39m[22mms
          [1mAsset[39m[22m       [1mSize[39m[22m  [1mChunks[39m[22m  [1m[39m[22m           [1m[39m[22m[1mChunk Names[39m[22m
     [1m[32m0.chunk.js[39m[22m   5.98 KiB       [1m0[39m[22m  [1m[32m[emitted][39m[22m  
     [1m[32m4.chunk.js[39m[22m  405 bytes       [1m4[39m[22m  [1m[32m[emitted][39m[22m  
[1m[32mpageA.bundle.js[39m[22m    8.5 KiB       [1m1[39m[22m  [1m[32m[emitted][39m[22m  pageA
[1m[32mpageB.bundle.js[39m[22m    8.5 KiB       [1m2[39m[22m  [1m[32m[emitted][39m[22m  pageB
[1m[32mpageC.bundle.js[39m[22m    8.5 KiB       [1m3[39m[22m  [1m[32m[emitted][39m[22m  pageC
Entrypoint [1mpageA[39m[22m = [1m[32mpageA.bundle.js[39m[22m
Entrypoint [1mpageB[39m[22m = [1m[32mpageB.bundle.js[39m[22m
Entrypoint [1mpageC[39m[22m = [1m[32mpageC.bundle.js[39m[22m
chunk    {[1m[33m0[39m[22m} [1m[32m0.chunk.js[39m[22m 5.46 KiB <{[1m[33m1[39m[22m}> <{[1m[33m2[39m[22m}>[1m[32m [rendered][39m[22m
    > ./common [3] [1m./pageA.js[39m[22m 1:0-3:2
    > ./common [4] [1m./pageB.js[39m[22m 1:0-3:2
 [0] [1m./a.js[39m[22m 21 bytes {[1m[33m0[39m[22m} {[1m[33m4[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./a[39m[22m [3] [1m[35m./pageA.js[39m[22m 2:8-22
     amd require [1m[36m./a[39m[22m [5] [1m[35m./pageC.js[39m[22m 1:0-3:2
 [1] [1m./b.js[39m[22m 21 bytes {[1m[33m0[39m[22m} {[1m[33m4[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./b[39m[22m [4] [1m[35m./pageB.js[39m[22m 2:8-22
     cjs require [1m[36m./b[39m[22m [5] [1m[35m./pageC.js[39m[22m 2:17-31
 [2] [1m./common.js[39m[22m 5.42 KiB {[1m[33m0[39m[22m}[1m[32m [built][39m[22m
     amd require [1m[36m./common[39m[22m [3] [1m[35m./pageA.js[39m[22m 1:0-3:2
     amd require [1m[36m./common[39m[22m [4] [1m[35m./pageB.js[39m[22m 1:0-3:2
chunk    {[1m[33m1[39m[22m} [1m[32mpageA.bundle.js[39m[22m (pageA) 71 bytes >{[1m[33m0[39m[22m}<[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./pageA pageA
 [3] [1m./pageA.js[39m[22m 71 bytes {[1m[33m1[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./pageA[39m[22m  pageA
chunk    {[1m[33m2[39m[22m} [1m[32mpageB.bundle.js[39m[22m (pageB) 71 bytes >{[1m[33m0[39m[22m}<[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./pageB pageB
 [4] [1m./pageB.js[39m[22m 71 bytes {[1m[33m2[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./pageB[39m[22m  pageB
chunk    {[1m[33m3[39m[22m} [1m[32mpageC.bundle.js[39m[22m (pageC) 70 bytes >{[1m[33m4[39m[22m}<[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./pageC pageC
 [5] [1m./pageC.js[39m[22m 70 bytes {[1m[33m3[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./pageC[39m[22m  pageC
chunk    {[1m[33m4[39m[22m} [1m[32m4.chunk.js[39m[22m 42 bytes <{[1m[33m3[39m[22m}>[1m[32m [rendered][39m[22m
    > ./a [5] [1m./pageC.js[39m[22m 1:0-3:2
 [0] [1m./a.js[39m[22m 21 bytes {[1m[33m0[39m[22m} {[1m[33m4[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./a[39m[22m [3] [1m[35m./pageA.js[39m[22m 2:8-22
     amd require [1m[36m./a[39m[22m [5] [1m[35m./pageC.js[39m[22m 1:0-3:2
 [1] [1m./b.js[39m[22m 21 bytes {[1m[33m0[39m[22m} {[1m[33m4[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./b[39m[22m [4] [1m[35m./pageB.js[39m[22m 2:8-22
     cjs require [1m[36m./b[39m[22m [5] [1m[35m./pageC.js[39m[22m 2:17-31
```

## Production mode

```
Hash: [1m655252a88c5284a5376d[39m[22m
Version: webpack [1m4.39.2[39m[22m
Time: [1m1152[39m[22mms
          [1mAsset[39m[22m       [1mSize[39m[22m  [1mChunks[39m[22m  [1m[39m[22m           [1m[39m[22m[1mChunk Names[39m[22m
     [1m[32m0.chunk.js[39m[22m  173 bytes    [1m0, 4[39m[22m  [1m[32m[emitted][39m[22m  
     [1m[32m4.chunk.js[39m[22m  118 bytes       [1m4[39m[22m  [1m[32m[emitted][39m[22m  
[1m[32mpageA.bundle.js[39m[22m   2.11 KiB       [1m1[39m[22m  [1m[32m[emitted][39m[22m  pageA
[1m[32mpageB.bundle.js[39m[22m   2.11 KiB       [1m2[39m[22m  [1m[32m[emitted][39m[22m  pageB
[1m[32mpageC.bundle.js[39m[22m   2.12 KiB       [1m3[39m[22m  [1m[32m[emitted][39m[22m  pageC
Entrypoint [1mpageA[39m[22m = [1m[32mpageA.bundle.js[39m[22m
Entrypoint [1mpageB[39m[22m = [1m[32mpageB.bundle.js[39m[22m
Entrypoint [1mpageC[39m[22m = [1m[32mpageC.bundle.js[39m[22m
chunk    {[1m[33m0[39m[22m} [1m[32m0.chunk.js[39m[22m 5.46 KiB <{[1m[33m1[39m[22m}> <{[1m[33m2[39m[22m}>[1m[32m [rendered][39m[22m
    > ./common [3] [1m./pageA.js[39m[22m 1:0-3:2
    > ./common [4] [1m./pageB.js[39m[22m 1:0-3:2
 [0] [1m./a.js[39m[22m 21 bytes {[1m[33m0[39m[22m} {[1m[33m4[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./a[39m[22m [3] [1m[35m./pageA.js[39m[22m 2:8-22
     amd require [1m[36m./a[39m[22m [5] [1m[35m./pageC.js[39m[22m 1:0-3:2
 [1] [1m./b.js[39m[22m 21 bytes {[1m[33m0[39m[22m} {[1m[33m4[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./b[39m[22m [4] [1m[35m./pageB.js[39m[22m 2:8-22
     cjs require [1m[36m./b[39m[22m [5] [1m[35m./pageC.js[39m[22m 2:17-31
 [2] [1m./common.js[39m[22m 5.42 KiB {[1m[33m0[39m[22m}[1m[32m [built][39m[22m
     amd require [1m[36m./common[39m[22m [3] [1m[35m./pageA.js[39m[22m 1:0-3:2
     amd require [1m[36m./common[39m[22m [4] [1m[35m./pageB.js[39m[22m 1:0-3:2
chunk    {[1m[33m1[39m[22m} [1m[32mpageA.bundle.js[39m[22m (pageA) 71 bytes >{[1m[33m0[39m[22m}<[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./pageA pageA
 [3] [1m./pageA.js[39m[22m 71 bytes {[1m[33m1[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./pageA[39m[22m  pageA
chunk    {[1m[33m2[39m[22m} [1m[32mpageB.bundle.js[39m[22m (pageB) 71 bytes >{[1m[33m0[39m[22m}<[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./pageB pageB
 [4] [1m./pageB.js[39m[22m 71 bytes {[1m[33m2[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./pageB[39m[22m  pageB
chunk    {[1m[33m3[39m[22m} [1m[32mpageC.bundle.js[39m[22m (pageC) 70 bytes >{[1m[33m4[39m[22m}<[1m[33m [entry][39m[22m[1m[32m [rendered][39m[22m
    > ./pageC pageC
 [5] [1m./pageC.js[39m[22m 70 bytes {[1m[33m3[39m[22m}[1m[32m [built][39m[22m
     single entry [1m[36m./pageC[39m[22m  pageC
chunk    {[1m[33m4[39m[22m} [1m[32m4.chunk.js[39m[22m 42 bytes <{[1m[33m3[39m[22m}>[1m[32m [rendered][39m[22m
    > ./a [5] [1m./pageC.js[39m[22m 1:0-3:2
 [0] [1m./a.js[39m[22m 21 bytes {[1m[33m0[39m[22m} {[1m[33m4[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./a[39m[22m [3] [1m[35m./pageA.js[39m[22m 2:8-22
     amd require [1m[36m./a[39m[22m [5] [1m[35m./pageC.js[39m[22m 1:0-3:2
 [1] [1m./b.js[39m[22m 21 bytes {[1m[33m0[39m[22m} {[1m[33m4[39m[22m}[1m[32m [built][39m[22m
     cjs require [1m[36m./b[39m[22m [4] [1m[35m./pageB.js[39m[22m 2:8-22
     cjs require [1m[36m./b[39m[22m [5] [1m[35m./pageC.js[39m[22m 2:17-31
```
