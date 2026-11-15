import Home from './pages/Home'
import Canvas from './canvas'
import Customizer from './pages/Customizer'
import { VisitCountFooter } from '@vieira/analytics/react'

export default function App() {
  return (
    <main className='app transition-all ease-in'>
      <Home />
      <Canvas />
      <Customizer />
      <footer className='va-footer'>
        <VisitCountFooter projectKey='tshirt-threejs' />
      </footer>
    </main>
  )
}
