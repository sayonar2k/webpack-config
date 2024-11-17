import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import webpack, {
  Configuration /* PluginWebpackPluginInstance или этот и [] */,
  DefinePlugin,
} from 'webpack'
import { IOptions } from './types/config'
import path from 'path'

export const getPlugins = ({
  paths,
  isDev,
  isProd,
  analyzer,
  platform,
}: IOptions): Configuration['plugins'] => {
  const plugins: Configuration['plugins'] = [
    // в продакшене лучше его не юзать - замедляет сильно сборку
    new HtmlWebpackPlugin({
      // ссылка до html файла в качестве шаблона
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
    }),
    new ForkTsCheckerPlugin(),
  ]

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:10].css',
        chunkFilename: 'css/[name].[contenthash:10].css',
      })
    )

    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.public, 'locales'),
            to: path.resolve(paths.output, 'locales'),
            // globOptions: {
            //   ignore: [
            // Ignore all `html` files
            //     '**/*.html',
            //   ],
            // },
          },
        ],
      })
    )

    if (analyzer) {
      plugins.push(new BundleAnalyzerPlugin())
    }
  }

  if (isDev) {
    // в продакшене лучше его не юзать - замедляет сильно сборку
    plugins.push(new webpack.ProgressPlugin())
    plugins.push(new ReactRefreshWebpackPlugin())
  }

  // filter так как будет ошибка если херня попадать будет .filter(Boolean) можно сделать так
  return plugins
}
