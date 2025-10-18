/**
 * @description Player control hook
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {World} from '@dimforge/rapier3d'
import {useKeyboardControls} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {type RapierRigidBody, useRapier, vec3} from '@react-three/rapier'
import {useEffect} from 'react'
import * as React from 'react'
import {PlayerManager} from '../service/player-manager.ts'
import {useStageStore} from '../store/stage.ts'
import {type ActiveControl} from '../types'
import {config} from '../etc/config.ts'

const playerManager = new PlayerManager(config.player)
export const usePlayerControl: (
  playerRef: React.RefObject<RapierRigidBody>,
) => void = (playerRef) => {
  const isFinished = useStageStore((state) => state.isFinished)
  const [sub, get] = useKeyboardControls<ActiveControl>()
  const {world} = useRapier()

  useEffect(() => {
    if (isFinished) {
      return
    }

    const unsub = sub(
      (state) => state.jump,
      (isJump) => {
        if (!isJump || !playerRef?.current) {
          return
        }
        const force = playerManager.jump(
          playerRef.current.translation(),
          world as unknown as World,
        )
        playerRef.current.applyImpulse(vec3({x: 0, y: force, z: 0}), true)
      },
    )

    return () => {
      unsub()
    }
  }, [isFinished])

  useFrame((_, delta) => {
    if (!playerRef?.current || isFinished) {
      return
    }

    const control = get()
    const [force, torque] = playerManager.move(delta, control)
    playerRef.current.applyImpulse(force, true)
    playerRef.current.applyTorqueImpulse(torque, true)
  })
}
