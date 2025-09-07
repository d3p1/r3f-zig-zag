/**
 * @description Level
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {type ThreeElements, useFrame} from '@react-three/fiber'
import {type RapierRigidBody, RigidBody} from '@react-three/rapier'
import * as React from 'react'
import * as THREE from 'three'
import {useRef} from 'react'

const Stage: React.FC<ThreeElements['mesh']> = ({
  position,
  geometry,
  material,
  children,
}) => {
  return (
    <RigidBody type="fixed">
      <group position={position}>
        <mesh
          geometry={geometry}
          material={material}
          scale={[5, 0.5, 5]}
          position={[0, -0.25, 0]}
          receiveShadow={true}
        />
        {children}
      </group>
    </RigidBody>
  )
}

const StartLevel: React.FC<ThreeElements['mesh']> = ({
  position = [0, 0, 0],
  geometry,
  material,
}) => {
  return <Stage position={position} geometry={geometry} material={material} />
}

const TrapLevel: React.FC<ThreeElements['mesh']> = ({
  position,
  geometry,
  material,
}) => {
  const trapRef = useRef<RapierRigidBody>(null!)
  const rotationSpeed = useRef(
    (Math.random() + 0.2) * (-1) ** Math.round(Math.random()),
  )

  useFrame((state) => {
    const angle = state.clock.getElapsedTime() * rotationSpeed.current

    const euler = new THREE.Euler(0, angle, 0)
    const rotation = new THREE.Quaternion().setFromEuler(euler)
    trapRef.current.setNextKinematicRotation(rotation)
  })

  return (
    <Stage position={position} geometry={geometry} material={material}>
      <RigidBody
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
        ref={trapRef}
      >
        <mesh scale={[4.5, 0.5, 1]} position={[0, 0.25, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </RigidBody>
    </Stage>
  )
}

export const Level = () => {
  const geometry = useRef(new THREE.BoxGeometry())
  const material = useRef(new THREE.MeshStandardMaterial({color: 'lime'}))

  return (
    <>
      <StartLevel geometry={geometry.current} material={material.current} />
      <TrapLevel
        geometry={geometry.current}
        material={material.current}
        position={[0, 0, -5]}
      />
    </>
  )
}
