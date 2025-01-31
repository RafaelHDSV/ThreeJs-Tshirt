interface IAIPickerProps {
  prompt: string
  setPrompt: (prompt: string) => void
  loading: boolean
  handleSubmit: () => void
}
export default function AIPicker({ prompt, setPrompt, loading, handleSubmit }: IAIPickerProps) {
  console.log('prompt', prompt)
  console.log('setPrompt', setPrompt)
  console.log('loading', loading)
  console.log('handleSubmit', handleSubmit)

  return <>AIPicker</>
}
