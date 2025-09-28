/**
 * @description Camera follow hook
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {useFrame} from '@react-three/fiber'
import * as React from 'react'
import type {RapierRigidBody} from '@react-three/rapier'
import {config} from '../etc/config.ts'

export const useCameraFollow: (
  playerRef: React.RefObject<RapierRigidBody>,
) => void = (playerRef) => {
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
    lookAtTarget.z -= config.camera.lookAt.target.displacement.z
    state.camera.lookAt(lookAtTarget.x, lookAtTarget.y, lookAtTarget.z)
  })
}
