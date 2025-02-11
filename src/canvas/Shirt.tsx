import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../store'
import { Mesh, MeshStandardMaterial } from 'three'

export default function Shirt() {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/shirt_baked.glb')

  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)

  if (logoTexture) logoTexture.anisotropy = 16
  if (fullTexture) fullTexture.anisotropy = 16

  useFrame((_, delta) => easing.dampC((materials.lambert1 as MeshStandardMaterial).color, snap.color, 0.25, delta))

  const stateString = JSON.stringify(snap)

  return (
    <group key={stateString}>
      <mesh castShadow geometry={(nodes.T_Shirt_male as Mesh).geometry} material={materials.lambert1} material-roughness={1} dispose={null}>
        {snap.isFullTexture && <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />}

        {snap.isLogoTexture && <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={logoTexture} />}
      </mesh>
    </group>
  )
}
