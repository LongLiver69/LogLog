/**
 * Shared webpack configuration for all Module Federation apps
 * This helper applies common configurations to avoid duplication
 */
export function applySharedWebpackConfig(mfConfig: any) {
  return {
    ...mfConfig,
    resolve: {
      ...(mfConfig.resolve || {}),
      fallback: {
        ...(mfConfig.resolve?.fallback || {}),
        // Prevent Node.js built-in modules from being bundled (fixes @microsoft/signalr issues)
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        util: false,
        events: false,
        buffer: false,
        process: false,
        http: false,
        https: false,
        zlib: false,
        assert: false,
        url: false,
        module: false,
      },
    },
    ignoreWarnings: [
      // Suppress Bootstrap SCSS deprecation warnings
      /Deprecation Warning/,
      /node_modules\/bootstrap/,
      /bootstrap\.scss/,
      (warning: any) => warning.module?.resource?.includes('bootstrap'),
    ],
  };
}
