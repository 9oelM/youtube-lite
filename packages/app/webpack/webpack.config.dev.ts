import path from 'path'
import webpack from 'webpack';
import { commonConfig } from './webpack.config.common';

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    open: true
  },
  ...commonConfig,
};

export default config;