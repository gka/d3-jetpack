export default function(xy, dim) {
  return this.node().getBBox ?
    this.attr('transform', function(d,i) {
      var p = typeof xy == 'function' ? xy.call(this, d,i) : xy;
      if (dim === 0) p = [p, 0]; else if (dim === 1) p = [0, p];
      return 'translate(' + p[0] +','+ p[1]+')';
    }) :
    this.style('transform', function(d,i) {
      var p = typeof xy == 'function' ? xy.call(this, d,i) : xy;
      if (dim === 0) p = [p, 0]; else if (dim === 1) p = [0, p];
      return 'translate(' + p[0] +'px,'+ p[1]+'px)';
    });
}
