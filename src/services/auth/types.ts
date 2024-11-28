export interface IUserInfo {
    user_id: number
    safe_id: string
    username: string
    level: number
    id_token: string
    referral_by: string
    avatar: string
    access_token: string
    ton_deposit: number
    is_checkin_today: boolean
    current_day: number
    energy: number
    coin: number
    clan_id: number
    order: number
    created_at: string
}

export interface SignInParams {
    telegram_id: number
    username: string
    avatar: string
}
export interface SignInResponse {
    userInfo: IUserInfo
}

export interface GetMeResponse {
    userInfo: IUserInfo
}