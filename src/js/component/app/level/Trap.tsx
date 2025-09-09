/**
 * @description Trap
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {useFrame} from '@react-three/fiber'
import {type RapierRigidBody, RigidBody} from '@react-three/rapier'
import {useRef} from 'react'
import {useStage} from '../../../store/useStage.ts'
import type {Trap as TrapType} from '../../../types'
import {config} from '../../../etc/config.ts'

export const Trap: TrapType = ({
  position,
  scale = [1, 1, 1],
  update = () => {},
}) => {
  const bodyRef = useRef<RapierRigidBody>(null!)
  const geometry = useStage((state) => state.geometry)
  const trapMaterial = useStage((state) => state.trapMaterial)
  const floorTrapMaterial = useStage((state) => state.floorTrapMaterial)

  useFrame((state) => {
    if (!update) {
      return
    }

    update(bodyRef.current, state.clock.getElapsedTime())
  })

  return (
    <group position={position}>
      <RigidBody
        type="kinematicPosition"
        position={[0, scale[1] * 0.5, 0]}
        restitution={0.2}
        friction={0}
        ref={bodyRef}
      >
        <mesh geometry={geometry} material={trapMaterial} scale={scale} />
      </RigidBody>
      <mesh
        geometry={geometry}
        material={floorTrapMaterial}
        scale={[config.floor.width, config.floor.height, config.floor.depth]}
        position={[0, -config.floor.height * 0.5, 0]}
      />
    </group>
  )
}
