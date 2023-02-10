import { AreaCode, BuildingType, Coordinate } from "~/types";

export interface Building {
  id: string
  name: string
  type: BuildingType
  addressDetail: string
  squareMeter: number
  builtAt: number
  coordinate: Coordinate
  areaCode: AreaCode
}
