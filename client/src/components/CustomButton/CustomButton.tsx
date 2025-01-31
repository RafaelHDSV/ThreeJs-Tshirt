import { useSnapshot } from 'valtio'
import state from '../../store'
import { getContrastingColor } from '../../config/helpers'
import { useState } from 'react'

interface ICustomButtonProps {
  type: 'filled' | 'outline'
  title: string
  handleClick?: () => void
  customStyles: string
  timeout: number
}

export default function CustomButton({ type, title, handleClick, customStyles, timeout }: ICustomButtonProps) {
  const snap = useSnapshot(state)
  const [disabled, setDisabled] = useState(true)

  const generateStyle = (type: string) => {
    if (type === 'filled') {
      return {
        background: snap.color,
        color: getContrastingColor(snap.color)
      }
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color
      }
    }
  }

  setTimeout(() => {
    setDisabled(prev => !prev)
  }, timeout || 50)

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md cursor-pointer ${customStyles} ${disabled && 'opacity-50'}`}
      style={generateStyle(type)}
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
}
