var gulp = require( 'gulp' );
var htmlmin = require('gulp-htmlmin');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

gulp.task('html', ['htmlmin', 'index', 'html-component']);

gulp.task('htmlmin', function() {
  return gulp.src( 'app/views/**/*.html' )
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      collapseBooleanAttributes: true,
      removeCommentsFromCDATA: true,
      removeOptionalTags: true
    }))
    .pipe(gulp.dest( 'dist/app/views' ));
});

gulp.task('html-component', function() {
  return gulp.src( 'app/components/**/*.html' )
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      collapseBooleanAttributes: true,
      removeCommentsFromCDATA: true,
      removeOptionalTags: true
    }))
    .pipe(gulp.dest( 'dist/app/components' ));
});

gulp.task('index', function(){
  return gulp.src('app/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify({
      mangle: false
    })).on('error', function(e){
      console.log(e);
    }))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist/app'))
});
