export interface Demo {
  name: string;
  urlName: string;
  description: string;
  thumbnailName?: string;
  repoUrl: string;
  demoUrl: string;
}

export const demos: Demo[] = [
  {
    name: 'Bastion Breach 3D',
    urlName: 'bastion-breach-3d',
    thumbnailName: 'bastion-breach-3d.jpg',
    description: 'A short card game.',
    repoUrl: 'https://github.com/andrewkolos/bastion-breach-3d',
    demoUrl: 'https://bastion-breach-3d.herokuapp.com',
  },
  {
    name: 'Pong 3D',
    urlName: 'pong-3d',
    thumbnailName: 'bastion-breach-3d.jpg',
    description: 'The classic. Move around with the WASD keys and rotate with Q and E.',
    repoUrl: 'https://github.com/andrewkolos/synchronized-pong-3d',
    demoUrl: 'https://andrew-pong-3d.herokuapp.com/',
  }
]
