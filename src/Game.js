import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { XR, VRButton, TeleportationPlane, Controllers } from '@react-three/xr'

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
                        <meshBasicMaterial color="orange" wireframe />
                    </primitive>
                </group>
                <Environment preset="sunset" background />
                <ambientLight intensity={0.5} />
                </XR>
            </Canvas>
        </>
    )
}