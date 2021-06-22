var JSDOM = require('jsdom').JSDOM;

function makeDocument(fragment) {
    var dom = new JSDOM('<!DOCTYPE html>' + fragment);
    return dom.window.document;
}

module.exports = makeDocument;
