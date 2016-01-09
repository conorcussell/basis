var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sassLint = require('sass-lint');

gulp.task('styles', function () {
  return gulp
    .src('src/css/main.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {

  gulp.watch('src/css/*.scss', ['styles']);

  gulp.watch('src/js/*.js', ['scripts']);

});

gulp.task('default', ['styles', 'scripts']);
