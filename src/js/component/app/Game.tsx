/**
 * @description Game
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as React from 'react'
import {useMemo} from 'react'
import {useStageStore} from '../../store/stage.ts'
import {Arena} from './game/Arena.tsx'
import {Level} from './game/arena/Level.tsx'
import {Twister} from './game/arena/level/trap/Twister.tsx'
import {Limbo} from './game/arena/level/trap/Limbo.tsx'
import {Axe} from './game/arena/level/trap/Axe.tsx'
import type {Game as GameType} from '../../types'
import {config} from '../../etc/config.ts'
import {Player} from './game/Player.tsx'

export const Game: GameType = ({traps = [Twister, Limbo, Axe]}) => {
  const trapCount = useStageStore((state) => state.trapCount)

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
      <Arena>
        <Level position={[0, 0, 0]} />

        {trapComponents.map((trap, index) => {
          return React.createElement(trap, {
            key: index,
            position: [0, 0, -((index + 1) * config.floor.height)],
          })
        })}

        <Level position={[0, 0, -((trapCount + 1) * config.floor.height)]} />
      </Arena>

      <Player />
    </>
  )
}
