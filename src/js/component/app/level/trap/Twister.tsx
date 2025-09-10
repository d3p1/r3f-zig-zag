/**
 * @description Twister trap
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {quat, type RapierRigidBody} from '@react-three/rapier'
import {useRef} from 'react'
import * as THREE from 'three'
import {Trap} from '../Trap.tsx'
import type {Trap as TrapType} from '../../../../types'
import {config} from '../../../../etc/config.ts'

export const Twister: TrapType = ({position = [0, 0, 0]}) => {
  const frequency = useRef(
    (Math.random() + 0.2) * (-1) ** Math.round(Math.random()),
  )

  const handleUpdate = (time: number, body: RapierRigidBody) => {
    const angle = time * frequency.current
    const euler = new THREE.Euler(0, angle, 0)
    const rotation = new THREE.Quaternion().setFromEuler(euler)

    body.setNextKinematicRotation(
      quat({x: rotation.x, y: rotation.y, z: rotation.z, w: rotation.w}),
    )
  }

  return (
    <Trap
      scale={[
        config.trap.twister.width,
        config.trap.twister.height,
        config.trap.twister.depth,
      ]}
      position={position}
      update={handleUpdate}
    />
  )
}
