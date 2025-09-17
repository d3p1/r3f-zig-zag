/**
 * @description Trap
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {useFrame} from '@react-three/fiber'
import {type RapierRigidBody, RigidBody} from '@react-three/rapier'
import {useRef} from 'react'
import {useStage} from '../../../../store/useStage.ts'
import type {Trap as TrapType} from '../../../../types'
import {config} from '../../../../etc/config.ts'

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
    if (!update || !bodyRef?.current) {
      return
    }

    /**
     * @note It is calculated the initial position of the rigid body,
     *       and we send it to the caller so it can work properly
     *       with the body displacement.
     *       Take into consideration that it should be used
     *       the world coordinates to translate the body,
     *       that is why we calculate them here.
     *       Also, notice that the initial world position of the body
     *       is moved half its height so it is exactly above the floor.
     *       It is considered that the geometry of the
     *       body is a box of [1, 1, 1] so its scale defines
     *       its dimensions
     */
    const origin: [number, number, number] = [
      position[0],
      position[1] + scale[1] * 0.5,
      position[2],
    ]
    update(state.clock.getElapsedTime(), bodyRef.current, origin)
  })

  /**
   * @note It is moved the rigid body the half of its height,
   *       so it is exactly above the floor.
   *       It is considered that the geometry of the
   *       body is a box of [1, 1, 1] so its scale defines
   *       its dimensions
   */
  return (
    <group position={position}>
      <RigidBody
        type="kinematicPosition"
        position={[0, scale[1] * 0.5, 0]}
        restitution={0.2}
        friction={0}
        ref={bodyRef}
      >
        <mesh
          geometry={geometry}
          material={trapMaterial}
          scale={scale}
          castShadow={true}
        />
      </RigidBody>
      <mesh
        geometry={geometry}
        material={floorTrapMaterial}
        scale={[config.floor.width, config.floor.depth, config.floor.height]}
        position={[0, -config.floor.depth * 0.5, 0]}
        receiveShadow={true}
      />
    </group>
  )
}
