// Gulpfile for gulp tasks
import gulp from 'gulp';
import clean from 'gulp-clean';
import nodemon from 'gulp-nodemon';
import sass from 'gulp-ruby-sass';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config';
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

// Clean
gulp.task('clean:webpack', () => {
  return gulp.src(join(__dirname, "build", "js", "*"))
    .pipe(clean());
});
gulp.task('clean', [ 'clean:webpack' ]);

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

gulp.task('webpack', [ 'clean:webpack' ], () => {
  return gulp.src(webpackConfig.entry[0])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(join(__dirname, "build", "js")));
});
