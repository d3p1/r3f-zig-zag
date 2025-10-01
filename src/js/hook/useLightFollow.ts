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

    const positionX =
      state.camera.position.x + config.light.position.target.displacement.x
    const positionY =
      state.camera.position.y + config.light.position.target.displacement.y
    const positionZ =
      state.camera.position.z + config.light.position.target.displacement.z
    lightRef.current.position.set(positionX, positionY, positionZ)

    const targetX =
      state.camera.position.x + config.light.lookAt.target.displacement.x
    const targetY =
      state.camera.position.y + config.light.lookAt.target.displacement.y
    const targetZ =
      state.camera.position.z - config.light.lookAt.target.displacement.z
    lightRef.current.target.position.set(targetX, targetY, targetZ)
    lightRef.current.target.updateMatrixWorld()
  })
}
