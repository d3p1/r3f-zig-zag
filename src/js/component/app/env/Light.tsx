/**
 * @description Light
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import {useRef} from 'react'
import {useLightFollow} from '../../../hook/useLightFollow.ts'

export const Light = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null!)

  useLightFollow(lightRef)

  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight
        intensity={5}
        castShadow={true}
        shadow-mapSize={[64, 64]}
        shadow-camera-top={2}
        shadow-camera-right={2}
        shadow-camera-bottom={-2}
        shadow-camera-left={-2}
        ref={lightRef}
      />
    </>
  )
}
