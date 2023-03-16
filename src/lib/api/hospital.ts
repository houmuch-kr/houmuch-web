import { defaultApiClient } from "~/lib/api";
import { ApiResponse, ContractSummary, Coordinate } from "~/types";

export const fetchHospitalList = (params: {
  max?: Coordinate
  min?: Coordinate
}) => async(): Promise<ApiResponse<Array<ContractSummary>>> => {
  return defaultApiClient.get(`/v1/hospital`, {
    params: {
      maxLatitude: params.max?.latitude,
      maxLongitude: params.max?.longitude,
      minLatitude: params.min?.latitude,
      minLongitude: params.min?.longitude
    }
  })
}
