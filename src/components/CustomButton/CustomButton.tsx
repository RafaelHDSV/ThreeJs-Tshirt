import { useSnapshot } from 'valtio'
import state from '../../store'

interface ICustomButtonProps {
  type: 'filled'
  title: string
  handleClick: () => void
  customStyles: string
}

export default function CustomButton({ type, title, handleClick, customStyles }: ICustomButtonProps) {
  const snap = useSnapshot(state)
  const generateStyle = (type: string) => {
    if (type === 'filled') {
      return {
        background: snap.color,
        color: '#fff'
      }
    }
  }

  return (
    <button className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`} style={generateStyle(type)} onClick={handleClick}>
      {title}
    </button>
  )
}
