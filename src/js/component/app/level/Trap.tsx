/**
 * @description Trap
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {type ThreeElements, useFrame} from '@react-three/fiber'
import {type RapierRigidBody, RigidBody} from '@react-three/rapier'
import {useRef} from 'react'
import * as React from 'react'

type Props = ThreeElements['mesh'] & {
  update: (body: RapierRigidBody, time: number) => void
}

export const Trap: React.FC<Props> = ({
  geometry,
  material,
  position,
  scale,
  update,
}) => {
  const bodyRef = useRef<RapierRigidBody>(null!)

  useFrame((state) => {
    update(bodyRef.current, state.clock.getElapsedTime())
  })

  return (
    <RigidBody type="kinematicPosition" position={position} ref={bodyRef}>
      <mesh geometry={geometry} material={material} scale={scale} />
    </RigidBody>
  )
}
