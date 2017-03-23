import {creator} from "d3-selection";

export default function() {
  var parents = [];
  return this.filter(function() {
    if (parents.indexOf(this.parentNode) > -1) return false;
    parents.push(this.parentNode);
    return true;
  }).select(function() {
    return this.parentNode;
  });
}
