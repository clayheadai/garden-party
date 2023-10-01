import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Html, Environment, useProgress } from '@react-three/drei'
import { XR, VRButton, TeleportationPlane, Controllers } from '@react-three/xr'
import { Box, Torus } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

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
                <color attach="background" args={['black']} />
                <Suspense fallback={<Loader />}>
                    <Environment preset="sunset" background />
                    <ambientLight intensity={0.5} />
                    <XR>
                        <Controllers />
                        <Physics debug>
                            <RigidBody>
                                <TeleportationPlane leftHand />
                            </RigidBody>
                            
                            <RigidBody colliders={"hull"} restitution={2}>
                                <Torus />
                            </RigidBody>

                            <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
                        </Physics>
                    </XR>
                </Suspense>
                
            </Canvas>
        </>
    )
}