import {queue} from 'd3-queue';
import {csv, tsv, json} from 'd3-request';

export default function(){
  var q = queue();
  
  var args = [].slice.call(arguments);
  var files = args.slice(0, args.length - 1);
  var cb = args[args.length - 1];

  files.forEach(function(d){
    var type = d.split('?')[0].split('.').reverse()[0];

    var loadFn = {csv: csv, tsv: tsv, json: json}[type];
    if (!loadFn) return cb(new Error('Invalid type', d));
    q.defer(loadFn, d) ;
  });
  q.awaitAll(cb);
}
