export default function(xy) {
  return this.style('transform', function(d,i) {
    var p = typeof xy == 'function' ? xy.call(this, d,i) : xy
    return 'translate(' + p[0] + 'px, ' + p[1] + 'px)';
  });
}
