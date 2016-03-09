import gulp from 'gulp'
import stylus from 'gulp-stylus'
import watch from 'gulp-watch'
import sync from 'browser-sync'
import {src, dest} from '../places'

gulp.task('css', () =>
	gulp.src(`${src}/index.styl`)
		.pipe(stylus())
		.pipe(gulp.dest(dest))
		.pipe(sync.stream())
)

gulp.task('css:watch', () =>
	watch(`${src}/**/*.styl`, () =>
		gulp.start('css')
	)
)
