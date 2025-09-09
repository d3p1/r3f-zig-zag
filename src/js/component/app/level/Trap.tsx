/**
 * @description Trap
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {useFrame} from '@react-three/fiber'
import {type RapierRigidBody, RigidBody} from '@react-three/rapier'
import {useRef} from 'react'
import {useStage} from '../../../store/useStage.ts'
import type {Trap as TrapType} from '../../../types'

export const Trap: TrapType = ({position, scale, update}) => {
  const bodyRef = useRef<RapierRigidBody>(null!)
  const geometry = useStage((state) => state.geometry)
  const material = useStage((state) => state.trapMaterial)

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
