import React, { ReactNode } from "react";
import { ContractAreaSummary } from "~/types";
import { ContractSummaryPresenter } from "~/presenters";

interface Props {
  children?: ReactNode
  data?: ContractAreaSummary
  isLoading: boolean
}

const ContractAreaSummaryPresenter = ({ isLoading, data }: Props) => {
  return (
    <ContractSummaryPresenter isLoading={isLoading}>
      {
        data && (() => {
          const { areaCode, priceYear, priceMonth, rentCount, tradeCount } = data
          const { address } = areaCode
          return (
            <>
              <h2 className={"title"}>{ address }</h2>
              <div>
                <div className={"row price"}>
                  <label className={"label"}>평균가격</label>
                  <span>{(priceYear / 10000).toFixed(1)}억 (1년)</span>
                  <span>{(priceMonth / 10000).toFixed(1)}억 (1개월)</span>
                </div>
                <div className={"row volume"}>
                  <label className={"label"}>거래건수</label>
                  <span>{(rentCount + tradeCount).toLocaleString()}건</span>
                  <span>매매 {tradeCount.toLocaleString()}건</span>
                  <span>전월세 {rentCount.toLocaleString()}건</span>
                </div>
              </div>
            </>
          )
        })()
      }
    </ContractSummaryPresenter>
  )
}

export default ContractAreaSummaryPresenter
