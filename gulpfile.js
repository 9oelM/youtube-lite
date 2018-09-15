const gulp = require('gulp');


const run = require('gulp-run-command').default;


const prettier = require('gulp-prettier');


const eslint = require('gulp-eslint');


const sass = require('gulp-sass');


const sourcemaps = require('gulp-sourcemaps');


const eslintAirbnb = require('eslint-config-airbnb')
const prettierrc = require('./.prettierrc');


const eslintrc = require('./.eslintrc');


/*
    customize your paths to get it working.
*/
const paths = {
  js: './src/**/*.js',
  sass: {
    src: './src/styles/source/',
    master: './src/styles/source/master.sass',
    dest: './src/styles/output/',
  },
}

function format() {
  return gulp
    .src(paths.js, { base: '.', since: gulp.lastRun(format) })
    .pipe(prettier(prettierrc))
    .pipe(gulp.dest('.'))
}


function lint() {
  return gulp
    .src(paths.js, { base: '.', since: gulp.lastRun(lint) })
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(eslint(eslintrc))
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
}

function compileSass() {
  return gulp
    .src(paths.sass.master)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.sass.dest))
}

/*
    npm commands. you can pass in options as a second argument to the run function.
    see more: https://github.com/Klathmon/gulp-run-command#readme
*/
function start() {
  return run('react-app-rewired start')
}

function build() {
  return run('react-app-rewired build')
}

function test() {
  return run('react-app-rewired test --env=jsdom')
}

function eject() {
  return run('react-scripts eject')
}

/*
    generic functions
*/

function watch() {
  const watchers = [gulp.watch(paths.js, format), gulp.watch(paths.js, lint), gulp.watch(paths.sass.src, compileSass)]
  watchers.forEach(watcher => watcher.on('change', (path, stats) => {
    console.log(`${path} was changed`);
  }))
}

const _build = gulp.series(format, lint, compileSass, build())

/*
    tasks
*/
exports.watch = watch
exports.build = _build
exports.start = start()
exports.test = test()
exports.eject = eject()
exports.default = gulp.parallel(watch, start())
