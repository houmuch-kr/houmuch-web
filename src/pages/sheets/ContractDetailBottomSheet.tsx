import React, { useState } from "react"
import { BottomSheet, BottomSheetMode, DataTable, TrendChart } from "~/components";
import styled from "styled-components";

const Section = styled.div`
  padding: 0 1rem;
  overflow: hidden;
  width: 100%;
  height: 100%;
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

const ContractDetailBottomSheet = () => {
  const [ mode, setMode ] = useState<BottomSheetMode>()

  const handleChangeMode = (mode: BottomSheetMode) => {
    setMode(mode)
  }

  return (
    <BottomSheet onModeChange={handleChangeMode}>
      {
        mode !== BottomSheetMode.HIDE && (
          <Section>
            <h2 className={"title"}>서울시</h2>
            <div>
              <div className={"row price"}>
                <label className={"label"}>평균가격</label>
                <span>3.6억 (1년)</span>
                <span>5.2억 (1개월)</span>
              </div>
              <div className={"row volume"}>
                <label className={"label"}>거래건수</label>
                <span>35건</span>
                <span>매매 10건</span>
                <span>전월세 25건</span>
              </div>
            </div>
          </Section>
        )
      }
      {
        mode === "DETAIL" && (
          <>
            <Section>
              <h2 className={"title"}>차트</h2>
              <div className={"row"}>
                <TrendChart />
              </div>
            </Section>
            <Section>
              <h2 className={"title"}>거래내역</h2>
              <div className={"row"}>
                <DataTable headers={["날짜", "구분", "아파트", "가격", "면적"]} data={
                  [
                    {
                      date: "22.01.03",
                      type: "매매",
                      name: "반포자이",
                      price: "9.5억",
                      squareMeter: "153m²"
                    },{
                      date: "22.01.03",
                      type: "매매",
                      name: "반포자이",
                      price: "9.5억",
                      squareMeter: "153m²"
                    },{
                      date: "22.01.03",
                      type: "매매",
                      name: "반포자이",
                      price: "9.5억",
                      squareMeter: "153m²"
                    }
                  ]
                } />
              </div>
            </Section>
          </>
        )
      }
    </BottomSheet>
  )
}

export default ContractDetailBottomSheet
