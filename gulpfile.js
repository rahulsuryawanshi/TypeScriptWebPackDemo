var gulp = require('gulp');
var webpack = require('webpack');
var webpackOptions= require('./webpack.config');
var webpackDevServer = require('webpack-dev-server');

gulp.task("build", function(callback){
    webpack(webpackOptions, function(error, stats){
        callback();
    });
});

gulp.task("serve", function(){
    var compiler = webpack(webpackOptions);
    new webpackDevServer(compiler,webpackOptions.devServer)
        .listen(8090,'localhost',function(){});
});

gulp.task('watch', function(){
    gulp.watch(["./src/**/*.ts", "./src/**/*.tsx","./src/**/*.js"],['build']);
});

gulp.task("default",['serve']);