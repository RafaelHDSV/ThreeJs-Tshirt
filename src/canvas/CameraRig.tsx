import { ReactNode, useRef } from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export default function CameraRig({ children }: { children: ReactNode }) {
  const group = useRef<Group | null>(null)
  const snap = useSnapshot(state)

  useFrame((state, delta) => {
    const isTablet = window.innerWidth <= 768
    const isLargeMobile = window.innerWidth <= 426
    const isMediumMobile = window.innerWidth <= 376
    const isSmallMobile = window.innerWidth <= 321

    let targetPosition: [x: number, y: number, z: number] = [-0.4, 0, 2]
    if (snap.intro) {
      if (isTablet) targetPosition = [-0.25, 0, 2]
      if (isLargeMobile) targetPosition = [0, 0.4, 3.5]
      if (isMediumMobile) targetPosition = [0, 0.4, 3.5]
      if (isSmallMobile) targetPosition = [0, 0.5, 4]
    } else {
      // if (isTablet) targetPosition = [-0.25, 0, 5]
      // if (isLargeMobile) targetPosition = [0, 0, 5]
      // if (isMediumMobile) targetPosition = [0, 0.4, 3.5]
      if (isSmallMobile) targetPosition = [0, 0.5, 4]
      else targetPosition = [0, 0, 2]
    }

    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    if (group.current) easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })

  return <group ref={group}>{children}</group>
}
