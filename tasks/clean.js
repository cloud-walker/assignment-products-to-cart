import gulp from 'gulp'
import del from 'del'
import {dest} from '../places'

gulp.task('clean', () => del(dest))
