interface ITabProps {
  key: number
  tab: { name: string; icon: string }
  handleClick: () => void
  isFilterTab?: boolean
  isActiveTab?: string
}
export default function Tab({ key, tab, handleClick, isFilterTab, isActiveTab }: ITabProps) {
  console.log('key', key)
  console.log('tab', tab)
  console.log('handleClick', handleClick)
  console.log('isFilterTab', isFilterTab)
  console.log('isActiveTab', isActiveTab)

  return (
    <>
      <p>tab</p>
    </>
  )
}
