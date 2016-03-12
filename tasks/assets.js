import gulp from 'gulp'
import watch from 'gulp-watch'
import sync from 'browser-sync'
import {src, dest} from '../places'

const glob = `${src}/assets/**/*.@(jpg|gif|png)`

gulp.task('assets', () =>
	gulp.src(glob)
		.pipe(gulp.dest(dest))
		.pipe(sync.stream())
)

gulp.task('assets:watch', () =>
	watch(glob, () =>
		gulp.start('assets')
	)
)
