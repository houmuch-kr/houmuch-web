import React from "react"
import { useContractAreaTrendQuery } from "~/hooks";
import { AreaCode } from "~/types";
import { ContractTrendPresenter } from "~/presenters";

interface Props {
  areaCode: AreaCode
}

const ContractAreaTrendContainer = ({ areaCode }: Props) => {
  const { data, isLoading } = useContractAreaTrendQuery(areaCode.id)
  return (
    <ContractTrendPresenter isLoading={isLoading} data={data?.data} />
  )
}

export default ContractAreaTrendContainer
