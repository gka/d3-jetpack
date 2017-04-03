import {creator, selector} from "d3-selection";
import parseAttributes from "./parseAttributes";

function constantNull() {
  return null;
}

export default function(name, before) {
  var n = parseAttributes(name),
      create = creator(n.tag),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);

  var s = this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });


  //attrs not provided by default in v4
  for (var key in n.attr) { s.attr(key, n.attr[key]); }
  return s;
}