const camelCaseAttrs = /^(allowReorder|attributeName|attributeType|autoReverse|baseFrequency|baseProfile|calcMode|clipPathUnits|contentScriptType|contentStyleType|diffuseConstant|edgeMode|externalResourcesRequired|filterRes|filterUnits|glyphRef|gradientTransform|gradientUnits|kernelMatrix|kernelUnitLength|keyPoints|keySplines|keyTimes|lengthAdjust|limitingConeAngle|markerHeight|markerUnits|markerWidth|maskContentUnits|maskUnits|numOctaves|pathLength|patternContentUnits|patternTransform|patternUnits|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|referrerPolicy|refX|refY|repeatCount|repeatDur|requiredExtensions|requiredFeatures|specularConstant|specularExponent|spreadMethod|startOffset|stdDeviation|stitchTiles|surfaceScale|systemLanguage|tableValues|targetX|targetY|textLength|viewBox|viewTarget|xChannelSelector|yChannelSelector|zoomAndPan)$/;

export default function(name, value) {
  if (typeof(name) == 'object'){
    for (var key in name){
      this.attr(camelCaseAttrs.test(key) ? key : key.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase(), name[key]);
    }
    return this;
  } else{
    return arguments.length == 1 ? this.attr(name) : this.attr(name, value);
  }
}
