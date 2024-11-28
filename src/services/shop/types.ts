export interface IShopItem {
  id: number
  price: number
  type: number
  star: number
  energy: number
  amount: number
}

export interface ListShopItemResponse {
  items: IShopItem[]
}