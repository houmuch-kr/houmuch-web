import { Coordinate } from "~/types";

export interface Hospital {
  id: string
  name: string
  zipCode: number
  address: string
  tel: string
  url: string
  builtAt: string
  coordinate: Coordinate,
  code: {
    name: string,
    value: number
  }
}
