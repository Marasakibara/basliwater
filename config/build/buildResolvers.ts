import { Configuration } from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';

const BuildResolver = (options: BuildOptions): Configuration['resolve'] => {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': options.paths.src,
    },
  };
};
export default BuildResolver;
