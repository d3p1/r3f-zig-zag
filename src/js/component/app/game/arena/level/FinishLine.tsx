/**
 * @description Finish line
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {RigidBody} from '@react-three/rapier'
import {type Level as LevelType} from '../../../../../types/index.ts'
import {Level} from '../Level.tsx'

export const FinishLine: LevelType = ({position}) => {
  return (
    <RigidBody
      type="fixed"
      position={position}
      restitution={0.2}
      friction={1}
      onCollisionEnter={() => console.log('HELO')}
    >
      <Level position={[0, 0, 0]} />
    </RigidBody>
  )
}
