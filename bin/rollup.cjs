#!/usr/bin/env node

var rollup = require("rollup"),
    ascii = require("rollup-plugin-ascii"),
    nodeResolve = require("rollup-plugin-node-resolve");

rollup.rollup({
  entry: "d3-index.js",
  plugins: [nodeResolve({jsnext: true}), ascii()]
}).then(function(bundle) {
  return bundle.write({
    banner: process.argv[2],
    format: "umd",
    moduleName: "d3",
    dest: "build/d3v4+jetpack.js"
  });
}).then(function() {
  console.warn("↳ build/d3v4+jetpack.js");
}).catch(abort);

function abort(error) {
  console.error(error.stack);
}
