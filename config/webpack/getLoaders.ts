// import { RuleSetRule } from 'webpack' а потом RuleSetRule или как сделано
import { ModuleOptions } from 'webpack'
import { IOptions } from './types/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import { getBabelLoader } from '../../config/babel/getBabelLoader'

export const getLoaders = (options: IOptions): ModuleOptions['rules'] => {
  const { isDev } = options
  const cssModulesLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
        localIdentName: isDev
          ? '[path][name]__[local]--[hash:base64:5]'
          : '[hash:base64:8]',
      },
    },
  }

  const svgLoader = {
    test: /\.svg$/,
    // icon true нужен для работы с svg нативно, увеличиваем ширину, увеличивается весь svg!
    //  и для того чтобы style={{color: 'red'}} работало необходимо icon: true,
    // вместо fill stroke-color делать color и в svg currentColor для фил и строук колор
    // нужен svgoConfig!
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  }

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    // css loader подключает стили в common JS, style loader делает js string
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssModulesLoader,
      'sass-loader',
    ],
  }

  const babelLoader = getBabelLoader(options)

  const tsLoader = {
    test: /\.tsx?$/,
    // TS-loader работает с jsx, поэтому для реакта подключать ничего не нужно (jsx)
    use: [
      {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: true,
        },
      },
    ],
    exclude: /node_modules/,
  }

  // Порядок важен если мы в одном лоадере передаем другие (пример CSS), иначе как в массиве - порядок не важен

  return [assetsLoader, svgLoader, cssLoader, babelLoader]
}
