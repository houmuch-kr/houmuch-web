import { Building, ContractType } from "~/types";

export interface Contract {
  id: string,
  type: ContractType,
  contractedAt: string,
  serialNumber?: string,
  building: Building
}
