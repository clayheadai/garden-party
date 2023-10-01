import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, Environment, useProgress } from '@react-three/drei'
import { XR, VRButton, TeleportationPlane, Controllers } from '@react-three/xr'
import { Torus } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";

function Loader() {
    const { total } = useProgress()
    return <Html center>{Math.round(total)} % loaded</Html>
  }

export default function Game() {
    // const { scene } = useGLTF("./models/ground.glb")
    return (
        <>
            <VRButton onError={(e) => console.error(e)} />
            <Canvas>
                <color attach="background" args={['gray']} />
                <Suspense fallback={<Loader />}>
                    <Environment preset="sunset" background />
                    <ambientLight intensity={0.5} />
                    <XR>
                        <Controllers />
                        <TeleportationPlane leftHand />
                        <Physics debug>
                            <RigidBody type="static">
                                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                                    <planeGeometry args={[100, 100, 50, 50]} />
                                    <meshBasicMaterial color="yellow" wireframe />
                                </mesh>
                            </RigidBody>
                            
                            <RigidBody colliders={"hull"} restitution={2}>
                                <Torus />
                            </RigidBody>

                        </Physics>
                    </XR>
                </Suspense>
                
            </Canvas>
        </>
    )
}