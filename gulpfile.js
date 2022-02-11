// WCZYTYWANIE PACZEK
const { src, dest, series, parallel, watch } = require('gulp') // załączenie gulpa, a dokładnie jego dwóch metod
const sass = require('gulp-sass')(require('sass')) // załączenie sassa
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const clean = require('gulp-clean')
const kit = require('gulp-kit')

// ŚCIEŻKI DO FOLDERÓW
const paths = {
	html: './html/**/*.kit',
	sass: './src/sass/**/*.scss',
	js: './src/js/**/*.js',
	img: './src/img/*',
	sassDist: './dist/css',
	jsDist: './dist/js',
	imgDist: './dist/img',
	dist: './dist',
}

// CZYŚCI FOLDER DIST
function cleanDist(done) {
	src(paths.dist, { read: false }).pipe(clean())
	done()
}

// KOMPILUJE SASS
function buildCss(done) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDist))
	done()
}

// PRZERABIA JS
function buildJs(done) {
	src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.jsDist))
	done()
}

// KONWERTUJE IMG
function convertImg(done) {
	src(paths.img).pipe(imagemin()).pipe(dest(paths.imgDist))
	done()
}

// PRZETWARZA MODUŁY NA HTML
function handleKit(done) {
	src(paths.html).pipe(kit()).pipe(dest('./'))
	done()
}

// ODPALA LIVE SERVER
function startBrowserSync(done) {
	browserSync.init({
		server: {
			baseDir: './',
		},
	})
	done()
}

// NASŁUCHUJE NA ZMIANY
function watchForChanges(done) {
	watch('./*.html').on('change', reload)
	watch([paths.html, paths.sass, paths.js], parallel(handleKit, buildCss, buildJs)).on('change', reload)
	watch(paths.img, convertImg).on('change', reload)
	done()
}

// OBSŁUGA CLEANDIST
exports.cleanDist = cleanDist

// OBSŁUGA POZOSTAŁYCH FUNKCJI
const mainFunctions = parallel(handleKit, buildCss, buildJs, convertImg)
exports.default = series(mainFunctions, startBrowserSync, watchForChanges)
