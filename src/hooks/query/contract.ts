import { UseQueryResult } from "react-query";
import { useConfiguredQuery } from "~/hooks/query/index";
import {
  fetchAreaContractList,
  fetchAreaContractSummary,
  fetchAreaContractTrend,
  fetchBuildingContractList,
  fetchBuildingContractSummary,
  fetchBuildingContractTrend
} from "~/lib/api";
import {
  ContractAreaList,
  ContractAreaSummary,
  ContractAreaTrend,
  ContractBuildingList,
  ContractBuildingSummary,
  ContractBuildingTrend
} from "~/types";

export const useContractAreaListQuery = (areaCode: number): UseQueryResult<ContractAreaList> => {
  return useConfiguredQuery(fetchAreaContractList(areaCode), { areaCode })
}

export const useContractAreaSummaryQuery = (areaCode: number): UseQueryResult<ContractAreaSummary> => {
  return useConfiguredQuery(fetchAreaContractSummary(areaCode), { areaCode })
}

export const useContractAreaTrendQuery = (areaCode: number): UseQueryResult<ContractAreaTrend> => {
  return useConfiguredQuery(fetchAreaContractTrend(areaCode), { areaCode })
}

export const useContractBuildingListQuery = (buildingId: string): UseQueryResult<ContractBuildingList> => {
  return useConfiguredQuery(fetchBuildingContractList(buildingId), { buildingId })
}

export const useContractBuildingSummaryQuery = (buildingId: string): UseQueryResult<ContractBuildingSummary> => {
  return useConfiguredQuery(fetchBuildingContractSummary(buildingId), { buildingId })
}

export const useContractBuildingTrendQuery = (buildingId: string): UseQueryResult<ContractBuildingTrend> => {
  return useConfiguredQuery(fetchBuildingContractTrend(buildingId), { buildingId })
}
