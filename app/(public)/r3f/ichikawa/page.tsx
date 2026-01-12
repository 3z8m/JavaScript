'use client'

import React, { useRef, useEffect } from 'react'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Leva, useControls, button } from 'leva'
import JEASINGS from 'jeasings'
import type { Mesh } from 'three'


const annotations = [
    { 
        title: 'View A', 
        description: '<p>Looking Down from Above</p>', 
        position: { x: 0, y: 25, z: 0 }, 
        lookAt: { x: 1, y: 0, z: 0 } 
    }, 
    { 
        title: 'View B', 
        position: { x: 8, y: -1.5, z: 2 }, 
        lookAt: { x: 8.1, y: -1.5, z: 2 } 
    }, 
    { 
        title: 'View C', 
        position: { x: 5, y: 5.11, z: 12 }, 
        lookAt: { x: 5.1, y: 0, z: 12 } 
    }
]

function Arena({ controls }: { controls: React.RefObject<OrbitControlsType | null> }) {

    const { camera } = useThree()

    // GLTFモデルの読み込み
    //const { nodes, materials } = useGLTF('/models/collision-world.glb')
    //const cubeMesh = nodes.Cube004 as Mesh      // 型アサーション（追加）

    const { nodes, materials } = useGLTF('/models/ichikawa.glb')
    if (!nodes || !nodes.Plane) { 
        console.warn("Plane ノードが見つかりません") 
        return null 
    }
    const cubeMesh = nodes.Plane as Mesh

    useControls('Camera', () => {

        // ボタン作成
        const _buttons = annotations.reduce(
            (acc, { title, position, lookAt }) =>
                Object.assign(acc, {
                    [title]: button(() => {
                        if (!controls.current) return   // nullチェックを追加
                        //
                        new JEASINGS.JEasing(controls.current.target)
                            .to(
                                {
                                    x: lookAt.x,
                                    y: lookAt.y,
                                    z: lookAt.z
                                },
                                2100
                            )
                            .easing(JEASINGS.Cubic.Out)     // 減速しながら停止
                            .start()

                        // change camera position
                        new JEASINGS.JEasing(camera.position)
                            .to(
                                {
                                    x: position.x,
                                    y: position.y,
                                    z: position.z
                                },
                                2000
                            )
                            .easing(JEASINGS.Cubic.Out)
                            .start()
                    })
                }),
            {}
        )
        return _buttons
    })

    return (
        <group dispose={null}>
            <mesh
                geometry={cubeMesh.geometry}
                material={materials['Material.001']}
                position={[7.68, -5.59, 26.38]}
                scale={0.5}
                castShadow
                receiveShadow
                material-envMapIntensity={0.4}

                // ダブルクリックした地点にカメラ移動
                onDoubleClick={({ point }) => {
                    if (!controls.current) return       // nullチェックを追加
                    new JEASINGS.JEasing(controls.current.target)
                        .to(
                            {
                                x: point.x,
                                y: point.y,
                                z: point.z
                            },
                            1000
                        )
                        .easing(JEASINGS.Cubic.Out)
                        .start()
                }}
            />
        </group>
    )
}

function JEasings() {
    useFrame(() => {        // useFrameにより毎フレーム update() を実行
        JEASINGS.update()   //JEASINGSアニメーションは update() を呼ばないと進まない
    })
    return null
}

export default function App() {

    //
    const ref = useRef<OrbitControlsType>(null)

    return (
        <>
            <Canvas 
                camera={{ position: [20, 10, 0] }} 
                style={{ background: '#eeeeee', height: '80vh' }}
                shadows
            >
                <directionalLight
                    intensity = {1}
                    castShadow = {true}
                    shadow-bias = {-0.0002}
                    shadow-mapSize = {[2048, 2048]}
                    position = {[85.0, 80.0, 70.0]}
                    shadow-camera-left = {-30}
                    shadow-camera-right = {30}
                    shadow-camera-top = {30}
                    shadow-camera-bottom={-30}
                />

                {/* 環境マップ（背景）の設定 */}
                <Environment
                    files="/background/kloppenheim_06_puresky_1k.hdr"
                    background
                />

                {/* refをOrbitControls に渡し、Arenaからtargetを操作できるように */}
                <OrbitControls ref = {ref} target = {[0, 1, 0]} /> 
                <Arena controls = {ref} />
                
                {/* JEASINGSのアニメーションを有効化 */}
                <JEasings />
            </Canvas>
            
            {/* Leva UI の設定 */}
            <Leva 
                theme={{ 
                    colors: {
                        accent1: '#1111ff',   // クリック時のボタン背景色
                        accent2: '#5555ff',   // ボタン背景色
                    },
                    sizes: { 
                        rootWidth: '200px',    // windowの幅
                    } 
                }} 
            />
        </>
    )
}
