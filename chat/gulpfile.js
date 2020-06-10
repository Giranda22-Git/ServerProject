'use strict'

const 
  { watch, series, gulp, src, dest } = require('gulp'),
  rename = require('gulp-rename'),
  minifyCss = require('gulp-minify-css'),
  minifyHtml = require('gulp-minify-html'),
  minify = require('gulp-minify'),
  sass = require('gulp-sass'),
  webServer = require('gulp-webserver')
;

function html(){
    return src('src/*.html')
      .pipe(minifyHtml({comments:true,spare:true}))
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest('app/'))
}

function css(){
  return src('src/styles/css/**/*.css')
    .pipe(minifyCss({keepBreaks: true}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('app/styles/css/'))
}

function scss(){
  return src(['src/styles/sass/**/*.scss', 'src/styles/sass/**/*.sass'])
    .pipe(sass({ 
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('app/styles/sass/'))
}

function scripts(){
  return src('src/scripts/*.js')
    .pipe(minify())
    .pipe(dest('app/scripts/'))
}

function assets(){
  return src([
    'src/assets/**/*.png',
    'src/assets/**/*.jpg',
    'src/assets/**/*.jpeg',
    'src/assets/**/*.ico'
  ])
    .pipe(dest('app/assets'))
}

function nodeWebServer() {
  src('app')
  .pipe(webServer({
    livereload: true,
    directoryListing: true,
    fallback: 'index.min.html'
  }));
};

function watching(){
  watch('src/*.html', html);

  watch('src/styles/**/*.css', css);
  watch('src/styles/**/*.scss', scss);
  watch('src/styles/**/*.sass', scss);

  watch('src/scripts/**/*.js', scripts);
  watch('src/assets/**/*', assets);
}

exports.default = series(watching, nodeWebServer);