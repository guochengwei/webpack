var path = require('path')
var webpack = require('../../../')

module.exports = {
	// mode: "development" || "production",
	context: __dirname,
	entry: './example-app',
	output: {
		filename: 'app.js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: process.cwd(),
			manifest: require('../0-vendor/echarts/echarts-manifest.json'), // eslint-disable-line,
			asyncChunkPath: '../../0-vendor/echarts/'
		})
	]
}
