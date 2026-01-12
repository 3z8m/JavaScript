'use client'

import { useRef } from 'react'
import { useControls } from 'leva'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Geometry, Base, Subtraction } from '@react-three/csg'
import { Mesh, DoubleSide } from 'three'


type ObjProps = {
    position: [number, number, number],
    imrPosX?: number,  // ImrUpperとImrLowerで使用
}


export default function App() {

    // Levaのコントロールを使用して、imrPosXの値を制御
    const { imrPosX } = useControls({ imrPosX: { value: 0, min: -2, max: 2 }})

    return (
        <>
            <Canvas 
                shadows     // 影を有効に
                camera={{ position: [0, 10, 45], fov: 50 }}
                style={{ background: '#EEEEEE', height: '80vh' }}
            >
                <group position={[0, 0, 0]}>    {/* groupの中心位置 */}
                    <StripIn position={[0, 0, -15]} />
                    <StripOut position={[0, 0, 15]} imrPosX={imrPosX} />
                    <Wr position={[0, 1, 0]} />
                    <Wr position={[0, -1, 0]} />                
                    <ImrUpper position={[imrPosX, 2.8, -2.4]}/>
                    <ImrUpper position={[imrPosX, 2.8, 2.4]}/>
                    <ImrLower position={[-imrPosX, -2.8, -2.4]}/>
                    <ImrLower position={[-imrPosX, -2.8, 2.4]}/>
                    <BurL position={[0, 5.6, -6.6]} />
                    <BurL position={[0, 5.6, 6.6]} />
                    <BurL position={[0, -5.6, -6.6]} />
                    <BurL position={[0, -5.6, 6.6]} />
                    <BurS position={[0, 6.5, 0]} />
                    <BurS position={[0, -6.5, 0]} />
                </group>

                <OrbitControls />
                <Environment preset="studio" />
            </Canvas>
        </>
    )
}


function StripIn({ position }: ObjProps) {
    return (
        <>
        <mesh rotation-x={-Math.PI / 2} position={position}>
            <planeGeometry args={[10, 30, 100, 300]} />
            <meshStandardMaterial 
                color="#808080"
                metalness={0.8}			// 金属感
                roughness={0.2} 	    // 粗さ
                transparent={false}		// 不透明にする
                flatShading={true}  	// フラットシェーディングを有効にする
                side={DoubleSide} // 両面描画
            />
        </mesh>
        </>
    )
}


function StripOut({ position, imrPosX = 0 }: ObjProps) {

    const meshRef = useRef<Mesh>(null!);
    const waveAmp = (imrPosX + 2) / 4      // 波の振幅

    useFrame(() => {
        const mesh = meshRef.current
        const position = mesh.geometry.attributes.position

        for (let i = 0; i < position.count; i++) {
            const x = position.getX(i) 
            const y = position.getY(i)
            const wave = Math.sin(y * 2) * 0.7 * (0.000012 * (1 - waveAmp / 2) * (x ** 6) + waveAmp / 30 * (Math.cos(Math.PI / 5 * x) + 0.5))
            position.setZ(i, wave)
        }

        position.needsUpdate = true
        mesh.geometry.computeVertexNormals()
    })


    return (
        <>
        <mesh ref={meshRef} rotation-x={-Math.PI / 2} position={position}>
            <planeGeometry args={[10, 30, 100, 300]} />
            <meshStandardMaterial 
                color="#808080"
                metalness={0.8}			// 金属感
                roughness={0.2} 	    // 粗さ
                transparent={false}		// 不透明にする
                flatShading={true}  	// フラットシェーディングを有効にする
                side={DoubleSide} // 両面描画
            />
        </mesh>
        </>
    )
}


function Wr({ position }: ObjProps) {
    return (
        <>
            <mesh castShadow rotation-z={Math.PI / 2} position={position}>
                <cylinderGeometry args={[1, 1, 16, 32]} />
                <meshStandardMaterial color='#AA8080' metalness={0.8} roughness={0.2} />
            </mesh>
        </>
    )
}


function ImrUpper({ position }: ObjProps) {
    return (
        <>
            <group position={position}>
                <mesh castShadow rotation-z={Math.PI / 2} position-x={-7}>
                    <cylinderGeometry args={[1, 2, 6, 32]} /> {/* 上半径, 下半径, 高さ, 分割数 */}
                    <meshStandardMaterial color='#8080AA' metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh castShadow  rotation-z={Math.PI / 2} position-x={3}>
                    <cylinderGeometry args={[2, 2, 14, 32]}  />
                    <meshStandardMaterial color='#8080AA' metalness={0.8} roughness={0.2} />
                </mesh>
            </group>
        </>
    )
}

function ImrLower({ position }: ObjProps) {
    return (
        <>
            <group position={position}>
                <mesh castShadow rotation-z={-Math.PI / 2} position-x={7}>
                    <cylinderGeometry args={[1, 2, 6, 32]} /> {/* 上半径, 下半径, 高さ, 分割数 */}
                    <meshStandardMaterial color='#8080AA' metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh castShadow  rotation-z={-Math.PI / 2} position-x={-3}>
                    <cylinderGeometry args={[2, 2, 14, 32]}  />
                    <meshStandardMaterial color='#8080AA' metalness={0.8} roughness={0.2} />
                </mesh>
            </group>
        </>
    )
}

function BurL({ position }: ObjProps) {
    return (
        <>
            <group position={position}>
                {/*
                Array.from({ length: n }) ... n個の空の配列を生成
                (_, i) => <div key={i} /> ... 各要素に対してdivを生成
                */}

                {/* 外輪 */}                
                {Array.from({ length: 5 }, (_, i) => (      // 5つの円柱を生成
                    <mesh
                        key={i}
                        castShadow
                        rotation-z={-Math.PI / 2}
                        position-x={i * 5 - 10}             // -10から10までの位置に配置
                    >
                        {/* <cylinderGeometry args={[3, 3, 4, 32]} /> */}
                        <Geometry>
                            <Base>
                                <cylinderGeometry args={[3, 3, 4, 32]}/>
                            </Base>
                            <Subtraction>
                                <cylinderGeometry args={[1.6, 1.6, 4.2, 32]}/>
                            </Subtraction>
                        </Geometry>
                        <meshStandardMaterial color='#808080' metalness={0.8} roughness={0.2} />
                    </mesh>
                ))}

                {/* コロ */}
                {Array.from({ length: 5 }, (_, i) => (
                    <mesh
                        key={i}
                        castShadow
                        rotation-x={Math.PI / 2}
                        position-x={i * 5 - 10}
                    >
                        <Koros />
                    </mesh>
                ))}

                {/* 軸 */}
                <mesh rotation-z={Math.PI / 2}>
                    <cylinderGeometry args={[1, 1, 24, 32]} />
                    <meshStandardMaterial color='#808080' metalness={0.8} roughness={0.2} />
                </mesh>
            </group>
        </>
    );
}

function BurS({ position }: ObjProps) {
    return (
        <>
            <group position={position}>
                {/* 外輪 */}
                {Array.from({ length: 6 }, (_, i) => (      // 6つの円柱を生成
                    <mesh
                        key={i}
                        castShadow
                        rotation-z={-Math.PI / 2}
                        position-x={i * 4 - 10}             // -10から10までの位置に配置
                    >
                        <Geometry>
                            <Base>
                                <cylinderGeometry args={[2.4, 2.4, 3.4, 32]}/>
                            </Base>
                            <Subtraction>
                                <cylinderGeometry args={[1.6, 1.6, 3.6, 32]}/>
                            </Subtraction>
                        </Geometry>
                        <meshStandardMaterial color='#808080' metalness={0.8} roughness={0.2} />
                    </mesh>
                ))}

                {/* コロ */}
                {Array.from({ length: 6 }, (_, i) => (
                    <mesh
                        key={i}
                        castShadow
                        rotation-x={Math.PI / 2}
                        position-x={i * 4 - 10}
                    >
                        <Koros />
                    </mesh>
                ))}

                {/* 軸 */}
                <mesh rotation-z={Math.PI / 2}>
                    <cylinderGeometry args={[1, 1, 24, 32]} />
                    <meshStandardMaterial color='#808080' metalness={0.8} roughness={0.2} />
                </mesh>
            </group>
        </>
    );
}


function Koros() {
    const radius = 1.3;             // 円周の半径
    const count = 12;               // 円柱の個数
    const cylinders = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2; // 各円柱の角度
        const y = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        // 座標と回転を設定
        return {
            position: [0, y, z] as [number, number, number], 
            rotation: [0, 0, Math.PI / 2] as [number, number, number] 
        }
    });

    return (
        <>
            {cylinders.map((cylinder, index) => (
                <mesh
                    key={index}
                    position = {cylinder.position}
                    rotation = {cylinder.rotation}
                >
                    <cylinderGeometry args={[0.3, 0.3, 3.4, 32]} />
                    <meshStandardMaterial color="#909090" />
                </mesh>
            ))}
        </>
    );
}