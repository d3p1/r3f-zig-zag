/**
 * @description Camera follow hook
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import {useFrame} from '@react-three/fiber'
import {useRef} from 'react'
import * as React from 'react'
import type {RapierRigidBody} from '@react-three/rapier'
import {config} from '../etc/config.ts'

export const useCameraFollow: (
  playerRef: React.RefObject<RapierRigidBody>,
) => void = (playerRef) => {
  const cameraLookAtRef = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((state, delta) => {
    if (!playerRef.current) {
      return null
    }

    const origin = playerRef.current.translation()

    const positionTarget = {...origin}
    positionTarget.x += config.camera.position.target.displacement.x
    positionTarget.y += config.camera.position.target.displacement.y
    positionTarget.z += config.camera.position.target.displacement.z
    state.camera.position.lerp(
      positionTarget,
      config.camera.position.target.displacement.factor * delta,
    )

    const lookAtTarget = {...origin}
    lookAtTarget.x += config.camera.lookAt.target.displacement.x
    lookAtTarget.y += config.camera.lookAt.target.displacement.y
    lookAtTarget.z += -config.camera.lookAt.target.displacement.z
    cameraLookAtRef.current.lerp(
      lookAtTarget,
      config.camera.lookAt.target.displacement.factor * delta,
    )
    state.camera.lookAt(
      cameraLookAtRef.current.x,
      cameraLookAtRef.current.y,
      cameraLookAtRef.current.z,
    )
  })
}
