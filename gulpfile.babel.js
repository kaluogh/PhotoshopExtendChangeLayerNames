const gulp = require('gulp');
const clean = require('gulp-clean');
// const rename = require("gulp-rename");
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
// const cssnano = require('cssnano');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const server = browserSync.create();

function Gclean() {
    return gulp.src('dist/*')
        .pipe(clean());
}

function Gcopy () {
    return gulp.src(['./src/CSXS/*', './src/host/*', './src/assets/*'], { base: './src/'})
        .pipe(gulp.dest('dist'))
}

function Gcopymodules () {
    return gulp.src(['./node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('dist/client'))
}

function Gcopyhost () {
    return gulp.src(['./src/host/*'], { base: './src/'})
        .pipe(gulp.dest('dist'))
}

function Ghtml () {
    return gulp.src(['./src/client/*.html'], { base: './src/'})
        .pipe(gulp.dest('dist'))
}

function Gsass () {
    const postcssConfig = [
        autoprefixer()
    ]
    return gulp.src('./src/client/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postcssConfig))
        .pipe(gulp.dest('./dist/client'));
}

function Gjs () {
    return gulp.src('./src/client/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./dist/client'))
}

function Greload(done) {
    server.reload();
    done();
}

function Gserver(done) {
    server.init({
        server: {
            baseDir: './dist/client',
        },
        port: 6071
    });
    done();
}

function Gwatch() {
    gulp.watch('./src/client/*.html', gulp.series(Ghtml))
    gulp.watch('./src/client/*.scss', gulp.series(Gsass))
    gulp.watch('./src/client/*.js', gulp.series(Gjs))
    gulp.watch('./src/host/*', gulp.series(Gcopyhost))
}

const Gbuild = gulp.parallel(Gcopy, Gcopymodules, Gcopyhost, Ghtml, Gsass, Gjs)

const Gdev = gulp.series(Gbuild, Gserver, Gwatch)

exports.default = Gdev
exports.clean = Gclean
exports.build = Gbuild
exports.dev = Gdev
exports.watch = Gwatch