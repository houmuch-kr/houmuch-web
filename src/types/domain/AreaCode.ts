import { CombinedAreaCode, Coordinate } from "~/types";

export interface AreaCode {
  id: number
  type: number
  address: string
  shortAddress: string
  fullAddress: string
  code: CombinedAreaCode
  coordinate: Coordinate
}
