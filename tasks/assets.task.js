var gulp = require( 'gulp' );

gulp.task('assets', ['ico', 'images', 'fonts-awesome']);

gulp.task('ico', function() {
  gulp.src(['app/facehack.ico'])
      .pipe(gulp.dest('dist/app'));
});

gulp.task('images', function() {
  gulp.src(['app/images/**/*'])
      .pipe(gulp.dest('dist/app/images'));
});

gulp.task('fonts-awesome', function() {
  gulp.src(['node_modules/font-awesome/fonts/**/*'])
      .pipe(gulp.dest('dist/app/fonts'));
});
