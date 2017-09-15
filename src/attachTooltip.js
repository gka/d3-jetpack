import {select} from 'd3-selection';
import {selectAll} from 'd3-selection';
import {event as d3event} from 'd3-selection';
import {keys as d3keys} from 'd3-collection';
import clamp from './clamp'

export default function(sel, tooltipSel, fieldFns){
  if (!sel.size()) return;

  tooltipSel = tooltipSel || select('.tooltip');

  sel 
      .on('mouseover.attachTooltip', ttDisplay)
      .on('mousemove.attachTooltip', ttMove)
      .on('mouseout.attachTooltip',  ttHide)
      .on('click.attachTooltip', function(d){ console.log(d); });

  var d = sel.datum();
  fieldFns = fieldFns || d3keys(d)
      .filter(function(str){
        return (typeof d[str] != 'object') && (d[str] != 'array');
      })
      .map(function(str){
        return function(d){ return str + ': <b>' + d[str] + '</b>'; };
      });

  function ttDisplay(d){
    tooltipSel
        .classed('tooltip-hidden', false)
        .html('')
      .appendMany(fieldFns, 'div')
        .html(function(fn){ return fn(d); });

    select(this).classed('tooltipped', true);
  }

  function ttMove(d){
    if (!tooltipSel.size()) return;

    var e = d3event,
        x = e.clientX,
        y = e.clientY,
        bb = tooltipSel.node().getBoundingClientRect(),
        left = clamp(20, (x-bb.width/2), window.innerWidth - bb.width - 20),
        top = innerHeight > y + 20 + bb.height ? y + 20 : y - bb.height - 20;

    tooltipSel
      .style('left', left +'px')
      .style('top', top + 'px');
  }

  function ttHide(d){
    tooltipSel.classed('tooltip-hidden', true);

    selectAll('.tooltipped').classed('tooltipped', false);
  }
}
