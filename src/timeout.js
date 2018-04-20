import {timeout} from "d3-timer";

var prev = {}

export default function(fn, delay, time, name){
  if (prev[name]) prev[name].stop()

  var newTimer = timeout(fn, delay, time, name)
  if (name) prev[name] = newTimer

  return newTimer
}
