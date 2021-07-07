# zuimei-ui
vue3 + typescript + webpack + rollup + gulp

### 组件库的打包格式
1. 整个打包了 umd
2. esModule
3. 组件的按需加载 需要把每个文件 单独打包

##### 启动dmeo
npm run dev:demo
##### 打包css样式的打包样式(gulp)
npm run build:theme
##### umd打包 （commonjs 和 amd规范，webpack）
npm run build
##### esm打包(esm模块 es6准备的，rollup)
npm run build:esm-bundle
    -- import ZUI from '../lib/index.esm.js'  // esm模块
##### esm打包(分组件打包 按需加载 把每个组件单独进行打包，rollup)
npm run build:esm -- esm模块 

##### 创建一个组件pkg
lerna create xxx
   -- packages-name: @z-ui/xxx
例如：lerna create input
   -- packages-name: @z-ui/input
2、写好xxx组件代码之后
在theme-chalk目录下index.scss文件引入xxx中的样式文件（统一打包给全局引入的用户使用的）
3、运行npm run build:theme打包css文件，去z-ui目录查看对应的输出css文件
4、运行npm run build:esm 打包ts/vue文件 输出目录在根目录的lib目录下


备注：使用yarn install安装，会自动创建packages模块下的软链接
使用 npm install，需要执行 npm link 才会创建packages模块下的软链接
开发中如果软连接引用不到，可执行yarn install

### 项目结构介绍
--builds // 打包脚本
--lib  // 打包输出目录
--packages // 组件工作目录
    -- theme-chalk  // 样式目录，index.scss中需要引入所有的scss文件，打包成容易的css文件，用户使用是，全局引入的时候用到
    -- z-ui // index.ts，引入导出全部组件，方便用全局引用
        -- lib  // 样式输出目录，单个组件打包输出目录style
            -- fonts // 字体
            -- index.css // 用户可以直接引用的css文件，对应theme-chalk的index.scss
--website // demo目录
