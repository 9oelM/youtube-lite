import webpack from "webpack"
import { commonConfig } from "./webpack.config.common"
import devConfig from "./webpack.config.dev"

const config: webpack.Configuration = {
  // for minification
  mode: `production`,
  // https://webpack.js.org/guides/production/#source-mapping
  // Avoid inline-*** and eval-*** use in production as they can increase bundle size and reduce the overall performance.
  devtool: `eval`,
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
