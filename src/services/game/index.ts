import axiosInstance from "@/libs/axios/instane";
import { PostGameResultParams, PostGameResultResponse, StartGameResponse } from "./types";

export async function startGameService(): Promise<StartGameResponse> {
  return axiosInstance.get('/game/start') 
}

export async function postGameResultService(params: PostGameResultParams): Promise<PostGameResultResponse> {
  return axiosInstance.post('/game/get', params)
}