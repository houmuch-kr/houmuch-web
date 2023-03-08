import React, { ReactNode } from "react";
import styled from "styled-components";

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
  children?: ReactNode
  isLoading: boolean
}

const ContractListPresenter = ({ isLoading, children }: Props) => {
  return (
    <Section>
      <h2 className={"title"}>거래내역</h2>
      <div className={"row"}>
        { children }
      </div>
    </Section>
  )
}

export default ContractListPresenter
