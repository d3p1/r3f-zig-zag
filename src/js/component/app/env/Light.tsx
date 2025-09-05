/**
 * @description Light
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export const Light = () => {
  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight
        intensity={5}
        position={[1, 1, 5]}
        castShadow={true}
        shadow-mapSize={[64, 64]}
        shadow-camera-top={2}
        shadow-camera-right={2}
        shadow-camera-bottom={-2}
        shadow-camera-left={-2}
      />
    </>
  )
}
