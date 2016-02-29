var gulp = require('gulp');
var gutil = require('gulp-util')


gulp.task('default', function() {
    gutil.log("no default - use gulp <task>");
    gutil.log(gutil.colors.green("gulp build"));
    gutil.log(gutil.colors.green("gulp watch"));
    gutil.log(gutil.colors.green("gulp dance"));
});