import path from "path"
import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import Dotenv from "dotenv-webpack"

const optimization: webpack.Configuration[`optimization`] = {
  runtimeChunk: `multiple`,
  splitChunks: {
    chunks: `all`,
    name: `shared`,
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        //@ts-ignore
        name(module) {
          // get the name. E.g. node_modules/packageName/not/this/part.js
          // or node_modules/packageName
          const packageName = module.context.match(
            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
          )[1]

          // npm package names are URL-safe, but some servers don't like @ symbols
          return `npm.${packageName.replace(`@`, ``)}`
        },
      },
    },
  },
}

export const commonConfig: webpack.Configuration = {
  entry: `./src/index.tsx`,
  // https://webpack.js.org/plugins/split-chunks-plugin/
  optimization,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: `ts-loader`,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: `file-loader`,
            options: {
              name: `[name].[ext]`,
              outputPath: `fonts/`,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [`.tsx`, `.ts`, `.js`],
    alias: {
      // absolute path import
      src: path.resolve(`./src`),
    },
    fallback: {
      fs: false,
      os: false,
      path: false,
      module: false,
    },
  },
  output: {
    filename: `[name].[hash].js`,
    path: path.resolve(__dirname, `..`, `dist`),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `..`, `public`, `index.html`),
    }),
    new webpack.ProvidePlugin({
      process: `process/browser.js`,
    }),
    new Dotenv({
      // .env at project root
      path: path.resolve(__dirname, `../../../.env`), // load this now instead of the ones in '.env'
      // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      // allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      // systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      // silent: true, // hide any errors
      // defaults: false, // load '.env.defaults' as the default values if empty.
    }),
  ],
}
