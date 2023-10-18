import { Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Html, useProgress, PointerLockControls, Sphere, Stats, Sky } from '@react-three/drei'
import { XR, VRButton, TeleportationPlane, Controllers, useXR } from '@react-three/xr'
import { Physics, RigidBody } from '@react-three/rapier'

import { Bot } from './Bot'


function Loader() {
    const { total } = useProgress()
    return <Html center style={{color: "gold"}}>{Math.round(total)} % loaded</Html>
}

function WebControls() {
    const { isPresenting } = useXR()
    const { camera } = useThree()

    if (!isPresenting) {
        camera.position.set(-1, 1.5, -1)
        return <PointerLockControls />
    } else {
        return null
    }
}


export function Walls() {
    return (
        <group>
            <RigidBody type="fixed" colliders="cuboid">
                <mesh position={[-20, 3, 0]}>
                    <boxGeometry args={[1, 6, 40]} />
                    <meshToonMaterial color="white" />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed" colliders="cuboid">
                <mesh position={[0, 3, -20]}>
                    <boxGeometry args={[40, 6, 1]} />
                    <meshToonMaterial color="white" />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed" colliders="cuboid">
                <mesh position={[20, 3, 0]}>
                    <boxGeometry args={[1, 6, 40]} />
                    <meshToonMaterial color="white" />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed" colliders="cuboid">
                <mesh position={[0, 3, 20]}>
                    <boxGeometry args={[40, 6, 1]} />
                    <meshToonMaterial color="white" />
                </mesh>
            </RigidBody>
        </group>
    )
}

function Ball({ x, z, color, radius }) {
    return (
        <RigidBody position={[x, 10, z]} colliders="ball" restitution={1} mass={5} type="dynamic">
            <Sphere args={[radius, 12, 12]}>
                <meshToonMaterial color={color} />
            </Sphere>
        </RigidBody>
    )
}

function World() {
    const balls = []
    for (let i=0; i < 100; i++) {
        let x = Math.random() * 36 - 18
        let z = Math.random() * 36 - 18
        let radius = Math.random() * 0.9 + 0.1
        let color = Math.random() * 0xffffff

        balls.push(<Ball key={i} x={x} z={z} color={color} radius={radius} />)
    }

    return (
        <group dispose={null}>
            <RigidBody type="fixed">
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                    <planeGeometry  args={[40, 40]} />
                    <meshToonMaterial color="white" />
                </mesh>
            </RigidBody>
            <Walls />
            {balls}
        </group>
    )
}


export default function Game() {
    return (
        <div style={{height: "100vh", width: "100vw"}}>
            <VRButton onError={(e) => console.error(e)} />
            <Canvas>
                <Suspense fallback={<Loader />}>
                    <Stats />
                    <Sky sunPosition={[-0.5, 1, 0.4]} />
                    {/* <directionalLight intensity={2} position={[-0.5, 1, 0.4]} /> */}
                    <ambientLight intensity={.25} />
                    <XR>
                        <Controllers />
                        <TeleportationPlane leftHand />
                        <WebControls />
                        <Physics>
                            <World />
                            <Bot />
                        </Physics>
                    </XR>
                </Suspense>
                
            </Canvas>
        </div>
    )
}