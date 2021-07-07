const { series, src, dest } = require('gulp')
const sass = require('gulp-dart-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const path = require('path')

/**
 * 逐个打包scss
 * @returns 
 */
function compile() { // 处理scss文件
    return src('./packages/*/style/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({}))
    .pipe(cssmin())
    .pipe(dest('./packages/z-ui/lib'))
}
/**
 * 统一打包scss
 * @returns 
 */
function compileAll() { // 处理scss文件
    return src('./packages/theme-chalk/src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({}))
    .pipe(cssmin())
    .pipe(dest('./packages/z-ui/lib'))
}

function copyfont(){ // 拷贝字体样式
    return src('./packages/theme-chalk/src/fonts/**').pipe(cssmin()).pipe(dest('./packages/z-ui/lib/fonts'))
}

exports.build = series(compileAll, compile, copyfont)