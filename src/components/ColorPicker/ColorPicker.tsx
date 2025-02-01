import { useSnapshot } from 'valtio'
import state from '../../store'
import { SketchPicker } from 'react-color'

export default function ColorPicker() {
  const snap = useSnapshot(state)

  return (
    <div className='absolute left-full ml-3'>
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={color => (state.color = color.hex)}
        presetColors={['#383938', '#A0A3A0', '#8D0000', '#008B00', '#161684', '#878702', '#008181', '#950B95']}
      />
    </div>
  )
}
