const { watch, series, gulp } = require('gulp');
const { src, dest } = require('gulp')
const webserver = require('gulp-webserver');

function html(){
    return src('src/*.html')
        .pipe(dest('app/'))
}

//gulp.task('default', function() {
 // gulp.src('app')
 //   .pipe(webserver({
  //    livereload: true,
  //    directoryListing: true,
  //    fallback: 'index.html'
  //  }));
//});

exports.default = function() {
    watch('src/*.html', html);

    //watch('src/styles/**/*.css', css);
    //watch('src/styles/**/*.scss', css);

    //watch('src/scripts/**/*.js', scripts);
    //watch('src/assets/**/*', assets);

    //watch('src/*.js', series(clean, javascript));
  };