import React from 'react'
import Image from 'next/image'
import { GameData } from '../../../lib/games/game-data'
import Styles from './game-showcase.module.scss'

export interface GameShowcaseProps {
  games: GameData[]
}

const GameShowcase: React.FC<GameShowcaseProps> = (props) => (
  <div className={Styles.container}>
    {props.games
      .sort((a, b) => b.lastRecentlyPlayed - a.lastRecentlyPlayed)
      .slice(0, 9)
      .map((game) => {
        const steamStoreUrl = `https://store.steampowered.com/app/${game.appId}`
        return (
          <a href={steamStoreUrl} title={steamStoreUrl}>
            <div className={Styles.gameImageContainer}>
              <Image
                loader={() => game.image.url}
                src={game.image.url}
                alt={`${game.name}`}
                width={game.image.width / 2.2}
                height={game.image.height / 2.2}
                key={game.name}
              />
            </div>
          </a>
        )
      })}
  </div>
)

export default GameShowcase
