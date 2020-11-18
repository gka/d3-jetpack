export default function(lines, lh) {
  return this.selectAll('tspan')
      .data(function(d, i) {
        return (typeof(lines) === 'function' ? lines.call(this, d, i) : lines)
          .map(function(l) {
            return { line: l, parent: d };
          });
      })
      .enter()
    .append('tspan')
      .text(function(d) { return d.line; })
      .attr('x', 0)
      .attr('dy', function(d, i) { return i ? (typeof(lh) === 'function' ? lh.call(this, d.parent, d.line, i) : lh) || 15 : 0; });
}
