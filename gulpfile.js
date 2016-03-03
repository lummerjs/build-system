var gulp = require('gulp');
var gutil = require('gulp-util');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var cssmin = require('gulp-clean-css');
var rename = require('gulp-rename');
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
    .pipe(stylus())
    .pipe(concat('styles.css'))
    .pipe(cssmin({debug: true}, function(details) {
            gutil.log('originalSize: ' + details.stats.originalSize + ' bytes');
            gutil.log('minifiedSize: ' + details.stats.minifiedSize + ' bytes');
        }))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(paths.styles['dist']));
});

gulp.task('default', function() {
    gutil.log('no default - use gulp <task>');
    gutil.log(gutil.colors.green('gulp build'));
    gutil.log(gutil.colors.green('gulp watch'));
    gutil.log(gutil.colors.green('gulp dance'));
});