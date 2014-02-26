var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('styles', function(){
    return gulp.src('src/scss/main.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.sass({style: 'expanded'}))
        .pipe(plugins.autoprefixer(
            'last 2 version',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(plugins.notify({message: 'CSS compiled'}));
});

gulp.task('lint', function(){
    return gulp.src('src/main.js')
        .pipe(plugins.plumber())
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts-debug', ['lint'], function(){
    return gulp.src('src/main.js', {read: false})
        .pipe(plugins.plumber())
        .pipe(plugins.browserify({
            debug: true,
            transform: ['hbsfy'],
            exclude: ['jquery', 'underscore']
        }))
        .pipe(plugins.concat('build.js'))
        .pipe(gulp.dest('dist/'))
        .pipe(plugins.notify({message: 'JS compiled'}));
});

gulp.task('scripts-prod', ['lint'], function(){
    return gulp.src('src/main.js', {read: false})
        .pipe(plugins.plumber())
        .pipe(plugins.browserify({
            debug: false,
            transform: ['hbsfy'],
            exclude: ['jquery', 'underscore']
        }))
        .pipe(plugins.concat('build.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/'))
        .pipe(plugins.notify({message: 'JS compiled'}));
});

gulp.task('default', function(){
    gulp.start('styles', 'scripts-debug');
});


gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/**/*.js', ['scripts-debug']);
    gulp.watch('src/**/*.hbs', ['scripts-debug']);
});
