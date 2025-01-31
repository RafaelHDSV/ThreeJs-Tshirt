import { proxy } from 'valtio'

export interface IState {
  intro: boolean
  color: string
  isLogoTexture: boolean
  isFullTexture: boolean
  logoDecal: string
  fullDecal: string
}

const state: IState = proxy({
  intro: true,
  color: '#383938',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './pattern.jpg'
})

export default state
