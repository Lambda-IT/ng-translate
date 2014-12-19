'use strict';

var gulp = require('gulp');
var gulpFilter = require('gulp-filter');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*']
});

function handleError(err) {
    console.error(err.toString());
    this.emit('end');
}

var del = require('del'),
    path = require('path'),
    glob = require('glob');


var name = 'ngTranslate';
var dest = './dist';
var temp = './.tmp';
var src = './src';

gulp.task('clean', function () {
    return del([temp, dest]);
});

gulp.task('tscripts', function () {
    var tsResult = gulp.src([src + '/**/*.ts', './typings/**/*.ts'])
                       .pipe($.typescript({
                           declarationFiles: false,
                           noExternalResolve: false
                       }));

    return tsResult.js.pipe(gulp.dest(temp + "/scripts"));
});

gulp.task('typings', function () {
    var tsResult = gulp.src([src + '/**/*.ts', './typings/**/*.ts'])
                       .pipe($.typescript({
                           declarationFiles: true,
                           noExternalResolve: false
                       }));

    return tsResult.dts.pipe(gulp.dest('dist/definitions'));
});

//gulp.task(name + '-scripts', function () {
//    return gulp.src(temp + '/**/*.js')
//        .pipe($.size());
//});

gulp.task('partials', function () {
    return gulp.src(src + '/**/*.html')
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.ngHtml2js({
            moduleName: name
        }))
        .pipe(gulp.dest(temp + "/partials"))
        .pipe($.size());
});

gulp.task('finalise', ['clean', 'tscripts','typings', 'partials'], function () {
    return gulp.src(temp + '/**/*.js')
        .pipe($.order([
            "scripts/*.js",
            "scripts/index.js",
            "partials/*.js"
        ]))
    .pipe($.uglify({ preserveComments: false, mangle: false }))
    .pipe($.concat(name + ".js"))
    .pipe($.size())
    .pipe(gulp.dest(dest));
});

gulp.task('build', ['finalise']);


gulp.task('default', ['build']);