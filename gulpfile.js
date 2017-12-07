const 
  gulp = require('gulp'),
  browserSync = require('browser-sync'),
  webpack = require('webpack'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  runSequence = require('run-sequence')

const 
  webpackConfig = require('./webpack.dev.js')
  bundler = webpack(webpackConfig)

gulp.task('dev', function(){
  runSequence(
    'watch'
  )
})

gulp.task('buildJekyll', function(gulpCallback){
  var spawn = require('child_process').spawn
  var jekyll = spawn('jekyll', ['build','--source','./jekyll-src/','--destination','./dev'],{
    stdio: 'inherit'
  }).on('exit', function(code){
    gulpCallback(code === 0 ? null : 'ERR: Jekyll process exited with code', code)
  })
})

gulp.task('watch', ['bsync'], function(){
  gulp.watch(['jekyll-src/**/*.*', '!jekyll-src/**/*.js'],{
    //Vagrant + VM Polling fallback due to file events not sending
    // interval: 1000,
    // debounceDelay: 1000,
    // mode: 'poll'
  }, ['build'])
})

gulp.task('build', function(){
  runSequence(
    'buildJekyll',
    'bsyncReload'
  )
})

gulp.task('bsyncReload',function(){
  browserSync.reload()
})

gulp.task('bsync', ['build'], function(){
  browserSync.init(null,{
    server:{
      baseDir:"dev",
      middleware:[
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: { colors: true }
        }),
        webpackHotMiddleware(bundler)
      ]
    }
  })
})