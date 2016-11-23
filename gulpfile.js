/*
NOTES
sass sourcemap: true has dev tools styles show scss file not css file
*/

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver');

gulp.task('js', function() {
  return gulp.src('builds/sassEssentials/js/myscript.js')
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

/*
* .task takes name and function
*  function returns result of sass, given a file and a parameters object
*  .on return, pipes to give gulp.dest file
*/
gulp.task('sass', function () {
    return sass('process/sass/style.scss', {
      sourcemap: true,
      style: 'expanded'
    })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('builds/sassEssentials/css'));
});

gulp.task('watch', function() {
  gulp.watch('builds/sassEssentials/js/**/*', ['js']);
  gulp.watch(['process/sass/**/*'], ['sass']);
});

gulp.task('webserver', function() {
    gulp.src('builds/sassEssentials/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['sass', 'watch', 'webserver']);
