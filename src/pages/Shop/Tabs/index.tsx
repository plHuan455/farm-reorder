import Button from "@/components/atoms/Button"
import Flex from "@/components/atoms/Flex"

interface Props {
  selectedTab: string
  tabs: {label: string, value: string}[]
  onChange: (value: string) => void
}
export default function Tabs({tabs, selectedTab, onChange}: Props) {
  return (
    <div className="container">
      <Flex className="items-center gap-3">
        {tabs.map((tab) => {
          const isActive = tab.value === selectedTab
          return <div key={tab.value}>
          <Button size="md" color={isActive ? "secondary" : "black30"}
            onClick={() => onChange(tab.value)}
          >{tab.label}</Button>
        </div>})}
      </Flex>
    </div>
  )
}
