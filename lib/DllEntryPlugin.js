/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const DllEntryDependency = require("./dependencies/DllEntryDependency");
const SingleEntryDependency = require("./dependencies/SingleEntryDependency");
const DllModuleFactory = require("./DllModuleFactory");
const ImportDependenciesBlock = require("./dependencies/ImportDependenciesBlock");

class DllEntryPlugin {
	constructor(context, entries, name, options) {
		this.context = context;
		this.entries = entries;
		this.name = name;
		// this.asyncChunk = asyncChunk;
		this.options = options;
	}

	get asyncChunk() {
		return (
			this.options.asyncChunks && this.options.asyncChunks.includes(this.name)
		);
	}

	apply(compiler) {
		compiler.hooks.compilation.tap(
			"DllEntryPlugin",
			(compilation, { normalModuleFactory }) => {
				const dllModuleFactory = new DllModuleFactory();
				compilation.dependencyFactories.set(
					DllEntryDependency,
					dllModuleFactory
				);
				compilation.dependencyFactories.set(
					SingleEntryDependency,
					normalModuleFactory
				);
			}
		);
		compiler.hooks.make.tapAsync("DllEntryPlugin", (compilation, callback) => {
			compilation.hooks.succeedEntry.tap(
				"DllEntryPlugin",
				(entry, name, dllModule) => {
					if (entry.async) {
						dllModule.dependencies
							.filter(item => item instanceof SingleEntryDependency)
							.forEach((dependency, idx) => {
								const module = dependency.module;
								const depBlock = new ImportDependenciesBlock(
									module.request,
									null,
									{ name: "async-" + this.name, type: "asyncChunk" },
									module,
									{
										name: this.name,
										index: idx
									},
									module
								);
								depBlock.dependencies[0].module = module;
								dllModule.addBlock(depBlock);
								dllModule.dependencies.pop();
							});
					}
				}
			);
			if (this.asyncChunk) {
				compilation.hooks.afterOptimizeChunks.tap("DllEntryPlugin", chunks => {
					const dllEntryChunkGroup = compilation.namedChunkGroups.get(
						this.name
					);
					compilation.chunks = chunks.filter(
						item => !dllEntryChunkGroup.chunks.includes(item)
					);
					const dllAsyncChunkGroup = compilation.namedChunkGroups.get(
						"async-" + this.name
					);
					dllAsyncChunkGroup &&
						dllAsyncChunkGroup.chunks.forEach(chunk => {
							chunk.name = this.name;
						});
				});
				compilation.hooks.beforeChunkAssets.tap("DllEntryPlugin", () => {
					const dllAsyncChunkGroup = compilation.namedChunkGroups.get(
						"async-" + this.name
					);
					dllAsyncChunkGroup &&
						dllAsyncChunkGroup.chunks.forEach(chunk => {
							const name =
								this.options.name &&
								compilation.getPath(this.options.name, {
									hash: compilation.hash,
									chunk
								});
							chunk.id = name;
							chunk.ids = [name];
						});
				});
			}

			compilation.addEntry(
				this.context,
				new DllEntryDependency(
					this.entries.map((e, idx) => {
						const dep = new SingleEntryDependency(e);
						dep.loc = {
							name: this.name,
							index: idx
						};
						return dep;
					}),
					this.name,
					this.asyncChunk
				),
				this.name,
				callback
			);
		});
	}
}

module.exports = DllEntryPlugin;
