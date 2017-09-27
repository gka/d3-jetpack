import {axisLeft} from 'd3-axis';
import {axisBottom} from 'd3-axis';
import {select} from "d3-selection";
import {scaleLinear} from "d3-scale";

export default function(c){
  c = c || {};

  c.margin = c.margin || {}
  ;['top', 'right', 'bottom', 'left'].forEach(function(d){
    if (!c.margin[d] && c.margin[d] !== 0) c.margin[d] = 20 ;
  });

  if (c.parentSel) c.sel = c.parentSel // backwords comp
  var node = c.sel && c.sel.node()

  c.totalWidth  = c.totalWidth  || node && node.offsetWidth  || 960;
  c.totalHeight = c.totalHeight || node && node.offsetHeight || 500;

  c.width  = c.width  || c.totalWidth  - c.margin.left - c.margin.right;
  c.height = c.height || c.totalHeight - c.margin.top - c.margin.bottom;

  c.totalWidth = c.width + c.margin.left + c.margin.right;
  c.totalHeight = c.height + c.margin.top + c.margin.bottom;

  c.sel = c.sel || select('body');
  c.sel.st({position: 'relative', height: c.totalHeight, width: c.totalWidth})

  c.x = c.x || scaleLinear().range([0, c.width]);
  c.y = c.y || scaleLinear().range([c.height, 0]);

  c.xAxis = c.xAxis || axisBottom().scale(c.x);
  c.yAxis = c.yAxis || axisLeft().scale(c.y);

  c.layers = (c.layers || 's').split('').map(function(type){
    var layer
    if (type == 's'){
      layer = c.sel.append('svg')
          .st({position: 'absolute'})
          .attr('width', c.totalWidth)
          .attr('height', c.totalHeight)
        .append('g')
          .attr('transform', 'translate(' + c.margin.left + ',' + c.margin.top + ')');

      if (!c.svg) c.svg = layer // defaults to lowest svg layer 
    } else if (type == 'c'){
      var s = window.devicePixelRatio || 1

      layer = c.sel.append('canvas')
        .at({width: c.totalWidth*s, height: c.totalHeight*s})
        .st({width: c.totalWidth, height: c.totalHeight})
        .st({position: 'absolute'})
        .node().getContext('2d')
      layer.scale(s, s)
      layer.translate(c.margin.left, c.margin.right)
    } else if (type == 'd'){
      layer = c.sel.append('div')
        .st({
          position: 'absolute', 
          left: c.margin.left,
          top: c.margin.top,
          width: c.width,
          height: c.height
        });
    }

    return layer
  })

  return c;
}
