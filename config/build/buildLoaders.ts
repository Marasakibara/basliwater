import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';

import { ModuleOptions, webpack } from 'webpack';
import { BuildOptions } from './types/types';
import babelBuildLoader from './babel/babelBuildLoader';

export default function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const { mode } = options;
  const isDev = mode === 'development';
  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgrLoader = {
    test: /\.svg$/,
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
                  currentColors: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: { modules: { localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]' } },
  };

  const sassLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoaderWithModules,
      'sass-loader',
    ],
  };

  const tsLoader = {
    exclude: /node_modules/,
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      },
    ],
  };

  const babelLoader = babelBuildLoader(options);

  return [assetLoader, sassLoader, tsLoader, svgrLoader, babelLoader];
}
