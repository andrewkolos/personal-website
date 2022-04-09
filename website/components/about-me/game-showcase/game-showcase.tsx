import React from 'react'
import Image from 'next/image'
import { GameData } from '../../../lib/games/game-data'
import Styles from './game-showcase.module.scss'

export interface GameShowcaseProps {
  games: GameData[]
}

const GameShowcase: React.FC<GameShowcaseProps> = (props) => (
  <div className={Styles.container}>
    {props.games.map((game) => (
      <Image
        loader={() => game.image.url}
        src={game.image.url}
        alt={`${game.name}`}
        width={game.image.width}
        height={game.image.height}
      />
    ))}
  </div>
)

export default GameShowcase
