/**
 * @description Game
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {CuboidCollider, RigidBody} from '@react-three/rapier'
import * as React from 'react'
import {useMemo} from 'react'
import {useStage} from '../../store/useStage.ts'
import {Level} from './game/Level.tsx'
import {Twister} from './game/level/trap/Twister.tsx'
import {Limbo} from './game/level/trap/Limbo.tsx'
import {Axe} from './game/level/trap/Axe.tsx'
import type {Game as GameType} from '../../types'
import {config} from '../../etc/config.ts'
import {Wall} from './game/level/Wall.tsx'
import {Player} from './game/Player.tsx'

export const Game: GameType = ({traps = [Twister, Limbo, Axe]}) => {
  const trapCount = useStage((state) => state.trapCount)
  const totalSteps = useStage((state) => state.getTotalSteps())

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

      <Wall
        position={[
          -config.floor.width * 0.5 - config.wall.depth * 0.5,
          config.wall.height * 0.5,
          config.floor.depth * 0.5 - totalSteps * config.floor.depth * 0.5,
        ]}
        scale={[
          config.wall.depth,
          config.wall.height,
          totalSteps * config.floor.depth,
        ]}
      />
      <Wall
        position={[
          config.floor.width * 0.5 + config.wall.depth * 0.5,
          config.wall.height * 0.5,
          config.floor.depth * 0.5 - totalSteps * config.floor.depth * 0.5,
        ]}
        scale={[
          config.wall.depth,
          config.wall.height,
          totalSteps * config.floor.depth,
        ]}
      />
      <Wall
        position={[
          0,
          config.wall.height * 0.5,
          config.floor.depth * 0.5 -
            totalSteps * config.floor.depth -
            config.wall.depth * 0.5,
        ]}
        scale={[config.floor.width, config.wall.height, config.wall.depth]}
      />

      <RigidBody type="fixed" colliders={false} restitution={0} friction={1}>
        <CuboidCollider
          args={[
            config.floor.width * 0.5,
            config.floor.height * 0.5,
            totalSteps * config.floor.depth * 0.5,
          ]}
          position={[
            0,
            -config.floor.height * 0.5,
            config.floor.depth * 0.5 - totalSteps * config.floor.depth * 0.5,
          ]}
        />
      </RigidBody>

      <Player />
    </>
  )
}
