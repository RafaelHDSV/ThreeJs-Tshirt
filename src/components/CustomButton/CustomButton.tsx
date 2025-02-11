import { useSnapshot } from 'valtio'
import state from '../../store'
import { getContrastingColor } from '../../config/helpers'

interface ICustomButtonProps {
  type: 'filled' | 'outline'
  title: string
  handleClick?: () => void
  customStyles: string
}

export default function CustomButton({ type, title, handleClick, customStyles }: ICustomButtonProps) {
  const snap = useSnapshot(state)

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

  return (
    <button className={`px-2 py-1.5 flex-1 rounded-md cursor-pointer ${customStyles}`} style={generateStyle(type)} onClick={handleClick}>
      {title}
    </button>
  )
}
