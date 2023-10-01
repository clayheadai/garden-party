import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { XR, VRButton, TeleportationPlane, Controllersm, RayGrab } from '@react-three/xr'

export default function Game() {
  return (
    <>
      <VRButton onError={(e) => console.error(e)} />
      <Canvas>
        <color attach="background" args={['black']} />
        <Environment preset="city" background />
        <XR>
          <Controllers />
          <TeleportationPlane leftHand />
          <RayGrab>
            <mesh position={[1, 0, 0]}>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshBasicMaterial color="red" />
            </mesh>
          </RayGrab>
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial color="green" />
          </mesh>
          <mesh position={[0, 0, 1]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial color="blue" />
          </mesh>
          <ambientLight intensity={0.5} />
        </XR>
      </Canvas>
    </>
  )
}