/**
 * @description Finish line
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {RigidBody} from '@react-three/rapier'
import {useRef} from 'react'
import {useStageStore} from '../../../../../store/stage.ts'
import {type Level as LevelType} from '../../../../../types/index.ts'
import {Level} from '../Level.tsx'
import {config} from '../../../../../etc/config.ts'

export const FinishLine: LevelType = ({position}) => {
  const hasCollideRef = useRef(false)
  const finish = useStageStore((state) => state.finish)

  const handleCollisionEnter = () => {
    if (hasCollideRef.current) {
      return
    }
    hasCollideRef.current = true

    finish()
  }

  return (
    <RigidBody
      type="fixed"
      position={position}
      restitution={config.world.restitution}
      friction={config.floor.friction}
      onCollisionEnter={handleCollisionEnter}
    >
      <Level position={[0, 0, 0]} />
    </RigidBody>
  )
}
