var gulp = require( 'gulp' );
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

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
  gulp.src(['node_modules/font-awesome/fonts/**/*'])
      .pipe(gulp.dest('dist/app/fonts'));
});
