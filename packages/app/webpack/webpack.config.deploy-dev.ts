import webpack from "webpack"
import { commonConfig } from "./webpack.config.common"
import devConfig from "./webpack.config.dev"

const config: webpack.Configuration = {
  mode: `development`,
  devtool: `inline-source-map`,
  devServer: devConfig.devServer,
  ...commonConfig,
  plugins: [
    // @ts-ignore
    ...commonConfig.plugins,
    new webpack.DefinePlugin({
      "process.env.DEPLOY_TARGET": JSON.stringify(`DEPLOY_DEV`),
    }),
  ],
}

export default config
