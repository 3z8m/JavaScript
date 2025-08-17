'use client'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three'
import Link from 'next/link'

// propsの型の明示
interface BoxRotateProps {
    position: [number, number, number];
}

// 回転する立方体
function BoxRotate(props:BoxRotateProps) {

    const meshRef = useRef<THREE.Mesh>(null)    // THREE.Mesh型の参照を保持する
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    useFrame((state, delta) => {
        if (meshRef.current) {                  // nullでないことを確認
            meshRef.current.rotation.x += delta
        }
    })

    return (
        <mesh
            {...props}          // propsオブジェクトの中身を展開して他のコンポーネントに渡す
            ref = {meshRef}
            scale = {active ? 1.5 : 1}
            onClick = {() => setActive(!active)}
            onPointerOver = {() => setHover(true)}
            onPointerOut = {() => setHover(false)}>

            <boxGeometry args = {[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}


export default function Box() {
    return (
        <div id="canvas-container">
        <Canvas>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <BoxRotate position={[-1.2, 0, 0]} />
            <BoxRotate position={[1.2, 0, 0]} />
            <OrbitControls />
        </Canvas>
        
        <Link href="/">go to Home</Link>

        </div>
    );
}
