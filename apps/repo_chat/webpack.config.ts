import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default withModuleFederation(config, {
  dts: false,
}).then((mfConfig: any) => {
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
});

