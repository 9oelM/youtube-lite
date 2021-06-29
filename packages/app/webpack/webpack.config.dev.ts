import path from "path"
import webpack from "webpack"
import { commonConfig } from "./webpack.config.common"

const config: webpack.Configuration = {
  mode: `development`,
  devtool: `inline-source-map`,
  devServer: {
    contentBase: path.join(__dirname, `dist`),
    compress: true,
    port: 8080,
    open: true,
    historyApiFallback: true,
  },
  ...commonConfig,
  plugins: [
    // @ts-ignore
    ...commonConfig.plugins,
    new webpack.DefinePlugin({
      "process.env.DEPLOY_TARGET": JSON.stringify(`DEV`),
    }),
  ],
}

export default config
