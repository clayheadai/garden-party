import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, Environment, useProgress, PointerLockControls, Plane } from '@react-three/drei'
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
            <Canvas>
                <color attach="background" args={['black']} />
                <Suspense fallback={<Loader />}>
                    <Environment files="./hdr/magic-blue.hdr" background />
                    <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} args={[100, 100, 100, 100]}>
                        <meshBasicMaterial color="hotpink" />
                    </Plane>
                    <ambientLight />
                    <XR>
                        <Rachel position={[-5, -2, -5]} rotation={[0, Math.PI / 2, 0]} />
                        <Controllers />
                        <TeleportationPlane leftHand />
                        <WebControls />
                    </XR>
                </Suspense>
                
            </Canvas>
        </div>
    )
}