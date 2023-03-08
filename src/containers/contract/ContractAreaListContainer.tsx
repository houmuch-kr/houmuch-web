import React from "react"
import { useContractAreaListQuery, useTableContext } from "~/hooks";
import styled from "styled-components";
import { ContractAreaListPresenter } from "~/presenters";
import { AreaCode } from "~/types";

interface Props {
  areaCode: AreaCode
}

const Section = styled.div`
  padding: 0 1rem;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  margin: .5rem auto;
  
  & > .title {
    font-weight: bold;
    font-size: 1.15rem;
    padding: .5rem 0;
  }
  
  & > div {
    & > .row {
      display: flex;
      padding: .5rem 0;
      
      & > .label {
        width: 25%;
      }
      
      & > span {
        margin-right: 1rem;
      }
    }
  }
`

const ContractAreaListContainer = ({ areaCode }: Props) => {
  const DEFAULT_SIZE = 10
  const tableContext = useTableContext()
  const { data, isLoading } = useContractAreaListQuery(areaCode.id, tableContext.page, DEFAULT_SIZE)

  return (
    <ContractAreaListPresenter data={data?.data} isLoading={isLoading} />
  )
}

export default ContractAreaListContainer
