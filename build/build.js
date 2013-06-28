var fs = require('fs'),
    UglifyJS = require('uglify-js'),
    lesscss = require('less');

var result = UglifyJS.minify([
    "../src/dx.js",
    "../src/class.js",
    "../src/component.js",
    "../src/app/application.js",
    "../src/app/controller.js",
    "../src/app/model.js",
    "../src/app/view.js",
    "../src/data/store.js"
  ], {
  outSourceMap: "dx.js.map",
  output: { beautify: true }
});
fs.writeFile('../dist/dx.min.js', result.code, function (err) {
  if (err) throw err;
  console.log('dx.min.js');
});

fs.writeFile('../dist/dx.js.map', result.map, function (err) {
  if (err) throw err;
  console.log('dx.js.map');
});

//fs.readFile('../src/Styles/chart.less', 'utf8', function (err, less) {
//  lesscss.render(less, function (e, css) {
//    fs.writeFile('../dist/dx.min.css', css, function (err) {
//      if (err) throw err;
//      console.log('It\'s saved!');
//    });
//  });
//})