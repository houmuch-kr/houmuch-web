import React, { useEffect, useState } from "react"
import { useContractAreaListQuery, useTableContext } from "~/hooks";
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
  const DEFAULT_SIZE = 10
  const [ items, setItems ] = useState<Array<any>>([])
  const tableContext = useTableContext()
  const { data, isLoading } = useContractAreaListQuery(areaCode, tableContext.page, DEFAULT_SIZE)

  useEffect(() => {
    if (data && data.data) {
      setItems(items => {
        const list = data.data!!.contractList.map(contract => {
          const { contractedAt, type, building, price, monthlyPrice } = contract
          const { name, squareMeter } = building
          const fixedSquareMeter = squareMeter.toFixed(1)
          const fixedPrice = (price / 10000).toFixed(1)
          return {
            data: moment(contractedAt).format("YY.MM.DD"),
            name,
            type: type === ContractType.TRADE ? '매매' : '전/월세',
            price: (() => {
              const simplePrice = fixedPrice.endsWith('0') ? Number.parseInt(fixedPrice) : fixedPrice
              if (type === ContractType.TRADE) {
                return `${simplePrice}억`
              } else {
                if (monthlyPrice === 0) {
                  return `${simplePrice}억`
                }
                return `${simplePrice}억/${monthlyPrice}`
              }
            })(),
            squareMeter: `${fixedSquareMeter.endsWith('0') ? Number.parseInt(fixedSquareMeter) : fixedSquareMeter}m²`
          }
        })
        return [
          ...items,
          ...list
        ]
      })
    }
  }, [ data ])

  return (
    <Section>
      <h2 className={"title"}>거래내역</h2>
      <div className={"row"}>
        <DataTable
          headers={["날짜", "아파트", "구분", "가격", "면적"]}
          wrapColumn={[ 1 ]}
          loading={isLoading}
          data={items} />
      </div>
    </Section>
  )
}

export default ContractAreaListContainer
