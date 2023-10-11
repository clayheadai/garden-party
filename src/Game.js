import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, Environment, useProgress, PointerLockControls, Plane, Stats } from '@react-three/drei'
import { XR, VRButton, TeleportationPlane, Controllers, useXR } from '@react-three/xr'

import { Rachel } from './Rachel'

function Loader() {
    const { total } = useProgress()
    return <Html center style={{color: "gold"}}>{Math.round(total)} % loaded</Html>
}

function WebControls() {
    const { isPresenting } = useXR()

    if (!isPresenting) {
        return <PointerLockControls />
    } else {
        return null
    }
}



export default function Game() {
    
    
    return (
        <div style={{height: "100vh", width: "100vw"}}>
            <VRButton onError={(e) => console.error(e)} />
            <Canvas shadows>
                <color attach="background" args={['black']} />
                <Suspense fallback={<Loader />}>
                    <Stats />
                    <Environment files="./hdr/green-sky.hdr" background />
                    <Plane rotation={[-Math.PI / 2, -0.1, 0]} position={[0, 0, 0]} args={[100, 100, 100, 100]} receiveShadow>
                        <meshBasicMaterial color="gray" />
                    </Plane>
                    <directionalLight castShadow />
                    <XR>
                        <Rachel position={[-5, 0, -5]} />
                        <Controllers />
                        <TeleportationPlane leftHand />
                        <WebControls />
                    </XR>
                </Suspense>
                
            </Canvas>
        </div>
    )
}