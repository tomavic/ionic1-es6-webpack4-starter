var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var eslint = require('gulp-eslint');
var eslintIfFixed = require('gulp-eslint-if-fixed');
var jsdoc = require('gulp-jsdoc3');
var karma = require('karma').Server;
var jsdoc = require('gulp-jsdoc3');
var pump = require('pump');

var paths = {
  appJsFiles: [
    "./www/app/API.js",
    "./www/app/**/*.module.js",
    "./www/app/**/*.*.js",
    "!./www/app/**/*.spec.js",
  ],
  appVendor: [
    // App libraires don't change order
    './www/lib/jquery/dist/jquery.js',
    './www/lib/jquery-validation/dist/jquery.validate.js',
    './www/lib/jquery-validation/dist/additional-methods.js',
    './www/lib/ionic/js/ionic.bundle.js',
    './www/lib/angular-md5/angular-md5.js',
    './www/lib/angular-mocks/angular-mocks.js',
    './www/lib/angular-rateit/dist/ng-rateit.js',
    './www/lib/angular-countdown/release/angular-countdown.js',
    './www/lib/angular-local-storage/dist/angular-local-storage.js',
    './www/lib/ionic-toast4/dist/ionic-toast.bundle.min.js',
    './www/lib/jpkleemans-angular-validate/dist/angular-validate.min.js',
    './www/lib/humanize-duration/humanize-duration.js',
    './www/lib/moment/moment.js',
    './www/lib/Waves/dist/waves.js',
    './www/lib/ion-datetime-picker/release/ion-datetime-picker.min.js',
    './www/lib/ngCordova/dist/ng-cordova.js',
 ],
  appJS: [
    // app vendors and lib
    "./www/assets/vendor/vendor.js",
    './www/assets/build/bundle.js'
  ],
  appJSmin: [
    // app vendors and lib
    "./www/assets/vendor/vendor.min.js",
    './www/assets/build/bundle.min.js'
  ],
  appCSS: [
    // App CSS file concatenated and minified
    './www/assets/vendor/vendor.css',
    './www/assets/build/main.css',
  ],
  appCSSmin: [
    // App CSS file concatenated and minified
    './www/assets/vendor/vendor.min.css',
    './www/assets/build/main.min.css',
  ],
  sass: [
    './www/theme/**/*.scss',
  ],
  lint : [
    "!./www/lib/**/*.js",
    "./www/app/*.js"
  ],
  oldJS: [
    // Don't change this Order
    "./www/app/API.js",
    "./www/app/app.module.js",
    "./www/app/app.*.js",
    "!./www/app/*.spec.js",

    // don't include spec.js
    "!./www/**/*.spec.js",

    // "./www/services/services.module.js",
    "./www/services/**/*.module.js",
    "./www/components/**/*.module.js",
    "./www/pages/**/*.module.js",
    "./www/services/**/*.js",
    "./www/components/**/*.js",
    "./www/pages/**/*.js"
  ]
};



 
gulp.task('doc', function (cb) {
  var config = require('./jsDocConfig.json');
    return gulp.src(['./www/**/*.js'], {read: false})
        .pipe(jsdoc(config, cb));
});

gulp.task('lint', function() {
  return gulp.src(paths.lint)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:fix', function() {
  return gulp.src(paths.lint)
    .pipe(eslint({fix: true}))
    .pipe(eslint.format());
});

gulp.task('test', function(coverage) {
  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, coverage).start();
});

gulp.task('test:watch', function(coverage) {

  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, coverage).start();

  // Old method
  // gulp.src(paths.appJS)
  // .pipe(new karma({
  //   configFile: __dirname + '/karma.conf.js',
  //   action: 'run',
  //   singleRun: false
  // }, coverage).start())
  // .on('error', function(err) {
  //  throw err;
  // });
});



gulp.task('vendor', function () {
  return gulp.src(paths.appVendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./www/assets/vendor/'));
});

gulp.task('vendor:prod', ['vendor'], function (cb) {
  return gulp.src('./www/assets/vendor/vendor.js')
    .pipe(concat('vendor.min.js'))
    .pipe(uglify().on('error', function(err) {
        gutil.log(gutil.colors.red('[Error] --> while minify vendor.min.js '), err.toString());
    }))
    .pipe(gulp.dest('./www/assets/vendor/'));
});

gulp.task('bundle', function () {
  return gulp.src(paths.appJsFiles)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./www/assets/build'));
});

gulp.task('bundle:prod', ['bundle'], function () {
  return gulp.src('./www/assets/build/bundle.js')
    .pipe(concat('bundle.min.js'))
    .pipe(uglify().on('error', function(err) {
        gutil.log(gutil.colors.red('[Error] --> while minify bundle.min.js '), err.toString());
    }))
    .pipe(gulp.dest('./www/assets/build'));
});

gulp.task('sass:collect', function() {
  return gulp.src(['./www/app/pages/**/*.scss','./www/app/components/**/*.scss'])
    .pipe(concat('_pages.scss'))
    .pipe(gulp.dest('./www/theme/'));
});

gulp.task('sass:vendor', function() {
    return gulp.src([
      './www/lib/angular-rateit/src/style/ng-rateit.css',
      './www/lib/animate.css/animate.css',
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./www/assets/vendor/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/assets/vendor/'))
    ;
});


gulp.task('sass', function (done) {
  gulp.src('./www/theme/**/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/assets/build/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/assets/build/'))
    .on('end', done);
});


gulp.task('develop', ['sass:collect','sass:vendor', 'sass','vendor', 'bundle'], function (cb) {
  return gulp.src('./www/index.html')
    .pipe(inject(gulp.src(paths.appJS, {read: false}), {relative: true}))
    .pipe(inject(gulp.src(paths.appCSS, {read: false}), {relative: true}))
    .pipe(gulp.dest('./www'));
});

gulp.task('build', ['sass:collect','sass:vendor', 'sass', 'vendor:prod', 'bundle:prod'], function (cb) {
  return gulp.src('./www/index.html')
    .pipe(inject(gulp.src(paths.appJSmin, {read: false}), { relative: true}))
    .pipe(inject( gulp.src(paths.appCSSmin, {read: false}), {relative: true}))
    .pipe(gulp.dest('./www'));
    // .pipe(gulp.src('./www/prod', {read: false})
    // .pipe(clean()));
});

gulp.task('watch', ['sass'], function () {
  gulp.watch(['./www/app/**/*.scss'], ['sass:collect']);
  gulp.watch(['./www/theme/**/*.scss'], ['sass']);
  gulp.watch(['./www/app/**/*.html', './www/app/**/*.js'], ['bundle']);
});

// Static Server + watching scss/html files
// gulp.task('serve', ['sass'], function () {
//   browserSync.init({
//     server: "./www"
//   });
//   gulp.watch(paths.sass, ['sass']);
//   gulp.watch(paths.serv).on('change', browserSync.reload);
// });
gulp.task('ionic:watch:before', ['watch']);

gulp.task('default', ['serve']);
