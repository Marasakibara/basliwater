import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin, { Configuration } from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/types';
import { DefinePlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';

export default function buildPlugins({
  mode,
  paths,
  analyzer,
  platform,
}: BuildOptions): Configuration['plugins'] {
  const isDev = mode === 'development';
  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),
    new DefinePlugin({ __PLATFORM__: JSON.stringify(platform) }),
    new ForkTsCheckerWebpackPlugin(),
  ];
  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (!isDev) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    );
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.public, 'locales'),
            to: path.resolve(paths.output, 'locales'),
          },
        ],
      }),
    );
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }
  return plugins;
}
