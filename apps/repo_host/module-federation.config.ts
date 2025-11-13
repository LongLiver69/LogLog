import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'repo_host',  
  remotes: [
    'repo_chat', 
    'repo_feed'
  ],
  shared: (libraryName, defaultConfig) => {
    // Force SignalR to be singleton
    if (libraryName === '@microsoft/signalr') {
      return {
        singleton: true,
        strictVersion: false,
        requiredVersion: false,
      };
    }
    return defaultConfig;
  },
};

export default config;
