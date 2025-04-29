import path from "path";
import webpack from "webpack";
import buildWepback from "./config/build/buildWepback";
import {
  BuildMode,
  BuildPaths,
  BuildPlatform,
} from "./config/build/types/types";

interface EnvVatiables {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
  base?: string;
}

export default (env: EnvVatiables) => {
  const paths: BuildPaths = {
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "js/[name].[contenthash].js",
      publicPath: "/", // Важно: должен быть "/" для продакшена
      clean: true,
    },
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
  };
  const config: webpack.Configuration = buildWepback({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",

    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? "desktop",
    base: env.base,
  });
  return config;
};
