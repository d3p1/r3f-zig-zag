/**
 * @description Level
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import type {ThreeElements} from '@react-three/fiber'
import {RigidBody} from '@react-three/rapier'
import * as React from 'react'
import * as THREE from 'three'
import {useRef} from 'react'

const StartLevel: React.FC<ThreeElements['mesh']> = ({
  scale = [5, 0.5, 5],
  position = [0, -0.25, 0],
  geometry,
  material,
}) => {
  return (
    <RigidBody type="fixed">
      <mesh
        geometry={geometry}
        material={material}
        scale={scale}
        position={position}
        receiveShadow={true}
      />
    </RigidBody>
  )
}

export const Level = () => {
  const geometry = useRef(new THREE.BoxGeometry())
  const material = useRef(new THREE.MeshStandardMaterial({color: 'lime'}))

  return (
    <>
      <StartLevel geometry={geometry.current} material={material.current} />
    </>
  )
}
