// Gulpfile for gulp tasks
import gulp from 'gulp';
import { join } from 'path';
import sass from 'gulp-ruby-sass';

// Vars
const sass_src = join(__dirname, 'client/sass');

gulp.task('compile:sass', () =>
    sass(join(sass_src, '**/*.scss'))
        .on('error', sass.logError)
        .pipe(gulp.dest('views/css'))
);

// Compile task
gulp.task('compile', [ 'compile:sass' ]);

gulp.task('watch:sass', () => {
  gulp.watch(join(sass_src, '**/*.scss'), [ 'compile:sass' ]);
});
