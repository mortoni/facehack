'use strict';

var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var clean = require('gulp-clean');
var minifycss    = require('gulp-minify-css');
var browserSync = require('browser-sync');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

//CONFIG PATHS
var config = {
	pages  : './pages',
	assets : './assets',
	build:'./dist'
};

//TASKS
gulp.task('serve', function() {
    browserSync.init({
        server: {
						baseDir: ["app"],
            index: "index.html",
            routes: {
                "/node_modules": "node_modules",
								"/bower_components": "bower_components"
            }
        }
    });

    console.log('## server started ##');

    gulp.watch('app/**/*').on('change', browserSync.reload);

    gulp.watch('app/**/*.js').on('change', function(event) {
        console.log("Linting " + event.path);
    });
});

gulp.task('less', function () {
  gulp.src(config.pages+'/less/pages.less')
    .pipe(less({
      paths: [config.pages+'/less/']
    }))
    .pipe(gulp.dest(config.pages+'/css/'));
});

gulp.task('build', ['css-min', 'compress', 'pages', 'images', 'fonts-awesome', 'api']);

gulp.task('css-min', function() {
  return gulp.src(['node_modules/pace-progress/themes/red/pace-theme-flash.css',
                   'node_modules/bootstrap/dist/css/bootstrap.min.css',
                   'node_modules/font-awesome/css/font-awesome.min.css',
                   'node_modules/jquery.scrollbar/jquery.scrollbar.css',
                   'bower_components/angular-material/angular-material.min.css',
                   'bower_components/angular-material-data-table/dist/md-data-table.min.css',
									 'bower_components/nvd3/build/nv.d3.css',
									 'app/js/lib/mapplic/css/mapplic.css',
                   'app/styles/pages-icons.css',
								 	 'app/styles/pages.css',
							 	 	 'app/styles/styles.css'])
		.pipe(concatCss('styles-1.0.5.min.css'))
    .pipe(cleanCSS({ keepSpecialComments: 1, processImport: false }))
    .pipe(gulp.dest('dist/app/styles'));
});


gulp.task('default', function() {
 console.log( "\Dashboard - Gulp Command List \n" );
 console.log( "----------------------------\n" );
 console.log( "gulp serve" );
 console.log( "gulp watch" );
 console.log( "gulp less" );
 console.log( "gulp dist:test" );
 console.log( "gulp build \n" );
 console.log( "----------------------------\n" );
});

gulp.task('compress', function() {
  return gulp.src(['node_modules/jquery/dist/jquery.min.js',
									 'node_modules/angular/angular.js',
								   'node_modules/angular-ui-router/release/angular-ui-router.js',
								 	 'node_modules/angular-ui-grid/ui-grid.js',
								 	 'node_modules/jquery.scrollbar/jquery.scrollbar.js',
									 'app/js/lib/ui.utils.min.js',
									 'app/js/lib/jquery.ioslist.min.js',
									 'app/js/lib/jquery.unveil.min.js',
									 'app/js/lib/modernizr.custom.js',
									 'app/js/lib/pages.js',
									 'app/js/lib/mapplic/js/hammer.js',
									 'app/js/lib/mapplic/js/jquery.mousewheel.js',
									 'app/js/lib/mapplic/js/mapplic.js',
									 'bower_components/angular-animate/angular-animate.min.js',
									 'bower_components/angular-aria/angular-aria.min.js',
									 'bower_components/angular-material/angular-material.min.js',
									 'bower_components/angular-material-data-table/dist/md-data-table.min.js',
									 'bower_components/chart.js/dist/Chart.min.js',
									 'bower_components/angular-chart.js/dist/angular-chart.min.js',
									 'bower_components/angularfire/dist/angularfire.min.js',
									 'bower_components/d3/d3.js',
									 'bower_components/nvd3/build/nv.d3.js',
									 'bower_components/angular-nvd3/dist/angular-nvd3.js',
									 'app/app.js',
									 'app/config.js',
									 'app/routes.js',
									 'app/main.js',
									 'app/js/controllers/*.js',
									 'app/js/services/*.js',
									 'app/js/directives/*.js'])
    .pipe(concat('bundle-1.0.5.js'))
    .pipe(ngmin())
    .pipe(gulp.dest('dist/app/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist/app/js'));
});

gulp.task('dist:test', function() {
    browserSync.init({
        server: {
            baseDir: ["dist/app"],
            index: "index.html"
        }
    });

    console.log('## test server started ##');
});

gulp.task('pages', function() {
  gulp.src(['app/views/**/*'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/app/views'));
});

gulp.task('images', function() {
  gulp.src(['app/images/**/*'])
      .pipe(gulp.dest('dist/app/images'));
});

gulp.task('api', function() {
  gulp.src(['app/api/**/*'])
      .pipe(gulp.dest('dist/app/api'));
});

gulp.task('fonts-awesome', function() {
  gulp.src(['node_modules/font-awesome/fonts/**/*'])
      .pipe(gulp.dest('dist/app/font-awesome/fonts'));
});
