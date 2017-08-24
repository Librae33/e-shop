/**
 * Created by libra on 2017/8/24.
 */
var gulp = require('gulp');
var minifyCss = require("gulp-minify-css");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
//压缩
gulp.task('minify-css', function () {
    gulp.src('css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));
});
gulp.task('minify-js', function () {
    gulp.src('js/*.js') // 要压缩的js文件
        .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
        .pipe(gulp.dest('dist/js')); //压缩后的路径
});

gulp.task('default',['minify-css','minify-js']);