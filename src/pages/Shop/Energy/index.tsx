import { IShopItem } from "@/services/shop/types"
import ShopItem from "../components/ShopItem"
import Image from "@/components/atoms/Image"

interface Props {
  items: IShopItem[]
}
export default function Energy({items}: Props) {
  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-4">
       {items.map((item, index) => {
        const color = index < 2 ? "#FFB22F" : index < 4 ? "rgb(255, 144, 66)" : "#FF3B3B"
        const src = index < 2 ? "/images/energy.webp": index < 4 ? "/images/energy2.webp" : "/images/energy3.webp"
        return <div 
          style={{color}}
        >
        <ShopItem
        content={`${item.energy} Energies`}
        img={<>
          <Image src={src} className="h-9"/>
        </>}
          {...item}
        />
       </div>})}
      </div>
    </div>
  )
}
