const {
  src, dest, series, watch, parallel,
} = require('gulp');
const plumber = require('gulp-plumber');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const sourcemap = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const replace = require('gulp-replace');
const { hash } = require('./service/hash');

const addHash = async (done) => {
  const cssHash = await hash(`${process.cwd()}/public/css/style.min.css`);
  const jsHash = await hash(`${process.cwd()}/public/bundle.js`);

  src('public/index.html')
    .pipe(replace('bundle.js', `bundle.js?${jsHash}`))
    .pipe(replace('style.min.css', `style.min.css?${cssHash}`))
    .pipe(dest('public'));

  done();
};

const css = (done) => {
  src('src/less/style.less', { allowEmpty: true })
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(dest('public/css'));

  done();
};

const copySVG = (done) => {
  src([
    'src/img/**/*.svg',
  ]).pipe(dest('public/img'));
  done();
};

const copyFonts = (done) => {
  src([
    'src/fonts/*.{woff,woff2}',
  ]).pipe(dest('public/_fonts'));
  done();
};

const imageMin = (done) => {
  src([
    'src/img/**/*.{jpg,png}',
  ])
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
    ]))
    .pipe(dest('public/img'));

  done();
};

const clean = (done) => {
  del('public/css');
  del('public/img');
  done();
};

const watchAll = () => {
  watch('src/less/**/*.less', series(css));
  watch('src/img/**/*.{jpg,png}', parallel(imageMin));
  watch('src/img/**/*.{svg}', series(copySVG));
};

const build = series(css, parallel(copySVG, copyFonts, imageMin));

module.exports = {
  clean,
  build,
  start: watchAll,
  hash: addHash,
};
