/**
 * @description Wall
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {RigidBody} from '@react-three/rapier'
import {useStage} from '../../../../store/useStage.ts'
import type {Wall as WallType} from '../../../../types'

export const Wall: WallType = ({position, scale}) => {
  const geometry = useStage((state) => state.geometry)
  const material = useStage((state) => state.wallMaterial)

  return (
    <RigidBody type="fixed" restitution={0.2} friction={0} position={position}>
      <mesh
        geometry={geometry}
        material={material}
        scale={scale}
        receiveShadow={true}
      />
    </RigidBody>
  )
}
