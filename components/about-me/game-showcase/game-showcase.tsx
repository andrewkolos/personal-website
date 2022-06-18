import React from 'react'
import Image from 'next/image'
import Styles from './game-showcase.module.scss'

import { myPlayedGames } from '../../../lib/games/my-played-games'

const GameShowcase: React.FC = () => (
  <div className={Styles.container}>
    {myPlayedGames
      .slice()
      .reverse()
      .map((game) => (
        <a href={game.link} title={game.linkDescription}>
          <div className={Styles.gameImageContainer}>
            <Image
              src={game.image}
              alt={`${game.name}`}
              loading="lazy"
              aria-label={`Capsule image that links to store front or home page page of ${game.name}`}
              width={game.image.width / 2.2}
              height={game.image.height / 2.2}
              key={game.name}
            />
          </div>
        </a>
      ))}
  </div>
)

export default GameShowcase
