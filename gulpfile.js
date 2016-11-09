var gulp = require( 'gulp' );
var browserSync = require( 'browser-sync' ).create();
var requireDir = require( 'require-dir' );
var dir = requireDir( './tasks' );
var del = require( 'del' );

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

gulp.task( 'serve', [ 'browser-sync' ], () => {
    gulp.watch( './app/**/*.scss', [ 'styles' ] ).on( 'change', browserSync.reload );

    gulp.watch( [
        './app/**/*.js',
        './app/**/*.html'
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

gulp.task( 'build', [ 'clean' ], () => {
    gulp.start( 'html', 'assets' );
} );

gulp.task( 'clean', ( done ) => {
    return del( [ dir.dist + '/**/*' ], { force: true }, ( err, paths ) => {
        done( err );
    } );
} );
