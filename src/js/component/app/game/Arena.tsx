/**
 * @description Wall
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import type {Arena as ArenaType} from '../../../types'
import {CuboidCollider, RigidBody} from '@react-three/rapier'
import {useStageStore} from '../../../store/stage.ts'
import {config} from '../../../etc/config.ts'
import {Mathy} from '../../../utils/Mathy.ts'

export const Arena: ArenaType = ({children}) => {
  const geometry = useStageStore((state) => state.geometry)
  const material = useStageStore((state) => state.wallMaterial)

  /**
   * @note Total steps is the number of traps plus the start and end steps
   */
  const totalSteps = useStageStore((state) => state.trapCount + 2)

  /**
   * @note Calculate arena total distance required for many calculations
   */
  const totalDistance = totalSteps * config.floor.height

  /**
   * @note Calculate arena start, middle and end required for many calculations
   */
  const arenaStart = config.floor.height * 0.5
  const arenaEnd = config.floor.height * 0.5 - totalDistance
  const arenaMiddle = Mathy.lerp(arenaStart, arenaEnd, 0.5)

  /**
   * @note Calculate side wall scale
   */
  const sideWallScale: [number, number, number] = [
    config.wall.depth,
    config.wall.height,
    totalDistance,
  ]

  return (
    <>
      <RigidBody
        type="fixed"
        restitution={0.2}
        friction={0}
        position={[0, 0, 0]}
      >
        <mesh
          geometry={geometry}
          material={material}
          position={[
            config.floor.width * 0.5 + config.wall.depth * 0.5,
            config.wall.height * 0.5,
            arenaMiddle,
          ]}
          scale={sideWallScale}
          receiveShadow={true}
        />
        <mesh
          geometry={geometry}
          material={material}
          position={[
            -(config.floor.width * 0.5 + config.wall.depth * 0.5),
            config.wall.height * 0.5,
            arenaMiddle,
          ]}
          scale={sideWallScale}
          receiveShadow={true}
        />
        <mesh
          geometry={geometry}
          material={material}
          position={[
            0,
            config.wall.height * 0.5,
            arenaEnd - config.wall.depth * 0.5,
          ]}
          scale={[config.floor.width, config.wall.height, config.wall.depth]}
          receiveShadow={true}
        />

        <CuboidCollider
          args={[
            config.floor.width * 0.5,
            config.floor.depth * 0.5,
            totalDistance * 0.5,
          ]}
          position={[0, -config.floor.depth * 0.5, arenaMiddle]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>

      {children}
    </>
  )
}
