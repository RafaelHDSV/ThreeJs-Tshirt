import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import { fadeAnimation, slideAnimation } from '../config/motion'
import { DecalTypes, EditorTabs, FilterTabs } from '../config/constants'
import Tab from '../components/Tab/Tab'
import CustomButton from '../components/CustomButton/CustomButton'
import { useState } from 'react'
import ColorPicker from '../components/ColorPicker/ColorPicker'
import FilePicker from '../components/FilePicker/FilePicker'
import { reader } from '../config/helpers'

export default function Customizer() {
  const snap = useSnapshot(state)
  const [file, setFile] = useState<File | undefined>()
  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({ logoShirt: true, stylishShirt: false })

  function generateTabContent() {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      default:
        return null
    }
  }

  function readFile(file: File, type: 'logo' | 'full') {
    reader(file).then(res => {
      handleDecals(type, res as string)
      setActiveEditorTab('')
    })
  }

  function handleDecals(type: 'logo' | 'full', result: string) {
    const decalType = DecalTypes[type]

    state[decalType.stateProperty as 'logoDecal' | 'fullDecal'] = result

    if (!activeFilterTab[decalType.filterTab as keyof typeof activeFilterTab]) {
      handleActiveFilterTab(decalType.filterTab as keyof typeof activeFilterTab)
    }
  }

  function handleActiveFilterTab(tabName: keyof typeof activeFilterTab) {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]
        break
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName]
        break
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
    }

    setActiveFilterTab(prev => {
      return {
        ...prev,
        [tabName]: !prev[tabName]
      }
    })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key='custom' className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab, index) => (
                  <Tab key={index} tab={tab} handleClick={() => (activeEditorTab === tab.name ? setActiveEditorTab('') : setActiveEditorTab(tab.name))} />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
            <CustomButton type='filled' title='Go Back' handleClick={() => (state.intro = true)} customStyles='w-fit px-4 py-2.5 font-bold text-sm' />
          </motion.div>

          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            {FilterTabs.map((tab, index) => (
              <Tab
                key={index}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name as keyof typeof activeFilterTab]}
                handleClick={() => handleActiveFilterTab(tab.name as keyof typeof activeFilterTab)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
