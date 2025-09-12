/**
 * @description Game
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as React from 'react'
import {useMemo} from 'react'
import {Level} from './game/Level.tsx'
import {Twister} from './game/level/trap/Twister.tsx'
import {Limbo} from './game/level/trap/Limbo.tsx'
import {Axe} from './game/level/trap/Axe.tsx'
import type {Game as GameType} from '../../types'
import {config} from '../../etc/config.ts'
import {Player} from './game/Player.tsx'

export const Game: GameType = ({
  trapCount = 3,
  traps = [Twister, Limbo, Axe],
}) => {
  const trapComponents = useMemo(() => {
    const trapComponents = []

    for (let i = 0; i < trapCount; i++) {
      const trap = traps[Math.floor(Math.random() * traps.length)]
      trapComponents.push(trap)
    }

    return trapComponents
  }, [trapCount, traps])

  return (
    <>
      <Level position={[0, 0, 0]} />

      {trapComponents.map((trap, index) => {
        return React.createElement(trap, {
          key: index,
          position: [0, 0, -((index + 1) * config.floor.depth)],
        })
      })}

      <Level position={[0, 0, -((trapCount + 1) * config.floor.depth)]} />

      <Player />
    </>
  )
}
