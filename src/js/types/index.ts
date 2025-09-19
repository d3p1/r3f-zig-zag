/**
 * @description Types
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import type {RapierRigidBody} from '@react-three/rapier'
import * as React from 'react'

export const CONTROL = {
  FORWARD: 'forward',
  RIGHTWARD: 'rightward',
  BACKWARD: 'backward',
  LEFTWARD: 'leftward',
  JUMP: 'jump',
} as const
export type ArenaProps = {
  children: React.ReactNode
}
export type Stage = {
  geometry: THREE.BufferGeometry
  floorMaterial: THREE.MeshStandardMaterial
  floorTrapMaterial: THREE.MeshStandardMaterial
  trapMaterial: THREE.MeshStandardMaterial
  wallMaterial: THREE.MeshStandardMaterial
  trapCount: number
}
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
  traps?: Level[]
}
export type Game = React.FC<GameProps>
export type Arena = React.FC<ArenaProps>
