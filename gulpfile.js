'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    del = require('del'),
    flatten = require('gulp-flatten');
    
gulp.task('build-css', function() {
	gulp.src([
        'components/common/common.css',
		'components/**/*.css'
    ])
	.pipe(concat('primeng.css'))
	.pipe(gulp.dest('resources'));
});

gulp.task('build-css-prod', function() {
    gulp.src([
        'components/common/common.css',
		'components/**/*.css'
    ])
	.pipe(concat('primeng.css'))
	.pipe(gulp.dest('resources'))
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(rename('primeng.min.css'))
    .pipe(gulp.dest('resources'));	
});

gulp.task('build-theme', function() {
    var themes = [
            'bootstrap',
            'cruze',
            'cupertino',
            'darkness',
            'flick',
            'home',
            'kasper',
            'lightness',
            'ludvig',
            'omega',
            'pepper-grinder',
            'redmond',
            'rocket',
            'south-street',
            'start',
            'trontastic',
            'voclain'
    ]
    themes.map(function(theme){
    gulp.src([
        'resources/themes/'+ theme +'/theme.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('theme.css'))
    .pipe(gulp.dest('resources/themes/'+ theme));
    })
});

//Building images
gulp.task('images', function() {
    return gulp.src(['components/**/images/*.png', 'components/**/images/*.gif'])
        .pipe(flatten())
        .pipe(gulp.dest('resources/images'));
});

//Cleaning previous gulp tasks from project
gulp.task('clean', function() {
	del(['resources/primeng.css','resources/primeng.min.css','resources/images']);
});

//Building project with run sequence
gulp.task('build', ['clean','build-css-prod', 'build-theme', 'images']);