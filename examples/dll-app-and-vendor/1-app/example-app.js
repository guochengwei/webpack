/*import { square } from "example-vendor";
console.log(square(7));*/

setTimeout(() => {
	import(/* webpackChunkName: "example-vendor" */ 'echarts.dll').then((square) => {
	})

/*	import(/!* webpackChunkName: "example-vendor" *!/ 'example-vendor2').then((square) => {
	})*/
}, 2000)
// import { square } from "example-vendor";

/*import(/!* webpackChunkName: "test1" *!/ './test1.js').then((log) => {
})
import(/!* webpackChunkName: "test1" *!/ './test1-2.js').then((log) => {
})*/
/*
import(/!* webpackChunkName: "test2" *!/ './test2.js').then((log) => {
})
import(/!* webpackChunkName: "test2" *!/ './test2-1.js').then((log) => {
})*/
