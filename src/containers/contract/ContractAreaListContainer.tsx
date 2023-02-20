import React, { useEffect, useState } from "react"
import { useContractAreaListQuery } from "~/hooks";
import styled from "styled-components";
import { DataTable } from "~/components";
import { ContractType } from "~/types";
import moment from "moment";

interface Props {
  areaCode: number
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
  const { data, isLoading } = useContractAreaListQuery(areaCode)
  const [ items, setItems ] = useState<Array<any>>([])

  useEffect(() => {
    if (data && data.data) {
      setItems(() => data.data!!.contractList.slice(0, 5).map(contract => {
        const { contractedAt, type, building } = contract
        const { name, squareMeter } = building
        return {
          data: moment(contractedAt).format("YY/MM/DD"),
          type: type === ContractType.TRADE ? '매매' : '전/월세',
          name,
          price: `${0}억`,
          squareMeter: `${squareMeter}m²`
        }
      }))
    }
  }, [ data ])

  return (
    <Section>
      <h2 className={"title"}>거래내역</h2>
      <div className={"row"}>
        <DataTable headers={["날짜", "구분", "아파트", "가격", "면적"]} loading={isLoading} data={items} />
      </div>
    </Section>
  )
}

export default ContractAreaListContainer
