/**
 * @description Twister trap
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import type {RapierRigidBody} from '@react-three/rapier'
import {useRef} from 'react'
import * as THREE from 'three'
import {Trap} from '../Trap.tsx'
import type {Trap as TrapType} from '../../../../types'

export const Twister: TrapType = ({
  position = [0, 0, 0],
  geometry = new THREE.BoxGeometry(),
  material = new THREE.MeshStandardMaterial(),
}) => {
  const frequency = useRef(
    (Math.random() + 0.2) * (-1) ** Math.round(Math.random()),
  )

  const handleUpdate = (body: RapierRigidBody, time: number) => {
    const angle = time * frequency.current
    const euler = new THREE.Euler(0, angle, 0)
    const rotation = new THREE.Quaternion().setFromEuler(euler)

    body.setNextKinematicRotation(rotation)
  }

  return (
    <Trap
      geometry={geometry}
      material={material}
      scale={[4, 0.5, 0.5]}
      position={position}
      update={handleUpdate}
    />
  )
}
