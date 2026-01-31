
import { Geometry, Base, Subtraction, Addition } from "@react-three/csg";
import { Mesh, DoubleSide, BoxGeometry } from 'three'

type ObjProps = {
    position: [number, number, number],
    imrPosX?: number,  // ImrUpperとImrLowerで使用
}

export class MyObj {

    static Kohan({ position }: ObjProps) {
        return (
            <>
                <mesh rotation-x={Math.PI / 2} position={[position[0], position[1]-0.3, position[2]]} castShadow receiveShadow>
                    <planeGeometry args={[400, 400, 10, 10]} />
                    <meshStandardMaterial color="#808080" side={DoubleSide} />
                </mesh>
            </>
        )
    }


    // -------------------------------------------------------------------
    // 工場　床 外壁
    // -------------------------------------------------------------------
    static Building({ position }: ObjProps)  {
        return (
        <>
            {/* 床 */}
            <mesh position={position}>
                <Geometry> 
                    <Base>
                        <boxGeometry args={[118, 0.4, 28]} />
                    </Base>
                    <Subtraction position={[20, 0.1, -8]}>
                        <boxGeometry args={[7, 0.4, 12]} />
                    </Subtraction>
                    <Subtraction position={[-55, 0.1, -8]}>
                        <boxGeometry args={[7, 0.4, 12]} />
                    </Subtraction>
                </Geometry>
                <meshStandardMaterial color="#60eeac" />
            </mesh>

            {/* E1トラックピット */}
            <mesh position={[position[0]+20, position[1]-0.05, position[2]-8]}>
                <boxGeometry args={[7, 0.1, 12]} />
                <meshStandardMaterial color="#aaaaaa" />
            </mesh>

            {/* E2トラックピット */}
            <mesh position={[position[0]-55, position[1]-0.05, position[2]-8]}>
                <boxGeometry args={[7, 0.1, 12]} />
                <meshStandardMaterial color="#aaaaaa" />
            </mesh>

            <mesh position={[position[0], position[1] + 1.5, position[2]]} castShadow receiveShadow>
                <Geometry> 
                    <Base>
                        <boxGeometry args={[3.4, 3, 3]} />
                    </Base>
                    <Subtraction position={[1, 0, 0]}>
                        <boxGeometry args={[2.4, 3.2, 2.6]} />
                    </Subtraction>

                </Geometry>
                <meshStandardMaterial color="#808080" metalness={0.8} roughness={0.2} transparent opacity={0.5} />
            </mesh>

            {/* 外壁（東） */}
            <mesh position={[position[0], position[1]+8, position[2]+14]}>
                <boxGeometry args={[118, 16, 0.1]} />
                <meshStandardMaterial color="#808080" transparent={true} opacity={0.5} />
            </mesh>

            {/* 外壁（西） */}
            <mesh position={[position[0], position[1] + 8, position[2] - 14]}>
                <boxGeometry args={[118, 16, 0.1]} />
                <meshStandardMaterial color="#808080" transparent={true} opacity={0.5} />
            </mesh>

            {/* 外壁（北） */}
            <mesh position={[position[0] + 59, position[1] + 8, position[2]]}>
                <boxGeometry args={[0.1, 16, 28]} />
                <meshStandardMaterial color="#808080" transparent={true} opacity={0.5} />
            </mesh>

            {/* 外壁（南） */}
            <mesh position={[position[0] - 59, position[1] + 8, position[2]]}>
                <boxGeometry args={[0.1, 16, 28]} />
                <meshStandardMaterial color="#808080" transparent={true} opacity={0.9} />
            </mesh>

            {/* 外壁柱（東） */}
            {Array.from({ length: 17 }).map((_, i) => (
                <mesh key={i} position={[position[0] + i * 7 - 59, position[1] + 8, position[2] + 13.9]}>
                    <boxGeometry args={[0.2, 16, 0.1]} />
                    <meshStandardMaterial color="#808080" transparent={true} opacity={0.5} />
                </mesh>
            ))}

            {/* 階段 */}
            {Array.from({ length: 16 }).map((_, i) => (
                <mesh key={i} position={[position[0] - i * 0.3 - 40, position[1] + i * 0.4 + 0.4, position[2] - 13.5]}>
                    <boxGeometry args={[0.4, 0.1, 1]} />
                    <meshStandardMaterial color="#808080" />
                </mesh>
            ))}

            {/* 安全通路 */}
            <mesh rotation-x={Math.PI / 2} position={[position[0] - 14, position[1] + 0.21, position[2] + 5.5]}>
                <planeGeometry args={[72, 1, 1, 1]} />
                <meshStandardMaterial color="#eebb00" side={DoubleSide} />
            </mesh>
            <mesh rotation-x={Math.PI / 2} position={[position[0] - 50, position[1] + 0.21, position[2] - 4]}>
                <planeGeometry args={[1, 20, 1, 1]} />
                <meshStandardMaterial color="#eebb00" side={DoubleSide} />
            </mesh>
            <mesh rotation-x={Math.PI / 2} position={[position[0] + 17, position[1] + 0.21, position[2] - 4]}>
                <planeGeometry args={[1, 20, 1, 1]} />
                <meshStandardMaterial color="#eebb00" side={DoubleSide} />
            </mesh>

        </>
        )
    }


    static Wr({ position }: ObjProps) {
        return (
            <>
                <mesh castShadow rotation-z={Math.PI / 2} position={position}>
                    <cylinderGeometry args={[1, 1, 16, 32]} />
                    <meshStandardMaterial color='#AA8080' metalness={0.8} roughness={0.2} />
                </mesh>
            </>
        )
    }
}