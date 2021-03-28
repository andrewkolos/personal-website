import { cloneGitRepo } from '../clone-git-repo';
import { EmbeddedAppDescriptor } from '../embedded-app-descriptor';
import { exec } from '../exec';

const descriptor: EmbeddedAppDescriptor = {
  copyFrom: 'dist',
  source: async (): Promise<void> => {
    await cloneGitRepo(`https://github.com/andrewkolos/bastion-breach-3D`);
    exec('npm i && npm run build');
  },
}

export default descriptor;