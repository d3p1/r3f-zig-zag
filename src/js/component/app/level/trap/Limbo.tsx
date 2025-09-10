/**
 * @description Limbo trap
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {type RapierRigidBody, vec3} from '@react-three/rapier'
import {useRef} from 'react'
import {Trap} from '../Trap.tsx'
import type {Trap as TrapType} from '../../../../types'
import {config} from '../../../../etc/config.ts'

export const Limbo: TrapType = ({position = [0, 0, 0]}) => {
  const offset = useRef(Math.random() * 2 * Math.PI)
  const scaleX = config.floor.width * 0.75
  const scaleY = scaleX * 0.1
  const scaleZ = scaleY

  const handleUpdate = (body: RapierRigidBody, time: number) => {
    const angle = time + offset.current

    body.setNextKinematicTranslation(
      vec3({
        x: position[0],
        y:
          position[1] +
          scaleY * 0.5 +
          (Math.sin(angle) + 1) +
          config.player.height * 0.1,
        z: position[2],
      }),
    )
  }

  return (
    <Trap
      position={position}
      scale={[scaleX, scaleY, scaleZ]}
      update={handleUpdate}
    />
  )
}
