import { UseQueryResult } from "react-query";
import { useConfiguredQuery } from "~/hooks/query/index";
import {
  fetchAreaContractList,
  fetchAreaContractSummary,
  fetchAreaContractTrend,
  fetchBuildingContractList,
  fetchBuildingContractSummary,
  fetchBuildingContractTrend,
  fetchContractSummary
} from "~/lib/api";
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

export const useContractSummaryQuery = (type: number): UseQueryResult<ApiResponse<Array<ContractSummary>>> => {
  return useConfiguredQuery("fetchContractSummary", fetchContractSummary(type), { type })
}

export const useContractAreaListQuery = (areaCode: number, page: number, size: number): UseQueryResult<ApiResponse<ContractAreaList>> => {
  const params = { areaCode, page, size }
  return useConfiguredQuery("fetchAreaContractList", fetchAreaContractList(params), params)
}

export const useContractAreaSummaryQuery = (areaCode: number): UseQueryResult<ApiResponse<ContractAreaSummary>> => {
  return useConfiguredQuery("fetchAreaContractSummary", fetchAreaContractSummary(areaCode), { areaCode })
}

export const useContractAreaTrendQuery = (areaCode: number): UseQueryResult<ApiResponse<ContractAreaTrend>> => {
  return useConfiguredQuery("fetchAreaContractTrend", fetchAreaContractTrend(areaCode), { areaCode })
}

export const useContractBuildingListQuery = (buildingId: string, page: number, size: number): UseQueryResult<ApiResponse<ContractBuildingList>> => {
  const params = { buildingId, page, size }
  return useConfiguredQuery("fetchBuildingContractList", fetchBuildingContractList(params), params)
}

export const useContractBuildingSummaryQuery = (buildingId: string): UseQueryResult<ApiResponse<ContractBuildingSummary>> => {
  return useConfiguredQuery("fetchBuildingContractSummary", fetchBuildingContractSummary(buildingId), { buildingId })
}

export const useContractBuildingTrendQuery = (buildingId: string): UseQueryResult<ApiResponse<ContractBuildingTrend>> => {
  return useConfiguredQuery("fetchBuildingContractTrend", fetchBuildingContractTrend(buildingId), { buildingId })
}
