function f(){
  var functions = arguments;
  
  //convert all string arguments into field accessors
  var i = 0, l = functions.length;
  while (i < l) {
    if (typeof(functions[i]) === 'string' || typeof(functions[i]) === 'number'){
      functions[i] = (function(str){ return function(d){ return d[str]; }; })(functions[i]);
    }
    i++;
  }

   //return composition of functions
  return function(d) {
    var i=0, l = functions.length;
    while (i++ < l) d = functions[i-1].call(this, d);
    return d;
  };
}

f.not = function(d){ return !d; };
f.run = function(d){ return d(); };
f.objToFn = function(obj, defaultVal){
  if (arguments.length == 1) defaultVal = undefined;

  return function(str){
    return typeof(obj[str]) !== undefined ? obj[str] : defaultVal;
  };
};

export default f;
