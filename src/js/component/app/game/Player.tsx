/**
 * @description Player
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {type RapierRigidBody, RigidBody} from '@react-three/rapier'
import {useRef} from 'react'
import {config} from '../../../etc/config.ts'
import {useCameraFollow} from '../../../hook/useCameraFollow.ts'
import {usePlayerControl} from '../../../hook/usePlayerControl.ts'

export const Player = () => {
  const playerRef = useRef<RapierRigidBody>(null!)

  usePlayerControl(playerRef)
  useCameraFollow(playerRef)

  return (
    <RigidBody
      type="dynamic"
      restitution={0.2}
      friction={1}
      position={[0, config.player.height * 0.5, 0]}
      colliders="ball"
      linearDamping={config.player.movement.damping.linear}
      angularDamping={config.player.movement.damping.angular}
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
