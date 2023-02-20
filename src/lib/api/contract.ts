import defaultApiClient from "~/lib/api";
import {
  ApiResponse,
  ContractAreaList,
  ContractAreaSummary,
  ContractAreaTrend,
  ContractBuildingList,
  ContractBuildingSummary,
  ContractBuildingTrend,
  ContractSummary
} from "~/types";

export const fetchContractSummary = (type: number) => async(): Promise<ApiResponse<Array<ContractSummary>>> => {
  return defaultApiClient.get(`/v1/contract/fetchList`, {
    params: { type }
  })
}

export const fetchAreaContractList = (areaCode: number) => async (): Promise<ApiResponse<ContractAreaList>> => {
  return defaultApiClient.get(`/v1/contract`, {
    params: {
      areaCode: areaCode
    }
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

export const fetchBuildingContractList = (buildingId: string) => async (): Promise<ApiResponse<ContractBuildingList>> => {
  return defaultApiClient.get(`/v1/contract/${buildingId}`)
}

export const fetchBuildingContractSummary = (buildingId: string) => async (): Promise<ApiResponse<ContractBuildingSummary>> => {
  return defaultApiClient.get(`/v1/contract/summary/${buildingId}`)
}

export const fetchBuildingContractTrend = (buildingId: string) => async (): Promise<ApiResponse<ContractBuildingTrend>> => {
  return defaultApiClient.get(`/v1/contract/trend/${buildingId}`)
}
