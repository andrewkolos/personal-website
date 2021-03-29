

export interface Demo {
  name: string;
  description: string;
  thumbnailName: string;
  repoUrl: string;
  demoUrl: string;
}

export interface EmbeddedDemo extends Demo {
  urlName: string;
}

export const embeddedDemos: EmbeddedDemo[] = [
  {
    name: 'Bastion Breach 3D',
    urlName: 'bastion-breach-3d',
    thumbnailName: 'bastion-breach-3d',
    description: 'A short card game.',
    repoUrl: 'https://github.com/andrewkolos/bastion-breach-3d',
    demoUrl: 'https://bastion-breach-3d.herokuapp.com',
  },
  {
    name: 'Pong 3D',
    urlName: 'pong-3d',
    thumbnailName: 'pong-3d',
    description: 'The classic, but now with a twist. Move around with the WASD keys and rotate with Q and E, or plug in a gamepad!',
    repoUrl: 'https://github.com/andrewkolos/synchronized-pong-3d',
    demoUrl: 'https://andrew-pong-3d.herokuapp.com/',
  },
    { 
    name: 'Swoocebooks Lite',
    urlName: 'swoocebooks-lite',
    thumbnailName: 'swoocebooks-lite',
    description: 'Calculates a grade for a course and tells you how well you need to do to get the grade you want.',
    repoUrl: 'https://github.com/andrewkolos/swoocebooks-lite',
    demoUrl: 'https://swoocebooks-lite.herokuapp.com/index.html',
  },
]

export const noninteractiveDemos: Demo[] = [
  {
    name: 'Hybot Discord Elo Bot',
    thumbnailName: 'hybot',
    demoUrl: 'https://github.com/andrewkolos/hybot-discord-elo-bot',
    repoUrl: 'https://github.com/andrewkolos/hybot-discord-elo-bot',
    description: 'Discord bot that calculates and keeps track of Elo scores amongst a community of players.'
  },
  {
    name: 'Swoocebooks',
    thumbnailName: 'swoocebooks',
    demoUrl: 'https://github.com/andrewkolos/simple-personal-gradebook',
    repoUrl: 'https://github.com/andrewkolos/simple-personal-gradebook',
    description: 'A persistent web app application that helps students keep track of and experiment with their grades.',
  }
];
