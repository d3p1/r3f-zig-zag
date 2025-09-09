/**
 * @description Types
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import type {ThreeElements} from '@react-three/fiber'
import type {RapierRigidBody} from '@react-three/rapier'
import * as React from 'react'

export type TrapProps = ThreeElements['mesh'] & {
  update?: (body: RapierRigidBody, time: number) => void
}
export type Trap = React.FC<TrapProps>
