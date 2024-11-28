import Button from "@/components/atoms/Button";
import Flex from "@/components/atoms/Flex";
import { cn } from "@/utils/className";

interface Props {
  tabs: {value: string; label: string}[]
  onChange: (value: string) => void
  selectedTab: string
  className?: string
}
export default function Tabs({tabs, onChange, selectedTab, className}: Props) {
  return (
    <div className={className}>
      <Flex className="justify-center gap-2">
       {tabs.map((value) => {
        return <Button key={value.value} size="md" color="secondary" className={cn(value.value !== selectedTab && "bg-black/30")}
          onClick={() => {
            onChange(value.value)
          }}
        >
          {value.label}
        </Button>
       })}
      </Flex>
    </div>
  )
}
