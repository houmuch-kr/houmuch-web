import React from "react";
import { ContractAreaTrend, ContractBuildingTrend } from "~/types";
import { TrendChart } from "~/components";
import styled from "styled-components";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

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

interface Props {
  data?: ContractAreaTrend | ContractBuildingTrend
  isLoading: boolean
}

const ContractTrendPresenter = ({ data, isLoading }: Props) => {
  return (
    <Section>
      <h2 className={"title"}>차트</h2>
      <div className={"row"}>
        <TrendChart
          lineChartHeight={isMobile ? 140 : 60}
          barChartHeight={isMobile ? 100 : 20}
          loading={isLoading}
          data={data?.monthList.map(({ yearMonth, price, count }) => {
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

export default ContractTrendPresenter
