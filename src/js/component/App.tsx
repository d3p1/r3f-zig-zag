/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {Canvas} from '@react-three/fiber'
import {KeyboardControls} from '@react-three/drei'
import {Physics} from '@react-three/rapier'
import {Perf} from 'r3f-perf'
import {config} from '../etc/config.ts'
import {useStageStore} from '../store/stage.ts'
import {Light} from './app/env/Light.tsx'
import {Game} from './app/Game.tsx'
import {CONTROL} from '../types'

export const App = () => {
  const isFinished = useStageStore((state) => state.isFinished)

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
      <Canvas
        shadows={true}
        camera={{
          position: [
            config.camera.position.x,
            config.camera.position.y,
            config.camera.position.z,
          ],
        }}
      >
        <Perf position="top-left" />

        <Physics debug={false}>
          <Light />
          <Game />
        </Physics>
      </Canvas>

      {isFinished && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.6)] text-primary backdrop-blur-md"></div>
      )}
    </KeyboardControls>
  )
}
