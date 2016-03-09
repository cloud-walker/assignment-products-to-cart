import gulp from 'gulp'
import sequence from 'gulp-sequence'

gulp.task('default', sequence('build', 'watch'))
gulp.task('build', sequence('clean', 'html'))
gulp.task('watch', sequence(['html:watch', 'sync']))
