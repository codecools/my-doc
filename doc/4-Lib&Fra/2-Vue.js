'vue-cli'官方提供的脚手架工具,用于初始化一个Vue项目 
  PS: 成熟的Vue项目架构设计;热加载本地测试服务器;集成打包上线方案;  
    使用要求: NodeJS大于'4.0'版本; 安装Git,用于下载代码 
  ◆工具安装[初始安装一次即可] 
  // $ npm i -g webpack   // 全局安装webpack 
  $ npm i -g vue-cli   // 全局安装vue-cli 
    $ vue -V    // 查看Vue版本 
  // $ npm i -g vue       // 全局安装最新稳定版vue 
  ◆初始化项目 
  $ vue list  // 查看官方提供的template模版方案 
    browserify         
    browserify-simple  
    pwa               
    simple            
    webpack           
    webpack-simple    
  $ vue init <template> <path>  // 创建Vue项目  
  // $ npm init  // npm初始化,创建'package.json'文件  
  $ npm i     // 根据'package.json'文件配置安装依赖文件 
  $ npm i --S vue-resource vue-router vuex // 安装相关插件 
  ◆启动项目/构建发布  
  $ npm run dev     // 启动测试服务器  
  $ npm run build   // 运行构建,生成生产环境可发布的代码 
项目目录及文件说明 
  build         // 构建的配置文件 
    build.js 
      require('./check-versions')()  
      require('shelljs/global')   // 引入'shelljs'插件,可在node代码中使用shell命令  
      env.NODE_ENV = 'production'
      
      var path = require('path') // 不再赘述
      var config = require('../config') // 加载 config.js
      var ora = require('ora')  //  loading 插件
      var webpack = require('webpack') // 加载 webpack
      var webpackConfig = require('./webpack.prod.conf') // 加载 webpack.prod.conf
      
      console.log( //  输出提示信息 ～ 提示用户请在 http 服务下查看本页面,否则为空白页
        '  Tip:\n' +
        '  Built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      )
      
      var spinner = ora('building for production...') // 使用 ora 打印出 loading + log
      spinner.start() // 开始 loading 动画
      
      /* 拼接编译输出文件路径 */
      var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory) 
      /* 删除这个文件夹 （递归删除） */
      rm('-rf', assetsPath)
      /* 创建此文件夹 */ 
      mkdir('-p', assetsPath)
      /* 复制 static 文件夹到我们的编译输出目录 */
      cp('-R', 'static/*', assetsPath)
      
      //  开始 webpack 的编译
      webpack(webpackConfig, function (err, stats) {
        // 编译成功的回调函数
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n')
      })        
    check-versions.js  // 检查 Node 和 npm 版本 
    dev-client.js
    dev-server.js 
      require('./check-versions')() // 检查 Node 和 npm 版本
      var config = require('../config') // 获取 config/index.js 的默认配置
      
      /* 
      ** 若 Node 的环境无法判断当前是 dev / product 环境
      ** 使用 config.dev.env.NODE_ENV 作为当前的环境
      */
      
      if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
      var path = require('path') // 使用 NodeJS 自带的文件路径工具
      var express = require('express') // 使用 express
      var webpack = require('webpack') // 使用 webpack
      var opn = require('opn') // 一个可以强制打开浏览器并跳转到指定 url 的插件
      var proxyMiddleware = require('http-proxy-middleware') // 使用 proxyTable 
      var webpackConfig = require('./webpack.dev.conf') // 使用 dev 环境的 webpack 配置
      
      /* 若没有指定运行端口,使用 config.dev.port 作为运行端口 */
      var port = process.env.PORT || config.dev.port
      
      /* 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置 */
      /* 项目参考 https://github.com/chimurai/http-proxy-middleware */
      var proxyTable = config.dev.proxyTable
      
      /* 使用 express 启动一个服务 */
      var app = express()
      var compiler = webpack(webpackConfig) // 启动 webpack 进行编译
      
      /* 启动 webpack-dev-middleware,将 编译后的文件暂存到内存中 */
      var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
          colors: true,
          chunks: false
        }
      })
      
      /* 启动 webpack-hot-middleware,也就是我们常说的 Hot-reload */
      var hotMiddleware = require('webpack-hot-middleware')(compiler)
      
      /* 当 html-webpack-plugin 模板更新的时候强制刷新页面 */
      compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
          hotMiddleware.publish({ action: 'reload' })
          cb()
        })
      })
      
      // 将 proxyTable 中的请求配置挂在到启动的 express 服务上
      Object.keys(proxyTable).forEach(function (context) {
        var options = proxyTable[context]
        if (typeof options === 'string') {
          options = { target: options }
        }
        app.use(proxyMiddleware(context, options))
      })
      
      // 使用 connect-history-api-fallback 匹配资源,若不匹配就可以重定向到指定地址
      app.use(require('connect-history-api-fallback')())
      
      // 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
      app.use(devMiddleware)
      
      // 将 Hot-reload 挂在到 express 服务上并且输出相关的状态、错误
      app.use(hotMiddleware)
      
      // 拼接 static 文件夹的静态资源路径
      var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
      // 为静态资源提供响应服务
      app.use(staticPath, express.static('./static'))
      
      // 让我们这个 express 服务监听 port 的请求,并且将此服务作为 dev-server.js 的接口暴露
      module.exports = app.listen(port, function (err) {
        if (err) {
          console.log(err)
          return
        }
        var uri = 'http://localhost:' + port
        console.log('Listening at ' + uri + '\n')
        
        // 若不是测试环境,自动打开浏览器并跳到我们的开发地址
        if (process.env.NODE_ENV !== 'testing') {
          opn(uri)
        }
      })
    utils.js
    webpack.base.conf.js        webpack 基础配置 
      var path = require('path') // 使用 NodeJS 自带的文件路径插件
      var config = require('../config') // 引入 config/index.js
      var utils = require('./utils') // 引入一些小工具
      var projectRoot = path.resolve(__dirname, '../') // 拼接我们的工作区路径为一个绝对路径
      
      /* 将 NodeJS 环境作为我们的编译环境 */
      var env = process.env.NODE_ENV
      /* 是否在 dev 环境下开启 cssSourceMap ,在 config/index.js 中可配置 */
      var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
      /* 是否在 production 环境下开启 cssSourceMap ,在 config/index.js 中可配置 */
      var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
      /* 最终是否使用 cssSourceMap */
      var useCssSourceMap = cssSourceMapDev || cssSourceMapProd
      
      module.exports = {
        entry: {
          app: './src/main.js' // 编译文件入口
        },
        output: {
          path: config.build.assetsRoot, // 编译输出的静态资源根路径
          publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath, // 正式发布环境下编译输出的上线路径的根路径
          filename: '[name].js' // 编译输出的文件名
        },
        resolve: {
          // 自动补全的扩展名
          extensions: ['', '.js', '.vue'],
          // 不进行自动补全或处理的文件或者文件夹
          fallback: [path.join(__dirname, '../node_modules')],
          alias: {
          // 默认路径代理,例如 import Vue from 'vue',会自动到 'vue/dist/vue.common.js'中寻找
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
          }
        },
        resolveLoader: {
          fallback: [path.join(__dirname, '../node_modules')]
        },
        module: {
          preLoaders: [
            // 预处理的文件及使用的 loader
            {
              test: /\.vue$/,
              loader: 'eslint',
              include: projectRoot,
              exclude: /node_modules/
            },
            {
              test: /\.js$/,
              loader: 'eslint',
              include: projectRoot,
              exclude: /node_modules/
            }
          ],
          loaders: [
            // 需要处理的文件及使用的 loader
            {
              test: /\.vue$/,
              loader: 'vue'
            },
            {
              test: /\.js$/,
              loader: 'babel',
              include: projectRoot,
              exclude: /node_modules/
            },
            {
              test: /\.json$/,
              loader: 'json'
            },
            {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              loader: 'url',
              query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
              }
            },
            {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              loader: 'url',
              query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
              }
            }
          ]
        },
        eslint: {
          // eslint 代码检查配置工具
          formatter: require('eslint-friendly-formatter')
        },
        vue: {
          // .vue 文件配置 loader 及工具 (autoprefixer)
          loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
          postcss: [
            require('autoprefixer')({
              browsers: ['last 2 versions']
            })
          ]
        }
      }        
    webpack.dev.conf.js 
      var config = require('../config') // 同样的使用了 config/index.js
      var webpack = require('webpack') // 使用 webpack
      var merge = require('webpack-merge') // 使用 webpack 配置合并插件
      var utils = require('./utils') // 使用一些小工具
      var baseWebpackConfig = require('./webpack.base.conf') // 加载 webpack.base.conf
      /* 使用 html-webpack-plugin 插件,这个插件可以帮我们自动生成 html 并且注入到 .html 文件中 */
      var HtmlWebpackPlugin = require('html-webpack-plugin') 
      
      // 将 Hol-reload 相对路径添加到 webpack.base.conf 的 对应 entry 前
      Object.keys(baseWebpackConfig.entry).forEach(function (name) {
        baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
      })
      
      /* 将我们 webpack.dev.conf.js 的配置和 webpack.base.conf.js 的配置合并 */
      module.exports = merge(baseWebpackConfig, {
        module: {
          // 使用 styleLoaders
          loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
        },
        // 使用 #eval-source-map 模式作为开发工具,此配置可参考 DDFE 往期文章详细了解
        devtool: '#eval-source-map',
        plugins: [
          /* definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串 */
          new webpack.DefinePlugin({
            'process.env': config.dev.env
          }),
          // 参考项目 https://github.com/glenjamin/webpack-hot-middleware#installation--usage
          new webpack.optimize.OccurenceOrderPlugin(),
          /* HotModule 插件在页面进行变更的时候只会重回对应的页面模块,不会重绘整个 html 文件 */
          new webpack.HotModuleReplacementPlugin(),
          /* 使用了 NoErrorsPlugin 后页面中的报错不会阻塞,但是会在编译结束后报错 */
          new webpack.NoErrorsPlugin(),
          // 参考项目 https://github.com/ampedandwired/html-webpack-plugin
          /* 将 index.html 作为入口,注入 html 代码后生成 index.html文件 */
          new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
          })
        ]
      })      
    webpack.prod.conf.js 
      var path = require('path') 
      var config = require('../config') // 加载 confi.index.js
      var utils = require('./utils') // 使用一些小工具
      var webpack = require('webpack') // 加载 webpack
      var merge = require('webpack-merge') // 加载 webpack 配置合并工具
      var baseWebpackConfig = require('./webpack.base.conf') // 加载 webpack.base.conf.js
      /* 一个 webpack 扩展,可以提取一些代码并且将它们和文件分离开 */ 
      /* 若我们想将 webpack 打包成一个文件 css js 分离开,那我们需要这个插件 */
      var ExtractTextPlugin = require('extract-text-webpack-plugin')
      /* 一个可以插入 html 并且创建新的 .html 文件的插件 */
      var HtmlWebpackPlugin = require('html-webpack-plugin')
      var env = config.build.env
      
      /* 合并 webpack.base.conf.js */
      var webpackConfig = merge(baseWebpackConfig, {
        module: {
          /* 使用的 loader */
          loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
        },
        /* 是否使用 #source-map 开发工具,更多信息可以查看 DDFE 往期文章 */
        devtool: config.build.productionSourceMap ? '#source-map' : false,
        output: {
          /* 编译输出目录 */
          path: config.build.assetsRoot,
          /* 编译输出文件名 */
          filename: utils.assetsPath('js/[name].[chunkhash].js'), // 我们可以在 hash 后加 :6 决定使用几位 hash 值
          // 没有指定输出名的文件输出的文件名
          chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
        },
        vue: {
          /* 编译 .vue 文件时使用的 loader */
          loaders: utils.cssLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
          })
        },
        plugins: [
          /* 使用的插件 */
          /* definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串 */
          new webpack.DefinePlugin({
            'process.env': env
          }),
          /* 压缩 js (同样可以压缩 css) */
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          }),
          new webpack.optimize.OccurrenceOrderPlugin(),
          /* 将 css 文件分离出来 */
          new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
          /* 构建要输出的 index.html 文件, HtmlWebpackPlugin 可以生成一个 html 并且在其中插入你构建生成的资源 */
          new HtmlWebpackPlugin({
            filename: config.build.index, // 生成的 html 文件名
            template: 'index.html', // 使用的模板
            inject: true, // 是否注入 html (有多重注入方式,可以选择注入的位置)
            minify: { // 压缩的方式
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
              // 更多参数可查看 https://github.com/kangax/html-minifier#options-quick-reference
            },
            chunksSortMode: 'dependency'
          }),
          
          // 此处增加 @OYsun 童鞋补充
          // CommonsChunkPlugin用于生成在入口点之间共享的公共模块（比如jquery,vue）的块并将它们分成独立的包而为什么要new两次这个插件,这是一个很经典的bug的解决方案,在webpack的一个issues有过深入的讨论webpack/webpack#1315 .----为了将项目中的第三方依赖代码抽离出来,官方文档上推荐使用这个插件,当我们在项目里实际使用之后,发现一旦更改了 app.js 内的代码,vendor.js 的 hash 也会改变,那么下次上线时,用户仍然需要重新下载 vendor.js 与 app.js
          
          new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
              // 依赖的 node_modules 文件会被提取到 vendor 中
              return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                  path.join(__dirname, '../node_modules')
                ) === 0
              )
            }
          }),
          new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
          })
          
        ]
      })
      
      /* 开启 gzip 的情况下使用下方的配置 */
      if (config.build.productionGzip) {
        /* 加载 compression-webpack-plugin 插件 */
        var CompressionWebpackPlugin = require('compression-webpack-plugin')
        /* 向webpackconfig.plugins中加入下方的插件 */
        webpackConfig.plugins.push(
          /* 使用 compression-webpack-plugin 插件进行压缩 */
          new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(' +
              config.build.productionGzipExtensions.join('|') +
              ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
          })
        )
      }
      
      // split vendor js into its own file
       /* 没有指定输出文件名的文件输出的静态文件名 */
     new webpack.optimize.CommonsChunkPlugin({
           name: 'vendor',
           minChunks: function (module, count) {
             // any required modules inside node_modules are extracted to vendor
             return (
               module.resource &&
               /\.js$/.test(module.resource) &&
               module.resource.indexOf(
                 path.join(__dirname, '../node_modules')
               ) === 0
             )
           }
         }),
         // extract webpack runtime and module manifest to its own file in order to
         // prevent vendor hash from being updated whenever app bundle is updated
         /* 没有指定输出文件名的文件输出的静态文件名 */
         new webpack.optimize.CommonsChunkPlugin({
           name: 'manifest',
           chunks: ['vendor']
         })
     CommonsChunkPlugin用于生成在入口点之间共享的公共模块（比如jquery,vue）的块并将它们分成独立的包而为什么要new两次这个插件,这是一个很经典的bug的解决方案,在webpack的一个issues有过深入的讨论webpack/webpack#1315 .----为了将项目中的第三方依赖代码抽离出来,官方文档上推荐使用这个插件,当我们在项目里实际使用之后,发现一旦更改了 app.js 内的代码,vendor.js 的 hash 也会改变,那么下次上线时,用户仍然需要重新下载 vendor.js 与 app.js——这样就失去了缓存的意义了所以第二次new就是解决这个问题的,请你好好看vue-cli那个英文原注释
     
     // extract webpack runtime and module manifest to its own file in order to
     // prevent vendor hash from being updated whenever app bundle is updated        
      
      module.exports = webpackConfig        
  config        // webpack 的配置文件
    dev.env.js
    index.js
      index.js 中有 dev 和 production 两种环境的配置
      
      var path = require('path')
      
      module.exports = {
        build: { // production 环境
          env: require('./prod.env'), // 使用 config/prod.env.js 中定义的编译环境
          index: path.resolve(__dirname, '../dist/index.html'), // 编译输入的 index.html 文件
          assetsRoot: path.resolve(__dirname, '../dist'), // 编译输出的静态资源路径
          assetsSubDirectory: 'static', // 编译输出的二级目录
          assetsPublicPath: '/', // 编译发布的根目录,可配置为资源服务器域名或 CDN 域名
          productionSourceMap: true, // 是否开启 cssSourceMap
          // Gzip off by default as many popular static hosts such as
          // Surge or Netlify already gzip all static assets for you.
          // Before setting to `true`, make sure to:
          // npm install --save-dev compression-webpack-plugin
          productionGzip: false, // 是否开启 gzip
          productionGzipExtensions: ['js', 'css'] // 需要使用 gzip 压缩的文件扩展名
        },
        dev: { // dev 环境
          env: require('./dev.env'), // 使用 config/dev.env.js 中定义的编译环境
          port: 8080, // 运行测试页面的端口
          assetsSubDirectory: 'static', // 编译输出的二级目录
          assetsPublicPath: '/', // 编译发布的根目录,可配置为资源服务器域名或 CDN 域名
          proxyTable: {}, // 需要 proxyTable 代理的接口（可跨域）
          cssSourceMap: false // 是否开启 cssSourceMap(因为一些 bug 此选项默认关闭,详情可参考 https://github.com/webpack/css-loader#sourcemaps)
        }
      }        
  dist          // 打包构建好的代码 
    static 
    index.html 
  node_modules  // node模块
  src           // 开发目录 
    assets         静态资源目录 
    components     组件目录 
    App.vue        主入口视图文件 
    main.js        主入口JS文件 
  static        // 静态文件夹  
    src目录下的资源只能import或require,
    而该文件夹下的文件可直接在HTML中引入,最终打包到'dist/static'中 
  .babelrc      // babel配置文件
  .gitignore    // 忽略无需git控制的文件,比如node_modules 
  index.html 
  package.json  // 
    "scripts": {
      "dev": "node build/dev-server.js",
      "build": "node build/build.js"
    }
    "dependencies": {
      "vue": "^2.4.2",
      "vue-resource": "^1.3.4",
      "vue-router": "^2.7.0",
      "vuex": "^2.4.0",
      "jquery": "^3.2.1"
    },
  README.md     // 说明文件 
  ...
Question: 
  如何将自定义的工具JS引入到全局可用,类似引入jQuery[使用Webpack插件] 
    自我决解办法: 将工具函数暴露到全局window对象中 
  当刷新SPA后,如何维持通过之前操作获取的状态? 
    通过 localStorage sessionStorage [Self]
    Vue的Webpack模版 
--------------------------------------------------------------------------------
VueJS,数据驱动、组件化开发模式的渐进式前端类MVVM框架 
  介绍 
    支持IE9+[使用了ES5特性];非压缩版有错误提示和警告,而压缩版则没有;
    API设计受AngularJS、KnockoutJS、RactiveJS和RivetsJS影响;
    Vue受MVVM启发,但没有完全遵循;
  说明 
    标签属性、标签名、事件名不区分大小写 
安装|启动 
  <script>标签引入: 'Vue'被注册为一个全局变量
    异步组件 
      在不使用脚手架的情况下将一个个组件分别独立成一个个html文件,
      再去引用注册它们,也是可以实现的,但一般不推荐这样做
      vue.js 可以将异步组件定义为一个工厂函数
      Example: 
        // head.html 
        <div> 这是头部  </div>
        // index.html 中异步引入 head.html 作为组件
        <div id="app1">
          <head-com></head-com>
        </div>
        Vue.component('head-com', function (resolve, reject) {
          $.get("./head.html").then(function (res) {
            resolve({
              template: res
            })
          });
        });
        var app1 = new Vue({
          el: '#app1'
        });
  'vue-cli'Vue脚手架 
View&Model 
  e.g.：
    View
    <div id="app"> awesome {{name}}</div>
    Model 
    var myData = {
      name: 'Vue.js'
    }
    ViewModel : 创建一个Vue实例,连接上面的view和model 
    new Vue({
      el: '#app',
      data: myData
    });
    渲染结果: awesome Vue.js    
  'View'视图  Vue实例管理的DOM节点 
    当一Vue实例被创建时,它会递归遍历根元素的所有子节点,同时完成必要的数据绑定,
    当视图被编译后,它就会自动响应数据的变化,
    使用VueJS时,除了自定义指令,几乎不必直接接触 DOM,
    当数据发生变化时,视图将会自动触发更新,
    这些更新的粒度精确到一个文字节点,
    同时为了更好的性能,这些更新是批量异步执行的;
  'Model'模型 一个轻微改动过的原生JS对象 
    VueJS中的模型就是普通的JS对象——也可以称为数据对象 
    一旦某对象被作为Vue实例中的数据,它就成为一个 “反应式” 的对象了
    可操作它们的属性,同时正在观察它的 Vue 实例也会收到提示
    VueJS把数据对象的属性都转换成了ES5中的 getter/setters,
    以此达到无缝的数据观察效果:无需脏值检查,也不需要刻意给 Vue 任何更新视图的信号
    每当数据变化时,视图都会在下一帧自动更新
    Vue实例代理了它们观察到的数据对象的所有属性
    所以一旦一个对象 { a: 1 } 被观察,那么 vm.$data.a 和 vm.a 将会返回相同的值,
    而设置 vm.a = 2 则也会修改 vm.$data
    数据对象是被就地转化的,所以根据引用修改数据和修改 vm.$data 具有相同的效果
    这也意味着多个 Vue 实例可以观察同一份数据
    在较大型的应用程序中,我们也推荐将 Vue 实例作为纯粹的视图看待,
    同时把数据处理逻辑放在更独立的外部数据层 
    一旦数据被观察,VueJS 就不会再侦测到新加入或删除的属性了
    作为弥补,我们会为被观察的对象增加'$add','$set' 和'$delete'方法 
'Vue.xx'静态属性/方法 
  Vue.config  Vue的全局配置对象,可在启动应用前修改配置  
    Vue.config.devtools = bol  是否允许'vue-devtools'检查代码 
      开发版本默认为 true,生产版本默认为 false 
    Vue.config.silent = bol    是否取消Vue所有的日志与警告 
    Vue.config.optionMergeStrategies  自定义合并策略选项 [详参'Mixins']
    Vue.config.keyCodes     自定义键位别名 [详见'Modifiers'] 
    Vue.config.productionTip  设置为'false'以阻止vue在启动时生成生产提示 ['2.2.0+'] 
  Vue1 = Vue.extend(params) 扩展Vue构造器,用预定义选项创建可复用的组件构造器 
    PS: 所有的Vue组件都是被扩展的Vue实例 
      在多数情况下建议将组件构造器注册为一个自定义元素,然后声明式地用在模板中 
      data 在 Vue.extend() 中它必须是函数 
    var vm = new Vue1(params); 
  Vue.nextTick([foo,context])  在下次DOM更新循环结束之后执行延迟回调 [详见'vm.xx']
    在修改数据之后立即使用这个方法,获取更新后的DOM 
    如果没有提供回调且支持promise 的环境中返回promise ['2.1.0+']
  Vue.set(obj,key,val)  显式更新数据[确保视图更新]  
    若为新数据则加入监控,返回设置的值  
    对象不能是Vue实例,或者Vue实例的根数据对象 
  Vue.delete(obj/arr,key/idx)  删除对象的属性
    若对象是响应式的,确保删除能触发更新视图
    仅在'2.2.0+'版本中支持 Array + index 用法 
    目标对象不能是一个Vue实例或Vue实例的根数据对象 
  Vue.component(tagname,options);  注册全局组件[详见组件] 
  Vue.use(obj/foo)  安装VueJS插件 
    如果插件是一个对象,必须提供install方法。
    如果插件是一个函数,它会被作为install方法,并作为Vue的参数调用 
    当install方法被同一个插件多次调用,插件将只会被安装一次
  Vue.compile(str)  在'render'函数中编译模板字符串,只在独立构建时有效
    var res = Vue.compile('<div><span>{{ msg }}</span></div>')
    new Vue({
      data: {
        msg: 'hello'
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
  str = Vue.version   Vue版本号 
    console.log(Vue.version); // 2.3.0
vm = new Vue({})  创建'ViewModel'Vue实例,简称vm 
  PS: 模板语法声明式的将数据渲染进DOM系统; 
    VueJS应用都是通过构造函数Vue创建一个Vue的根实例启动的;
    所有的VueJS组件其实都是被扩展的Vue实例;
    在实例选项中,方法里的'this'即表示为'vm';
  {  // 实例选项,参数包括数据、模板、挂载元素、方法、生命周期钩子等选项 
    // ◆数据选项 
    data: {},     // 数据,用于渲染、交互的数据 
      PS: Vue实例默认代理其'data'对象,使用'this'表示,
        其优先级高于其他,即'this.xx'优先在'data'中寻找 
      Example:
        var obj = { a: 1 };
        var vm = new Vue({
          data: obj
        });
        console.log(vm.a === obj.a); // true
        // 设置属性也会影响到原始数据
        vm.a = 2;
        console.log(obj.a); // 2
        // 修改样式数据也会影响到data对象
        obj.a = 3;
        console.log(vm.a); // 3
        若在实例创建之后添加新的属性到实例上,它不会触发视图更新
      不能改变data变量,因为这样完全破坏了data与vm的引用关系 
        var userInfo = {name:'aaa',age:20}
        var vm = new Vue({
          …… 
          data : userInfo,
        });
        userInfo.age = 15; // DOM渲染成15
        vm.age = 16; // DOM渲染成16
        userInfo = {name:'bbb',age:22}; // 引用关系被破坏,DOM不会重新渲染
        userInfo.age = 25; // 引用关系被破坏,DOM不会重新渲染
        vm.age = 23; // DOM被渲染成23
    props: arr/obj,  // 注册标签属性,用于接收父组件的数据[大小写不敏感] 
      PS:在父组件中添加注册的attr,通过属性值来向子组件传递信息 
      ['prop0',..] 
      {
        prop0: Number,          // 只接收数值类型,否则报错 
        prop0: [Number,String], // 接收数值和字符串 
        prop0: {
          type : Array , // 接收的类型为数组 
          default : [],  // 设定初始值 
        }
      }
    propsData: {   // 只用于new创建的实例中,创建实例时传递props,主要作用是方便测试 
      <key>: <val>
      // Example: 
      // var Comp = Vue.extend({
      //   props: ['msg'],
      //   template: '<div>{{ msg }}</div>'
      // })
      // var vm = new Comp({
      //   propsData: {
      //     msg: 'hello'
      //   }
      // })
    },
    computed: {  // 依赖于其他数据而返回的数据,计算属性会被混入到Vue实例中  
      // PS: 相当于经过处理的data数据,根据其依赖的data数据变化而变化 [SlPt]
      <computedVal>: function(){  // 不能传参,computedVal为函数返回值   
        return val;
      },
      <computedVal>: {  // 默认只有 get,也可提供 set 
        get: function () {     // getter,computedVal为函数返回值  
          return xx; 
        },
        set: function (val) {  // setter,当设置 computedVal = newValue 时,被调用  
        }
      },
    },  
    watch: {       // 监听数据的变化  
      <key>: function(val,oldVal){ // 方式一 
      },
      <key>: 'someMethod',  // 方式二,为一方法名  
      <key>: {       // 方式三,使用对象的方式进行配置  
        handler: function (val, oldVal) { },
        deep: true // 深度 watch 
      }
    },      
    methods: {     // 定义的方法,methods会被混入到Vue实例中  
      foo1: function(){
      }
    },
    // ◆DOM选项
    el: selector, // 提供一在页面上已存在的DOM元素作为Vue实例的挂载目标 
      // 可以是 CSS 选择器,也可以是一个 HTMLElement 实例
      // 当选择器指向多个标签时,只接管第一个 
      // 该选项在实例化时是有效的,则实例将立即进入编译过程,
      // 否则,需显式调用 vm.$mount()手动开启编译 
      // 不推荐挂载 root 实例到 <html> 或者 <body> 上 
      // 如果 render 函数和 template 属性都不存在,
      // 挂载 DOM 元素的 HTML 会被提取出来用作模板,
      // 此时,必须使用 Runtime + Compiler 构建的 Vue 库
    template: HTMLStr, // 模版,会替换挂载元素及其内部元素,除非模板的内容有分发插槽 
      //若Vue选项中有'render'渲染函数,该模板将被忽略 
    render: function(createElem){  // 渲染函数,相当于'template'的作用  
      // 渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode 
      // 如果组件是一个函数组件,渲染函数还会接收一个额外的 context 参数,为没有实例的函数组件提供上下文信息
      // render 函数若存在,则 Vue 构造函数不会从 template 选项
      // 或通过 el 选项指定的挂载元素中提取出的 HTML 模板编译渲染函数 
      return createElem(
        str/obj/foo // 必填参数
          str  // 一个 HTML 标签字符串,如'div'
          obj  // 组件选项对象 
          foo  // 一个返回值类型为 String/Object 的函数
        ,obj  // 一个包含模板相关属性的数据对象,可选参数 
          在VNode数据对象中,下列属性名是级别最高的字段。
          该对象也允许你绑定普通的HTML特性,就像DOM属性一样,
          比如'innerHTML',会取代'v-html'指令 
          {
            'class': { // 和`v-bind:class`一样的 API
              foo: true,
              bar: false
            },
            style: { // 和`v-bind:style`一样的 API
              color: 'red',
              fontSize: '14px'
            },
            attrs: { // 正常的 HTML 特性
              id: 'foo'
            },
            props: { // 组件 props
              myProp: 'bar'
            },
            domProps: { // DOM 属性
              innerHTML: 'baz'
            },
            // 事件监听器基于 `on`, 所以不再支持如 `v-on:keyup.enter` 修饰器,需要手动匹配 keyCode 
            on: {
              click: this.clickHandler
            },
            // 仅对于组件,用于监听原生事件,而不是组件内部使用 `vm.$emit` 触发的事件 
            nativeOn: {
              click: this.nativeClickHandler
            },
            // 自定义指令。注意事项：不能对绑定的旧值设值
            directives: [
              {
                name: 'my-custom-directive',
                value: '2',
                expression: '1 + 1',
                arg: 'foo',
                modifiers: {
                  bar: true
                }
              }
            ],
            // Scoped slots in the form of
            // { name: props => VNode | Array<VNode> }
            scopedSlots: {
              default: props => createElement('span', props.text)
            },
            // 如果组件是其他组件的子组件,需为插槽指定名称
            slot: 'name-of-slot',
            // 其他特殊顶层属性
            key: 'myKey',
            ref: 'myRef'
          }
        ,str/arr // 子节点,可选参数  
          str // 使用字符串来生成'文本节点'
          arr // 子节点'VNodes',由'createElem()'构建而成 
          [
            '先写一些文字',
            createElement('h1', '一则头条'),
            createElement(MyComponent, {
              props: {
                someProp: 'foobar'
              }
            })
          ]
      )
    },
    renderError: function(h, err){ // 当'render'出错时,提供另外一种渲染输出  ['2.2.0+'] 
      // 只在开发者环境下工作 
      // 其错误将会作为第二个参数传递到 renderError。这个功能配合 hot-reload 非常实用
      // Example: 
      // new Vue({
      //   render (h) {
      //     throw new Error('oops')
      //   },
      //   renderError (h, err) {
      //     return h('pre', { style: { color: 'red' }}, err.stack)
      //   }
      // }).$mount('#app')
    },
    // ◆生命周期钩子选项 
    beforeCreate: function(){ // 在实例初始化后,数据观测和'event/watcher'事件配置前被调用 
      // ..
    }, 
    created: function(){ // 实例创建完成后立即调用
      // 此时实例已完成的配置：'data observer'数据观测、属性和方法的运算、watch/event事件回调 
      // 但挂载阶段还没开始,$el 属性目前不可见 
    }
    beforeMount: function(){ // 在挂载前被调用：相关的 render 函数首次被调用 
      // 该钩子在服务器端渲染期间不被调用
    }
    mounted: function(){ // el被新创建的vm.$el替换,并挂载到实例后调用 
      // 该钩子在服务器端渲染期间不被调用 
      // 如果 root 实例挂载了一个文档内元素,当 mounted 被调用时 vm.$el 也在文档内。
      this.$nextTick(function () {
        // 注意 mounted 不会承诺所有的子组件也都一起被挂载。
        // 如果希望等到整个视图都渲染完毕,可用 vm.$nextTick()  
      })
    },
    beforeUpdate: function(){ // 数据更新时调用,发生在虚拟 DOM 重新渲染和打补丁前 
      // 可在该钩子中进一步地更改状态,但会触发附加的重渲染过程 
      // 该钩子在服务器端渲染期间不被调用     
    }
    updated: function(){  // 当这个钩子被调用时,组件 DOM 已经更新
      // 由于数据更改导致的虚拟DOM重新渲染和打补丁后会调用该钩子 
      // 'updated'不会承诺所有的子组件也都一起被重绘。
      // 若希望等到整个视图都重绘完毕,可以用 vm.$nextTick() 
    },
    activated: function(){  // <keep-alive>组件激活时调用。
      // 该钩子在服务器端渲染期间不被调用。
    },
    deactivated: function(){  //  <keep-alive>组件停用时调用。
      // 该钩子在服务器端渲染期间不被调用。
    },
    beforeDestroy: function(){  // 实例销毁前调用,此时实例仍然可用 
      // 该钩子在服务器端渲染期间不被调用
    },
    destroyed: function(){  // Vue实例销毁后调用 
      // 该钩子在服务器端渲染期间不被调用
      // 调用后,Vue 实例指示的所有东西都会解绑定,所有的事件监听器会被移除,所有的子实例也会被销毁。
    },
    // ◆资源选项 
    directives: { // 定义指令,包含Vue实例可用指令的哈希表 
      // 
    }  
    filters: { // 定义过滤器,包含Vue实例可用过滤器的哈希表 
      // 
    }     
    components: { // 定义组件,包含Vue实例可用组件的哈希表 
      // 
    }  
    // ◆组合选项 
    parent: vm,  // 指定已创建的实例之父实例,在两者之间建立父子关系
      // 子实例可以用 this.$parent 访问父实例,子实例被推入父实例的 $children 数组中 
      // 节制地使用 $parent 和 $children - 它们的主要目的是作为访问组件的应急方法。
      // 更推荐用 props 和 events 实现父子组件通信
    mixins: [],  // 混合 
      接受一个混合对象的数组,这些混合实例对象可以像正常的实例对象一样包含选项,
      他们将在 Vue.extend() 里最终选择使用相同的选项合并逻辑合并。
      举例：如果你混合包含一个钩子而创建组件本身也有一个,两个函数将被调用。
      Mixin 钩子按照传入顺序依次调用,并在调用组件自身的钩子之前被调用。
    extends: obj/foo,  // 允许声明扩展另一个组件(可是一个简单的选项对象或构造函数) 
      // 和 mixins 类似,区别在于,组件自身的选项会比要扩展的源组件具有更高的优先级 
      // Example: 
      // var CompA = { ... } 
      // 在没有调用 `Vue.extend` 时候继承 CompA
      // var CompB = {
      //   extends: CompA,
      //   ...
      // }
    'provide'和'inject'主要为高阶插件/组件库提供用例,并不推荐直接用于应用程序代码中 
      // 这对选项需一起使用,以允许一个祖先组件向其所有子孙后代注入一个依赖,不论组件层次有多深, 
      // 并在起上下游关系成立的时间里始终生效 
      // provide 和 inject 绑定并不是可响应的。这是刻意为之的。
      // 然而,如果你传入了一个可监听的对象,那么其对象的属性还是可响应的。
    provide: obj/foo,      '2.2.0+' 
      // 该对象包含可注入其子孙的属性 
      // 参数为一个对象或返回一个对象的函数
    inject: arr/obj,       '2.2.0+' 
      // 参数为一个字符串数组或一个对象,该对象的 key 代表了本地绑定的名称,
      // value 为其 key 以在可用的注入中搜索。
      Example: 
      var Provider = {
        provide: {
          foo: 'bar'
        },
        // ...
      }
      var Child = {
        inject: ['foo'],
        created () {
          console.log(this.foo) // => "bar"
        }
        // ...
      }
      接下来 2 个例子只工作在 Vue 2.2.1 或更高版本。
      低于这个版本时,注入的值会在 props 和 data 初始化之后得到。
      使用一个注入的值作为一个属性的默认值：
      const Child = {
        inject: ['foo'],
        props: {
          bar: {
            default () {
              return this.foo
            }
          }
        }
      }
      使用一个注入的值作为数据入口：
      const Child = {
        inject: ['foo'],
        data () {
          return {
            bar: this.foo
          }
        }
      }
    // ◆其他选项 
    name: str,  // 命令组件,只有作为组件选项时起作用 
      允许组件模板递归地调用自身;
      组件在全局用 Vue.component() 注册时,全局 ID 自动作为组件的 name
      指定 name 选项的另一个好处是便于调试。有名字的组件有更友好的警告信息。
      当在有 vue-devtools,未命名组件将显示成 <AnonymousComponent>,这很没有语义。
      通过提供 name 选项,可以获得更有语义信息的组件树。
    delimiters: arr,   // 改变纯文本插入分隔符 
      // 该选项只在完整构建版本中的浏览器内编译时可用 
      // 默认值：["{{", "}}"]
      // Example:  改为 ES6 模板字符串的风格
      // new Vue({
      //   delimiters: ['${', '}']
      // })
    functional: bol,  // 使组件无状态[没有 data]和无实例[没有 this 上下文] 
      // 用一个简单的 render 函数返回虚拟节点使他们更容易渲染 
    model: { // 允许一个自定义组件在使用 v-model 时定制 prop 和 event  '2.2.0+'
      // 默认情况下,一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event,
      // 但是一些输入类型比如单选框和复选框按钮可能像使用 value prop 来达到不同的目的。
      // 使用 model 选项可以回避这些情况产生的冲突。
      prop: '',
      event: ''
    } 
    inheritAttrs: bol, // 默认值:true  '2.4.0+'
      // 默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 
      // 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。
      // 当撰写包裹一个目标元素或另一个组件的组件时,这可能不会总是符合预期行为。
      // 通过设置 inheritAttrs 到 false,这些默认行为将会被去掉。
      // 而通过 (同样是 2.4 新增的) 实例属性 $attrs 可以让这些特性生效,
      // 且可以通过 v-bind 显性的绑定到非根元素上。
      // 这个选项不影响 class 和 style 绑定。
    comments: bol,  // 是否保留且渲染模板中的HTML注释,默认：false  '2.4.0+'
      // 该选项只在完整构建版本中的浏览器内编译时可用。
  }
'vm.xx'实例属性/方法/事件 
  PS: vm.$xx [带有前缀$的]实例方法/属性,在配置对象中使用'this'代替'vm' 
  ◆实例属性 
  vm.$options 只读,当前Vue实例的初始化选项
    Example: 在选项中包含自定义属性时 
    new Vue({
      customOption: 'foo',
      created: function () {
        console.log(this.$options.customOption) // => 'foo'
      }
    })
  vm.$el      只读,Vue实例使用的根DOM元素,类型：HTMLElement 
  vm.$data    Vue实例观察的数据对象 
  vm.$props   当前组件接收到的props对象  '2.2.0+' 
    <child-a v-bind="$props"></child-a> 
    // 通过 $props 将父组件的 props 一起传给子组件 
  vm.$nextTick(foo)        DOM更新后立即调用 
    Vue.component('example', {
      template: '<span>{{ message }}</span>',
      data: function () {
        return {
          message: '没有更新'
        }
      },
      methods: {
        updateMessage: function () {
          this.message = '更新完成'
          // 用于Vue采用异步队列来更新DOM,此时DOM还未更新
          console.log(this.$el.textContent) // => '没有更新'
          this.$nextTick(function () {
            console.log(this.$el.textContent) // => '更新完成'
          })
        }
      }
    })
  vm.$parent     只读,父实例[若存在的话]
  vm.$root       只读,当前组件树的根Vue实例,若当前实例无父实例,则是其自己 
  vm.$children   只读,当前实例的直接子组件
    $children 并不保证顺序,也不是响应式的。
  vm.$slots      只读,用来访问被插槽分发的内容
    每个具名插槽 有其相应的属性 (例如：slot="foo" 中的内容将会在 vm.$slots.foo 中被找到)。
    default 属性包括了所有没有被包含在具名插槽中的节点。 
  vm.$scopedSlots 只读,用来访问作用域插槽   '2.1.0+' 
    对于包括 默认 slot 在内的每一个插槽,该对象都包含一个返回相应 VNode 的函数。
  vm.$refs        只读,包含已注册过'ref'的所有子组件的对象 
  vm.$isServer    只读,当前Vue实例是否运行于服务器的布尔值 
  vm.$attrs       只读,包含了父作用域中不被认为[且不预期为]'props'的特性绑定 [class 和 style 除外] 
    当一个组件没有声明任何 props 时,这里会包含所有父作用域的绑定 (class 和 style 除外),
    并且可以通过 v-bind="$attrs" 传入内部组件——在创建更高层次的组件时非常有用。
  vm.$listeners   只读,包含了父作用域中的[不含'.native'修饰器的]v-on事件监听器 
    它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用 
  ◆实例方法
  vm.$watch('key',f(newVal,oldVal) [,options])  监控元素改变的方法 
    key  data对象中的属性,一个表达式或计算属性函数 
      表达式只接受监督的键路径。对于更复杂的表达式,用一个函数取代。
      // 键路径
      vm.$watch('a.b.c', function (newVal, oldVal) {
        // 做点什么
      })
      // 函数
      vm.$watch(
        function () {
          return this.a + this.b
        },
        function (newVal, oldVal) {
          // 做点什么
        }
      )
    f    回调函数
    options = {
      deep: bol,  // 为了发现对象内部值的变化,可以在选项参数中指定 deep: true 
        vm.$watch('someObject', callback, {
          deep: true
        })
        vm.someObject.nestedValue = 123
      immediate: bol  // immediate: true 将立即以表达式的当前值触发回调
        vm.$watch('a', callback, {
          immediate: true
        })
        // 立即以 `a` 的当前值触发回调
    }
    返回一个取消观察函数,用来停止触发回调：
      var unwatch = vm.$watch('a', cb)
      unwatch() // 取消观察
    Example: 
      vm.$watch('a', function (newVal, oldVal) {
          // 回调将在`vm.a`值改变后调用 
      })
  vm.$set(obj/arr,key/idx,val) 返回设置的值,效果同Vue.set()  
  vm.$delete(obj/arr,key/idx)  效果同Vue.delete()  
  vm.$on('event-name'/arr,foo)     监听事件,触发回调   [数组只在'2.2.0+'中支持] 
    监听当前实例上的自定义事件。事件可以由 vm.$emit() 触发
    回调函数会接收所有传入事件触发函数的额外参数。
  vm.$once('event-name',foo)  监听事件,但只触发一次,在第一次触发之后移除监听器 
  vm.$off(['event-name'/arr,foo])   移除自定义事件监听器     [只在'2.2.2+'支持数组]
    如果没有提供参数,则移除所有的事件监听器；
    如果只提供了事件,则移除该事件所有的监听器；
    如果同时提供了事件与回调,则只移除这个回调的监听器。
  vm.$emit('event-name',[data..])  触发事件,传递数据 
    附加参数都会传给监听器回调 
  vm.$mount(elem/selector)    手动编译Vue实例,返回实例自身 
    如果Vue实例在实例化时没有收到'el'选项,则它处于'未挂载'状态,没有关联的DOM元素。
    可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
    如果没有提供挂载点,模板将被渲染为文档之外的的元素,需使用原生 DOM API 把它插入文档中
    var MyComponent = Vue.extend({
      template: '<div>Hello!</div>'
    })
    // 创建并挂载到 #app (会替换 #app)
    new MyComponent().$mount('#app')
    // 同上
    new MyComponent({ el: '#app' })
    // 或者,在文档之外渲染并且随后挂载
    var component = new MyComponent().$mount()
    document.getElementById('app').appendChild(component.$el)
  vm.$forceUpdate()  迫使Vue实例重新渲染,仅影响实例本身和插入插槽内容的子组件[而非所有子组件]
  vm.$nextTick([foo])  将回调延迟到下次DOM更新循环后执行。
    在修改数据之后立即使用它,然后等待 DOM 更新。
    跟全局方法 Vue.nextTick 一样,不同的是回调的 this 自动绑定到调用它的实例上。
    如果没有提供回调且支持Promise的环境中返 Promise  '2.1.0+'
  vm.$destroy()      完全销毁一个实例
    清理它与其它实例的连接,解绑它的全部指令及事件监听器 
    触发 beforeDestroy 和 destroyed 的钩子。
'Model'更新及监控 
  'mutation method'变异方法 会改变调用该方法的原数据的方法 
    push()  pop() shift() unshift() splice() sort() reverse()
  'non-mutating method'非变异方法 : 不会改变原始数组,但总是返回一个新数组
    如: filter(),concat(),slice()  
  重塑数组 : 当使用非变异方法时,可以用新数组替换旧数组
    example1.items = example1.items.filter(function (item) {
      return item.message.match(/Foo/)
    })
    你可能认为这将导致Vue丢弃现有DOM并重新渲染整个列表
    但事实并非如此,Vue实现了一些智能启发式方法来最大化DOM元素重用,
    所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作
  由于JS的限制,Vue不能检测以下变动的数据 
    当[函数内仅有]数组通过索引index直接设置某一项时
      如: vm.items[num] = newValue ,虽然model中数据已经改变,当视图无渲染 
      可使用以下方式将达到效果触发状态更新
      ◆Vue.set
      Vue.set(arr,index,newVal)
      this.$set(this.arr,index,newVal)  // vm的实例方法,也是全局Vue.set方法的别名
      ◆Array.prototype.splice
      arr.splice(indx,1,newVal)
      ◆同时在当前函数内改变会引起视图变化的操作 
        <div class="slct" >
          <div v-for="item1 in items">{{item1}}</div>
          <div v-for="i in items1" style="display:none;" >{{i.a}}</div>
          <button type="button" @click="changeItems">click</button>
        </div>
        var vm = new Vue({
          el : '.slct',
          data : {
            items :[ 1, 2, 3, 4, 5 ],
            items1 :[{a:1},{a:2},{a:3},{a:4}],
            n : 1,
          },
          methods : {
            changeItems : function(){
              console.log(this.items);
              this.items[0] = ++this.n;
              // this.items1[0].a = this.n; // 存在以否决定 items 是否会触发更新
            },
          },
        });

    当你修改数组的长度时,如: vm.items.length = newLength 
      使用 splice 替代直接长度的修改
      example1.items.splice(newLength)
  vm实例创建后新增的数据不能被监控到 
    受现代js的限制[以及废弃 Object.observe],Vue不能检测到对象属性的添加或删除。
    由于Vue会在初始化实例时对属性执行getter/setter转化过程,
    所以属性必须在 data 对象上存在才能让 Vue 转换它,这样才能让它是响应的。
    Example::
      var vm = new Vue({
        data:{
          a:1
        }
      })
      // `vm.a` 是响应的
      vm.b = 2
      // `vm.b` 是非响应的
    ◆决解办法:
    预选定义一个值 
    Vue.set(object, key, value);  将响应属性添加到嵌套的对象
      Vue不允许在已经创建的实例上动态添加新的根级响应式属性[root-level reactive property]
      但可使用 Vue.set 来添加 
      Example: Vue.set(vm.someObject, 'b', 2)
    vm.$set 实例方法[全局 Vue.set 方法的别名] 
      this.$set(this.someObject,'b',2)
    创建一个新的对象,让其包含原对象的属性和新的属性
      有时向已有对象上添加一些属性,例如使用 Object.assign() 或 _.extend() 方法来添加属性。
      但是,添加到对象上的新属性不会触发更新。
      this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
      // 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
  异步更新队列 
    当Vue观察到数据变化,将开启一个队列,并缓冲在同一事件循环中发生的所有数据改变。
    若同一个'watcher'被多次触发,只会一次推入到队列中。
    这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。
    然后,在下一个的事件循环“tick”中,Vue 刷新队列并执行实际[已去重的]工作。
    Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MutationObserver,
    若执行环境不支持,会采用 setTimeout(fn, 0) 代替。
    Example:
      当设置 vm.someData = 'new value' ,该组件不会立即重新渲染。
      当刷新队列时,组件会在事件循环队列清空时的下一个“tick”更新。
      多数情况我们不需要关心这个过程,但是若你想在 DOM 状态更新后做点什么,这就可能会有些棘手。
      虽然Vuejs通常鼓励开发人员沿着“数据驱动”的方式思考,避免直接接触 DOM,但是有时我们确实要这么做。
    Vue.nextTick(callback)  在数据变化之后使用使其操作插队[SlPt]
      <div id="example">{{message}}</div>
      var vm = new Vue({
        el: '#example',
        data: {
          message: '123'
        }
      })
      vm.message = 'new message' // 更改数据
      vm.$el.textContent === 'new message' // false
      Vue.nextTick(function () {
        vm.$el.textContent === 'new message' // true
      })
      在组件内使用 vm.$nextTick() 实例方法特别方便,因为它不需要全局 Vue ,
      并且回调函数中的 this 将自动绑定到当前的 Vue 实例上:
      Vue.component('example', {
        template: '<span>{{ message }}</span>',
        data: function () {
          return {
            message: '没有更新'
          }
        },
        methods: {
          updateMessage: function () {
            this.message = '更新完成'
            console.log(this.$el.textContent) // => '没有更新'
            this.$nextTick(function () {
              console.log(this.$el.textContent) // => '更新完成'
            })
          }
        }
      })
'Lifecycle hooks'生命周期钩子: 实例的生命周期 
  PS: 钩子:某个阶段开始或者结束前、后等过程中被触发的函数;  
    组件的自定义逻辑可以分布在这些钩子中[Vue无'控制器'概念];
    钩子的'this'指向调用它的Vue实例; 
  'beforeCreate'  实例刚创建 
    设置'data'中的数据无效 
  'created'       实例创建完毕 
    可设置'data'中的数据 
  'beforeMount'   DOM渲染前
  'mounted'       DOM渲染完毕 [替换'1.x'版本的'ready'] 
  'beforeUpdate'  更新前 
  'updated'       数据模型更新 
  'activated'     组件被激活时 
  'deactivated'   组件被移除时 
  'beforeDestroy' 销毁前 
  'destroyed'     销毁观察、组件及事件 
'Mustache'插值 
  PS: 基于HTML的模版语法,声明式地将DOM绑定至底层Vue实例的数据;
    在底层的实现上,Vue 将模板编译成虚拟 DOM 渲染函数;
    结合响应系统,应用状态改变时,Vue以最小代价重新渲染组件并应用到DOM操作上;
    也可不用模板,直接写渲染[render]函数,使用可选的 JSX 语法;  
    不能在HTML属性中使用[应使用 v-bind 指令];
  {{key}}  数据属性插值[params.data.key]
    PS:{{value}}的形式可取到value的值,并与value进行绑定,
      绑定的数据对象上的属性发生了改变,插值处的内容都会更新,
      双大括号会将数据解释为纯文本,而非 HTML 
  {{表达式}} 配合JS表达式使用 
    PS:Vuejs提供了完全的JS表达式支持; 
      模板表达式都被放在沙盒中,只能访问全局变量的一个白名单,如 Math 和 Date,
      不应该在模板表达式中试图访问用户定义的全局变量; 
    Example:
      {{ number + 1 }}
      {{ ok ? 'YES' : 'NO' }}
      {{ message.split('').reverse().join('') }}
      <div v-bind:id="'list-' + id"></div>
      这些表达式会在所属 Vue 实例的数据作用域下作为JS被解析
    每个绑定都只能包含单个表达式
      下面的例子不会生效
      // <!-- 这是语句,不是表达式 -->
      {{ var a = 1 }}
      // <!-- 流控制也不会生效,请使用三元表达式 -->
      {{ if (ok) { return message } }}
  {{foo}}  计算属性插值[params.computed.foo]
    PS:像绑定普通属性一样在模板中绑定计算属性 
  {{foo(arg)}} 方法调用插值[params.methods.foo]
    PS:计算属性是基于它的依赖缓存,只有在其的相关依赖发生改变时才会重新取值;
      若依赖未改变,多次访问计算属性会立即返回之前的计算结果[有缓存];
      而每当重新渲染的时候,method 调用总会执行函数[无缓存];
    Example:
      通过调用method来达到同样的效果
      <p>Reversed message: "{{ reverseMessage() }}"</p>
      methods: {
        reverseMessage: function () {
          return this.message.split('').reverse().join('')
        }
      }
      
      如下计算属性将不会更新,因为 Date.now() 不是响应式依赖
      computed: {
        now: function () {
          return Date.now()
        }
      }
  Mustache 和 v-text 的区别: 在刷新的瞬间会显示出'{{}}'
'Filters'过滤器 
  PS: 过滤器只能在'Mustache'和'v-bind'表达式['2.1.0+']中使用 
    类似Linux中的管道,vuejs也使用的是'|'; 
    因为过滤器设计目的就是用于文本转换
    为了在其他指令中实现更复杂的数据变换,应该使用计算属性
    过滤器函数总接受"|"左边的值作为第一个参数
  Vue.filter('ftName',foo(val[,arg1,..])); 全局过滤器 [可在所有实例中使用] 
    val 表示'|'左边的值,
    arg 可选,表示使用时传入的额外参数 
    Example: 
      定义一个全局的 reverse 过滤器
      Vue.filter('reverse',function (value) {
        return value.split('').reverse().join('')
      })
  '|'管道符配合使用:  
    'Mustache'中使用: 添加在JS表达式的尾部,由管道符"|"指示 
    {{ message | flt }}
    'v-bind'中使用
    <div v-bind:id="rawId | flt"></div>
    过滤器是JS函数,因此可接收参数 
    {{ message | flt(arg1,arg2,..) }}
    // arg1作为第二个参数,arg2作为第三个参数 
  过滤器串联 
    {{ message | filterA | filterB }}
'Directives'指令: model和view的交互 
  PS:将vm和DOM进行关联,做为HTML标签的属性,让Vue对DOM元素做各种处理,
    职责为当其表达式的值改变时相应地将某些行为应用到 DOM 上;
  v-text="str"   纯文本 
  v-html="str"   HTML文本 
  v-for="(item,key,idx) in list"   循环渲染  
    item  自定义的占位符placeholder,表示集合'list'中的一项,便于后续使用 
    key   可选,表示集合'list'中一项的键,数组则为下标 
    idx   可选,当遍历对象时可用,表示对象的第几个元素 
      按 Object.keys()的结果遍历对象,在不同JS引擎下结果可能不一致 
    list  迭代的集合,可为arr/obj/num/str 
      为num时,表示迭代num次,'item'表示每一次的数字 
    <template v-for="item in list">  渲染多元素 
      PS: 最终在DOM中不存在<template>标签,仅用于包裹元素  
    'key'标识元素不复用 
      <div v-for="item in list" :key="item.id"> </div>
    循环渲染组件 ['2.2.0+'在组件中使用'v-for','key'是必须的] 
      不能自动传递数据到组件里,因为组件有自己独立的作用域,传递迭代数据到组件里需用'props'
      <div id="todo-list-example">
        <input v-model="newTodoText" v-on:keyup.enter="addNewTodo" 
        placeholder="Add a todo" >
        <ul>
          <li is="todo-item" v-for="(todo,index) in todos" v-bind:title="todo" v-on:remove="todos.splice(index,1)"></li>
        </ul>
      </div>
      Vue.component('todo-item',{
        template: ' <li> {{ title }}\
          <button v-on:click="$emit(\'remove\')">X</button>\
        </li> ',
        props: ['title'],
      });
      new Vue({
        el: '#todo-list-example',
        data: {
          newTodoText: '',
          todos: [
            'Do the dishes',
            'Take out the trash',
            'Mow the lawn'
          ]
        },
        methods: {
          addNewTodo: function () {
            this.todos.push(this.newTodoText);
            this.newTodoText = '';
          }
        }
      });
    可用'of'替代'in'作为分隔符 
      <div v-for="item of list"></div>
  v-show="bol"  作用与v-if类似 
    PS:'v-show'的元素会始终渲染并保持在DOM中[使用 display:none]
      v-show不支持<template>标签
      一般,'v-if'有更高的切换消耗而'v-show'有更高的初始渲染消耗,
      因此若需要频繁切换使用'v-show'较好,若在运行时条件不大可能改变则使用'v-if'较好 
      当条件变化时该指令触发过渡效果 
  v-if="bol"    条件渲染 
    在切换时元素及它的数据绑定/组件被销毁并重建 
    当条件变化时该指令触发过渡效果 
    <template>中使用'v-if'控制组件的渲染 
      <template v-if="ok">
        <h1>Title</h1>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </template>
  v-else-if="drctVal" 条件渲染 ['2.1.0'+] 
    v-else-if 必须跟在 v-if 或者 v-else-if之后
      <div v-if="type === 'A'"> A </div>
      <div v-else-if="type === 'B'"> B </div>
      <div v-else-if="type === 'C'"> C </div>
      <div v-else> Not A/B/C </div>
  v-else              条件渲染 
    PS:v-if用于条件判断,和v-else是一对
    'v-else'必须紧跟在'v-if'或者'v-else-if'的后面,否则它不能被识别
      <h1 v-if="ok">Yes</h1>
      <h1 v-else>No</h1>
  v-model="str"  双向绑定表单值 
    PS: 
    常见的表单: 
      'input[type="text"]'            
      'input[type="checkbox"]'        
      'input[type="radio"]'           
      <select>[select的option不支持]   
      <textarea>                      
    绑定单个'checkbox'复选框,获取值为'false'/'true' 
      <section id="checkbox">
        <input type="checkbox" value="获取到的不是改值" v-model="checked">
        {{ checked }}
      </section>
      data : {
        checked : true,
      },
      默认选中,通过点击切换,显示'true'或'false'
    绑定单个'checkbox'复选框并添加'ture-value'及'false-value'属性时,属性值和选中双向绑定 
      <section id="a">
        <input type="checkbox" v-model="val" :true-value="val1" :false-value="val2" >
        <br>
        {{val}}
      </section>
      var vm = new Vue({
        el : '#a',
        data : {
          val : '',
          val1 : '选中',
          val2 : '未选中',
        },
      });
      setTimeout(function(){
        vm.val = '选中';
      },2000);
    同时绑定多个'checkbox'复选框到同一个数组时,会将选中项的'value'存入数组中  
      <section id="a">
        <input type="checkbox" value="Jack" v-model="checkedNames">
        <input type="checkbox" value="John" v-model="checkedNames">
        <input type="checkbox" value="Mike" v-model="checkedNames">
        <div>Checked names: {{ checkedNames }}</div>
      </section>
      data: {
        checkedNames: []
      }
    绑定'radio'单选按钮,获取'value'值  
      <section id="a" >
        <input type="radio" value="One" v-model="picked">
        <input type="radio" value="Two" v-model="picked">
        <div>Picked: {{ picked }}</div>
        <input type="radio" value="1111" v-model="pick">
        <div>Picked: {{ pick }}</div>
      </section>
      data : {
        picked : '',
        pick : '22',
      },
    绑定<select>单选列表,获取到被选中项的'value'值  
      Example: 
        <select  v-model='key'>
          <option value="">{{val}}</option>
          // 当存在 value="xx" 时 , v-model 的值为 "xx",否则为val
          // 当 key 的值没有和 option 中 value 属性的值相等时,select无法显示出值
        </select>
      当选项中不存在被赋予的值时,会被默认重置为undefined
        <div id="slct">
          <select  v-model="slctVal">
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
          <span>Selected: {{ slctVal }}</span>
        </div>
        new Vue({
          el : '#slct',
          data : {
            slctVal : '1',
          },
          mounted : function(){
            var that = this;
            setTimeout(function(){
              that.slctVal = '11';
            },1000);
          },
        });
    绑定<select>多选列表,获取到选中项'value'组成的数组 
      <div id="slct">
        <select v-model="selected" multiple>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <div>Selected: {{ selected }}</div>
      </div>
    表单值为对象 
      <select v-model="selected"> 
        // <!-- 内联对象字面量 --> 
        <option v-bind:value="{ number: 123 }">123</option> 
      </select> 
      // 当选中时 
      typeof vm.selected // -> 'object'
      vm.selected.number // -> 123
  v-bind:attrname="str/arr/obj"  属性赋值[简写':attrname'] 
    PS: 在用于'class'和'style'时,VueJS专门增强了它 
      表达式的结果类型除了字符串之外,还可以是对象或数组
    str  表示属性值为str 
      <div id="app-2" :title="message">
        鼠标悬停几秒钟查看此处动态绑定的提示信息！
      </div>
      var app2 = new Vue({
        el: '#app-2',
        data: {
          message: '页面加载于 ' + new Date()
        }
      }); 
      // app2.message = '新消息';
      // 可通过更改 app2.message 的值来改变显示
    obj  key为属性名,val可为属性的值、函数判断或简单表达式 
      Example: 
        <div v-bind:class="{ active: isActive }"></div>
        'active'存在与否将取决于'isActive'是否为真 
      与普通的class属性共存 
        <div class="static" :class="{ c1: bol1,c2: bol2 }">
        </div>
        data: {
          bol1: true,
          bol2: false
        }
        渲染为: <div class="static active"></div>
      可直接绑定数据属性里的对象 
        <div id="test" v-bind:class="cls"></div>
        data: {
          cls: {
            c1: true,
            c2: false
          }
        }
    arr  表示该class的值为该数组中的多个 
      Example: 
      <div v-bind:class="[activeClass,errorClass]">
      data: {
        activeClass: 'active',
        errorClass: 'text-danger'
      }
      也可在数组语法中使用对象语法 
      <div v-bind:class="[{ active: isActive },errorClass]"> 
    :class="str/obj/arr"  'class'类样式[之前的class不会被覆盖]  
      用在组件上 
        在组件上用到class属性时,将被添加到根元素上面,元素上已经存在的类不会被覆盖 
        Vue.component('my-component',{
          template: '<p class="foo bar">Hi</p>'
        });
        // 使用 
        <my-component class="baz boo"></my-component>
        // 将被渲染成为 
        <p class="foo bar baz boo">Hi</p>
        // 同样的适用于动态绑定 
        <my-component :class="{ active: true }"></my-component>
        // 被渲染成为
        <p class="foo bar active"></p>
    :style="str/obj/arr"  'style'内联样式 
      obj  适用于添加多个样式,key为声明属性,val为声明值 
        可用短横分隔命名'kebab-case'或驼峰式'camelCase' 
          <div :style="{'background-color':color1,fontSize:fontSize+'px'}"></div>
          data: {
            color1: 'red',
            fontSize: 30
          }
        可为属性提供一个包含多个值的数组,常用于提供多个带前缀的值 ['2.3.0+']
          会渲染数组中最后一个被浏览器支持的值。
          <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
          如果浏览器支持不带浏览器前缀的 flexbox,那么渲染结果会是 display: flex 
      arr  将多个'样式对象'应用到一个元素上 
        data: {
          styleObj: {  // 样式对象 
            color: 'red',
            fontSize: '13px'
          }
        }
      自动添加前缀: Vue会自动添加相应的前缀 
  v-bind="obj"  无参数时,可绑定到一对象 
    PS: 此时class和style绑定不支持数组和对象 
    obj  一个包含"{attr:val}"键值对的对象 
    Example: 
    <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div> 
  v-on:ename="foo/expr" 事件处理与绑定[简写'@ename'] [事件名不区分大小写] 
    PS: 当一个ViewModel被销毁时,所有的事件处理器都会自动被删除,无须自己清理 
    foo    函数,事件触发时执行回调 
      函数未传参时,则默认传入经过vue包装过的event事件对象'e',等价与 foo($event)
        若有自定义传参,则默认参数被取消
      foo($event)   '$event'表示原生DOM事件对象 
        e.currentTarget 表示绑定事件的元素 
        e.srcElement    表示响应事件的元素 [可用来进行DOM操作[SlPt]]
        <button v-on:click="warn('11111',$event)">Submit</button>
        methods: {
          warn: function (message,event) {
            if (event){
              event.preventDefault()  // 可以访问原生事件对象
            } 
            alert(message)
          }
        }
      自定义传参: 除了直接绑定到一个方法,也可以用内联JS语句
        <div id="example-3">
          <button v-on:click="say('hi')">Say hi</button>
          <button v-on:click="say('what')">Say what</button>
        </div>
        new Vue({
          el: '#example-3',
          methods: {
            say: function (message) {
              alert(message)
            }
          }
        })
    expr   单条语句,事件触发时执行语句   
    无回调  
      <form v-on:submit.prevent></form> // 只有修饰符 
    Example: 
      <div id="test">
        <p>{{ message }}</p>
        <button v-on:click="reverseMsg">逆转消息</button>
      </div>
      var app5 = new Vue({
        el: '#test',
        data: {
          message: 'Hello VueJS!'
        },
        methods: {
          reverseMsg: function () {
            this.message = this.message.split('').reverse().join('');
          }
        }
      })    
  v-on="obj"  无参数时,可绑定到一对象  '2.4.0+'  
    PS: 使用对象语法时,不支持任何修饰器 
    obj 为'{事件:监听器}'键值对的对象 
    Example: 
    <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
  'Modifiers'修饰符: 让指令以特殊方式绑定,用于'v-on'、'v-model'、'v-bind' 
    PS:修饰符是以点号'.'指明的特殊后缀;指令可以串联;
    通用事件修饰符 
      .prevent 阻止默认行为,调用 event.preventDefault() 
        <form v-on:submit.prevent="onSubmit"></form>
        // <!-- 提交事件不再重载页面 -->
      .stop    阻止冒泡,调用 event.stopPropagation()
      .capture 使用事件捕获模式 
      .self    只当事件是从侦听器绑定的元素本身触发时才触发回调 
      .once    只触发一次回调 ['2.1.4+'] 
      .native   监听组件根元素的原生事件  
      .passive  以 { passive: true } 模式添加侦听器 '2.3.0+' 
    键鼠事件修饰符: 键盘事件时监测键值,鼠标事件时监测鼠标按键  
      记住所有的keyCode比较困难,所以Vue为最常用的按键提供了别名 
        <!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
        <input v-on:keyup.13="submit">
        <input v-on:keyup.enter="submit">
      Vue.config.keyCodes 全局对象,自定义按键修饰符别名 
        // 可以使用 v-on:keyup.f1
        Vue.config.keyCodes.f1 = 112;  // 单个定义
        Vue.config.keyCodes = {  // 同时定义多个
          v: 86,
          f1: 112,
          mediaPlayPause: 179,
          up: [38, 87]
        }
      同时监听多个按键 
        // <!-- Alt + C -->
        <input @keyup.alt.67="clear">
        // <!-- Ctrl + Click -->
        <div @click.ctrl="doSomething">Do something</div>
      ◆键盘
      .enter   Enter键,'.13'等价于'.enter'
      .tab     
      .delete  '删除'和'退格'键
      .esc     
      .space   
      .up      
      .down    
      .left   
      .right   
      .ctrl   ['2.1.0+']
      .alt    ['2.1.0+']
      .shift  ['2.1.0+']
      .meta   Mac上对应⌘;Windows上对应⊞ ['2.1.0+']
      ◆鼠标事件修饰符  ['2.2.0+'] 
      .left
      .right
      .middle
    'v-model'修饰符 
      .lazy   从input事件转变为在change事件中同步  
        // <!-- 在 "change" 而不是 "input" 事件中更新 -->
        <input v-model.lazy="msg" >
      .number 自动将用户的输入值转为'Number'类型[若转换结果为'NaN'则返回原值] 
        <input v-model.number="age" type="number">
        这通常很有用,因为在 type="number" 时 HTML 中输入的值也总是会返回字符串类型
      .trim   自动过滤用户输入的首尾空格 
        <input v-model.trim="msg">
    'v-bind'修饰符 
      .prop   被用于绑定DOM属性'property' 
      .sync   对子组件props双向绑定['2.0'移除,'2.3'加入]  [详见组件'prop'通信] 
        语法糖,会扩展成一个更新父组件绑定值的'v-on'侦听器 
      .camel  将kebab-case特性名转换为camelCase '2.1.0+' 
        将 v-bind 属性名称驼峰化,
        在使用字符串模板或通过 vue-loader/vueify 编译时,无需使用 .camel
        Example:  SVG 的 viewBox 属性：
        <svg :view-box.camel="viewBox"></svg>
  v-once  一次性插值[配合插值使用] 
    当数据改变时,插值处的内容不会更新
    <span v-once>值不会更新: {{ msg }}</span>
  v-cloak   该指令会保持在元素上直到关联实例结束编译 
    和 CSS 规则如 [v-cloak] { display: none } 一起用时,
    可隐藏未编译的'Mustache'标签直到实例准备完毕 
  v-pre   跳过该元素及其子元素的编译  
    可以用来显示原始'Mustache'标签,跳过大量没有指令的节点会加快编译 
'Custom Directives'自定义指令[在HTML中指定,不区分大小写] 
  v-name:arg.mdf1.mdf2="val"   用于对DOM元素进行底层操作 
  'name'  指令名称 
  'arg'   指令的参数,可选 
  'mdf'   指令的修改器,可选  
  'val'   指令的值,可选 
    指令值为对象字面量 
      指令函数能够接受所有合法类型的JS表达式 
      <div v-demo="{ color: 'white', text: 'hello!' }"></div>
      Vue.directive('demo', function (el, binding) {
        console.log(binding.value.color) // => "white"
        console.log(binding.value.text)  // => "hello!"
      })    
  Vue.directive('name',obj/foo) // 定义全局指令 
    name  指令名称 
    Obj   配置对象 
      { 
        hookName : function(){ }
        , ..
      }
    foo   简写为函数: 在'bind'和'update'钩子上做重复动作,而不关心其它的钩子函数 
      Vue.directive('color-swatch', function (el, binding) {
        el.style.backgroundColor = binding.value
      })
  directives: {                // 注册局部指令  
    focus: {
      // 指令的定义--- 
    }
  },               
  Example: 
    <div id="aoo"> <input v-focus > </div>
    Vue.directive('focus', {
      inserted: function (el) {
        el.focus();
        console.log(11111);
      }
    });
    new Vue({
      el : '#aoo',
    });
  ★hookName : function(el,binding,vnode,oldVnode){ }, 指令定义[钩子]函数 
    ◆hookName 钩子函数
    bind     指令初始化,指令第一次绑定到元素时调用,只调用一次 
    inserted 被绑定元素插入父节点时调用[父节点存在即可调用,不必存在于'document'中] 
    update   所在组件的VNode更新时调用 
      指令的值可能发生了改变也可能没有,
      但可通过比较更新前后的值绑定值'binds.value'和'binds.oldValue'来忽略不必要的模板更新 
      Example:  
        当DOM渲染有更新时
        <div id="demo1" >
          <input type="text"  v-test1>
          <button type="button"  @click="inputFocus">click</button>
          <span>{{inputIsFocus}}</span>
          <!-- // 是否存在span元素直接决定钩子函数是否执行 -->
        </div>
        或改为: 当指令的值有变化时 
        <div id="demo1" >
          <input type="text" v-test1="inputIsFocus">
          <button type="button" @click="inputFocus">click</button>
        </div>
        Vue.directive('test1', {
          update : function(el,binds,vn,oVn){
            el.focus();
            console.log(11);
          },
        });
        new Vue({
          el: '#demo1',
          data: {
            inputIsFocus : false,
          },
          methods : {
            inputFocus : function(){
              this.inputIsFocus = !this.inputIsFocus;
              console.log(this.inputIsFocus);
            },
          },
        })
    componentUpdated  所在组件的VNode及其孩子的VNode全部更新时调用  
    unbind   指令与元素解绑时调用,只调用一次 
    ◆钩子函数的参数 
      除了'el'外,其它参数都应该是只读的,尽量不要修改他们 
      若需要在钩子之间共享数据,建议通过元素的 dataset 来进行
    el       指令所绑定的元素,可以用来直接操作DOM 
      el.focus()   表单获得焦点
      el.select()  表单值被选中
    binding  对象,包含以下属性 
      'name'       指令名,不包括'v-'前缀[即'drct_name']  
      'value'      绑定值[即'drctVal'] 
        例如: v-my-directive="1 + 1", value 的值是 2
      'expression' 绑定值的字符串形式['drctVal'的字符串形式] 
        例如 v-my-directive="1 + 1" , expression 的值是 "1 + 1" 
      'arg'        传给指令的参数[即'drctArg'] 
        例如 v-my-directive:foo, arg 的值是 "foo"
      'modifiers'  一个包含修饰符的对象['mdf'组成的对象] 
        例如: v-my-directive.foo.bar, 
        修饰符对象 modifiers 的值是 { foo: true, bar: true }
      'oldValue'   指令绑定的前一个值,仅在'update'和'componentUpdated'钩子中可用 
        无论值是否改变都可用
    vnode    Vue编译生成的虚拟节点 
    oldVnode 上一个虚拟节点,仅在'update'和'componentUpdated'钩子中可用 
    Example:
      <div id="map" v-drct:arg.a.b="msg"></div>
      Vue.directive('drct', {
        bind: function (el, binds, vnode,oldVnode) {
          var s = JSON.stringify
          el.innerHTML = 
            'name: '       + s(binds.name) + '<br>' +
            'value: '      + s(binds.value) + '<br>' +
            'expression: ' + s(binds.expression) + '<br>' +
            'argument: '   + s(binds.arg) + '<br>' +
            'modifiers: '  + s(binds.modifiers) + '<br>' +
            'vnode keys: ' + Object.keys(vnode).join(',') +'<br>'+
            'oldVnode keys: ' + Object.keys(oldVnode).join(',') 
        }
      });
      new Vue({
        el: '#map',
        data: {
          msg: 'thisisamessage', 
        }
      });
      显示为:
      name: "drct"
      value: "thisisamessage"
      expression: "msg"
      argument: "arg"
      modifiers: {"a":true,"b":true}
      vnode keys: tag,data,children,text,elm,ns,context,functionalContext,key,componentOptions,componentInstance,parent,raw,isStatic,isRootInsert,isComment,isCloned,isOnce
      oldVnode keys: tag,data,children,text,elm,ns,context,functionalContext,key,componentOptions,componentInstance,parent,raw,isStatic,isRootInsert,isComment,isCloned,isOnce
'Mixins'混合: 分发Vue组件中可复用功能的方式 
  与混合对象含有同名选项时 
    同名钩子函数将混合为一个数组,故都将被调用;且混合对象的钩子将在组件自身钩子前调用 
    'methods'、'components'及'directives'等,将被混合为一个对象,冲突时,组件对象优先级高 
  Vue.mixin({..})  全局混合 
    PS: 一旦使用全局混合对象,将会影响到所有之后创建的 Vue 实例 
    Example: 
      Vue.mixin({
        created: function () {
          var myOption = this.$options.myOption // 为自定义的选项 'myOption' 注入一个处理器。
          if (myOption) {
            console.log(myOption)
          }
        }
      })
      new Vue({
        myOption: 'hello!'
      })
      // => "hello!"
  Vue.config.optionMergeStrategies  自定义选项合并策略 
    自定义选项将使用默认策略,即简单地覆盖已有值
    向 Vue.config.optionMergeStrategies 添加一个函数,以自定义逻辑合并
    Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
      // return mergedVal
    }
    对于大多数对象选项,可以使用 methods 的合并策略：
    var strategies = Vue.config.optionMergeStrategies
    strategies.myOption = strategies.methods 
    更多高级的例子可以在 Vuex 的 1.x 混合策略里找到：
    const merge = Vue.config.optionMergeStrategies.computed
    Vue.config.optionMergeStrategies.vuex = function (toVal, fromVal) {
      if (!toVal) return fromVal
      if (!fromVal) return toVal
      return {
        getters: merge(toVal.getters, fromVal.getters),
        state: merge(toVal.state, fromVal.state),
        actions: merge(toVal.actions, fromVal.actions)
      }
    }
'Tag'&'Attr'内置标签及属性
  ◆标签
  <component is="cptname"></component>   // 放置组件 
  <keep-alive ></keep-alive>  保留组件状态、避免重新渲染 
    PS: 抽象组件,自身不会渲染成DOM元素,也不会出现在父组件链中 
      当组件在<keep-alive>内被切换,
      其'activated'和'deactivated'这两个生命周期钩子函数将会被对应执行。
      在 2.2.0 及其更高版本中,activated和deactivated将会在<keep-alive>树内的所有嵌套组件中触发  
    ★Props：
    include="str/rgep/arr"  只有匹配的组件会被缓存       '2.1.0+'
    exclude="str/rgep/arr"  任何匹配的组件都不会被缓存   '2.1.0+'
    允许组件有条件地缓存,可使用逗号分隔字符串、正则表达式或一个数组来表示 
    匹配首先检查组件自身的 name 选项,
    如果 name 选项不可用,则匹配它的局部注册名称[父组件components选项的键值] 
    匿名组件不能被匹配。
    // <!-- 逗号分隔字符串 -->
    <keep-alive include="a,b">
      <component :is="view"></component>
    </keep-alive>
    // <!-- 正则表达式 (使用 `v-bind`) -->
    <keep-alive :include="/a|b/">
      <component :is="view"></component>
    </keep-alive>
    // <!-- 数组 (使用 `v-bind`) -->
    <keep-alive :include="['a', 'b']">
      <component :is="view"></component>
    </keep-alive>
  <transition ></transition>   // 过渡 
    ★Props 
    name="str"   用于自动生成 CSS 过渡类名。
      例如：name: 'fade' 将自动拓展为.fade-enter,.fade-enter-active等。默认类名为 "v"
    appear="bol" 是否在初始渲染时使用过渡。默认为 false。
    css="bol"    是否使用 CSS 过渡类。默认为 true 
      果设置为 false,将只通过组件事件触发注册的 JavaScript 钩子。
    type="keywords"   指定过渡事件类型,侦听过渡何时结束 
      默认VueJS将自动检测出持续时间长的为过渡事件类型 
      "transition" 
      "animation"。
    mode="keywords"   控制离开/进入的过渡时间序列 
      默认同时生效 
      "out-in" 
      "in-out" 
    enter-class="str"  
    leave-class="str"
    appear-class="str"
    enter-to-class="str"
    leave-to-class="str"
    appear-to-class="str"
    enter-active-class="str"
    leave-active-class="str"
    appear-active-class="str"
    ★Events  
    before-enter="foo"
    before-leave="foo"
    before-appear="foo"
    enter="foo"
    leave="foo"
    appear="foo"
    after-enter="foo"
    after-leave="foo"
    after-appear="foo"
    enter-cancelled="foo"
    leave-cancelled="foo"    [v-show only]
    appear-cancelled="foo"
  <transition-group></transition-group>  // 过渡 
    <transition-group>元素作为多个元素/组件的过渡效果。
    <transition-group> 渲染一个真实的DOM元素。
    默认渲染 <span>,可以通过 tag 属性配置哪个元素应该被渲染。
    每个 <transition-group> 的子节点必须有独立的'key' ,动画才能正常工作
    <transition-group> 支持通过 CSS transform 过渡移动。
    当一个子节点被更新,从屏幕上的位置发生变化,它将会获取应用 CSS 移动类 ,
    通过 name 属性或配置 move-class 属性自动生成。
    如果 CSS transform 属性是“可过渡”属性,当应用移动类时,
    将会使用 FLIP 技术 使元素流畅地到达动画终点。
    ★Props：
    tag="str"  默认为'span'
    move-class="str"  覆盖移动过渡期间应用的CSS类 
    除了'mode',其他特性和 <transition> 相同。
    ★Events 
    <transition> 相同。
    Example: 
    <transition-group tag="ul" name="slide">
      <li v-for="item in items" :key="item.id">
        {{ item.text }}
      </li>
    </transition-group>
  <slot name="slotName"></slot>         // 插槽  
  <template></template>    HTML5标签 
  ◆属性 
  key="arg"  标识DOM节点 
    管理元素复用 
      Vue尽可能高效的渲染元素,通常会复用已有元素[而不是从头开始渲染]
      <div id="bbb">
        <template v-if="loginType === 'username'">
          <label>Username</label>
          <input placeholder="Enter your username">
        </template>
        <template v-else>
          <label>Email</label>
          <input placeholder="Enter your email address">
        </template>
      </div>
      var vm = new Vue({
        el : '#bbb',
        data : {
          loginType : 'username',
        },
      });
      setTimeout(function(){
        vm.loginType = '1'
      },5000);
      两个模版由于使用了相同的元素,<input>会被复用,仅仅是替换了他们的'placeholder'
      初始在表单中输入值,当切换渲染后表单中存在之前的输入 
      可通过添加属性'key'来控制是否复用元素[key 必须带有唯一的值]
      <div id="bbb">
        <template v-if="loginType === 'username'">
          <label>Username</label>
          <input placeholder="Enter your username" key="input1">
        </template>
        <template v-else>
          <label>Email</label>
          <input placeholder="Enter your email address" key="input2">
        </template>
      </div>
      var vm = new Vue({
        el : '#bbb',
        data : {
          loginType : 'username',
        },
      });
      setTimeout(function(){
        vm.loginType = '1'
      },5000);
      初始在表单输入的值,在5s后消失[input元素被重新渲染了]
      当两个'key'值相同时,相当与没有'key'时的默认情况 
      但<label> 元素仍然会被高效地复用,因为它们没有添加 key 属性。
  is="arg"   指定组件 
  ref="str"  给元素或子组件注册引用信息 
    引用信息将会注册在父组件的 $refs 对象上。
    如果在普通的 DOM 元素上使用,引用指向的就是 DOM 元素；
    如果用在子组件上,引用就指向组件实例：
    Example: 
    <p ref="p">hello</p>    //  vm.$refs.p 为DOM节点 
    <cpt-a ref="child"></cpt-a>  // vm.$refs.child 为Vue实例 
  slot="str" 
'Component'组件 
  PS: 组件的'data'需是一个函数 
    需在插入的Vue实例前定义[否则要触发该实例的任意一组件渲染,如通过'v-if'],才会渲染出该组件 
  Vue.component('cpt-name',options)  // 注册全局组件  
    'cpt-name' 组件名称,推荐使用小写,且包含一个短杠 
    options 
      ◆配置对象,相当于new Vue(options)的options  
      template: HTMLStr,   组件的HTML代码
      props: strArr/obj,   自定义属性 
        strArr  ['attr1','att2',...]
          this.xx 获取到值 
      name: 'aoo',         // 命名组件 [Self] 
      data: function(){ return obj; } 组件的数据存放,但必须为一函数 
        Example: 
          Vue会停止,并在控制台发出警告,在组件中data必须是一个函数 
          Vue.component('my-component',{
            template: '<span>{{ message }}</span>',
            data: {
              message: 'hello'
            }
          })
          使用如下方式来决解该情况:
          <div id="example-2">
            <simple-counter></simple-counter>
            <simple-counter></simple-counter>
            <simple-counter></simple-counter>
          </div>
          var data = { counter: 0 }
          Vue.component('simple-counter',{
            template: '<button v-on:click="counter += 1">{{ counter }}</button>',
            // 技术上 data 的确是一个函数了,因此 Vue 不会警告,
            // 但是我们返回给每个组件的实例的却引用了同一个data对象
            data: function () {
              return data
            }
          })
          new Vue({
            el: '#example-2'
          })
          这三个组件共享了同一个 data ,因此 counter 会影响所有组件！
          通过为每个组件返回全新的 data 对象来取消同步
          data: function () {
            return {
              counter: 0
            }
          }
          现在每个 counter 都有它自己内部的状态了:
      // ...
      ◆f(resolve,reject) 异步组件 
        function(resolve,reject){
          $.get("./head.html").then(function (res) {
            resolve({
              template: res
            })
          });
        }, 
    Example: 
      定义名为<todo-item>的新组件
      Vue.component('todo-item',{
        template: '<li>这是个待办项</li>'
      })
      用其构建另一个组件模板 
      <ol>
        // <!-- 创建一个 todo-item 组件的实例 -->
        <todo-item></todo-item>
      </ol>
      将数据从父作用域传到子组件让我们来修改一下组件的定义,使之能够接受一个属性:
      Vue.component('todo-item',{
        // todo-item 组件现在接受一个
        // "prop",类似于一个自定义属性
        // 这个属性名为 todo
        props: ['todo'],
        template: '<li>{{ todo.text }}</li>'
      })
      使用 v-bind 指令将待办项传到每一个重复的组件中:
      <div id="app-7">
        <ol>
          // <!-- 现在我们为每个todo-item提供待办项对象    -->
          // <!-- 待办项对象是变量,即其内容可以是动态的 -->
          <todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
        </ol>
      </div>
      Vue.component('todo-item',{
        props: ['todo'],
        template: '<li>{{ todo.text }}</li>'
      })
      var app7 = new Vue({
        el: '#app-7',
        data: {
          groceryList: [
            { text: '蔬菜' },
            { text: '奶酪' },
            { text: '随便其他什么人吃的东西' }
          ]
        }
      })
  'components': {     // vue实例中局部注册[仅能在该实例/组件的作用域中使用] 
    'cpt-name1' : cpt, 
      cpt 可为:   
      import xx from "./cpt.js";  // 模块化引入的组件
      Vue.component(cpt,{})       // 定义的全局组件 
      {                           // 通过对象来配置的组件 
        template: '<div>A custom component! {{aoo}}</div>',
      }
    // ..
  }, 
  <cpt-name></cpt-name>    在父组件中指定子组件位置 
    要确保在初始化根实例之前注册了组件 
    Example: 
      <div id="example">
        <cpt-child></cpt-child>
      </div>
      // 注册
      Vue.component('cpt-child',{
        template: '<div>A custom component!</div>'
      })
      // 创建根实例,否则不生效
      new Vue({
        el: '#example'
      })
  <tag is="cptname"></tag> 在父组件中指定子组件位置 
    :is="cptname"属性实现动态组件 
      <div id="parent">
        <button type="button" name="button" @click='changeFoo' >switchBtn</button>
        <div v-bind:is="changeFlag"> </div>
      </div>
      new Vue({
        el: '#parent',
        components: {
          aoo: { 
            template : '<span>aaa</span>'
          },
          boo: { 
            template : '<h1>bbb</h1>'
          },
          coo: { 
            template : '<div>ccc</div>'
          },
        },
        data: {
          changeFlag: 'boo'
        },
        methods : {
          changeFoo : function(){
            if (this.changeFlag == 'aoo') {
              this.changeFlag = 'boo'
            }
            else if (this.changeFlag == 'boo') {
              this.changeFlag = 'coo';
            }
            else {
              this.changeFlag = 'aoo';
            }
            console.log(this.changeFlag);
          }
        },
      });
  <keep-alive> 缓存切换的组件
    把切换出去的组件保留在内存中,保留其状态或避免重新渲染;
    <keep-alive>
      <component :is="currentView">
        <!-- 非活动组件将被缓存！ -->
      </component>
    </keep-alive>
  组件元素可能的限制 
    像这些元素 <ul> ,<ol>,<table> ,<select> 限制了能被它包裹的元素,
    而一些像 <option> 这样的元素只能出现在某些其它元素内部
    在自定义组件中使用这些受限制的元素时会导致一些问题,例如:
      <table>
        <my-row>...</my-row>
      </table>
      自定义组件 <my-row> 被认为是无效的内容,因此在渲染的时候会导致错误
      变通的方案是使用特殊的'is'属性:
      <table>
        <tr is="my-row"></tr>
      </table>
    若使用来自以下来源之一的字符串模板,这些限制将不适用:
      <script type="text/x-template">
      JavaScript内联模版字符串
      .vue 组件
  组件通信 
    'props down'父组件向子组件通信: 父组件中,子组件标签上设置属性 
      PS: 子组件VM中注册'props'属性[进行监听], 
        当父组件赋给属性的值,子组件可获取到 
        组件实例的作用域是孤立的,不能在子组件的模板内直接引用父组件的数据;
      Example:
        Vue.component('cpt-child',{
          // 声明 props
          props: ['message'],
          // 就像 data 一样,prop 可以用在模板内
          // 同样也可以在 vm 实例中像 “this.message” 这样使用
          template: '<span>{{ message }}</span>'
        })
        传入一个普通字符串:
        <cpt-child message="hello!"></cpt-child>
        结果: hello!
      'v-bind'动态属性: 当父组件的数据变化时,子组件中也会更新 
        <div id="parent">
          <input v-model="parentMsg"> <br>
          <cpt-child :my-message="parentMsg"></cpt-child>
        </div>
        Vue.component('cpt-child',{
          // camelCase in JavaScript
          props: ['myMessage'],
          template: '<span>{{ myMessage }}</span>'
        })
        new Vue({
          el: '#parent',
          data:{
            parentMsg : '',
          }
        })
      'props'单向数据流:当父组件的属性变化时,将传导给子组件,但是不会反过来, 
        每当父组件更新时,子组件的所有 prop 都会更新为最新值,
        而在子组件内部改变 prop,Vue 会在控制台给出警告;
        在js中对象和数组是引用类型,指向同一个内存空间,
        若 prop 是一个对象或数组,在子组件内部改变它会影响父组件的状态;
      'Prop验证': 在子组件中定义接收的'props'的规格 
        若传入的数据不符合规格,Vue会发出警告[开发版本] 
        props校验会在组件实例创建前进行,故在 default 或 validator 函数里,
        诸如 data、computed 或 methods 等实例属性还无法使用 
        Vue.component('example',{
          props: {   // 采用对象的形式 
            propA: Number,          // str,单类型检测  
              // null 则表示任何类型都可以
            propB: [String,Number], // arr,可为多种类型 
            propC: {                // obj,详细配置 
              type: String,  // 类型 
                // String
                // Number
                // Boolean
                // Function
                // Object
                // Array
                // Symbol
                // 自定义构造器函数,使用 instanceof 检测 
              validator: function (value) {  // // 自定义验证函数
                return value > 10
              },
              required: true,  // 必须的 
              default: 100,    // 默认值 
              default: function () { // 数组／对象的默认值应当由一个工厂函数返回
                return { 
                  message: 'hello' 
                };
              },
            },
        })
      通过自定义事件的监听和触发来达到同样的效果[SlPt] 
    'events up'子组件向父组件通信: 父组件中,子组件标签上绑定自定义事件  
      子组件内通过'$emit'触发绑定父组件中子组件标签上的事件  
      childVm.$emit('event-name',data) 触发事件,传递数据'data'
      Example: 
        <div id="p">
          <p>{{ total }}</p>
          <cpt-aoo v-on:fromChild="foo"></cpt-aoo>
        </div>
        Vue.component('cpt-aoo', {
          template: '<button v-on:click="clickFoo">{{ counter }}</button>',
          data: function () {
            return {
              counter: 0
            }
          },
          methods: {
            clickFoo: function () {
              this.counter += 1
              this.$emit('fromChild')
            }
          },
        })
        new Vue({
          el: '#p',
          data: {
            total: 0
          },
          methods: {
            foo: function () {
              this.total += 1
            }
          }
        })
    :<propname>.sync="<parentVal>" 父子组件双向通信 
      配合: <childVm>.$emit('update:<propname>',<data>) 改变父组件'<parentVal>'值为<data> 
      <div id="p">
        <div >{{msg}}</div>
        <cpt-aoo :prop1.sync="msg"></cpt-aoo>
      </div>
      Vue.component("cpt-aoo",{
        template : `
          <div>
            <div >{{prop1}}</div> 
            <div @click=cFoo1>click me</div>
          </div> `,
        props : ['prop1'],
        methods : {
          cFoo1: function(){
            this.$emit('update:prop1','bbbb')
          },
        },
      });
      new Vue({
        el : '#p',
        data : {
          msg: 'aaa',
        },
      });
    非父子组件通信: 事件注册与触发/Vuex  
      简单场景下,用一Vue实例作为中央事件总线  
        var bus = new Vue();
        bus.$emit('custom-event',data); // 触发事件
        bus.$on('custom-event',function (data) { // 监听事件
          // ...
        })
      复杂情况下,使用专门的状态管理模式Vuex 
  非'prop'属性: 可以直接传入组件,而不需要定义相应的'prop' 
    PS: 一般的,传递给组件的值会覆盖组件本身设定的值,
      但'class'和'style'这两个特性的值都会做'merge'合并操作 
    Example: 
      <cpt-aoo style="color:red;"></cpt-aoo> // 在子组件中会直接生效 
  'slot' & <slot> 分发内容: 父组件定制子组件内容,父子组件模版通信 
    PS: 子组件模板需有一个<slot>插口,否则父组件的内容将会被丢弃; 
      父组件中子组件标签内定义的内容将换掉子组件内定义的没有属性的<slot>标签本身;
      在<slot>标签中的任何内容都被视为备用内容,没有要替换的内容时才显示备用内容;
    父组件中: 子组件标签内定制HTML片段[可用'slot'属性具名] 
    子组件中: 通过<slot>标签指定替换的位置及默认内容[用'name'属性具名] 
    编译作用域、组件作用域 
      父组件模板的内容在父组件作用域内编译;子组件模板的内容在子组件作用域内编译; 
      分发内容是在父作用域内编译 
    <tag/> & <slot> 插槽  
      Example: 
        // 父组件模版
        <div>
          <h1>父组件</h1>
          <cpt-child>
            <p>这是一些初始内容</p>
            <p>这是更多的初始内容</p>
          </cpt-child>
        </div>
        // 子组件
        <div>
          <h2>子组件</h2>
          <slot> 当没有要分发的内容时会显示 </slot>
        </div>
        // 渲染结果
        <div> 
          <h1>父组件</h1>
          <div>
            <h2>子组件</h2>
            <p>这是一些初始内容</p>
            <p>这是更多的初始内容</p>
          </div>
        </div>
    <tag slot="aoo"></tag> & <slot name="aoo"> 具名插槽 
      PS: 子组件中'name'的值和父组件中'slot'的值进行匹配,相等则将子组件的<slot>替换; 
        可以有一个匿名slot,为默认slot,作为找不到匹配的内容片段的备用插槽
        若没有默认的slot,这些找不到匹配的内容片段将被抛弃;
      Example:
        // 子组件
        <div class="container">
          <header> <slot name="header"></slot> </header>
          <main>   <slot></slot> </main>
          <footer> <slot name="footer"></slot> </footer>
        </div>
        // 父组件模版
        <cpt-child>
          <h1 slot="header">这里可能是一个页面标题</h1>
          <p>主要内容的一个段落</p>
          <p>另一个主要段落</p>
          <p slot="footer">这里有一些联系信息</p>
        </cpt-child>
        // 渲染结果 
        <div class="container">
          <header>
            <h1>这里可能是一个页面标题</h1>
          </header>
          <main>
            <p>主要内容的一个段落</p>
            <p>另一个主要段落</p>
          </main>
          <footer>
            <p>这里有一些联系信息</p>
          </footer>
        </div>
    <template scope="aoo"><template> & <slot boo="val">  作用域插槽['2.1.0+'] 
      从子组件插槽中接收数据来定义子组件插槽的渲染结果 
      在父组件中,通过'scope'属性的值'aoo'来获取对应子组件'boo'属性的值  
      作用域插槽也可以是具名的['slot'属性]; 
      Example: 
        // 父组件中 
        <child>
          <template scope="props">
            <span>hello from parent</span> 
            <span>{{ props.text }}</span>
          </template>
        </child>
        // 子组件中 
        <div class="child"> 
          <slot text="hello from child"></slot>
        </div>
        // 渲染结果为: 
        <div class="child"> 
          <span>hello from parent</span>
          <span>hello from child</span>
        </div>
        
        定义子组件的列表渲染 
        // 父组件 
        <div id="p">
          <cpt-aoo :items="items">
            <template slot="aoo" scope="scp1">
              <li >{{ scp1.id+':'+scp1.text }}</li>
            </template>
          </cpt-aoo>
        </div>
        // 子组件 
        <ul>
          <slot name="aoo" v-for="(item,idx) in list" :text="item" :id="idx">
            // <!-- 这里写入备用内容 -->
          </slot>
        </ul>    
        Vue.component("cpt-aoo",{
          template : `   
            <ul>
              <slot name="coo" v-for="item in items" :text="item"> </slot>
            </ul> `,
          props : ['items'],
        });
        new Vue({
          el: '#p',
          data: {
            items: [
              'aaa',
              'bbb',
              'ccc',
            ]
          },
        });    
  'ref'子组件索引 
    PS: 使用'ref'为子组件指定索引ID,便于JS直接访问子组件;
      当 ref 和 v-for 一起使用时,ref 是一个数组或对象,包含相应的子组件
      $refs 只在组件渲染完成后才填充,并且它是非响应式的,
      仅仅作为一个直接访问子组件的应急方案,应当避免在模版或计算属性中使用 $refs 
    Example:
      <div id="parent">
        <cpt-aoo ref="aaa"></cpt-aoo>
      </div>
      var parent = new Vue({ el: '#parent' })
      var child = parent.$refs.aaa // 访问子组件
  异步组件 
    PS: Vuejs允许将组件定义为一个工厂函数,动态地解析组件的定义 
    只在组件需要渲染时触发工厂函数,并且把结果缓存起来,用于后面的再次渲染 
      可通过 v-if="true"渲染来触发工厂函数 
      当vm中任意一组件渲染都会渲染所有其他子组件 
    Vue.component('async-example',function (resolve,reject) {
      setTimeout(function () { // setTimeout只是为了演示异步获取组件  
        resolve({ // 组件的配置对象 
          template: '<div>I am async! {{msg}}</div>',
          data: {
            msg: 'xx'
          }
        })
        // 也可调用 reject(reason) 指示加载失败  
      },1000)
    })
    使用Webpack的代码分割功能 
      Vue.component('async-webpack-example', function (resolve) {
        // 这个特殊的 require 语法告诉 webpack
        // 自动将编译后的代码分割成不同的块,
        // 这些块将通过 Ajax 请求自动下载 
        require(['./my-async-component'], resolve)
      })
      Webpack2+ES2015 的语法返回一个 Promise resolve 函数：
      Vue.component( 'async-webpack-example',
        () => import('./my-async-component')
      )
      局部注册时也可以直接提供一个返回 Promise 的函数 
      new Vue({
        // ...
        components: {
          'my-component': () => import('./my-async-component')
        }
      })        
    高级异步组件 ['2.3.0+'] 
      Vue.component("xx",() => ({ 
        component: import('./MyComp.vue'), // 需要加载的组件。应当是一个 Promise
        loading: LoadingComp, // loading 时应当渲染的组件
        error: ErrorComp, // 出错时渲染的组件
        delay: 200, // 渲染 loading 组件前的等待时间。默认：200ms。
        timeout: 3000, // 最长等待时间。超出此时间则渲染 error 组件。默认：Infinity
      }));
      当一个异步组件被作为 vue-router 的路由组件使用时,这些高级选项都是无效的,
      因为在路由切换前就会提前加载所需要的异步组件。
      如果要在路由组件中使用上述写法,需要使用 vue-router '2.4.0+'
  'Recursive Components'递归组件: 当有'name'选项时,组件在其模板内可递归调用自己 
    使用 Vue.component 全局注册组件,其全局的ID使用其name选项值,被自动设置;
    若不谨慎,递归组件可能导致死循环 
      name: 'stack-overflow',
      template: '<div><stack-overflow></stack-overflow></div>'
      导致错误 “max stack size exceeded” ,
      要确保递归调用有终止条件[如递归调用时使用 v-if 最终返回 false] 
  'Circular References Between Components'组件间循环引用: 两个组件互为对方的父、子节点 
    使用'Vue.component'注册为全局组件时,框架会自动解决依赖的矛盾 
    使用'Webpack'或'Browserify'等模块化管理工具,requiring/importing时,会报错:
      'Failed to mount component: template or render function not defined.'
      决解办法: 在'beforeCreate'钩子中解决依赖问题 
      beforeCreate: function () {
        this.$options.components.aoo = require('./boo.vue')..default
      }
  <template id="">在HTML中写组件的标签内容    
    PS: 当组件中内容过多,在JS中书写组件模版太过繁琐,可通过<template>在HTML中书写; 
      需定义在Vue实例范围外[浏览器默认不解析其内容],否则会被解析; 
      <template>不能用在<table>内; 
      适用于全局组件和局部组件,且'data'属性需采用函数返回值的形式  
    定义组件时,通过id选择器来指定在HTML中书写的模版 
      <body>
        // <!-- 使用 template 并且添加选择器 [只能使用id] -->
        <template id="myTemp">
          // template 内只能有一个标签,否则只渲染第一个标签,
          // 第一个标签前的非标签内容不会显示,如一段文字等  
          <div>   
            <h2>This is Template </h2>
            <p>{{msg}}</p>
          </div>
        </template>
        <div id="app">
          <my-component></my-component>
          <my-component></my-component>
        </div>
      </body>
      <script>
        Vue.component("my-component", {
          template:"#myTemp", //对应上面定义的template标签中的选择器
          data: function(){
            return {
              msg: 'aaaa'
            };
          }
        })
        new Vue({
          el:"#app"
        });
      </script>
  'v-once'对低开销的静态组件使用  
    当组件中包含大量静态内容时,可使用'v-once'将渲染结果缓存起来
    Vue.component('terms-of-service',{
      template: '\
        <div v-once>\
          <h1>Terms of Service</h1>\
          ... a lot of static content ...\
        </div>'
    })    
  'inline-template'内联模版 
    父组件内,在子组件标签上添加'inline-template'特性,
    子组件标签内的HTML将被作为子组件的模版,而非将其作为分发内容 
    但'inline-template'让模板的作用域难以理解 
    最佳实践是使用 template 选项在组件内定义模板或在'.vue'文件中使用 template 元素
    <my-component inline-template>
      <div>
        <p>These are compiled as the components own template.</p>
        <p>Not parents transclusion content.</p>
      </div>
    </my-component>
  <script type="text/x-template" id="aoo"></script>'X-Templates' 
    在JS标签里使用'text/x-template'类型,且指定一id定义模版 
    在有很多模版或小的应用中有用,否则应该避免使用,因为它将模版和组件的其他定义隔离了 
    <script type="text/x-template" id="aoo">
      <p>Hello hello hello</p>
    </script>
    Vue.component('hello-world',{
      template: '#aoo'
    })
  'v-once' 将包含大量静态内容的组件缓存起来,提高渲染速度  
    Vue.component('cpt-aoo', {
      template: '\
        <div v-once>\
          <h1>Terms of Service</h1>\
          ... a lot of static content ...\
        </div>',
    })
'.vue'单文件组件 
  PS: 使用一个'.vue'格式文件将'HTML''CSS''JS'组装起来,方便开发,也方便复用和维护;
    一个'.vue'文件就是一个组件;
    组件的通信方式同样使用'props'和'event' 
    单文件组件的写法需要编译工具才能最终在浏览器端工作;
  Example: 
    <template>
      <div class="my-component">
        <h2>Hello from {{ msg }}</h2>
        <other-component></other-component>
      </div>
    </template>
    <script>
      // 遵循 ES6 模块格式
      import otherComponent from './other-component';
      // 导出组件定义
      export default {
        data: function () {
          return {
            msg: 'vue-loader'
          }
        },
        components: {
          'other-component': otherComponent
        }
      }
      
      // CommonJS 模块格式
      // var otherComponent = require('./other-component');
      // 导出组件定义
      // module.exports = {
      //   data: function () {
      //     return {
      //       msg: 'vue-loader'
      //     }
      //   },
      //   components: {
      //     'other-component': otherComponent
      //   }
      // }
    </script>
    <style>
      ...
    </style>
  <style scoped></style>  保证组件内的CSS只对该组件起作用 
  lang="" 使用预处理器 
    在'.vue'文件中使用其他预处理器[需安装对应的loader] 
    当使用 lang="less" 即使用Less,需安装如下依赖
    npm i -g css-loader less less-loader --save-dev
    <template lang="jade">
      div.my-component
      h2 Hello from {{msg}}
    </template>
    <script lang="babel">
      // 利用 Babel 编译 ES2015
      export default {
        data () {
          return {
            msg: 'Hello from Babel!'
          }
        }
      }
    </script>
    <style lang="less">
      .my-component{
        background-color : bule;
        .child{
          background-color:green;
        }
      }
    </style>
'Transition'过渡效果 
  会产生过渡效果的条件: 
    条件渲染 [使用 v-if]
    条件展示 [使用 v-show]
    动态组件 
    组件根节点 
  应用过渡效果的方式: 
    在CSS过渡和动画中自动应用'class' 
    在过渡钩子函数中使用JS操作DOM  
    配合使用第三方CSS动画库,如 Animate.css 
    配合使用第三方js动画库,如 Velocity.js 
  <transition name='xx'>过渡封装组件: 将需过渡的标签块放置于<transition>内 
    原理 
      当插入或删除包含在<transition>组件中的元素时,
      Vue会自动嗅探目标元素是否应用了CSS过渡或动画,
      在恰当的时机添加/删除CSS类名。
      若过渡组件提供了JS钩子函数,这些钩子函数将在恰当的时机被调用。
      若没有找到JS钩子并且也没有检测到CSS过渡/动画,
      DOM操作[插入/删除]在下一帧中立即执行。
  ◆CSS过渡&CSS动画  
    PS: 可给任何元素和组件添加'entering'进入/'leaving'离开的过渡效果 
    用于过渡控制的class类名 
      'v-xx'为类名的默认名称,可对所有无'name'属性的<transition>组件生效,
      使用<transition name="aoo">,'name'属性可重置前缀,如'v-enter'替换为'aoo-enter'
      有6个CSS类名在'enter'&'leave'的过渡中切换 
      'v-enter'    enter的开始状态: 在enter开始时添加,下一帧移除 
      'v-enter-active'  enter的过程: 在enter开始时添加,enter完成后移除 
        在元素整个enter的过渡过程中生效 
        该类可被用来定义过渡的过程时间,延迟和曲线函数 
      'v-enter-to' enter的结束状态: 删除'v-enter'的同时添加,enter完成后移除 ['2.1.8+'] 
      'v-leave'    leave的开始状态: 在leave开始时添加,下一帧移除 
      'v-leave-active'  leave的过程: 在leave开始时添加,leave完成后移除 
        在元素整个leave过程中作用
        这个类可以被用来定义过渡的过程时间,延迟和曲线函数 
      'v-leave-to' leave的结束状态: 删除'v-leave'的同时添加,leave完成后移除 ['2.1.8+'] 
    CSS过渡: 主要使用CSS3的'transition'来实现 
      Example:
        .fade1-enter-active, .fade1-leave-active {
          transition: opacity 0.5s;
        }
        .fade1-enter, .fade1-leave-to {
          opacity: 0
        }
        .fade2-enter-active, .fade2-leave-active {
          transition: all 1s ease-out;
        }
        .fade2-enter {
          transform:translateY(-900px);
          /* 若使用 position 的 top等属性,则不会被 transition 产生过渡效果 */
        }
        .fade2-leave-to {
          transform:translateY(900px);
        }
        <div id="demo">
          <button v-on:click="show=!show"> Toggle </button>
          <transition name="fade1">
            <p v-if="show">Hello</p>
          </transition>
          <transition name="fade2">
            <p v-if="show">Word</p>
          </transition>
        </div>
        new Vue({
          el: '#demo',
          data: {
            show: true
          }
        })
    CSS动画: 主要使用CSS3的'animation'来实现 
      用法类似CSS过渡,
      区别: 在动画中'v-enter'类名在节点插入DOM后不会立即删除, 
      而是在'animationend'事件触发[即动画进入动画结束]时删除 
      Example: 
        p{ background : #aaa; }
        .bounce-enter-active { animation: in 1.5s; }
        .bounce-leave-active { animation: out 1.5s; }
        @keyframes in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes out {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(0);
          }
        }
        <div id="example-2">
          <button @click="show = !show">Toggle show</button>
          <transition name="bounce">
            <p v-if="show">Look at me!</p>
          </transition>
        </div>
        new Vue({
          el: '#example-2',
          data: {
            show: true
          }
        })
    自定义过渡/动画类名 
      可通过以下特性来自定义过渡类名:
        PS: 其优先级高于普通的类名,对于Vue的过渡系统和其他第三方CSS动画库结合十分有用
      enter-class=""         
      enter-active-class=""  
      enter-to-class  '2.1.8+' 
      leave-class=""         
      leave-active-class=""  
      leave-to-class '2.1.8+' 
      Example:
        <link href="https://unpkg.com/animate.css@3.5.1/animate.min.css" rel="stylesheet" type="text/css">
        <div id="example-3">
          <button @click="show = !show"> Toggle render </button>
        <transition
        name="custom-classes-transition"
        enter-active-class="animated tada"
        leave-active-class="animated bounceOutRight"
        >
          <p v-if="show">hello</p>
        </transition>
        </div>
        new Vue({
          el: '#example-3',
          data: {
            show: true
          }
        })
  ◆JS过渡&动画 
    PS: 可以是'transitionend'或'animationend'[取决于给元素应用的CSS规则] 
      使用其中任何一种,Vue能自动识别类型并设置监听 
    type="animation/transition" 明确声明需监听的类型 
      在一些场景中,需要给同一个元素同时设置两种过渡动效,
      比如'animation'很快的被触发并完成了,而'transition'效果还没结束 
    JS钩子:  
      'before-enter'     enter之前 
      'enter'            enter过程 
      'after-enter'      enter结束 
      'enter-cancelled'  enter取消 
      'before-leave'     leave之前 
      'leave'            leave过程 
      'after-leave'      leave结束
      'leave-cancelled'  leave取消 
    操作流程: <transition>中绑定JS钩子事件,在vm实例中定义钩子函数执行过渡或动画   
      <transition 
        @:before-enter="beforeEnter"
        @:enter="enter"
        @:after-enter="afterEnter"
        @:enter-cancelled="enterCancelled"
        @:before-leave="beforeLeave"
        @:leave="leave"
        @:after-leave="afterLeave"
        @:leave-cancelled="leaveCancelled" 
        :css="false"> // <!--  :css="false" 避免CSS过渡的影响-->
        // <!-- ... -->
      </transition>
      methods: {
        beforeEnter: function (el) { // el 表示 <transition>元素 
        },
        // 此回调函数是可选项的设置
        // 与 CSS 结合时使用
        enter: function (el, done) {
          // ...
          done() // 表示进入过程结束,必须要调用的 
        },
        afterEnter: function (el) {
        },
        enterCancelled: function (el) {
        },
        beforeLeave: function (el) {
        },
        // 此回调函数是可选项的设置
        // 与 CSS 结合时使用
        leave: function (el, done) {
          // ...
          done() // 表示离开过程结束,必须要调用的 
        },
        afterLeave: function (el) {
        },
        // leaveCancelled 只用于 v-show 中 
        leaveCancelled: function (el) {
        }
      }
      这些钩子函数可以结合 CSS transitions/animations 使用,也可以单独使用 
      当只用JS过渡的时候,在'enter'和'leave'中,回调函数'done'是必须的 
      否则,它们会被同步调用,过渡会立即完成 
      若仅使用JS过渡,则可添加 :css="false",跳过CSS的检测,避免CSS的影响 
    Example: 
      使用jQuery动画 
      .pos{ // 定义预先的位置 
        position: absolute;
        top: 100px;
        left: 200px;
        width: 100px;
        height: 100px;
        background-color: #b9e4e7;
      }
      <div id="demo"> 
        <button v-on:click="show=!show"> Toggle </button>
        <transition 
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        :css="false"> 
          <div class="pos" v-show="show">123321</div>
        </transition>
      </div>
      new Vue({
        el: '#demo'
        ,data: {
          show: true,
        }
        ,methods : {
          beforeEnter : function(el){
            $(el).css({
              left : '-100px',
              opacity : 0
            })
          }
          ,enter : function(el,done){
            $(el).animate({
              left : '200px',
              opacity : 1
            }
            ,{
              duration : 1500,
              complete : done
            })
          }
          ,leave : function(el,done){
            $(el).animate({
              left : '500px',
              opacity : 1 
            }
            ,{
              duration : 1500,
              complete : done
            })
          },
        }
      })
  :duration="num/{enter:num1,leave:num2}" 定义过渡持续时间[单位ms] ['2.2.0+'] 
    PS: 默认为根元素的第一个'transitionend'或'animationend'事件
    <transition :duration="1000">...</transition>
    // 也可定制进入和移出的持续时间 
    <transition :duration="{ enter: 500, leave: 800 }">...</transition>
  'appear'初始渲染的过渡: 设置节点的在初始渲染的过渡 
    <transition appear>
      <!-- ... -->
    </transition>
    这里默认和进入和离开过渡一样,同样也可以自定义 CSS 类名 
    <transition
      appear
      appear-class="custom-appear-class"
      appear-to-class="custom-appear-to-class" (2.1.8+)
      appear-active-class="custom-appear-active-class" >
      <!-- ... -->
    </transition>
    自定义JS钩子：
    <transition
      appear
      v-on:before-appear="customBeforeAppearHook"
      v-on:appear="customAppearHook"
      v-on:after-appear="customAfterAppearHook"
      v-on:appear-cancelled="customAppearCancelledHook" >
      <!-- ... -->
    </transition>
  mode="in-out/out-in"  多元素切换时的模式 
    PS: 多元素过渡,标签名相同需使用'key'属性来区分; 
    'in-out'   默认值,新元素先添加进来,旧元素然后删除 
    'out-in'   旧元素先去除,新元素再添加进来  
  列表过渡 
Question&Suggestion: 
  让 computed 传参 
  如何操作Vue实例的组件选项,如控制组件  
    new Vue({
      // ..
      components: {
        aoo: appCpt, // 控制该组件 
      }
    });
自我总结: 
  在Vue实例中,所有能通过 this.xx 访问的值,都可在插值中使用 {{xx}}
---------------------------------------------------------------------以下待整理  

