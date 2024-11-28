import axiosInstance from "@/libs/axios/instane";

export async function checkInService() {
  return axiosInstance.get('/achievement/checkin')
}