import axiosInstance from "@/libs/axios/instane";
import { ListReorderPlayerResponse } from "./types";

export async function listReorderPlayerService(): Promise<ListReorderPlayerResponse>{
  return axiosInstance.post('/player/list', {limit: 100, offset:0 })
}