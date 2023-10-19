import { Suspense, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Html, useProgress, useGLTF, PointerLockControls, Stats, Stars } from '@react-three/drei'
import { XR, VRButton, TeleportationPlane, Controllers, useXR } from '@react-three/xr'

import { Bot } from './Bot'
import useOctree from './useOctree'


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


function World({ setOctree }) {
    const { scene } = useGLTF("./models/World/Walk in the Woods.glb")

    scene.scale.set(28, 28, 28)
    const octree = useOctree(scene)
    setOctree(octree)

    return (
        <group dispose={null}>
            <primitive position={[0, 2, 0]} object={scene} />
        </group>
    )
}


export default function Game() {
    const [octree, setOctree] = useState(null)

    return (
        <div style={{height: "100vh", width: "100vw"}}>
            <VRButton onError={(e) => console.error(e)} />
            <Canvas>
                <color attach="background" args={["black"]} />
                <Stars />
                <Suspense fallback={<Loader />}>
                    <Stats />
                    <directionalLight intensity={2} position={[-0.5, 1, 0.4]} />
                    <ambientLight intensity={.2} />
                    <XR>
                        <Controllers />
                        <TeleportationPlane leftHand />
                        <WebControls />
                        <World setOctree={setOctree} />
                        <Bot octree={octree}/>
                    </XR>
                </Suspense>
            </Canvas>
        </div>
    )
}