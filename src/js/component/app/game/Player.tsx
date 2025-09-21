/**
 * @description Player
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {useKeyboardControls} from '@react-three/drei'
import {type RapierRigidBody, RigidBody, vec3} from '@react-three/rapier'
import {useEffect, useRef} from 'react'
import {config} from '../../../etc/config.ts'
import {CONTROL} from '../../../types'

const FORCE_IMPULSE = 0.5
const TORQUE_IMPULSE = 0.05
const JUMP_IMPULSE = FORCE_IMPULSE * 5

export const Player = () => {
  const playerRef = useRef<RapierRigidBody>(null!)
  const [sub] = useKeyboardControls<(typeof CONTROL)[keyof typeof CONTROL]>()

  useEffect(() => {
    const unsubControls = sub((pressed) => {
      const torqueImpulse = {x: 0, y: 0, z: 0}
      const forceImpulse = {x: 0, y: 0, z: 0}

      if (pressed.forward || pressed.backward) {
        forceImpulse.z += FORCE_IMPULSE * (-1) ** Number(pressed.forward)
        torqueImpulse.x += TORQUE_IMPULSE * (-1) ** Number(pressed.forward)
      }

      if (pressed.leftward || pressed.rightward) {
        forceImpulse.x += FORCE_IMPULSE * (-1) ** Number(pressed.leftward)
        torqueImpulse.z += TORQUE_IMPULSE * (-1) ** Number(pressed.rightward)
      }

      if (pressed.jump) {
        forceImpulse.y += JUMP_IMPULSE
      }

      playerRef.current.applyImpulse(vec3(forceImpulse), true)
      playerRef.current.applyTorqueImpulse(vec3(torqueImpulse), true)
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
      ref={playerRef}
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
