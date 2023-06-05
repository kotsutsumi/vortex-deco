// gulpfile.js

const gulp = require('gulp')
const sass = require('gulp-dart-sass')
const plumber = require('gulp-plumber')
const gulpDartSass = require('gulp-dart-sass')
const sassGlob = require('gulp-sass-glob-use-forward')
const autoprefixer = require('gulp-autoprefixer')
const gcmq = require('gulp-group-css-media-queries')
const sourcemaps = require('gulp-sourcemaps')

// ----------------------------------------------------------------------

// モジュール読み込み
//----------------------------------------------------------------------
/* gulp */
// const gulp = require('gulp')
// const { src, dest, watch, series, parallel } = require('gulp')

// /* sass */

// exports.sass = sass

// EOF

// const sass = require('gulp-sass')(require('sass'))
// const watch = require('gulp-watch')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
// const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')

// // Task: watch
// gulp.task('watch', function () {
//     watch(['sass/**/*scss'], function () {
//         gulp.src('sass/**/*scss').pipe(sass()).pipe(gulp.dest('./css'))
//     })
// })

gulp.task('build', function (done) {
    gulp.src('./dist/**/*.css', { base: './' })
        .pipe(concat('vortex-deco.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/', { overwrite: true }))
        .pipe(gulp.dest('playgrounds/', { overwrite: true }))
    done()
})

// Task: sass
gulp.task('sass', function (done) {
    gulp.src('./scss/**/*.scss')
        .pipe(
            plumber({
                errorHandler: function (err) {
                    console.log(err.messageFormatted)
                    this.emit('end')
                }
            })
        )
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(
            gulpDartSass({
                includePaths: ['./sass'],
                outputStyle: 'expanded'
            })
        )
        .pipe(autoprefixer({ cascade: false }))
        .pipe(gcmq())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'))

    done()
})

// EOF
