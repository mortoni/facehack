var gulp = require( 'gulp' );
var browserSync = require( 'browser-sync' ).create();
var requireDir = require( 'require-dir' );
var dir = requireDir( './tasks' );
var del = require( 'del' );
var sassLint = require('gulp-sass-lint');
var eslint = require('gulp-eslint');
var path = require('path');
var swPrecache = require('sw-precache');
var runSequence = require('run-sequence');

var dir = {
	dev  : 'app',
	dist : 'dist'
};

gulp.task('default', function() {
 console.log( "\Facehack - Gulp Command List \n" );
 console.log( "----------------------------\n" );
 console.log( "gulp serve       - run application" );
 console.log( "gulp dist:serve  - run distribution(dist) application" );
 console.log( "gulp build       - build dist\n" );
 console.log( "----------------------------\n" );
});

gulp.task( 'browser-sync', () => {
    browserSync.init( {
        server: {
            baseDir: dir.dev,
            index: "index.html",
            routes: {
                "/node_modules": "node_modules",
								"/bower_components": "bower_components"
            }
        }
    } );
} );

gulp.task( 'serve', [ 'browser-sync', 'generate-service-worker' ], () => {
    gulp.watch( './app/**/*.scss', [ 'styles' ] ).on( 'change', browserSync.reload );

    gulp.watch( [
        './app/**/*.js',
        './app/**/*.html',
				'./app/**/*.scss'
    ] ).on( 'change', browserSync.reload );

} );

gulp.task('dist:serve', function() {
    browserSync.init({
        server: {
            baseDir: [dir.dist + "/app"],
            index: "index.html"
        }
    });
});

gulp.task('build', function(callback) {
  runSequence('clean',
              ['html', 'assets', 'fonts-awesome'],
              'font-dist',
							'dist-sw',
              callback);
});

gulp.task( 'clean', ( done ) => {
    return del( [ dir.dist + '/**/*' ], { force: true }, ( err, paths ) => {
        done( err );
    } );
} );

gulp.task('generate-service-worker', function(callback) {

  swPrecache.write(`${dir.dev}/js/service-worker.js`, {
    staticFileGlobs: [dir.dev + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,wof}',
			'bower_components/bootstrap/dist/css/bootstrap.min.css',
			'bower_components/font-awesome/css/font-awesome.css',
			'bower_components/angular-material/angular-material.min.css',
			'bower_components/angular-material-data-table/dist/md-data-table.min.css',
			'bower_components/firebase/firebase.js',
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/angular/angular.js',
			'bower_components/angular-ui-router/release/angular-ui-router.js',
			'bower_components/angular-ui-grid/ui-grid.js',
			'bower_components/jquery.scrollbar/jquery.scrollbar.js',
			'bower_components/bootstrap/dist/js/bootstrap.min.js',
			'bower_components/angular-animate/angular-animate.min.js',
			'bower_components/angular-aria/angular-aria.min.js',
			'bower_components/angular-material/angular-material.min.js',
			'bower_components/angular-material-data-table/dist/md-data-table.min.js',
			'bower_components/angularfire/dist/angularfire.min.js',
			'bower_components/lodash/dist/lodash.js',
			'bower_components/angular-logger-max/logger.service.js',
			'bower_components/idbwrapper/idbstore.min.js',
			'bower_components/font-awesome/fonts/fontawesome-webfont.woff2',
      'bower_components/font-awesome/fonts/fontawesome-webfont.woff',
      'bower_components/font-awesome/fonts/fontawesome-webfont.ttf'
		],
    stripPrefix: dir.dev
  }, callback);
});

gulp.task('dist-sw', function(callback) {
	swPrecache.write(`${dir.dist}/service-worker.js`, {
		staticFileGlobs: [dir.dist + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,wof}'],
		stripPrefix: dir.dist
	}, callback);
});
