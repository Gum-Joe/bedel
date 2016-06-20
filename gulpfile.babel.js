// Gulpfile for gulp tasks
import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-ruby-sass';
import { join } from 'path';

// Vars
const sass_src = join(__dirname, 'client/sass');
const babel_src = join(__dirname, 'src');

gulp.task('compile:sass', () =>
    sass(join(sass_src, '**/*.scss'))
        .on('error', sass.logError)
        .pipe(gulp.dest('views/css'))
);

gulp.task('compile:babel', () =>
  gulp.src(join(babel_src, '**/*.js'))
    .pipe(babel())
    .pipe(gulp.dest('app'))
);

// Compile tasks
gulp.task('compile', [ 'compile:babel', 'compile:sass' ]);
gulp.task('babel', [ 'compile:babel' ]);

gulp.task('watch:sass', () => {
  gulp.watch(join(sass_src, '**/*.scss'), [ 'compile:sass' ]);
});

gulp.task('watch:babel', () => {
  gulp.watch(join(babel_src, '**/*.js'), [ 'compile:babel' ]);
});
