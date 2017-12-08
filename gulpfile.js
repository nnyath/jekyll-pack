const
  gulp = require('gulp'),
  browserSync = require('browser-sync'),
  webpack = require('webpack'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  runSequence = require('run-sequence'),
  favicons = require('gulp-favicons'),

  webpackConfig = require('./webpack.dev.js'),
  bundler = webpack(webpackConfig),
  output = process.env.NODE_ENV === 'production' ? './dist' : './dev'

gulp.task('default', ['dev'])

gulp.task('dev', function () {
  runSequence(
    'watch'
  )
})

/*
  Jekyll Build and Watch
*/
gulp.task('buildJekyll', function (gulpCallback) {
  let spawn = require('child_process').spawn

  spawn('jekyll', ['build', '--source', './jekyll-src/', '--destination', './dev'], {
    stdio: 'inherit'
  }).on('exit', function (code) {
    gulpCallback(code === 0 ? null : 'ERR: Jekyll process exited with code', code)
  })
})

gulp.task('watch', ['bsync'], function () {
  gulp.watch(['jekyll-src/**/*.*', '!jekyll-src/**/*.js', '!jekyll-src/**/*.css'], {
    /*
      Vagrant + VM Polling fallback due to file events not sending
      TODO: Add for Webpack Config
    */
    // interval: 1000,
    // debounceDelay: 1000,
    // mode: 'poll'
  }, ['rebuild'])
})

gulp.task('rebuild', function () {
  runSequence(
    'buildJekyll',
    'bsyncReload'
  )
})

/*
  BrowserSync
*/
gulp.task('bsync', ['rebuild'], function () {
  browserSync.init(null, {
    server: {
      baseDir: 'dev',
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: { colors: true }
        }),
        webpackHotMiddleware(bundler)
      ]
    }
  })
})

gulp.task('bsyncReload', function () {
  browserSync.reload()
})

gulp.task('favicons', () => {
  const { appName, appDescription, favicons: {developerName, developerURL, background, theme_color} } = require('./jekyll-src/_data/config.json')

  const config = {
    appName,
    appDescription,
    developerName,
    developerURL,
    background,
    theme_color,
    path: './jekyll-src/assets',
    display: 'standalone',
    orientation: 'portrait',
    start_url: '/?homescreen=1',
    version: '1.0',
    logging: false,
    online: false,
    html: 'index.html',
    pipeHTML: true,
    preferOnline: false,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: { offset: 25 },
      favicons: true,
      firefox: true,
      windows: true,
      yandex: true
    }
  }

  return gulp.src('jekyll-src/assets/favicon.png')
    .pipe(favicons(config))
    .pipe(gulp.dest(`./${output}/assets/favicons/`))
})

gulp.task('dist', () => {
  runSequence([
    'favicons'
  ])
})
