export type TMode = 'production' | 'development'
export type TPlatform = 'desktop' | 'mobile'

export type TPort = 3000 | 3001

export interface IPaths {
  html: string
  public: string
  output: string
  entry: string
  src: string
}

export interface IEnvVariables {
  mode?: TMode
  platform?: TPlatform
  port?: TPort
  analyzer?: boolean
}

export interface IOptions {
  mode: TMode
  platform: TPlatform
  paths: IPaths
  port: TPort
  isDev: boolean
  isProd: boolean
  analyzer: boolean
}
