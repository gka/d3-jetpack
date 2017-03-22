import {creator} from "d3-selection";
import parseAttributes from "./parseAttributes";

export default function(name) {
  var n = parseAttributes(name), s;
  name = creator(n.tag);
  s = this.select(function() {
    return this.appendChild(name.apply(this, arguments));
  });

  //attrs not provided by default in v4
  for (var key in n.attr) { s.attr(key, n.attr[key]); }
  return s;
}
