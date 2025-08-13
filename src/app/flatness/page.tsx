'use client'

import Link from 'next/link'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Mesh, DoubleSide } from 'three'
import { useRef } from 'react'
import { useControls } from 'leva'


export default function App() {
    return (
        <>
            <Canvas 
                camera={{ position: [0, 2, 5], fov: 50 }} 
                style={{ background: '#eeeeee', height: '50vh' }} 
                shadows
            >
                <ambientLight intensity={0.8}/>
                <WavyPlane />
                <Environment preset="studio" />
                <OrbitControls />
            </Canvas>

            <Link href="/">go to Home</Link>
        </>
    )
}

// 波のある平面
function WavyPlane() {
    // 
    const meshRef = useRef<Mesh>(null!);

    const { waveAmp, roughness } = useControls({ 
        waveAmp: { value: 0, min: 0, max: 1 },
        roughness: { value: 0.2, min: 0.2, max: 1 }
    })
    useFrame(() => {
        const mesh = meshRef.current
        const position = mesh.geometry.attributes.position

        for (let i = 0; i < position.count; i++) {
            const x = position.getX(i) 
            const y = position.getY(i)
            const wave = Math.sin(y * 6) * 0.7 * (0.001 * (1 - waveAmp / 2) * (x ** 6) + waveAmp / 10 * (Math.cos(Math.PI / 2.5 * x) + 0.5))
            position.setZ(i, wave)
        }

        position.needsUpdate = true
        mesh.geometry.computeVertexNormals()
    })

    return (
        <mesh ref={meshRef} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[5, 5, 100, 100]} />
            <meshStandardMaterial 
                color="#808080"
                roughness={roughness} 	// 粗さ
                transparent={false}		// 不透明にする
                //opacity={0.9}			// 透明度
                //wireframe={true}		// ワイヤーフレーム表示
                flatShading={true}  	// フラットシェーディングを有効にする
                metalness={0.8}         // 金属感
                side={DoubleSide}       // 両面描画
            />
        </mesh>
    )
}
