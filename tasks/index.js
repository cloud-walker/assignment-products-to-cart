import gulp from 'gulp'
import sequence from 'gulp-sequence'

gulp.task('default', sequence('build', 'watch'))
gulp.task('build', sequence('clean', ['html', 'css', 'assets']))
gulp.task('watch', sequence([
	'js:watch',
	'html:watch',
	'css:watch',
	'assets:watch',
	'sync'
]))
