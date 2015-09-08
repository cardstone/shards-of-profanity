// Gulp Plugins
// // // // // // // // // // // // // // // //
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
// For Javascripts
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
// For CSS
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

// ON error
function onError(error) {
  gutil.beep();
  gutil.log(gutil.colors.red(error.message));
  this.emit('end');
}

// Javascript Task
gulp.task('javascript', function () {
  return browserify('./public/js/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./dist/js/'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// CSS Task
gulp.task('css', function () {
  return gulp.src('./public/css/main.sass')
    .pipe(plumber(onError))
    .pipe(sass({}))
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
  return gulp.src('./public/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// browserSync Task
gulp.task('sync', ['nodemon'], function () {
  browserSync.init({
    proxy: '127.0.0.1:5000',
    //files: './public/**/*.*'
    //notify: false
  });
});

// nodemon task
// runs and refreshes node server
// only called by browsersync
gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
      script: 'server.js',
      ignore: ['gulpfile.js', 'node_modules/']
    })
    .on('start', function () {
      if (!called) {
        called = true;
        cb();
      }
    });
});

// Watch task
gulp.task('watch', function () {
  gulp.watch('./public/js/**/*.js', ['javascript']);
  gulp.watch('./public/css/**/*.{sass,scss}', ['css']);
  gulp.watch('./public/index.html', ['html']);
});

// Default Task
gulp.task('default', ['javascript', 'css', 'html', 'sync', 'watch']);
