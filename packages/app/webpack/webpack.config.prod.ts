import webpack from "webpack"
import { commonConfig } from "./webpack.config.common"

const config: webpack.Configuration = {
  mode: `production`,
  ...commonConfig,
  plugins: [
    // @ts-ignore
    ...commonConfig.plugins,
    new webpack.DefinePlugin({
      "process.env.DEPLOY_TARGET": JSON.stringify(`PROD`),
    }),
  ],
}

export default config
