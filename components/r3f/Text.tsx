'use client'

import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Environment, OrbitControls, Text3D, Center } from '@react-three/drei'


export function Text() {
    return (
        <Canvas
            shadows     // 影を有効に
            camera={{ position: [0, 1, 5], fov: 50 }}
            style={{ height: '100vh', background: '#EEEEEE' }}
        >
            <group position={[0, 0, 0]}>    {/* groupの中心位置 */}
                <Center>
                    <Text3D
                        castShadow		// 影を落とす

                        //font="/fonts/helvetiker_regular.typeface.json" // フォントファイルのパス
                        //font="/fonts/Archivo Black_Regular.json"	// 太字
                        font="/fonts/DM Serif Text_Regular.json"	// 縦太
                        //font="/fonts/Roboto_Regular.json"			// 普通の太さ
                        
                        size={1}
                        height={0.5}
                        //curveSegments={12}	// 曲線セグメント数
                        bevelEnabled
                        bevelThickness={0.01}	// ベベルの厚さ
                        bevelSize={0.01}		// ベベルのサイズ
                        //bevelOffset={0}		// ベベルのオフセット
                        //bevelSegments={5}		// ベベルのセグメント数
                    >
                    NSCM
                    <meshPhysicalMaterial
                        transmission={0.8}     	// 光の透過率（1で完全に透明）
                        transparent={true}		// 透明度を有効に
                        //opacity={0}             // 透明度（0〜1）}
                        roughness={0}        	// 表面のざらつき（0でツルツル）
                        thickness={0.8}      	// 屈折の深さ
                        clearcoat={1}        	// 表面のクリアコート
                        clearcoatRoughness={0}
                        reflectivity={0.8}     	// 反射率
                        ior={1.5}            	// 屈折率（ガラスは1.5前後）
                        color="#EEEEEE"
                    />
                    </Text3D>
                </Center>

                {/* 影を受けるための床 */}
                <AccumulativeShadows
                    temporal frames={200}
                    color="blue"                // 影の色
                    colorBlend={0.5}            // 影の色
                    scale={8}                   // 影の大きさ
                    alphaTest={0.85}            // 影の透明度
                    position={[0, -0.5, 0]}     // 床の位置

                >
                    {/* 複数のライトのセットを揺らして、リアルなレイキャストのような影と
                        アンビエントオクルージョン */}
                    <RandomizedLight 
                        amount={1} 
                        radius={5} 
                        ambient={0.5} 
                        position={[5, 3, 2]} 
                        bias={0.001} 
                    />
                </AccumulativeShadows>
            </group>
            <Environment preset="studio" /> {/* 反射環境 */}
            <OrbitControls
                target={[0, 0.5, 0]}
                //autoRotate 
                //autoRotateSpeed={4} 
                //enablePan={false} 
                //enableZoom={false} 
            />
        </Canvas>
    )
}