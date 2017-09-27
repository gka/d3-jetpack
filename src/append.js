import {creator} from "d3-selection";
import parseAttributes from "./parseAttributes";

export default function(name) {
  var create, n;

  if (typeof name === "function"){
    create = name;
  } else {
    n = parseAttributes(name)
    create = creator(n.tag);
  }
  var sel = this.select(function(){
    return this.appendChild(create.apply(this, arguments));
  });

  if (n) for (var key in n.attr) { sel.attr(key, n.attr[key]); }
  return sel;
}

