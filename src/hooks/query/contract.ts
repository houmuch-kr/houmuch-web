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

export const useContractAreaListQuery = (areaCode: number): UseQueryResult<ApiResponse<ContractAreaList>> => {
  return useConfiguredQuery("fetchAreaContractList", fetchAreaContractList(areaCode), { areaCode })
}

export const useContractAreaSummaryQuery = (areaCode: number): UseQueryResult<ApiResponse<ContractAreaSummary>> => {
  return useConfiguredQuery("fetchAreaContractSummary", fetchAreaContractSummary(areaCode), { areaCode })
}

export const useContractAreaTrendQuery = (areaCode: number): UseQueryResult<ApiResponse<ContractAreaTrend>> => {
  return useConfiguredQuery("fetchAreaContractTrend", fetchAreaContractTrend(areaCode), { areaCode })
}

export const useContractBuildingListQuery = (buildingId: string): UseQueryResult<ApiResponse<ContractBuildingList>> => {
  return useConfiguredQuery("fetchBuildingContractList", fetchBuildingContractList(buildingId), { buildingId })
}

export const useContractBuildingSummaryQuery = (buildingId: string): UseQueryResult<ApiResponse<ContractBuildingSummary>> => {
  return useConfiguredQuery("fetchBuildingContractSummary", fetchBuildingContractSummary(buildingId), { buildingId })
}

export const useContractBuildingTrendQuery = (buildingId: string): UseQueryResult<ApiResponse<ContractBuildingTrend>> => {
  return useConfiguredQuery("fetchBuildingContractTrend", fetchBuildingContractTrend(buildingId), { buildingId })
}
