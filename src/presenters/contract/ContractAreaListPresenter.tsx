import React, { useEffect, useState } from "react";
import { ContractListPresenter } from "~/presenters";
import moment from "moment/moment";
import { ContractAreaList, ContractType } from "~/types";
import { DataTable } from "~/components";

interface Props {
  data?: ContractAreaList
  isLoading: boolean
}

const ContractAreaListPresenter = ({ data, isLoading }: Props) => {
  const [ items, setItems ] = useState<Array<any>>([])

  useEffect(() => {
    if (data) {
      setItems(items => {
        const list = data.contractList.map(contract => {
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
    <ContractListPresenter isLoading={isLoading}>
      <DataTable
        headers={["날짜", "아파트", "구분", "가격", "면적"]}
        wrapColumn={[ 1 ]}
        loading={isLoading}
        data={items} />
    </ContractListPresenter>
  )
}

export default ContractAreaListPresenter
