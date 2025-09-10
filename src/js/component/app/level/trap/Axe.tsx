/**
 * @description Axe trap
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {type RapierRigidBody, vec3} from '@react-three/rapier'
import {useRef} from 'react'
import {Trap} from '../Trap.tsx'
import type {Trap as TrapType} from '../../../../types'
import {config} from '../../../../etc/config.ts'

export const Axe: TrapType = ({position = [0, 0, 0]}) => {
  const offset = useRef(Math.random() * 2 * Math.PI)

  const handleUpdate = (body: RapierRigidBody, time: number) => {
    const angle = time + offset.current

    body.setNextKinematicTranslation(
      vec3({
        x:
          position[0] +
          Math.sin(angle) * (config.floor.width - config.trap.axe.width) * 0.5,
        y: position[1] + config.trap.axe.height * 0.5,
        z: position[2],
      }),
    )
  }

  return (
    <Trap
      scale={[
        config.trap.axe.width,
        config.trap.axe.height,
        config.trap.axe.depth,
      ]}
      position={position}
      update={handleUpdate}
    />
  )
}
