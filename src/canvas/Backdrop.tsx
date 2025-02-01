import * as THREE from 'three'
import { useRef } from 'react'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { ReactThreeFiber, useFrame } from '@react-three/fiber'
import { easing } from 'maath'

interface AccumulativeContext {
  lights: Map<THREE.Light, THREE.Object3D>
  temporal: boolean
  frames: number
  blend: number
  count: number
  getMesh: () => THREE.Mesh<
    THREE.PlaneGeometry,
    { map: THREE.Texture; color?: ReactThreeFiber.Color; alphaTest?: number; blend?: number } & THREE.ShaderMaterial
  >
  reset: () => void
  update: (frames?: number) => void
}

export default function Backdrop() {
  const shadows = useRef<AccumulativeContext | null>(null)
  useFrame((state: THREE.Color, delta) => {
    const color = shadows.current?.getMesh().material.color as THREE.Color
    const targetColor = state.color as THREE.Color
    if (color) {
      easing.dampC(color, targetColor, 0.25, delta)
    }
  })

  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={5} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55 * Math.PI} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25 * Math.PI} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}
