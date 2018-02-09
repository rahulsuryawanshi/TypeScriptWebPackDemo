var gulp = require('gulp');
var watch = require('gulp-watch');
var webpack = require('webpack');
var del = require('del');
var webpackOptions= require('./webpack.config');
var webpackDevServer = require('webpack-dev-server');
var spsave = require('spsave').spsave;
var creds = require('./config/creds');
var coreOptions = require('./config/coreOptions');

//from where to copy files
var paths = {
    htmlPages: ["./**/*.html","!./node_modules/**/*.html"],
    jsFiles: ["./dist/**/*.js"],
    externalJsFiles: ['./node_modules/react/umd/react.development.js','./node_modules/react-dom/umd/react-dom.development.js']

};
//Where to copy files

var fileDestionation = {
    htmlPages: {
        folder: "SiteAssets", //foler inside SharePoint
        glob: paths.htmlPages, //Local folder
        //base: "SiteAssets" //this removes 'SiteAssets' from the Url
    },
    jsFiles: {
        folder: "SiteAssets/Scripts", //folder inside SharePoint
        glob: paths.jsFiles, //local folder
        //base: "SiteAssets" //this removes 'SiteAssets' from the Url
    },
    externalJSFiles: {
        folder: "SiteAssets/Scripts", //folder inside SharePoint
        glob: paths.externalJsFiles, //local folder
        //base: "SiteAssets" //this removes 'SiteAssets' from the Url
    }
};

var copyToSharePoint = function (fileDestionation){
    return spsave(coreOptions,creds,fileDestionation);
}

gulp.task("clean", function(){
    del(['./dist']).then(delPaths =>{
        console.log('Deleted files and folders:\n',delPaths.join('\n'));
    });
});

gulp.task("build", function(callback){
    webpack(webpackOptions, function(error, stats){
        callback();
    });
});

gulp.task("serve", function(){
    var compiler = webpack(webpackOptions);
    new webpackDevServer(compiler,webpackOptions.devServer)
        .listen(8090,'localhost',function(error){
            console.log(error);
        });
});

gulp.task("deploy", ['htmlPages','jsFiles']);

gulp.task("htmlPages", function(){
    copyToSharePoint(fileDestionation.htmlPages);
});

gulp.task("jsFiles", function(){
    copyToSharePoint(fileDestionation.jsFiles);
});

gulp.task("deployExternals", function(){
    copyToSharePoint(fileDestionation.externalJSFiles);
});

gulp.task('watch', function(){
    gulp.watch(["./src/**/*.ts", "./src/**/*.tsx","./src/**/*.js"],['build']);

    watch(paths.htmlPages).on("change", function(file){
        var changedFileDestination = fileDestionation.htmlPages;
        changedFileDestination.glob = file;
        copyToSharePoint(changedFileDestination);
    });

    watch(paths.jsFiles).on("change", function(file){
        var changedFileDestination = fileDestionation.jsFiles;
        changedFileDestination.glob = file;
        copyToSharePoint(changedFileDestination); 
    });
});

gulp.task("default",['build','deploy','watch']);