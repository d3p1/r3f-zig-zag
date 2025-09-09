/**
 * @description Axe trap
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import type {RapierRigidBody} from '@react-three/rapier'
import {useRef} from 'react'
import * as THREE from 'three'
import {Trap} from '../Trap.tsx'
import type {Trap as TrapType} from '../../../../types'

export const Axe: TrapType = ({
  geometry = new THREE.BoxGeometry(),
  material = new THREE.MeshStandardMaterial(),
  position = [0, 0, 0],
}) => {
  const offset = useRef(Math.random() * 2 * Math.PI)

  const handleUpdate = (body: RapierRigidBody, time: number) => {
    const angle = time + offset.current

    const origin = position as [number, number, number]
    body.setNextKinematicTranslation({
      x: origin[0] + Math.sin(angle) * 2,
      y: origin[1],
      z: origin[2],
    })
  }

  return (
    <Trap
      geometry={geometry}
      material={material}
      scale={[4, 4, 0.5]}
      position={position}
      update={handleUpdate}
    />
  )
}
