let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin');

gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions']
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('style', function () {
    return gulp.src([
            'node_modules/slick-carousel/slick/slick.css',
            'node_modules/slick-carousel/slick/slick-theme.css',
            'node_modules/lightbox2/dist/css/lightbox.css',
        ])
        .pipe(concat('libs.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('app/css'))
});


gulp.task('script', function () {
    return gulp.src([
            'node_modules/slick-carousel/slick/slick.js',
            'node_modules/lightbox2/dist/js/lightbox.js',

        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

gulp.task('html', function () {
    return gulp.src('app/**/*.html')
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('js', function () {
    return gulp.src('app/js/**/*.js')
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "app/"
        },
    });
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('app/**/*.html', gulp.parallel('html'))
    gulp.watch('app/js/**/*.js', gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'))