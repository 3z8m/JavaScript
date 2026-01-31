//===============================================================
//  市川工場の3Dモデルを表示し、カメラを各設備に移動させる
//  作成日: 2026.01.31
//===============================================================

'use client'

import React, { useRef, useEffect } from 'react'
import { OrbitControls, useGLTF, Environment, Text } from '@react-three/drei'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Leva, useControls, button } from 'leva'
import JEASINGS from 'jeasings'
//import { MyObj } from './object'


const annotations = [
    { 
        title: '上空から', 
        description: '<p>Looking Down from Above</p>', 
        position: { x: 0, y: 50, z: 0 }, 
        lookAt: { x: 0, y: 0, z: 1 } 
    }, 
    { 
        title: '北側から', 
        position: { x: -50, y: 3, z: 0 }, 
        lookAt: { x: 1, y: 0, z: 0 } 
    }, 
    { 
        title: '圧延機', 
        position: { x: 46, y: 3, z: 1 }, 
        lookAt: { x: 46, y: 3, z: -10 } 
    },
    { 
        title: '洗浄ライン', 
        position: { x: -13, y: 3, z: 0 }, 
        lookAt: { x: -13, y: 3, z: 10 } 
    },
    { 
        title: '熱処理ライン', 
        position: { x: 13, y: 3, z: -2 }, 
        lookAt: { x: 13, y: 3, z: 10 } 
    },
    { 
        title: 'テンションレベラー', 
        position: { x: 5, y: 3, z: 0 }, 
        lookAt: { x: 5, y: 3, z: -10 } 
    },
    { 
        title: 'スリッター', 
        position: { x: -40, y: 3, z: 1 }, 
        lookAt: { x: -40, y: 3, z: 10 } 
    },
    { 
        title: '#2リコイラー', 
        position: { x: -30, y: 3, z: 1 }, 
        lookAt: { x: -30, y: 3, z: 10 }
    }
]

function Arena({ controls }: { controls: React.RefObject<OrbitControlsType | null> }) {

    const { camera } = useThree()

    // GLTFモデルの読み込み
    /*
    const { nodes, materials } = useGLTF('/models/ichikawa.glb')
    console.log('nodes:', nodes) 
    console.log('materials:', materials)
    const cubeMesh = nodes.Plane as Mesh   // 型アサーション
    */

    //const { nodes, materials } = useGLTF('/models/collision-world.glb')
    //const cubeMesh = nodes.Cube004 as Mesh

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
                            .easing(JEASINGS.Cubic.Out)    // 減速しながら停止
                            .start()
                    })
                }),
            {}
        )
        return _buttons
    })

    /*
    return (
        <group dispose={null}>
            <mesh
                geometry={cubeMesh.geometry}
                material={materials['Material.001']}
                position={[0, -10, 0]}
                scale={5}
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
    */
    return null
}

// GLTFモデル読み込みコンポーネント
function Model() {
  const { scene } = useGLTF("/models/ichikawa.glb")
  return <primitive object={scene} />
}


// JEASINGSのアニメーションを毎フレーム更新するコンポーネント\
function JEasings() {
    useFrame(() => {        // useFrameにより毎フレーム update() を実行
        JEASINGS.update()   //JEASINGSアニメーションは update() を呼ばないと進まない
    })
    return null
}

// --------------------------------------------------------
// メインコンポーネント
// --------------------------------------------------------
export default function App() {

    const ref = useRef<OrbitControlsType>(null)

    return (
        <>
            <Canvas 
                camera={{ position: [-59, 5, 0] }} 
                style={{ background: '#eeeeee', height: '90vh' }}
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

                {/* シーンのメインコンポーネント */}
                <Arena controls = {ref} />

                {/* GLTFモデルの表示 */}
                <Model />

                {/* オブジェクトの配置 */}
                {/*
                <MyObj.Kohan position={[0, 0, 0]} />
                <MyObj.Building position={[0, 0, 0]} />
                <MyObj.Wr position={[-6, 0, -4]} />
                */}

                {/* テキスト表示 */}
                <Text                           // 圧延機
                    position={[45, 1.5, -2]}
                    fontSize={0.16}
                    color="#505050"
                    anchorX="center"
                    anchorY="middle"
                >
                    {`
                        圧延機(FCM)　　　　　　　
                        　　板厚 : 0.02-0.45mm
                        　　板幅 : 300-670mm　　
                    `}
                </Text>

                <Text                           // 洗浄ライン
                    position={[-12, 1.5, 3]}
                    rotation={[0, Math.PI, 0]}
                    fontSize={0.16}
                    color="#505050"
                    anchorX="center"
                    anchorY="middle"
                >
                    {`
                        洗浄ライン(CL)
                        　　洗浄液： ジクロロメタン              
                    `}
                </Text>

                <Text                           // 熱処理ライン
                    position={[13, 1.5, 1]}
                    rotation={[0, Math.PI, 0]}
                    fontSize={0.16}
                    color="#505050"
                    anchorX="center"
                    anchorY="middle"
                >
                    {`
                        熱処理ライン(BA)　　　　
                        　　Max炉温： 1150℃　　       
                        　　雰囲気： 水素・窒素　
                    `}
                </Text>

                <Text                           // テンションレベラー
                    position={[4, 1.5, -3]}
                    fontSize={0.16}
                    color="#505050"
                    anchorX="center"
                    anchorY="middle"
                >
                    {`
                        テンションレベラー(TL)
                    `}
                </Text>

                <Text                           // スリッター
                    position={[-40, 1.5, 3.5]}
                    rotation={[0, Math.PI, 0]}
                    fontSize={0.16}
                    color="#505050"
                    anchorX="center"
                    anchorY="middle"
                >
                    {`
                        スリッター(SL)
                        　　幅 : 20-670mm
                    `}
                </Text>

                <Text                           // #2リコイラー
                    position={[-29, 1.5, 3.5]}
                    rotation={[0, Math.PI, 0]}
                    fontSize={0.16}
                    color="#505050"
                    anchorX="center"
                    anchorY="middle"
                >
                    {`
                        #2リコイラー(2RC)
                        　　内径 : 400mm, 508mm
                    `}
                </Text>

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
