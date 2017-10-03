//Targetting ES5 for better compatibility, I don't think I'm using ES6 feats? Check plugin dependencies

//TODO: Create dev and dist versions of configs
//TODO: Change paths using path.resolve


var 
  gulp = require('gulp'),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync'),
  runSequence = require('run-sequence'),
  rimraf = require('rimraf')

//Build Task
gulp.task('build', function(){
  runSequence(
    'deleteDist',
    'buildJekyll',
    'webpack',
    'bsyncReload'
  )
})

gulp.task('deleteDist', function(){
  rimraf('./dist/**/*.*', function(){
  })
})

gulp.task('webpack', function(gulpCallback){
  var spawn = require('child_process').spawn
  var webpack = spawn('webpack',{
    stdio: 'inherit'
  }).on('exit', function(code){
    gulpCallback(code === 0 ? null : 'ERR: Webpack process exited with code', code)
  })
})

//TODO: Check compatibility with Netlify
gulp.task('buildJekyll', function(gulpCallback){
  var spawn = require('child_process').spawn
  var jekyll = spawn('jekyll', ['build','--source','./jekyll-src/','--destination','./dist'],{
    stdio: 'inherit'
  }).on('exit', function(code){
    gulpCallback(code === 0 ? null : 'ERR: Jekyll process exited with code', code)
  })

})

gulp.task('watch', ['bsync'], function(){
  gulp.watch(['./jekyll-src/**/*.*'],{
    //Vagrant + VM Polling fallback due to file events not sending
    // interval: 1000,
    // debounceDelay: 1000,
    // mode: 'poll'
  }, ['build','webpack'])
})

gulp.task('bsync', ['build'], function(){
  browserSync.init(null,{
    server:{
      baseDir:"dist"
    }
  })
})

gulp.task('bsyncReload',function(){
    browserSync.reload()
})

gulp.task('default',function(){
  console.log('Default task')
  runSequence('watch')
})