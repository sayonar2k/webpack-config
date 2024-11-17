import path from 'path'
import webpack from 'webpack'
import { IEnvVariables, IPaths } from './config/webpack/types/config'
import { getWebpackBuild } from './config/webpack/getWebpackBuild'

export default (env: IEnvVariables) => {
  const paths: IPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    output: path.resolve(__dirname, 'build'),
    src: path.resolve(__dirname, 'src'),
  }

  const mode = env.mode ?? 'development'
  const port = env.port ?? 3000

  const isDev = mode === 'development'
  const isProd = !isDev

  const platform = env.platform ?? 'desktop'

  const analyzer = env.analyzer ?? false

  const config: webpack.Configuration = getWebpackBuild({
    paths,
    port,
    mode,
    isDev,
    isProd,
    analyzer,
    platform,
  })

  return config
}
