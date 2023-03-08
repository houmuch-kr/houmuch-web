import React from "react"
import { useContractBuildingTrendQuery } from "~/hooks";
import { Building } from "~/types";
import { ContractTrendPresenter } from "~/presenters";

interface Props {
  building: Building
}

const ContractBuildingTrendContainer = ({ building }: Props) => {
  const { data, isLoading } = useContractBuildingTrendQuery(building.id)
  return (
    <ContractTrendPresenter isLoading={isLoading} data={data?.data} />
  )
}

export default ContractBuildingTrendContainer
