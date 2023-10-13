import { Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Html, Environment, useProgress, PointerLockControls, Plane, Stats } from '@react-three/drei'
import { XR, VRButton, TeleportationPlane, Controllers, useXR } from '@react-three/xr'
import { AmbientLight, FogExp2 } from 'three'

import { Rachel } from './Rachel'

function Loader() {
    const { total } = useProgress()
    return <Html center style={{color: "gold"}}>{Math.round(total)} % loaded</Html>
}

function WebControls() {
    const { isPresenting } = useXR()
    const { camera } = useThree()

    if (!isPresenting) {
        camera.position.set(-2.4, 1.5, -2.4)
        return <PointerLockControls />
    } else {
        return null
    }
}

function Fog() {
    const { scene } = useThree()
    scene.fog = new FogExp2( 0x355E3B, 0.1 )
}



export default function Game() {
    
    
    return (
        <div style={{height: "100vh", width: "100vw"}}>
            <VRButton onError={(e) => console.error(e)} />
            <Canvas shadows>
                <color attach="background" args={['black']} />
                <Suspense fallback={<Loader />}>
                    <Stats />
                    <Environment files="./hdr/sky.hdr" background />
                    <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} args={[100, 100, 100, 100]} receiveShadow>
                        <meshBasicMaterial color="black" />
                    </Plane>
                    <ambientLight />
                    <XR>
                        <Rachel position={[-3, 0, -3]} />
                        <Controllers />
                        <TeleportationPlane leftHand />
                        <WebControls />
                    </XR>
                </Suspense>
                
            </Canvas>
        </div>
    )
}