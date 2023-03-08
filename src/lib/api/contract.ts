import defaultApiClient from "~/lib/api";
import {
  ApiResponse,
  ContractAreaList,
  ContractAreaSummary,
  ContractAreaTrend,
  ContractBuildingList,
  ContractBuildingSummary,
  ContractBuildingTrend,
  ContractSummary,
  Coordinate
} from "~/types";

export const fetchContractSummary = (params: {
  type: number
  max?: Coordinate
  min?: Coordinate
}) => async(): Promise<ApiResponse<Array<ContractSummary>>> => {
  const { type } = params
  return defaultApiClient.get(`/v1/contract/fetchList`, {
    params: {
      type,
      maxLatitude: params.max?.latitude,
      maxLongitude: params.max?.longitude,
      minLatitude: params.min?.latitude,
      minLongitude: params.min?.longitude
    }
  })
}

export const fetchAreaContractList = (params: { areaCode: number, page: number, size: number }) =>
  async (): Promise<ApiResponse<ContractAreaList>> => {
    return defaultApiClient.get(`/v1/contract`, {
      params: { ...params }
    })
  }

export const fetchAreaContractSummary = (areaCode: number) => async (): Promise<ApiResponse<ContractAreaSummary>> => {
  return defaultApiClient.get(`/v1/contract/summary`, {
    params: {
      areaCode: areaCode
    }
  })
}

export const fetchAreaContractTrend = (areaCode: number) => async (): Promise<ApiResponse<ContractAreaTrend>> => {
  return defaultApiClient.get(`/v1/contract/trend`, {
    params: {
      areaCode: areaCode
    }
  })
}

export const fetchBuildingContractList = (params: { buildingId: string, page: number, size: number }) => async (): Promise<ApiResponse<ContractBuildingList>> => {
  const { buildingId, page, size } = params
  return defaultApiClient.get(`/v1/contract/${buildingId}`, {
    params: { page, size }
  })
}

export const fetchBuildingContractSummary = (buildingId: string) => async (): Promise<ApiResponse<ContractBuildingSummary>> => {
  return defaultApiClient.get(`/v1/contract/summary/${buildingId}`)
}

export const fetchBuildingContractTrend = (buildingId: string) => async (): Promise<ApiResponse<ContractBuildingTrend>> => {
  return defaultApiClient.get(`/v1/contract/trend/${buildingId}`)
}
