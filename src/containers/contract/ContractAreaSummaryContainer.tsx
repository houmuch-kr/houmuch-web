import React from "react"
import { useContractAreaSummaryQuery } from "~/hooks";
import styled from "styled-components";
import { Loader } from "~/components";

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
        font-size: .85rem;
      }
      
      & > span {
        margin-right: 1rem;
        font-size: .85rem;
      }
    }
  }
`

const ContractAreaSummaryContainer = ({ areaCode }: Props) => {
  const { data } = useContractAreaSummaryQuery(areaCode)
  return (
    <Section>
      {
        data && data.data ? (() => {
          const { areaCode, priceYear, priceMonth, rentCount, tradeCount } = data.data
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
        })() : <Loader />
      }
    </Section>
  )
}

export default ContractAreaSummaryContainer
