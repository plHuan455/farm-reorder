import Header from "@/components/templates/Header";
import Tabs from "./Tabs";
import { CSSProperties, useState } from "react";
import ListClan from "./ListClanLevel";
import TopClan from "./TopClan";
import Flex from "@/components/atoms/Flex";
import MyClan from "./MyClan";
import { useQuery } from "react-query";
import QUERY_KEYS from "@/libs/react-query/constants";
import { listLevelService } from "@/services/clan";

enum TabType {
  all = 'all',
  my = 'my_clan'
}

export default function Clan() {
  
  const {data: levelData} = useQuery({
    queryKey: [QUERY_KEYS.CLAN.level],
    queryFn: () => listLevelService()
  })


  const [color, setColor] = useState<string>("#F39B3A")
  const [selectedTab, setSelectedTab] = useState<TabType>(TabType.all)
  const tabs = [
    { label: 'All', value: TabType.all },
    { label: 'My clan', value: TabType.my },
  ]
  return (
    <div className="relative">
      <div className="absolute inset-x-0 aspect-[375/221] bg-gradient-to-b from-[--from-color] to-transparent" 
        style={{
          "--from-color": color
        } as CSSProperties}
      />
      <Header
        title="Clans"
      />

      <Flex className="relative pt-[--h-header] h-screen flex-col">
        <Tabs tabs={tabs} onChange={(tab) => setSelectedTab(tab as TabType)} selectedTab={selectedTab}
          className="pt-4"
        />
        <div className="mt-5 grow">
          {selectedTab === TabType.all && <div>
            <ListClan onColorChange={setColor} levels={levelData?.levels ?? []}/>
            <div className="mt-5 grow overflow-auto">
              <TopClan className="" />
            </div>
          </div>}
          {selectedTab === TabType.my && <MyClan levels={levelData?.levels ?? []}
            onChangeColor={setColor}
          />}
        </div>
      </Flex>
    </div>
  )
}
