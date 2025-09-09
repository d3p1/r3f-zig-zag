/**
 * @description Trap
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {useFrame} from '@react-three/fiber'
import {type RapierRigidBody, RigidBody} from '@react-three/rapier'
import {useRef} from 'react'
import type {Trap as TrapType} from '../../../types'

export const Trap: TrapType = ({
  geometry,
  material,
  position,
  scale,
  update,
}) => {
  const bodyRef = useRef<RapierRigidBody>(null!)

  useFrame((state) => {
    if (!update) {
      return
    }

    update(bodyRef.current, state.clock.getElapsedTime())
  })

  return (
    <RigidBody type="kinematicPosition" position={position} ref={bodyRef}>
      <mesh geometry={geometry} material={material} scale={scale} />
    </RigidBody>
  )
}
