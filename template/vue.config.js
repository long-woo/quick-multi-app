const path = require('path')
const glob = require('glob')

const publicPath = process.env.NODE_ENV !== 'development' ? '././' : ''

const getPages = () => {
  const entry = {
    index: {
      entry: 'src/app.js'
    }
  }

  glob.sync('./src/views/**/*.js').forEach(file => {
    const name = path.basename(file, path.extname(file))
    const filePath = file.replace('./', '')

    entry[name] = {
      entry: filePath
    }
  })

  return entry
}
const pages = getPages()

module.exports = {
  publicPath,
  pages,
  productionSourceMap: false,
  indexPath: 'main.html',
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/styles/variables.scss";'
      }
    }
  }{{#if_neq devProxyUrl ""}},
  devServer: {
    proxy: {
      '/api': {
        target: '{{devProxyUrl}}',
        // ws: true,
        changeOrigin: true
        // pathRewrite: {
        //   '^/api': 'api'
        // }
      }
    }
  }{{/if_neq}}
}
