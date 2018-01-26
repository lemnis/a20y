const ddata = require("dmd/helpers/ddata.js");

exports.liveExample = function(str) {
  return str.slice(3).slice(0, -3);
}

exports.getUrl = function(options) {
  var anchorName = ddata.anchorName.call(this, options);
  switch(this.kind) {
    case "class":
      return './classes/' + anchorName + '.html';
    case "mixin":
      return './mixin/' + anchorName + '.html';
    default:
      return "#" + anchorName;
  }
}