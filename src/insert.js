import {creator} from "d3-selection";
import parseAttributes from "./parseAttributes";

export default function(name, before) {
  var n = parseAttributes(name), s;
  name = creator(n.tag);
  before = creator(before);

  s = this.select(function() {
      return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments) || null);
  });

  //attrs not provided by default in v4
  for (var key in n.attr) { s.attr(key, n.attr[key]); }
  return s;
}
