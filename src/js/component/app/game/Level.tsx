/**
 * @description Level
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import type {Level as LevelType} from '../../../types'
import {useStage} from '../../../store/useStage.ts'
import {config} from '../../../etc/config.ts'

export const Level: LevelType = ({position}) => {
  const geometry = useStage((state) => state.geometry)
  const material = useStage((state) => state.floorMaterial)

  /**
   * @note It is moved the mesh half of its height,
   *       so the floor level is exactly at the y=0 level.
   *       It is considered that the geometry of the
   *       mesh is a box of [1, 1, 1] so its scale defines
   *       its dimensions
   */
  const origin: [number, number, number] = [
    position[0],
    position[1] - config.floor.height * 0.5,
    position[2],
  ]
  return (
    <mesh
      geometry={geometry}
      material={material}
      scale={[config.floor.width, config.floor.height, config.floor.depth]}
      receiveShadow={true}
      position={origin}
    />
  )
}
