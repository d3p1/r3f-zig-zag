/**
 * @description Player control hook
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {World} from '@dimforge/rapier3d'
import {useKeyboardControls} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {type RapierRigidBody, useRapier} from '@react-three/rapier'
import {useEffect, useRef} from 'react'
import * as React from 'react'
import {PlayerManager} from '../service/player-manager.ts'
import {CONTROL} from '../types'
import {config} from '../etc/config.ts'

export const usePlayerControl: (
  playerRef: React.RefObject<RapierRigidBody>,
) => void = (playerRef) => {
  const [_, get] = useKeyboardControls<(typeof CONTROL)[keyof typeof CONTROL]>()
  const {world} = useRapier()
  const playerManagerRef = useRef<PlayerManager>(null!)

  useEffect(() => {
    playerManagerRef.current = new PlayerManager(
      playerRef.current,
      world as unknown as World,
      config.player,
    )
  }, [])

  useFrame((_, delta) => {
    const control = get()
    playerManagerRef.current.move(control, delta)
  })
}
