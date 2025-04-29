import { BuildOptions } from '../types/types';
import { removeDataTestIdBabelPlugintsts } from './removeDataTestIdBabelPlugin';

const babelBuildLoader = ({ mode }: BuildOptions) => {
  const isDev = mode === 'development';

  const plugins = [];

  if (!isDev) {
    plugins.push([
      removeDataTestIdBabelPlugintsts,
      {
        props: ['data-testid'],
      },
    ]);
  }
  const babelLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: isDev ? 'automatic' : 'classic' }],
        ],
        plugins: plugins.length ? plugins : undefined,
      },
    },
  };
  return babelLoader;
};
export default babelBuildLoader;
