// Gulp Plugins
// // // // // // // // // // // // // // // //
// SHARED
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
// for clean task
var del = require('del');
// for javascript task
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
// for css task
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
// for templates task
var templateCache = require('gulp-angular-templatecache');
// for browser-sync task
var browserSync = require('browser-sync').create();
// for nodemon task
var nodemon = require('gulp-nodemon');
var svgMin = require('gulp-svgmin');

// ON error
function onError(error) {
	gutil.beep();
	gutil.log(gutil.colors.red(error.message));
	this.emit('end');
}

// Clean old /dist directory task,
// to make room for new /dist build
gulp.task('clean', function () {
	return del(['./dist/**/*']);
});

// Javascript Task
gulp.task('javascript', function () {
	return gulp.src([
		'node_modules/angular/angular.js',
		'node_modules/angular-ui-router/release/angular-ui-router.js',
		'node_modules/angularjs-scroll-glue/src/scrollglue.js',
		'node_modules/angular-socket-io/socket.js',
		'public/ngApp/app.module.js',
		'public/ngApp/**/*.js'
	])
  .pipe(plumber(onError))
  .pipe(sourcemaps.init())
	.pipe(babel({
		only: 'public/ngApp/**/*.js'
	}))
  .pipe(concat('app.js'))
  // .pipe(ngAnnotate())
  // .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist/js'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// CSS Task
gulp.task('css', function () {
	return gulp.src('./public/css/main.sass')
		.pipe(plumber(onError))
		.pipe(sass({
			includePaths: require('node-bourbon').includePaths
		}))
		.pipe(prefix(['last 2 versions', 'ie 9'], {
			cascade: true
		}))
    .pipe(gulp.dest('./dist/css/'));
});

// HTML Task
gulp.task('html', function () {
	return gulp.src(['./public/index.html'])
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// templates task
gulp.task('templates', function () {
	return gulp.src('./public/ngApp/**/*.{html,jade}')
	.pipe(templateCache({
		standalone: true,
		moduleSystem: 'IIFE'
	}))
  .pipe(gulp.dest('./public/ngApp'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// icons task
gulp.task('icons', function () {
	return gulp.src('public/icons/*.svg')
		.pipe(svgMin({
			plugins: [{
				mergePaths: false
			}, {
				cleanupIDs: false
			}],
			js2svg: {
				pretty: true
			}
		}))
    .pipe(gulp.dest('dist/icons/'));
    //.pipe(gulp.dest('public/icons/'));
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
		}, 1000);
	});
});

// browserSync task
gulp.task('browser-sync', ['nodemon'], function () {
	var port = process.env.PORT || 8080;

	browserSync.init({

    // All of the following files will be watched
		files: ['public/**/*.*'],

    // Tells BrowserSync on where the express app is running
    // so when this is localhost it doesnt load the page but when it is 127.0.0.1 it works
		proxy: 'http://127.0.0.1:' + port,

    // This port should be different from the express app port
		port: 4000,

    // Do not mirror any actions across browsers
		ghostMode: false,

		notify: false

	});
});

// Watch task
gulp.task('watch', function () {
	gulp.watch('./public/ngApp/**/*.{html,jade}', ['templates', 'javascript']);
	gulp.watch('./public/ngApp/**/*.js', ['javascript']);
	gulp.watch('./public/css/**/*.{sass,scss}', ['css']);
	gulp.watch('./public/index.html', ['html']);
	gulp.watch('./public/icons/*.svg', ['icons']);
});

// Default Task
gulp.task('default', [
	'templates',
	'javascript',
	'css',
	'html',
	'icons',
	'browser-sync',
	'watch'
]);
