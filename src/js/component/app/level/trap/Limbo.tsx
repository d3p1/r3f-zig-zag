/**
 * @description Limbo trap
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import type {RapierRigidBody} from '@react-three/rapier'
import {useRef} from 'react'
import * as THREE from 'three'
import {Trap} from '../Trap.tsx'
import type {Trap as TrapType} from '../../../../types'
import {config} from '../../../../etc/config.ts'

export const Limbo: TrapType = ({
  geometry = new THREE.BoxGeometry(),
  material = new THREE.MeshStandardMaterial(),
  position = [0, 0, 0],
}) => {
  const offset = useRef(Math.random() * 2 * Math.PI)

  const handleUpdate = (body: RapierRigidBody, time: number) => {
    const angle = time + offset.current
    const origin = position as [number, number, number]

    body.setNextKinematicTranslation({
      x: origin[0],
      y: origin[1] + Math.sin(angle) + 1.1,
      z: origin[2],
    })
  }

  const scaleX = config.floor.width * 0.75
  const scaleY = scaleX * 0.1
  const scaleZ = scaleY
  return (
    <Trap
      geometry={geometry}
      material={material}
      position={position}
      scale={[scaleX, scaleY, scaleZ]}
      update={handleUpdate}
    />
  )
}
