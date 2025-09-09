/**
 * @description Axe trap
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import type {RapierRigidBody} from '@react-three/rapier'
import {useRef} from 'react'
import {Trap} from '../Trap.tsx'
import type {Trap as TrapType} from '../../../../types'
import {config} from '../../../../etc/config.ts'

export const Axe: TrapType = ({position = [0, 0, 0]}) => {
  const offset = useRef(Math.random() * 2 * Math.PI)
  const scaleX = config.floor.width * 0.75
  const scaleY = scaleX
  const scaleZ = scaleY * 0.1

  const handleUpdate = (body: RapierRigidBody, time: number) => {
    const angle = time + offset.current

    body.setNextKinematicTranslation({
      x: position[0] + Math.sin(angle) * (config.floor.width - scaleX) * 0.5,
      y: position[1] + scaleY * 0.5,
      z: position[2],
    })
  }

  return (
    <Trap
      scale={[scaleX, scaleY, scaleZ]}
      position={position}
      update={handleUpdate}
    />
  )
}
