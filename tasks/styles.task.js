var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var concat = require( 'gulp-concat' );

var dir = {
	dev  : 'app'
};

gulp.task( 'styles', () => {
    gulp.src( [
        './app/styles/base.scss'
    ] )
        .pipe(
            sass( { outputStyle: 'compressed' } )
                .on( 'error', ( err ) => {
                    console.log( 'The following SASS error(s) were identified: %s', err );
                } )
        )

        .pipe( concat( 'main.css' ) )
        .pipe( gulp.dest( dir.dev +'/styles' ) )
} );
