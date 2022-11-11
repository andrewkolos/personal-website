export type Demo = InteractiveDemo | NonInteractiveDemo

interface DemoBase {
  name: string
  description: string
  id: string
  repoUrl: string
  demoUrl: string
}

export interface InteractiveDemo extends DemoBase {
  kind: 'interactive'
  urlName: string
}

export interface NonInteractiveDemo extends DemoBase {
  kind: 'non-interactive'
}

export const interactiveDemos: InteractiveDemo[] = [
  {
    kind: 'interactive',
    name: 'Bastion Breach 3D',
    urlName: 'bastion-breach-3d',
    id: 'bastion-breach-3d',
    description: 'A short card game.',
    repoUrl: 'https://github.com/andrewkolos/bastion-breach-3d',
    demoUrl: 'https://bastion-breach-3d.netlify.app/',
  },
  {
    kind: 'interactive',
    name: 'Pong 3D',
    urlName: 'pong-3d',
    id: 'pong-3d',
    description:
      'The classic, but with a twist. Move around with WASD and rotate with ← and →, or use the analog sticks on your gamepad.',
    repoUrl: 'https://github.com/andrewkolos/synchronized-pong-3d',
    demoUrl: 'https://andrew-kolos-pong-3d.netlify.app/',
  },
  {
    kind: 'interactive',
    name: 'Online Game Synchronization Framework',
    urlName: 'online-game-synchronization-framework',
    id: 'online-game-synchronization-framework',
    description: 'Framework for smoothly synchronizing online games.',
    repoUrl: 'https://github.com/andrewkolos/simple-online-game-syncrhonization-framework',
    demoUrl: 'https://andrew-kolos-game-sync.netlify.app/',
  },
]

export const nonInteractiveDemos: NonInteractiveDemo[] = [
  {
    kind: 'non-interactive',
    name: 'Hybot Discord Elo Bot',
    id: 'hybot',
    demoUrl: 'https://github.com/andrewkolos/hybot-discord-elo-bot',
    repoUrl: 'https://github.com/andrewkolos/hybot-discord-elo-bot',
    description: 'Discord bot that calculates and keeps track of Elo scores amongst a community of players.',
  },
  {
    kind: 'non-interactive',
    name: 'Swoocebooks',
    id: 'swoocebooks',
    demoUrl: 'https://github.com/andrewkolos/simple-personal-gradebook',
    repoUrl: 'https://github.com/andrewkolos/simple-personal-gradebook',
    description: 'A persistent web app application that helps students keep track of and experiment with their grades.',
  },
]

export function getDemoById(id: string) {
  const result = [...interactiveDemos, ...nonInteractiveDemos].find((value) => value.id === id)
  if (result == null) {
    throw Error(`Could not find demo with id of '${id}'`)
  }
  return result
}
