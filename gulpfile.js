// Gulp Plugins
// // // // // // // // // // // // // // // //
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
// For Javascripts
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
// For CSS
var sass = require('gulp-sass');
var neat = require('node-neat');
var prefix = require('gulp-autoprefixer');

// ON error
function onError(error) {
  gutil.beep();
  gutil.log(gutil.colors.red(error.message));
  this.emit('end');
}

// Javascript Task
gulp.task('javascript', function () {
  return browserify('./public/js/app.module.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// CSS Task
gulp.task('css', function () {
  return gulp.src('./public/css/main.sass')
    .pipe(plumber(onError))
    .pipe(sass({
      includePaths: neat.includePaths
    }))
    .pipe(prefix(['last 2 versions', 'ie 9'], {
      cascade: true
    }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// HTML Task
gulp.task('html', function () {
  return gulp.src(['./public/index.html',
                    './public/js/components/home/home.html',
                    './public/js/components/chat/chatView.html'
                  ])
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// nodemon task
// runs and refreshes node server
gulp.task('nodemon', function (cb) {
  // We use this `called` variable to make sure the callback is only executed once
  var called = false;
  return nodemon({
      script: 'server.js',
      watch: ['server.js', 'app/**/*.*']
    })
    .on('start', function onStart() {
      if (!called) {
        cb();
      }
      called = true;
    })
    .on('restart', function onRestart() {

      // Also reload the browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: true
        });
      }, 500);
    });
});

// browserSync task
// Make sure `nodemon` is started before running `browser-sync`.
gulp.task('browser-sync', ['nodemon'], function () {
  var port = process.env.PORT || 5000;
  browserSync.init({

    // All of the following files will be watched
    files: ['public/**/*.*'],

    // Tells BrowserSync on where the express app is running
    // so when this is localhost it doesnt load the page but when it is 127.0.0.1 it works
    proxy: 'http://127.0.0.1:' + port,

    // This port should be different from the express app çport
    port: 4000,

    // Do not mirror any actions across browsers
    ghostMode: false

  });
});

// Watch task
gulp.task('watch', function () {
  gulp.watch('./public/js/**/*.js', ['javascript']);
  gulp.watch('./public/css/**/*.{sass,scss}', ['css']);
  gulp.watch('./public/index.html', ['html']);
});

// Default Task
gulp.task('default', ['javascript', 'css', 'html', 'browser-sync', 'watch']);
