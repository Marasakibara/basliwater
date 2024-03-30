import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export default function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    host: '127.0.0.1', // <-- this
    port: options.port ?? 3000,
    open: true,
    historyApiFallback: true,
    hot: true,
  };
}
