export default function(key) {
  return typeof key == 'function' ? function (a, b) {
    return key(b) < key(a) ? -1 : key(b) > key(a) ? 1 : key(b) >= key(a) ? 0 : NaN;
  } : function (a, b) {
    return b[key] < a[key] ? -1 : b[key] > a[key] ? 1 : b[key] >= a[key] ? 0 : NaN;
  };
}
