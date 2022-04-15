export interface ProjectDescriptor {
  owner: string
  name: string
  remarks?: string
}

const me = 'andrewkolos'

export const libraryProjects: ProjectDescriptor[] = [
  {
    owner: me,
    name: 'ts-tween',
  },
  {
    owner: me,
    name: 'tiny-node-packages',
  },
  {
    owner: me,
    name: 's3-object-location-parsing'
  }
]

export const otherProjects: ProjectDescriptor[] = [
  {
    owner: me,
    name: 'hybot-discord-elo-bot',
  },
  {
    owner: me,
    name: 'simple-personal-gradebook',
  },
  {
    owner: me,
    name: 'swoocebooks-lite',
  },
  {
    owner: me,
    name: 'bastion-breach-3d',
  },
  {
    owner: me,
    name: 'synchronized-pong-3d',
  },
  {
    owner: me,
    name: 'PowerPlanToggler',
  },
]

export const contributedTo: ProjectDescriptor[] = [
  {
    owner: 'tyrrrz',
    name: 'DiscordChatExporter',
  },
]
