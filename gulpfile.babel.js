// Gulpfile for gulp tasks
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import sass from 'gulp-ruby-sass';
import { join } from 'path';

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

// Nodemon
gulp.task('nodemon', () => {
  nodemon({
    script: 'bin/bedel',
    ignore: [ 'client' ],
    args: [ 'server', '--color', '--debug' ],
    env: {
      'NODE_ENV': 'development'
    }
  });
});
