export interface BuildPaths {
  entry: string;
  html: string;
  public: string;
  output: {
    path: string;
    filename: string;
    publicPath: string;
    clean: boolean;
  };
  src: string;
}

export type BuildMode = "production" | "development";
export type BuildPlatform = "mobile" | "desktop";

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  platform: BuildPlatform;
  analyzer?: boolean;
  base?: string;
}
