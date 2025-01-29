import Home from './pages/Home'
import CanvasModel from './canvas'
import Customizer from './pages/Customizer'

export default function App() {
  return (
    <main className='app transition-all ease-in'>
      <Home />
      <CanvasModel />
      <Customizer />
    </main>
  )
}
