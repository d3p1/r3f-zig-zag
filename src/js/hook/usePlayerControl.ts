/**
 * @description Player control hook
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {useKeyboardControls} from '@react-three/drei'
import {type RapierRigidBody, useRapier, vec3} from '@react-three/rapier'
import * as React from 'react'
import {useEffect} from 'react'
import {CONTROL} from '../types'
import {config} from '../etc/config.ts'

export const usePlayerControl: (
  playerRef: React.RefObject<RapierRigidBody>,
) => void = (playerRef) => {
  const [sub] = useKeyboardControls<(typeof CONTROL)[keyof typeof CONTROL]>()

  const {rapier, world} = useRapier()

  useEffect(() => {
    const unsubControls = sub((pressed) => {
      const torqueImpulse = {x: 0, y: 0, z: 0}
      const forceImpulse = {x: 0, y: 0, z: 0}

      if (pressed.forward || pressed.backward) {
        forceImpulse.z +=
          config.player.control.force * (-1) ** Number(pressed.forward)
        torqueImpulse.x +=
          config.player.control.torque * (-1) ** Number(pressed.forward)
      }

      if (pressed.leftward || pressed.rightward) {
        forceImpulse.x +=
          config.player.control.force * (-1) ** Number(pressed.leftward)
        torqueImpulse.z +=
          config.player.control.torque * (-1) ** Number(pressed.rightward)
      }

      if (pressed.jump) {
        const rayDirection = {x: 0, y: -1, z: 0}
        const rayOrigin = playerRef.current.translation()

        /**
         * @note Current player position is calculated from its center.
         *       That is why we need to subtract half its height and a
         *       little more to cast the ray just below the player
         */
        rayOrigin.y -=
          config.player.height * 0.5 -
          config.player.control.jump.ray.displacement

        const ray = new rapier.Ray(vec3(rayOrigin), vec3(rayDirection))
        const hit = world.castRay(
          ray,
          config.player.control.jump.ray.maxToi,
          true,
        )
        const timeOfImpact = hit?.timeOfImpact ?? 0
        if (timeOfImpact < config.player.control.jump.maxDistance) {
          forceImpulse.y += config.player.control.jump.force
        }
      }

      playerRef?.current.applyImpulse(vec3(forceImpulse), true)
      playerRef?.current.applyTorqueImpulse(vec3(torqueImpulse), true)
    })

    return () => {
      unsubControls()
    }
  }, [])
}
