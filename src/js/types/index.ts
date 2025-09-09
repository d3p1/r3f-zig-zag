/**
 * @description Types
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import type {RapierRigidBody} from '@react-three/rapier'
import * as React from 'react'

export type TrapProps = {
  position: [number, number, number]
  scale?: [number, number, number]
  update?: (body: RapierRigidBody, time: number) => void
}
export type Trap = React.FC<TrapProps>
