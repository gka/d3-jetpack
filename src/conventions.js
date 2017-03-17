import {axisLeft} from 'd3-axis';
import {axisBottom} from 'd3-axis';
import {select} from "d3-selection";
import {scaleLinear} from "d3-scale";

export default function(c){
  c = c || {}

  c.margin = c.margin || {top: 20, right: 20, bottom: 20, left: 20}
  ;['top', 'right', 'bottom', 'left'].forEach(function(d){
    if (!c.margin[d] && c.margin[d] != 0) c.margin[d] = 20 
  })

  c.width  = c.width  || c.totalWidth  - c.margin.left - c.margin.right || 900
  c.height = c.height || c.totalHeight - c.margin.top - c.margin.bottom || 460

  c.totalWidth = c.width + c.margin.left + c.margin.right
  c.totalHeight = c.height + c.margin.top + c.margin.bottom

  c.parentSel = c.parentSel || select('body')

  c.rootsvg = c.parentSel.append('svg')

  c.svg = c.rootsvg
      .attr('width', c.totalWidth)
      .attr('height', c.totalHeight)
    .append('g')
      .attr('transform', 'translate(' + c.margin.left + ',' + c.margin.top + ')')

  c.x = c.x || scaleLinear().range([0, c.width])
  c.y = c.y || scaleLinear().range([c.height, 0])

  c.xAxis = c.xAxis || axisBottom().scale(c.x)
  c.yAxis = c.yAxis || axisLeft().scale(c.y)

  c.drawAxis = function(){
    c.svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + c.height + ')')
        .call(c.xAxis);

    c.svg.append('g')
        .attr('class', 'y axis')
        .call(c.yAxis);
  }
  
  return c
}
