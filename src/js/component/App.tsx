/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {Canvas} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import {Physics} from '@react-three/rapier'
import {Light} from './app/env/Light.tsx'
import {Game} from './app/Game.tsx'

export const App = () => {
  return (
    <Canvas camera={{position: [1, 1, 5]}} shadows={true}>
      <OrbitControls />

      <Physics debug={true}>
        <Light />
        <Game />
      </Physics>
    </Canvas>
  )
}
