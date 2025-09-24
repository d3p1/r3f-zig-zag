/**
 * @description Player control hook
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {World} from '@dimforge/rapier3d'
import {useKeyboardControls} from '@react-three/drei'
import {type RapierRigidBody, useRapier} from '@react-three/rapier'
import * as React from 'react'
import {useEffect} from 'react'
import {PlayerManager} from '../service/player-manager.ts'
import {CONTROL} from '../types'
import {config} from '../etc/config.ts'

export const usePlayerControl: (
  playerRef: React.RefObject<RapierRigidBody>,
) => void = (playerRef) => {
  const [sub] = useKeyboardControls<(typeof CONTROL)[keyof typeof CONTROL]>()
  const {world} = useRapier()

  useEffect(() => {
    const playerManager = new PlayerManager(
      playerRef.current,
      world as unknown as World,
      config.player,
    )
    const unsubControls = sub((pressed) => {
      playerManager.move(pressed)
    })

    return () => {
      unsubControls()
    }
  }, [])
}
