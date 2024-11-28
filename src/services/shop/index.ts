import axiosInstance from "@/libs/axios/instane";
import { IShopItem, ListShopItemResponse } from "./types";

export async function listShopItemService(): Promise<ListShopItemResponse> {
  const res: IShopItem[] = await axiosInstance.get('/shop/list')
  return {
    items: res
  }
}