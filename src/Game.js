import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { XR, VRButton, TeleportationPlane, Controllers, RayGrab } from '@react-three/xr'

export default function Game() {
    const { scene } = useGLTF("./models/ground.glb")
    return (
        <>
            <VRButton onError={(e) => console.error(e)} />
            <Canvas>
                <color attach="background" args={['black']} />
                <XR>
                <Controllers />
                <TeleportationPlane leftHand />
                <group dispose={null}>
                    <primitive object={scene}>
                        <meshBasicMaterial color="red" />
                    </primitive>
                </group>
                <ambientLight intensity={0.5} />
                </XR>
            </Canvas>
        </>
    )
}