export interface Demo {
  name: string
  description: string
  id: string
  repoUrl: string
  demoUrl: string
}

export interface EmbeddedDemo extends Demo {
  urlName: string
}

export const embeddedDemos: EmbeddedDemo[] = [
  {
    name: 'Bastion Breach 3D',
    urlName: 'bastion-breach-3d',
    id: 'bastion-breach-3d',
    description: 'A short card game.',
    repoUrl: 'https://github.com/andrewkolos/bastion-breach-3d',
    demoUrl: 'https://bastion-breach-3d.herokuapp.com',
  },
  {
    name: 'Pong 3D',
    urlName: 'pong-3d',
    id: 'pong-3d',
    description:
      'The classic, but now with a twist. Move around with the WASD keys and rotate with Q and E.',
    repoUrl: 'https://github.com/andrewkolos/synchronized-pong-3d',
    demoUrl: 'https://andrew-pong-3d.herokuapp.com/',
  },
  {
    name: 'Swoocebooks Lite',
    urlName: 'swoocebooks-lite',
    id: 'swoocebooks-lite',
    description: 'Calculates a grade for a course and tells you how well you need to do to get the grade you want.',
    repoUrl: 'https://github.com/andrewkolos/swoocebooks-lite',
    demoUrl: 'https://swoocebooks-lite.herokuapp.com/index.html',
  },
  {
    name: 'Online Game Synchronization Framework',
    urlName: 'online-game-synchronization-framework',
    id: 'online-game-synchronization-framework',
    description: 'Framework for smoothly synchronizing online games.',
    repoUrl: 'https://github.com/andrewkolos/simple-online-game-syncrhonization-framework',
    demoUrl: 'https://game-synchronization-framework.herokuapp.com/',
  },
]

export const nonInteractiveDemos: Demo[] = [
  {
    name: 'Hybot Discord Elo Bot',
    id: 'hybot',
    demoUrl: 'https://github.com/andrewkolos/hybot-discord-elo-bot',
    repoUrl: 'https://github.com/andrewkolos/hybot-discord-elo-bot',
    description: 'Discord bot that calculates and keeps track of Elo scores amongst a community of players.',
  },
  {
    name: 'Swoocebooks',
    id: 'swoocebooks',
    demoUrl: 'https://github.com/andrewkolos/simple-personal-gradebook',
    repoUrl: 'https://github.com/andrewkolos/simple-personal-gradebook',
    description: 'A persistent web app application that helps students keep track of and experiment with their grades.',
  },
]


export function getDemoById(id: string) {
  const result = [...embeddedDemos, ...nonInteractiveDemos].find((value) => value.id === id)
  if (result == null) {
    throw Error(`Could not find demo with id of '${id}'`)
  }
  return result
}
