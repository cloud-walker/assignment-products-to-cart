import gulp from 'gulp'
import watch from 'gulp-watch'
import sync from 'browser-sync'
import {src, dest} from '../places'

gulp.task('html', () =>
	gulp.src(`${src}/index.html`)
		.pipe(gulp.dest(dest))
		.pipe(sync.stream())
)

gulp.task('html:watch', () =>
	watch(`${src}/index.html`, () =>
	 gulp.start('html')
 	)
)
