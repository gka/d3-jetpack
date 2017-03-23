export default function(xy) {
  return this.attr('transform', function(d,i) {
    return 'translate('+[typeof xy == 'function' ? xy.call(this, d,i) : xy]+')';
  });
}
