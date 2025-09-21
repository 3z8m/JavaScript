'use client';

import { Sky } from '@react-three/drei';

import ThreeModel from '@/components/r3f/fpc/ThreeModel'
import BaseScene from '@/components/r3f/fpc/ui/BaseScene'
import BaseBox from '@/components/r3f/fpc/ui/BaseBox'
import BaseCharacter from '@/components/r3f/fpc/ui/BaseCharacter'

export default function App() {
  return (
    <BaseScene>
      <BaseBox text={false} position={[0, 0.5, 0]} args={[2, 1, 2]} color="red" />
      <BaseBox text={false} position={[5, 1, 0]} args={[1.5, 2, 1.3]} color="orange" />
      <BaseBox text={false} position={[0, 0.5, 5]} args={[3, 1, 1.3]} color="green" />

      <BaseCharacter controls position={[0, 2, 0]} args={[0.5]} color="yellow" />

      <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[10, 0, -5]} />
      <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[0, 0, 10]} />
      <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[-10, 0, 5]} />
      <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[-5, 0, -5]} />
      <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[0, 0, -10]} />
      <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[10, 0, 5]} />
      <Sky />
    </BaseScene>
  );
}