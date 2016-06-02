var gulp = require('gulp');
var drakov = require('drakov');
var polyserve = require('polyserve');
var proxy = require('http-proxy-middleware');
var express = require('express');
var url = require('url');
var args = require('yargs').argv;
var opener = require('opener');
var lec = require('gulp-line-ending-corrector');

var config = {
    port  : args.port  || 5000,
    drakovProtocol : args.drakovUrl || 'http',
    drakovPort : args.drakovPort || 5001,
    drakovHostname : args.drakovHostname || 'localhost'
};

function drakovProxy(){
    var drakovUrl = {
        protocol: config.drakovProtocol,
        hostname: config.drakovHostname,
        port: config.drakovPort,
    };

    var formattedUrl = url.format(drakovUrl);
    console.log('Drakov URL : ' + formattedUrl);

    var argv = {
        sourceFiles: './**/*-mock.md',
        serverPort: config.drakovPort
    };
    drakov.run(argv);

    return proxy('/api', {
        target: formattedUrl,
        logLevel: 'debug'});
}

gulp.task('serve', function () {
  var app = express();
  app.use('/components', polyserve.makeApp());
  app.use('/api', drakovProxy());
  app.get('/*', (req, res) => {
    var filePath = req.path;
    res.send(req, filePath)
      .on('error', (error) => {
        if ((error).status == 404 && !filePath.endsWith('.html')) {
          res.send(req, '/').pipe(res);
        }
        else {
          res.statusCode = error.status || 500;
          res.end(error.message);
        }
      })
      .pipe(res);
  });
  var polyserveUrl = 'http://localhost:' + config.port + '/components/tpa-seed/index.html';
  console.log('\nPolyserving : ' + polyserveUrl + ' \n');
  app.listen(config.port);
  opener(polyserveUrl);
});


gulp.task('fix-api-eol', function() {
  return gulp.src('./bower_components/**/*-mock.md')
    .pipe(lec({verbose:true, eolc: 'LF', encoding:'utf8'}))
    .pipe(gulp.dest('./bower_components'));
});

gulp.task('default', ['serve']);
