/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const parseJson = require("json-parse-better-errors");
const DelegatedSourceDependency = require("./dependencies/DelegatedSourceDependency");
const DelegatedModuleFactoryPlugin = require("./DelegatedModuleFactoryPlugin");
const ExternalModuleFactoryPlugin = require("./ExternalModuleFactoryPlugin");
const DelegatedExportsDependency = require("./dependencies/DelegatedExportsDependency");
const NullFactory = require("./NullFactory");
const makePathsRelative = require("./util/identifier").makePathsRelative;
const WebpackError = require("./WebpackError");
const Template = require("./Template");

const validateOptions = require("schema-utils");
const schema = require("../schemas/plugins/DllReferencePlugin.json");

/** @typedef {import("../declarations/plugins/DllReferencePlugin").DllReferencePluginOptions} DllReferencePluginOptions */
/** @typedef {import("../declarations/plugins/DllReferencePlugin").DllReferencePluginOptionsManifest} DllReferencePluginOptionsManifest */

class DllReferencePlugin {
	/**
	 * @param {DllReferencePluginOptions} options options object
	 */
	constructor(options) {
		validateOptions(schema, options, "Dll Reference Plugin");
		this.options = options;
	}

	apply(compiler) {
		compiler.hooks.compilation.tap(
			"DllReferencePlugin",
			(compilation, { normalModuleFactory }) => {
				compilation.dependencyFactories.set(
					DelegatedSourceDependency,
					normalModuleFactory
				);
				compilation.dependencyFactories.set(
					DelegatedExportsDependency,
					new NullFactory()
				);
			}
		);

		compiler.hooks.beforeCompile.tapAsync(
			"DllReferencePlugin",
			(params, callback) => {
				if ("manifest" in this.options) {
					const manifest = this.options.manifest;
					if (typeof manifest === "string") {
						params.compilationDependencies.add(manifest);
						compiler.inputFileSystem.readFile(manifest, (err, result) => {
							if (err) return callback(err);
							// Catch errors parsing the manifest so that blank
							// or malformed manifest files don't kill the process.
							try {
								params["dll reference " + manifest] = parseJson(
									result.toString("utf-8")
								);
							} catch (e) {
								// Store the error in the params so that it can
								// be added as a compilation error later on.
								const manifestPath = makePathsRelative(
									compiler.options.context,
									manifest
								);
								params[
									"dll reference parse error " + manifest
								] = new DllManifestError(manifestPath, e.message);
							}
							return callback();
						});
						return;
					}
				}
				return callback();
			}
		);

		compiler.hooks.compile.tap("DllReferencePlugin", params => {
			let name = this.options.name;
			let sourceType = this.options.sourceType;
			let content =
				"content" in this.options ? this.options.content : undefined;
			let asyncChunk;
			if ("manifest" in this.options) {
				let manifestParameter = this.options.manifest;
				let manifest;
				if (typeof manifestParameter === "string") {
					// If there was an error parsing the manifest
					// file, exit now because the error will be added
					// as a compilation error in the "compilation" hook.
					if (params["dll reference parse error " + manifestParameter]) {
						return;
					}
					manifest =
						/** @type {DllReferencePluginOptionsManifest} */ (params[
							"dll reference " + manifestParameter
						]);
				} else {
					manifest = manifestParameter;
				}
				if (manifest) {
					if (!name) name = manifest.name;
					if (!sourceType) sourceType = manifest.type;
					if (!content) content = manifest.content;
					asyncChunk = manifest.asyncChunk;
				}
			}
			const externals = {};
			const source = "dll-reference " + name;
			externals[source] = name;
			const normalModuleFactory = params.normalModuleFactory;
			if (!asyncChunk) {
				new ExternalModuleFactoryPlugin(sourceType || "var", externals).apply(
					normalModuleFactory
				);
			}
			new DelegatedModuleFactoryPlugin({
				source: source,
				type: this.options.type,
				scope: this.options.scope,
				context: this.options.context || compiler.options.context,
				content,
				extensions: this.options.extensions,
				asyncChunk
			}).apply(normalModuleFactory);
		});

		compiler.hooks.compilation.tap(
			"DllReferencePlugin",
			(compilation, params) => {
				if ("manifest" in this.options) {
					let manifestParameter = this.options.manifest;
					let manifest;
					if (typeof manifest === "string") {
						// If there was an error parsing the manifest file, add the
						// error as a compilation error to make the compilation fail.
						let e = params["dll reference parse error " + manifest];
						if (e) {
							compilation.errors.push(e);
						}
						manifest =
							/** @type {DllReferencePluginOptionsManifest} */ (params[
								"dll reference " + manifestParameter
							]);
					} else {
						manifest = manifestParameter;
					}
					if (manifest.asyncChunk) {
						compilation.hooks.afterOptimizeDependencies.tap(
							"DllReferencePlugin",
							modules => {
								modules[0].blocks.forEach(block => {
									block.chunkName = this.options.asyncChunkPath + manifest.name;
								});
							}
						);
						compilation.hooks.afterOptimizeChunkIds.tap(
							"DllReferencePlugin",
							chunks => {
								const dllReferenceChunkGroup = compilation.namedChunkGroups.get(
									this.options.asyncChunkPath + manifest.name
								);
								if (dllReferenceChunkGroup) {
									dllReferenceChunkGroup.chunks.forEach(chunk => {
										chunk.id = manifest.name;
										chunk.ids = [manifest.name];
										/*chunk.modulesIterable.forEach(module => {
									module.id = manifest.content[module.userRequest].id;
								});*/
									});
									compilation.chunks = chunks.filter(
										item => !dllReferenceChunkGroup.chunks.includes(item)
									);
								}
							}
						);
					}
				}
			}
		);
	}
}

class DllManifestError extends WebpackError {
	constructor(filename, message) {
		super();

		this.name = "DllManifestError";
		this.message = `Dll manifest ${filename}\n${message}`;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = DllReferencePlugin;
