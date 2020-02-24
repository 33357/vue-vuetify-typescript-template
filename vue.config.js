const path = require('path')
const { title, devServerPort } = require('./src/settings.js')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const appName = title || 'app'

module.exports = {
  publicPath: '/admin/',
  outputDir: 'dist/admin',
  assetsDir: 'static',
  productionSourceMap: true,
  transpileDependencies: ['vuetify'],
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    port: devServerPort,
    progress: false,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => /mock-api/v1/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://localhost:${mockServerPort}/mock-api/v1`,
        target: `http://120.79.204.212:9090`,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },

  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        sassOptions: {
          fiber: require('fibers')
        }
      },
      scss: {
        prependData: `@import "~@/styles/index.scss";`
      }
    }
  },

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: appName,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', appName)
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    // https://webpack.js.org/configuration/devtool/#development
    config
      .when(process.env.NODE_ENV === 'development',
        (config) => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                vuetifyUI: {
                  name: 'chunk-vuetifyUI', // split vuetifyUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?vuetify(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: path.resolve(__dirname, 'src/components'),
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
    if (process.env.NODE_ENV === 'production') {
      // sentry错误监控配置(自动上传sourcemap)
      config.plugin('sentry').use(SentryWebpackPlugin, [{
        ignore: ['node_modules'],
        include: './dist/admin/static/js', // 上传的js
        configFile: 'sentry.properties', // 配置文件地址
        release: process.env.RELEASE_VERSION, // 版本号
        urlPrefix: '~/admin/static/js' // cdn js的代码路径前缀
      }])

      // 构建完成后自动删除sourceMap文件
      config.plugin('clean').use(CleanWebpackPlugin, [
        {
          verbose: true, // 控制台打印信息
          cleanOnceBeforeBuildPatterns: [], // 构建前不需要删除
          cleanAfterEveryBuildPatterns: ['static/js/*.map'], // 构建完成后删除指定的文件
          protectWebpackAssets: false // 必须设置为false否则文件不会被删除
        }
      ])
    }
    // optionally replace with another progress output plugin
    // `npm i -D simple-progress-webpack-plugin` to use
    config.plugin('simple-progress-webpack-plugin').use(require.resolve('simple-progress-webpack-plugin'), [
      {
        format: 'compact' // options are minimal, compact, expanded, verbose
      }
    ])
  }
}
