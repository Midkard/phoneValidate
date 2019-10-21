"use strict";

const gulp       = require('gulp'), // Подключаем Gulp
    concat       = require('gulp-concat-util'), // Подключаем gulp-concat (для конкатенации файлов)
    fs           = require('fs');
    
const composer = require('gulp-uglify/composer'); 
const uglifyes = require('uglify-es');
const uglify = composer(uglifyes, console);
const rename = require( 'gulp-rename' );

const pkg = require('./package.json');

function error(err){
	console.log(err.message);
    console.log(err.error);
}

gulp.task('build',function() {

// Переносим скрипты в продакшен
    return gulp.src('src/phone.js')
            .pipe( uglify() )
            .pipe( rename( {suffix: '.min'} ) )
            .pipe(concat.header('/**\n* ' + pkg.name + ' v' + pkg.version + '\n*/\n'))
            .pipe(gulp.dest('dist'))
            .pipe(gulp.dest('demo/js'));

})

gulp.task('default', gulp.series('build'));

