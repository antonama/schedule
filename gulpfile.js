var gulp = require('gulp'),
    sass = require('gulp-sass'),
    flatten = require('gulp-flatten'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync');

var paths = {
        scss: ['./app/scss/index.scss', './app/**/*.scss'],
        html: ['./app/**/*.html', './index.html'],
        js: ['./app/**/*.js'],
        css: './app/css',
        fonts: './app/css/fonts'
    };

gulp.task('sass', ['fonts'], function () {
    gulp.src(paths.scss)
        .pipe(plumber())
        .pipe(sass())
        .on('error', function (err) { console.log(err.message); })
        .pipe(flatten())
        .pipe(concat('styles.css'))
        //.pipe(minifyCss())
        .pipe(gulp.dest(paths.css));
});

gulp.task('fonts', function () {
    gulp.src('./bower_components/font-awesome/fonts/*.*')
        .pipe(gulp.dest(paths.fonts));
});

// start server
gulp.task('browser-sync', function() {
    browserSync({
        port: 3000,
        proxy: 'http://0.0.0.0:8080'
    });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// start server
gulp.task('bs', ['browser-sync'], function() {
    gulp.watch(paths.scss, ['bs-sass']);
    gulp.watch(paths.js, ['bs-reload']);
    gulp.watch(paths.html, ['bs-reload']);
});

// Compile SASS & auto-inject into browsers
gulp.task('bs-sass', function () {
    return gulp.src(paths.scss)
        .pipe(sass())
        .on('error', function (err) { console.log(err.message); })
        .pipe(flatten())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(paths.css))
        //.pipe(filter('**/*.css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('default', ['sass']);