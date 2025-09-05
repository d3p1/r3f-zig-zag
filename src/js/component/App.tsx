/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {Canvas} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'

export const App = () => {
  return (
    <Canvas camera={{position: [1, 1, 1]}}>
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </Canvas>
  )
}
