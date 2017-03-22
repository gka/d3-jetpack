import {nest} from 'd3-collection';

export default function(array, key){
  return nest().key(key).entries(array).map(function(d){
    d.values.key = d.key;
    return d.values;
  });
}
