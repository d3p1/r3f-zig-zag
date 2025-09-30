/**
 * @description Light follow hook
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import * as React from 'react'
import {useFrame} from '@react-three/fiber'
import {config} from '../etc/config.ts'

export const useLightFollow: (
  lightRef: React.RefObject<THREE.DirectionalLight>,
) => void = (lightRef) => {
  useFrame((state) => {
    if (!lightRef?.current) {
      return
    }

    const positionTarget = state.camera.position.clone()
    positionTarget.x += config.light.position.target.displacement.x
    positionTarget.y += config.light.position.target.displacement.y
    positionTarget.z += config.light.position.target.displacement.z

    lightRef.current.position.set(
      positionTarget.x,
      positionTarget.y,
      positionTarget.z,
    )
  })
}
