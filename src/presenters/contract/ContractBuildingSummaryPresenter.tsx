import React, { ReactNode } from "react";
import { ContractBuildingSummary } from "~/types";
import { ContractSummaryPresenter } from "~/presenters";

interface Props {
  children?: ReactNode
  data?: ContractBuildingSummary
  isLoading: boolean
}

const ContractBuildingSummaryPresenter = ({ isLoading, data }: Props) => {
  return (
    <ContractSummaryPresenter isLoading={isLoading}>
      {
        data && (() => {
          const { building, priceYear, priceMonth, rentCount, tradeCount } = data
          const { name } = building
          return (
            <>
              <h2 className={"title"}>{ name }</h2>
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

export default ContractBuildingSummaryPresenter
