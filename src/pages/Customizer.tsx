import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import { fadeAnimation, slideAnimation } from '../config/motion'
import { EditorTabs, FilterTabs } from '../config/constants'
import Tab from '../components/Tab/Tab'
import CustomButton from '../components/CustomButton/CustomButton'

export default function Customizer() {
  const snap = useSnapshot(state)
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key='custom' className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab, index) => (
                  <Tab key={index} tab={tab} handleClick={() => {}} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
            <CustomButton type='filled' title='Go Back' handleClick={() => (state.intro = true)} customStyles='w-fit px-4 py-2.5 font-bold text-sm' />
          </motion.div>

          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            {FilterTabs.map((tab, index) => (
              <Tab key={index} tab={tab} isFilterTab isActiveTab='' handleClick={() => {}} />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
