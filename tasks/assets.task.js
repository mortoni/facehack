var gulp = require( 'gulp' );
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var concatCss = require('gulp-concat-css');

gulp.task('assets', ['ico', 'images', 'fonts-awesome']);

gulp.task('ico', function() {
  gulp.src(['app/facehack.ico'])
      .pipe(gulp.dest('dist/app'));
});

gulp.task('images', function() {
  gulp.src(['app/images/**/*.+(png|jpg|gif|svg)'])
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/app/images'));
});

gulp.task('fonts-awesome', function() {
  gulp.src(['bower_components/font-awesome/fonts/**/*'])
      .pipe(gulp.dest('dist/app/fonts'));
});

gulp.task('font-dist', function() {
  return gulp.src(['app/styles/dist-font-face.css',
                   'dist/app/css/main-v1.min.css'])
    .pipe(concatCss('main-v1.min.css'))
});
