import { cloneGitRepo } from '../clone-git-repo';
import { EmbeddedAppDescriptor } from '../embedded-app-descriptor';
import { exec } from '../exec';

const descriptor: EmbeddedAppDescriptor = {
  copyFrom: 'demos/game',
  source: async (): Promise<void> => {
    await cloneGitRepo(`https://github.com/andrewkolos/synchronized-pong-3d`);
    exec('npm i && npm run build:game-demo');
  },
}

export default descriptor;
