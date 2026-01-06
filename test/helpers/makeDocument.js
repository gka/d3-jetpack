import {JSDOM} from 'jsdom';

export default function makeDocument(fragment = '') {
  var dom = new JSDOM('<!DOCTYPE html>' + fragment);
  return dom.window.document;
}
