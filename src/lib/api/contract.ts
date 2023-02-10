import defaultApiClient from "~/lib/api";

export const fetchAreaContractList = (areaCode: number) => {
  return defaultApiClient.get(`/v1/contract`, {
    params: {
      areaCode: areaCode
    }
  })
}

export const fetchAreaContractSummary = (areaCode: number) => {
  return defaultApiClient.get(`/v1/contract/summary`, {
    params: {
      areaCode: areaCode
    }
  })
}

export const fetchAreaContractTrend = (areaCode: number) => {
  return defaultApiClient.get(`/v1/contract/trend`, {
    params: {
      areaCode: areaCode
    }
  })
}

export const fetchBuildingContractList = (buildingId: string) => {
  return defaultApiClient.get(`/v1/contract/${buildingId}`)
}

export const fetchBuildingContractSummary = (buildingId: string) => {
  return defaultApiClient.get(`/v1/contract/summary/${buildingId}`)
}

export const fetchBuildingContractTrend = (buildingId: string) => {
  return defaultApiClient.get(`/v1/contract/trend/${buildingId}`)
}
