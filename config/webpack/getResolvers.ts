import { Configuration } from 'webpack'
import { IOptions } from './types/config'

export const getResolvers = ({ paths }: IOptions): Configuration['resolve'] => {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': paths.src,
    },
  }
}
