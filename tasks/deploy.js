import gulp from 'gulp'
import sequence from 'gulp-sequence'
import {src, dest} from '../places'

gulp.task('deploy:build', sequence('clean', [
	'html',
	'css',
	'js',
	'assets'
]))

gulp.task('deploy', ['deploy:build'], () =>
	gulp.src(`${dest}/**`)
		.pipe(gulp.dest('.'))
)
