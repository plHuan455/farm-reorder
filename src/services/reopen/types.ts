export interface IUserReorder {
  avatar: string
  username: string
  order: number
  safe_id: string
  created_at: string
}

export interface ListReorderPlayerResponse {
  users: IUserReorder[]
  total_count: number
}