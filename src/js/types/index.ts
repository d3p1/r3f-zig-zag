/**
 * @description Types
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import type {RapierRigidBody} from '@react-three/rapier'
import * as React from 'react'

export type LevelProps = {
  position: [number, number, number]
}
export type TrapProps = LevelProps & {
  scale?: [number, number, number]
  update?: (
    time: number,
    body: RapierRigidBody,
    origin: [number, number, number],
  ) => void
}
export type Level = React.FC<LevelProps>
export type Trap = React.FC<TrapProps>

export type GameProps = {
  trapCount?: number
  traps?: Level[]
}
export type Game = React.FC<GameProps>
