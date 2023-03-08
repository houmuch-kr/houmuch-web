import React from "react"
import { useContractBuildingSummaryQuery } from "~/hooks";
import { Building } from "~/types";
import { ContractBuildingSummaryPresenter } from "~/presenters";

interface Props {
  building: Building
}

const ContractBuildingSummaryContainer = ({ building }: Props) => {
  const { data, isLoading } = useContractBuildingSummaryQuery(building.id)
  return (
    <ContractBuildingSummaryPresenter isLoading={isLoading} data={data?.data} />
  )
}

export default ContractBuildingSummaryContainer
