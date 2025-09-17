/**
 * @description Limbo trap
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {type RapierRigidBody, vec3} from '@react-three/rapier'
import {useRef} from 'react'
import {Trap} from '../Trap.tsx'
import type {Trap as TrapType} from '../../../../../../types'
import {config} from '../../../../../../etc/config.ts'

export const Limbo: TrapType = ({position = [0, 0, 0]}) => {
  const offset = useRef(Math.random() * 2 * Math.PI)

  const handleUpdate = (
    time: number,
    body: RapierRigidBody,
    origin: [number, number, number],
  ) => {
    const angle = time + offset.current

    body.setNextKinematicTranslation(
      vec3({
        x: origin[0],
        y: origin[1] + (Math.sin(angle) + 1) + config.player.height * 0.1,
        z: origin[2],
      }),
    )
  }

  return (
    <Trap
      position={position}
      scale={[
        config.trap.limbo.width,
        config.trap.limbo.height,
        config.trap.limbo.depth,
      ]}
      update={handleUpdate}
    />
  )
}
