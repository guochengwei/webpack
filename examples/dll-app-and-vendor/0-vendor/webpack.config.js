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
		filename: "[name]_[hash].js", // best use [hash] here too
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		// new webpack.HashedModuleIdsPlugin(),
		new webpack.DllPlugin({
			name: "[name]_[hash]",
			path: path.resolve(__dirname, "./dist/[name]-manifest.json"),
			// asyncChunks: ["vendor"]
		})
	]
};
