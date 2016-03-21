import path from 'path'
import gulp from 'gulp'
import notify from 'gulp-notify'
import source from 'vinyl-source-stream'
import through from 'through2'
import sync from 'browser-sync'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import {src, dest} from '../places'

const entry = `${src}/index.js`
const browserifyConfig = {
	cache: {},
	packageCache: {},
	fullPaths: true,
	debug: true
}
const errorHandler = notify.onError({
	title: 'JS Error',
	message: '<%= error %>'
})

gulp.task('js', () => {
	const b = browserify(browserifyConfig)

	b.add(entry)

	b.transform(babelify)

	return generateBundle(b)
})

gulp.task('js:watch', () => {
	const b = browserify(browserifyConfig)

	b.add(entry)

	b.plugin(watchify)
	b.on('update', () => generateBundle(b))

	b.transform(babelify)

	return generateBundle(b)
})

function generateBundle(b) {
	return b.bundle()
		.on('error', errorHandler)
		.pipe(source(entry))
		.pipe(through.obj(function (file, enc, done) {
			file.base = path.resolve(src)
			this.push(file)
			done()
		}))
		.pipe(gulp.dest(dest))
		.pipe(sync.stream())
}
