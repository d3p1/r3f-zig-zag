/**
 * @description Player
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {config} from '../../../etc/config.ts'

export const Player = () => {
  return (
    <mesh position={[0, config.player.height * 0.5, 0]} castShadow={true}>
      <icosahedronGeometry
        args={[config.player.height * 0.5, config.player.details]}
      />
      <meshStandardMaterial color="mediumpurple" flatShading={true} />
    </mesh>
  )
}
