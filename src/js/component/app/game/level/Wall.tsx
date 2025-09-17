/**
 * @description Wall
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {RigidBody} from '@react-three/rapier'
import {useStage} from '../../../../store/useStage.ts'
import {config} from '../../../../etc/config.ts'

export const Wall = () => {
  const totalSteps = useStage((state) => state.getTotalSteps())
  const geometry = useStage((state) => state.geometry)
  const material = useStage((state) => state.wallMaterial)

  return (
    <RigidBody type="fixed" restitution={0.2} friction={0} position={[0, 0, 0]}>
      <mesh
        geometry={geometry}
        material={material}
        position={[
          config.floor.width * 0.5 + config.wall.depth * 0.5,
          config.wall.height * 0.5,
          config.floor.height * 0.5 - totalSteps * config.floor.height * 0.5,
        ]}
        scale={[
          config.wall.depth,
          config.wall.height,
          totalSteps * config.floor.height,
        ]}
      />
      <mesh
        geometry={geometry}
        material={material}
        position={[
          -(config.floor.width * 0.5 + config.wall.depth * 0.5),
          config.wall.height * 0.5,
          config.floor.height * 0.5 - totalSteps * config.floor.height * 0.5,
        ]}
        scale={[
          config.wall.depth,
          config.wall.height,
          totalSteps * config.floor.height,
        ]}
      />
      <mesh
        geometry={geometry}
        material={material}
        position={[
          0,
          config.wall.height * 0.5,
          config.floor.height * 0.5 -
            totalSteps * config.floor.height -
            config.wall.depth * 0.5,
        ]}
        scale={[config.floor.width, config.wall.height, config.wall.depth]}
      />
    </RigidBody>
  )
}
