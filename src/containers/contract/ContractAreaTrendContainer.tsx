import React from "react"
import { useContractAreaTrendQuery } from "~/hooks";
import styled from "styled-components";
import { TrendChart } from "~/components";

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

const ContractAreaTrendContainer = ({ areaCode }: Props) => {
  const { data, isLoading } = useContractAreaTrendQuery(areaCode)
  console.log('data?.data?', data?.data)
  return (
    <Section>
      <h2 className={"title"}>차트</h2>
      <div className={"row"}>
        <TrendChart
          loading={isLoading}
          data={data?.data?.monthList.map(({ yearMonth, price, count }) => {
            return {
              xAxisLabel: yearMonth,
              price,
              count
            }
          })} />
      </div>
    </Section>
  )
}

export default ContractAreaTrendContainer
