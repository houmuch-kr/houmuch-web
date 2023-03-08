import React from "react";
import ContractBuildingListPresenter from "../../presenters/contract/ContractBuildingListPresenter";
import { useContractBuildingListQuery, useTableContext } from "~/hooks";
import { Building } from "~/types";

interface Props {
  building: Building
}

const ContractBuildingListContainer = ({ building }: Props) => {
  const DEFAULT_SIZE = 10
  const tableContext = useTableContext()
  const { data, isLoading } = useContractBuildingListQuery(building.id, tableContext.page, DEFAULT_SIZE)

  return (
    <ContractBuildingListPresenter data={data?.data} isLoading={isLoading} />
  )
}

export default ContractBuildingListContainer
