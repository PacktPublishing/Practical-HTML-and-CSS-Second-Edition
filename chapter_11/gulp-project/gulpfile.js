const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// Task to minify CSS
gulp.task('minify-css', function() {
    return gulp.src('src/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Task to copy HTML files to dist folder
gulp.task('copy-html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Task to initialize BrowserSync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    // Watch CSS and HTML files for changes
    gulp.watch('src/css/*.css', gulp.series('minify-css'));
    gulp.watch('src/*.html', gulp.series('copy-html'));
});

// Default task with CSS minification and live reloading
gulp.task('default', gulp.series('minify-css', 'copy-html', 'browser-sync'));
