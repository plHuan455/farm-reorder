import axiosInstance from "@/libs/axios/instane";
import { SubmitReferralParams, SubmitReferralResponse } from "./types";

export async function submitReferralService(params: SubmitReferralParams): Promise<SubmitReferralResponse> {
  return axiosInstance.post('/submitRef', params)
}