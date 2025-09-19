/**
 * @description Player
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {useKeyboardControls} from '@react-three/drei'
import {RigidBody} from '@react-three/rapier'
import {useEffect} from 'react'
import {config} from '../../../etc/config.ts'
import {CONTROL} from '../../../types'

export const Player = () => {
  const [sub] = useKeyboardControls<(typeof CONTROL)[keyof typeof CONTROL]>()

  useEffect(() => {
    const unsubControls = sub((pressed) => {
      console.log(pressed)
    })

    return () => {
      unsubControls()
    }
  }, [])

  return (
    <RigidBody
      type="dynamic"
      restitution={0.2}
      friction={1}
      position={[0, config.player.height * 0.5, 0]}
      colliders="ball"
    >
      <mesh castShadow={true}>
        <icosahedronGeometry
          args={[config.player.height * 0.5, config.player.details]}
        />
        <meshStandardMaterial color="mediumpurple" flatShading={true} />
      </mesh>
    </RigidBody>
  )
}
