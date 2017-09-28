export default function(c){
  var xAxisSel = c.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + c.height + ')')
      .call(c.xAxis);

  var yAxisSel = c.svg.append('g')
      .attr('class', 'y axis')
      .call(c.yAxis);

  return {xAxisSel: xAxisSel, yAxisSel: yAxisSel}
}
