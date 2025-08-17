'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

import { Color, Scene, WebGLCubeRenderTarget, CubeCamera, Mesh } from 'three'


export default function App() {
    return (
        <>
            <Canvas camera={{ position: [0, 2, 5], fov: 50 }} style={{ height: '50vh' }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <WavyPlane />
                <WhiteEnvMap />
            </Canvas>

            <Link href="/">go to Home</Link>
        </>
    )
}


// 背景が白の環境マップを作成
function WhiteEnvMap() {
    const { scene, gl } = useThree()

    useEffect(() => {
        const whiteScene = new Scene()
        whiteScene.background = new Color('white')

        const cubeRenderTarget = new WebGLCubeRenderTarget(256)
        const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget)
        cubeCamera.update(gl, whiteScene)

        scene.environment = cubeRenderTarget.texture
    }, [scene, gl])

    return null
}

// 波のある平面を作成
function WavyPlane() {

    const meshRef = useRef<Mesh>(null!);

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime()
        const mesh = meshRef.current
        const position = mesh.geometry.attributes.position

        for (let i = 0; i < position.count; i++) {
            const x = position.getX(i)
            const y = position.getY(i)
            const wave = Math.sin(x * 2 + time) * 0.2 + Math.cos(y * 2 + time) * 0.2
            position.setZ(i, wave)
        }

        position.needsUpdate = true
        mesh.geometry.computeVertexNormals()
    })

    return (
        <mesh ref={meshRef} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[5, 5, 50, 50]} />
        <meshStandardMaterial 
            color="#3399ff"
            //transparent={true}	// 透明度を有効にする
            //opacity={0.5}		// 透明度
            //wireframe={true}	// ワイヤーフレーム表示
            flatShading={true}  // フラットシェーディングを有効にする
            metalness={0.8}     // 金属感
            roughness={0.2}     // 粗さ
        />
        </mesh>
    )
}
