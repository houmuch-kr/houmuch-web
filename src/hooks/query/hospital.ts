import { UseQueryResult } from "react-query";
import { useConfiguredQuery } from "~/hooks/query/index";
import { fetchHospitalList } from "~/lib/api";
import { ApiResponse, ContractSummary, Coordinate } from "~/types";

export const useHospitalListQuery = (params: {
  boundsCoords?: {
    max: Coordinate
    min: Coordinate
  }
}): UseQueryResult<ApiResponse<Array<ContractSummary>>> => {
  const { boundsCoords } = params
  return useConfiguredQuery("fetchHospitalList", fetchHospitalList({ ...boundsCoords }), params, boundsCoords !== undefined)
}
