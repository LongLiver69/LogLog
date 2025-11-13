import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'repo_host',  
  remotes: [
    'repo_chat', 
    'repo_feed'
  ],
  shared: (libraryName, defaultConfig) => {
    if (libraryName === '@loglog-libs/core') {
      return {
        singleton: true,
        strictVersion: false,
        requiredVersion: false,
        eager: true,
      };
    }
    return defaultConfig;
  },
};

export default config;
