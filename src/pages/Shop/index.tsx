import Header from "@/components/templates/Header";
import Tabs from "./Tabs";
import { useState } from "react";
import { useQuery } from "react-query";
import QUERY_KEYS from "@/libs/react-query/constants";
import { listShopItemService } from "@/services/shop";
import Energy from "./Energy";
import Flex from "@/components/atoms/Flex";

export enum TabValue {
  energy = 'energy',
  star = 'star',
  ticket = 'ticket',
  clan = 'clan'
}
export default function Shop() {
  const [selectedTab, setSelectedTab] = useState<TabValue>(TabValue.energy)
  const {data} = useQuery({
    queryKey: [QUERY_KEYS.SHOP.products],
    queryFn: () => listShopItemService()
  })

  const tabs = [
    {label: 'Energy', value: TabValue.energy},
    {label: 'Star', value: TabValue.star},
    {label: 'Ticket', value: TabValue.ticket},
    {label: 'Clan', value: TabValue.clan},
  ]
  return (
    <div className="pt-[--h-header] h-full">
      <Header 
        title="Shop"
      />
      <Flex className="flex-col pt-4 h-full">
        <div className="">
          <Tabs tabs={tabs} selectedTab={selectedTab} 
            onChange={(value) => setSelectedTab(value as TabValue)}
          />
        </div>
        <div className="mt-5 grow relative">
          <div className="absolute inset-0 overflow-auto pb-5">
            {selectedTab === TabValue.energy && <Energy items={data?.items ?? []} />}
          </div>
        </div>
      </Flex>
    </div>
  )
}
