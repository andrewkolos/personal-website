import { StaticImageData } from 'next/image'
import ChicoryImage from '../../public/game-showcase-images/chicory.jpg'
import DeathsDoorImage from '../../public/game-showcase-images/deathsdoor.jpg'
import EldenRingImage from '../../public/game-showcase-images/eldenring.jpg'

export interface PlayedGame {
  name: string
  link: string
  linkDescription: string
  image: StaticImageData
}

export const myPlayedGames: PlayedGame[] = [
  {
    name: 'Chicory: A Colorful Tale',
    link: 'https://store.steampowered.com/app/1123450',
    linkDescription: 'Steam Store page for the video game, Chicory: A Colorful Tale',
    image: ChicoryImage,
  },
  {
    name: `Death's Door`,
    link: 'https://store.steampowered.com/app/894020',
    linkDescription: `Steam Store page for the video game, Death's Door `,
    image: DeathsDoorImage,
  },
  {
    name: 'Elden Ring',
    link: 'https://store.steampowered.com/app/1245620',
    linkDescription: `Steam Store page for the video game, Elden Ring`,
    image: EldenRingImage,
  },
]
