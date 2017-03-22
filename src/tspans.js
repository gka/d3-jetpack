export default function(lines, lh) {
  return this.selectAll('tspan')
      .data(function(d) {
        return (typeof(lines) == 'function' ? lines(d) : lines)
          .map(function(l) {
            return { line: l, parent: d };
          });
      })
      .enter()
    .append('tspan')
      .text(function(d) { return d.line; })
      .attr('x', 0)
      .attr('dy', function(d, i) { return i ? (typeof(lh) == 'function' ? lh(d.parent, d.line, i) : lh) || 15 : 0; });
}
