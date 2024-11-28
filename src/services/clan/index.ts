import axiosInstance from "@/libs/axios/instane";
import { GetMyClanResponse, IClan, ILevel, JoinClanParams, ListClanParams, ListClanResponse, ListLevelResponse, ListMemberParams, ListMemberResponse } from "./types";


export async function listLevelService(): Promise<ListLevelResponse> {
  const res: ILevel[] = await axiosInstance.post('/clan/list-base')
  return {
    levels: res
  }
}
// export interface ILevel {
//   id: number
//   name: string
//   level: number
//   total_member: number
//   price: number
//   bonus_ton: number
//   bonus_farming: number
//   rate_farming: number
// }


export async function listClanService(params: ListClanParams): Promise<ListClanResponse> {
  const res: ListClanResponse = await axiosInstance.post('/clan/list', {limit: params.limit ?? 10, offset: params.offset ?? 0})
  return {
    clans: res.clans ?? [
      {id: 1, level: 1, name: 'Philipin GenX', total_member: 12312321, total_coin: 123123}
    ]
  }
}

export async function getMyClanService() :Promise<GetMyClanResponse> {
  const res: IClan = await axiosInstance.get('/clan/my-clan')
  return {
    clan: res
  }
}

export async function joinClanService(params: JoinClanParams) {
  return axiosInstance.post('/clan/join', {clan_id: params.clanId})
}


export async function listClanMemberService(params: ListMemberParams): Promise<ListMemberResponse> {
  return axiosInstance.post('/clan/member', {clan_id: params.clanId})
}

export async function updateClanService() {
  return axiosInstance.post('/clan/upgrade')
}

export async function leaveClanService() {
  return axiosInstance.post('/clan/leave')
}