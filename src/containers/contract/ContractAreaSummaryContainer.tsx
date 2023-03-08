import React from "react"
import { useContractAreaSummaryQuery } from "~/hooks";
import { ContractAreaSummaryPresenter } from "~/presenters";
import { AreaCode } from "~/types";

interface Props {
  areaCode: AreaCode
}

const ContractAreaSummaryContainer = ({ areaCode }: Props) => {
  const { data, isLoading } = useContractAreaSummaryQuery(areaCode.id)
  return (
    <ContractAreaSummaryPresenter isLoading={isLoading} data={data?.data} />
  )
}

export default ContractAreaSummaryContainer
