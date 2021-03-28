import { cloneGitRepo } from '../clone-git-repo';
import { EmbeddedAppDescriptor } from '../embedded-app-descriptor';
import { exec } from '../exec';

const descriptor: EmbeddedAppDescriptor = {
  copyFrom: 'dist',
  install: async (): Promise<void> => {
    await cloneGitRepo(`https://github.com/andrewkolos/bastion-breach-3D`);
    await exec('npm i && npm run build');
  },
  urlName: 'bastion-breach-3d',
}

export default descriptor;