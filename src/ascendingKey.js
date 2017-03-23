export default function(key) {
  return typeof key == 'function' ? function (a, b) {
    return key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : key(a) >= key(b) ? 0 : NaN;
  } : function (a, b) {
    return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : a[key] >= b[key] ? 0 : NaN;
  };
}
