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

var paths = {
	scripts : {
		src : 'src/scripts/**/*',
		dist : 'build/scripts/'
	},
	styles : {
		src : 'src/styles/**/*',
		dist : 'build/styles/'
	},
	makeup : {
		src : 'src/makeup/**/*',
		dist : 'build/makeup/'
	}
};

gulp.task('styles', function() {
    return gulp.src(paths.styles['src'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
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

gulp.task('script', function() {
    return gulp.src(paths.scripts['src'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts['dist']))
});
gulp.task('default', function() {
    gutil.log('no default - use gulp <task>');
    gutil.log(gutil.colors.green('gulp build'));
    gutil.log(gutil.colors.green('gulp watch'));
    gutil.log(gutil.colors.green('gulp dance'));
});