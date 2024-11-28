
export interface IMember {
  telegram_id: number
  safe_id: string
  username: string
  coin: number
  avatar: string
}
export interface ILevel {
  avatar: string
  color: string
  level: number
  id: number
  total_member: number
  price: number
  name: string
  bonus_ton: number
  bonus_farming: number
  rate_farming: number
}

export interface IClan {
  id: number
  name: string
  level: number
  total_member: number
  total_coin: number
  url?: string
}

export interface ListClanResponse {
  clans: IClan[]
}
export interface ListClanParams {
  limit?: number
  offset?: number
}

export interface ListClanResponse {
  clans: IClan[]
}


export interface GetMyClanResponse {
  clan: IClan
}

export interface JoinClanParams {
  clanId: string
}

export interface ListLevelResponse {  
  levels: ILevel[]
}

export interface ListMemberParams {
  clanId: number
}
export interface ListMemberResponse {
  users: IMember[]
}