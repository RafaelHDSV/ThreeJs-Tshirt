import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import { slideAnimation } from '../config/motion'

export default function Customizer() {
  const snap = useSnapshot(state)
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key='custom' className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'></div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
