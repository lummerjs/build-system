var gulp = require('gulp');
var gutil = require('gulp-util');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var cssmin = require('gulp-clean-css');
var rename = require('gulp-rename');
var coffee = require('gulp-coffee');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var jade = require('gulp-jade');

var paths = {
	scripts : {
		src : 'src/scripts/**/*',
		dist : 'build/scripts/'
	},
	styles : {
		src : 'src/styles/**/*',
		dist : 'build/styles/'
	},
	markup : {
		src : 'src/markup/**/*',
		dist : 'build/'
	}
};

gulp.task('styles', function() {
    return gulp.src(paths.styles['src'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(stylus())
    .pipe(concat({ path: 'styles.css', stat: { mode: 0666 }}))
    .pipe(cssmin({debug: true}, function(details) {
            gutil.log('originalSize: ' + details.stats.originalSize + ' bytes');
            gutil.log('minifiedSize: ' + details.stats.minifiedSize + ' bytes');
        }))
    .pipe(rename({suffix:'.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles['dist']));
});

gulp.task('markup', function() {
    return gulp.src(paths.markup['src'])
      .pipe(jade({ locals: {} }))
      .pipe(rename({extname:'.html'}))
      .pipe(gulp.dest(paths.markup['dist']));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts['src'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .pipe(concat({ path: 'scripts.js', stat: { mode: 0666 }}))
   // .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts['dist']))
});

gulp.task('watch',['styles','scripts','markup'], function() {
    livereload.listen();
    gulp.watch(paths.scripts['src'], ['scripts']);
    gulp.watch(paths.styles['src'], ['styles']);
    gulp.watch(paths.markup['src'], ['markup']);
});

gulp.task('default', function() {
    gutil.log('no default - use gulp <task>');
    gutil.log(gutil.colors.green('gulp build'));
    gutil.log(gutil.colors.green('gulp watch'));
    gutil.log(gutil.colors.green('gulp dance'));
});