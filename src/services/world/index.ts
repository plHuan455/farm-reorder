import axiosInstance from "@/libs/axios/instane";

export async function startFarmingService() {
  return axiosInstance.get('/farm/start')
}

export async function claimFarmingService() {
  return axiosInstance.get('/farm/claim')
}