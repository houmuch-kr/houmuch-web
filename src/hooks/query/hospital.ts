import { UseQueryResult } from "react-query";
import { useConfiguredQuery } from "~/hooks/query/index";
import { fetchHospitalList } from "~/lib/api";
import { ApiResponse, Coordinate, Hospital } from "~/types";

export const useHospitalListQuery = (params: {
  boundsCoords?: {
    max: Coordinate
    min: Coordinate
  },
  enable: boolean
}): UseQueryResult<ApiResponse<Array<Hospital>>> => {
  const { boundsCoords, enable } = params
  return useConfiguredQuery("fetchHospitalList", fetchHospitalList({ ...boundsCoords }), params, enable && boundsCoords !== undefined)
}
