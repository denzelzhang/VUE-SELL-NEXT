const webpack = require('webpack')
const path = require('path')

const appData1 = require('./seller.json')
const appData2 = require('./goods.json')
// const appData3 = require('./ratings.json')

const seller = appData1.seller
const goods = appData2.goods
const CURRENCY = appData2.currency
console.log(CURRENCY)
// const ratings = appData3.ratings

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    before(app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          errno: 0,
          data: seller
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      // app.get('/api/ratings', function (req, res) {
      //   res.json({
      //     errno: 0,
      //     data: ratings
      //   })
      // })
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))

    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
  },
  publicPath: ''
}
