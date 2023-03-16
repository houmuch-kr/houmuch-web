import { AreaCode, Building, Contract } from "~/types";

export interface ContractSummary {
  areaCode?: AreaCode
  building?: Building
  price: number
  count: number
}

export interface ContractAreaList {
  areaCode: AreaCode
  contractList: Array<Contract>
}

export interface ContractAreaSummary {
  areaCode: AreaCode
  priceMonth: number
  priceYear: number
  tradeCount: number
  rentCount: number
}

export interface ContractAreaTrend {
  areaCode: AreaCode
  monthList: Array<MonthSummary>
}

export interface ContractBuildingList {
  building: Building
  contractList: Array<Contract>
}

export interface ContractBuildingSummary {
  building: Building
  priceMonth: number
  priceYear: number
  tradeCount: number
  rentCount: number
}

export interface ContractBuildingTrend {
  building: Building
  monthList: Array<MonthSummary>
}

export interface MonthSummary {
  yearMonth: string
  price: number
  count: number
}
