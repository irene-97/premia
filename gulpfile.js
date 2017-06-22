var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');

const $ = gulpLoadPlugins();

gulp.task('clean', () => {
    return gulp.src('public/vendor', {read: false}).pipe($.clean());
});

gulp.task('vendor', ['clean'], () => {
    var merge = require('merge-stream');

    var maps = [
        {
            src: 'node_modules/component-modernizr/modernizr.js',
            dest: 'public/vendor/modernizr'
        },
        {
            src: [
                'node_modules/fancybox/dist/helpers/img/**',
                'node_modules/fancybox/dist/img/**',
                'node_modules/fancybox/dist/js/jquery.fancybox.pack.js'
            ],
            dest: 'public/vendor/fancybox',
            options: {
                base: 'node_modules/fancybox/dist/'
            }
        },
        {
            src: 'node_modules/jquery/dist/jquery.min.{js,map}',
            dest: 'public/vendor/jquery'
        },
        {
            src: 'node_modules/perfectly-aligned/perfectly-aligned.min.js',
            dest: 'public/vendor/perfectly-aligned'
        },
        {
            src: 'node_modules/slick-carousel/slick/slick.min.js',
            dest: 'public/vendor/slick-carousel'
        }
    ];

    return merge.apply(this, maps.map((item) => {
        return gulp.src(item.src, item.options || {}).pipe(gulp.dest(item.dest))
    }));
});

gulp.task('styles', () => {
    return gulp.src('public/scss/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            includePaths: ['.'],
            indentWidth: 4,
            outputStyle: 'expanded',
            precision: 10
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['> 0%'],
            cascade: false
        }))
        .pipe($.sourcemaps.write('.', {
            sourceRoot: '/scss'
        }))
        .pipe(gulp.dest('public/css'));
});

gulp.task('icons', () => {
    var spriteData = gulp.src('public/images/icons/*.png')
        .pipe($.spritesmith({
            imgName: 'icons.png',
            imgPath: '../images/icons.png',
            cssName: '_icons.scss',
            cssTemplate: 'public/scss/_icons.scss.hbs'
        }));

    var imgStream = spriteData.img
        .pipe(gulp.dest('public/images'));

    var cssStream = spriteData.css
        .pipe(gulp.dest('public/scss'));

    return require('merge-stream')(imgStream, cssStream);
});

gulp.task('zip', () => {
    var packageName = require('./package.json').name;
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var hours = today.getHours();
    var minutes = today.getMinutes();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return gulp.src([
        '**',
        '!zip/',
        '!zip/**',
        '!node_modules/',
        '!node_modules/**',
        '!.idea/',
        '!.idea/**'
    ], {
        dot: true
    })
        .pipe($.zip(`${packageName}_${year}-${month}-${day}_${hours}-${minutes}.zip`))
        .pipe(gulp.dest('zip'));
});