import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'repo_host',  
  remotes: [
    'repo_chat', 
    'repo_feed'
  ],
};

export default config;
