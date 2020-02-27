/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const Dependency = require("../Dependency");

class DllEntryDependency extends Dependency {
	constructor(dependencies, name, async) {
		super();
		this.dependencies = dependencies;
		this.name = name;
		this.async = async;
	}

	get type() {
		return "dll entry";
	}
}

module.exports = DllEntryDependency;
