import webpack from 'webpack'
import type { Configuration as TDevConfig } from 'webpack-dev-server'
import { IOptions } from './types/config'
import { getPlugins } from './getPlugins'
import { getLoaders } from './getLoaders'
import { getResolvers } from './getResolvers'
import { getDevServer } from './getDevServer'

export function getWebpackBuild(options: IOptions): webpack.Configuration {
  const { mode, paths, isDev, platform } = options

  const config: webpack.Configuration = {
    mode,
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash:10].js',
      clean: true,
    },
    module: {
      rules: getLoaders(options),
    },
    resolve: getResolvers(options),
    // разные есть конфиги девтулзов, надо смотреть в доке
    devtool: isDev ? 'inline-source-map' : 'source-maps',
    devServer: isDev ? getDevServer(options) : undefined,
    plugins: getPlugins(options),
  }

  return config
}
