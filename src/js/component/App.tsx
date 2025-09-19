/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {Canvas} from '@react-three/fiber'
import {KeyboardControls, OrbitControls} from '@react-three/drei'
import {Physics} from '@react-three/rapier'
import {Light} from './app/env/Light.tsx'
import {Game} from './app/Game.tsx'
import {CONTROL} from '../types'

export const App = () => {
  return (
    <KeyboardControls
      map={[
        {name: CONTROL.FORWARD, keys: ['ArrowUp', 'KeyW']},
        {name: CONTROL.RIGHTWARD, keys: ['ArrowRight', 'KeyD']},
        {name: CONTROL.BACKWARD, keys: ['ArrowDown', 'KeyS']},
        {name: CONTROL.LEFTWARD, keys: ['ArrowLeft', 'KeyA']},
        {name: CONTROL.JUMP, keys: ['Space']},
      ]}
    >
      <Canvas camera={{position: [1, 1, 5]}} shadows={true}>
        <OrbitControls />

        <Physics debug={true}>
          <Light />
          <Game />
        </Physics>
      </Canvas>
    </KeyboardControls>
  )
}
