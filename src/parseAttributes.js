export default function(name) {
  if (typeof name === "string") {
    var attr = {},
      parts = name.split(/([\.#])/g), p;
      name = parts.shift();
    while ((p = parts.shift())) {
      if (p == '.') attr['class'] = attr['class'] ? attr['class'] + ' ' + parts.shift() : parts.shift();
      else if (p == '#') attr.id = parts.shift();
    }
    return {tag: name, attr: attr};
  }
  return name;
}