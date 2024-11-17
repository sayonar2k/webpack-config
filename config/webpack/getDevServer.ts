import { IOptions } from './types/config'
import type { Configuration as TDevConfig } from 'webpack-dev-server'

export const getDevServer = ({ port }: IOptions): TDevConfig => {
  return {
    port: port,
    open: true,
    // работает только для дев сервера, для nginx надо все проксировать через index html
    historyApiFallback: true,
    hot: true,
  }
}
