const { series, src, dest } = require('gulp')
const sass = require('gulp-dart-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const path = require('path')

function compile() { // 处理scss文件
    // let files = fs.readdirSync('../')
    // files.forEach((item) => {
    //     let path = `../${item}`
    //     console.log(path)
    //     // return src(`${path}/src/*.scss`)
    //     // .pipe(sass.sync())
    //     // .pipe(autoprefixer({}))
    //     // .pipe(cssmin())
    //     // .pipe(dest(`${path}/lib`))
    // })
    let path1 = path.resolve(__dirname, '../input')
    console.log(path1)
    return src(`/Users/jianpingwu/workspace/vue3-ts-ui/packages/input/src/*.scss`)
    .pipe(sass.sync())
    .pipe(autoprefixer({}))
    .pipe(cssmin())
    .pipe(dest('../z-ui/lib'))
}

// function compileFiles() {}

function copyfont(){ // 拷贝字体样式
    return src('./src/fonts/**').pipe(cssmin()).pipe(dest('../z-ui/lib/fonts'))
}

exports.build = series(compile, copyfont)