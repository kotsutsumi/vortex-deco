// gulpfile.js

const gulp = require('gulp')
const plumber = require('gulp-plumber')
const gulpDartSass = require('gulp-dart-sass')
const sassGlob = require('gulp-sass-glob-use-forward')
const autoprefixer = require('gulp-autoprefixer')
const gcmq = require('gulp-group-css-media-queries')
const sourcemaps = require('gulp-sourcemaps')

const cssmin = require('gulp-cssmin')
const concat = require('gulp-concat')

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
