/**
 * @description Level
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import type {Level as LevelType} from '../../../types'
import {useStage} from '../../../store/useStage.ts'
import {config} from '../../../etc/config.ts'

export const Level: LevelType = ({position = [0, 0, 0]}) => {
  const geometry = useStage((state) => state.geometry)
  const material = useStage((state) => state.floorMaterial)

  return (
    <mesh
      geometry={geometry}
      material={material}
      scale={[config.floor.width, config.floor.height, config.floor.depth]}
      receiveShadow={true}
      position={position}
    />
  )
}
