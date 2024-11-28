import axiosInstance from "@/libs/axios/instane";
import { GetMeResponse, IUserInfo, SignInParams, SignInResponse } from "./types";

export async function signInService(params: SignInParams): Promise<SignInResponse> {
  const res: IUserInfo = await axiosInstance.post('/signin', params)
  return {
    userInfo: res
  }
}


export async function getMeService(): Promise<GetMeResponse> {
  const res: IUserInfo = await axiosInstance.get('/me')
  return {
    userInfo: res
  }
}