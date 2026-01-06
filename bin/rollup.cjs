#!/usr/bin/env node

var rollup = require("rollup"),
    nodeResolve = require("@rollup/plugin-node-resolve").nodeResolve;

rollup.rollup({
  input: "d3-index.js",
  plugins: [nodeResolve({mainFields: ["module", "jsnext:main", "main"]})]
}).then(function(bundle) {
  return bundle.write({
    banner: process.argv[2],
    format: "umd",
    name: "d3",
    file: "build/d3v7+jetpack.js"
  });
}).then(function() {
  console.warn("↳ build/d3v7+jetpack.js");
}).catch(abort);

function abort(error) {
  console.error(error.stack);
}
